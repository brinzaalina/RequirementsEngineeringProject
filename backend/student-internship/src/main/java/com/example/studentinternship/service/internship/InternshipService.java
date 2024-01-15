package com.example.studentinternship.service.internship;

import com.example.studentinternship.dto.CreateInternshipDto;
import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.exception.NotFoundException;
import com.example.studentinternship.model.Internship;
import com.example.studentinternship.model.Recruiter;
import com.example.studentinternship.repository.CompanyRepository;
import com.example.studentinternship.repository.InternshipRepository;
import com.example.studentinternship.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService
{
    private final InternshipRepository internshipRepository;

    private final CompanyRepository companyRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public InternshipService(InternshipRepository internshipRepository, CompanyRepository companyRepository, UserRepository userRepository, ModelMapper modelMapper)
    {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public InternshipDto createInternship(CreateInternshipDto internshipDto)
    {
        Recruiter recruiter = (Recruiter) userRepository.findById(internshipDto.getUserId())
                .orElseThrow(() -> new NotFoundException(internshipDto.getUserId()));
        return companyRepository.findById(recruiter.getCompany().getCompanyId())
                .map(company ->
                {
                    Internship internship = modelMapper.map(internshipDto, Internship.class);
                    internship.setCompany(company);
                    return convertToDto(internshipRepository.save(internship));
                })
                .orElseThrow(() -> new CompanyNotFoundException(recruiter.getCompany().getCompanyId()));
    }

    public Page<InternshipDto> getAllInternships(
            List<String> locations,
            List<String> fields,
            Boolean salaryFilter,
            String titleSearch,
            Pageable pageable) {
        Specification<Internship> spec = InternshipSpecifications.withDynamicFilter(locations, fields, salaryFilter, titleSearch);
        Page<Internship> page = internshipRepository.findAll(spec, pageable);
        return page.map(this::convertToDto);
    }

    public Page<InternshipDto> getAllInternshipsByCompany(String companyId, Pageable pageable) {
        Page<Internship> page = internshipRepository.findAllByCompanyCompanyId(companyId, pageable);
        return page.map(this::convertToDto);
    }

    public Optional<InternshipDto> getInternshipById(String id)
    {
        return internshipRepository.findById(id)
                .map(this::convertToDto);
    }

    public InternshipDto updateInternship(String internshipId, InternshipDto internshipDetails)
    {
        return internshipRepository.findById(internshipId)
                .map(internship ->
                {
                    internship.setTitle(internshipDetails.getTitle());
                    internship.setDescription(internshipDetails.getDescription());
                    internship.setLocation(internshipDetails.getLocation());
                    internship.setField(internshipDetails.getField());
                    internship.setSalary(internshipDetails.getSalary());
                    internship.setPositions(internshipDetails.getPositions());

                    Internship savedInternship = internshipRepository.save(internship);

                    return convertToDto(savedInternship);
                })
                .orElseThrow(() -> new InternshipNotFoundException(internshipId));
    }

    public void deleteInternship(String id)
    {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new InternshipNotFoundException(id));
        internshipRepository.delete(internship);
    }

    public List<String> getAllLocations() {
        return internshipRepository.findDistinctLocations();
    }

    public List<String> getAllFields() {
        return internshipRepository.findDistinctFields();
    }

    private InternshipDto convertToDto(Internship internship) {
        return modelMapper.map(internship, InternshipDto.class);
    }
}
