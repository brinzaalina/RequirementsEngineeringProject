package com.example.studentinternship.service;

import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.model.Internship;
import com.example.studentinternship.repository.CompanyRepository;
import com.example.studentinternship.repository.InternshipRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService
{
    private final InternshipRepository internshipRepository;

    private final CompanyRepository companyRepository;

    private final ModelMapper modelMapper;

    public InternshipService(InternshipRepository internshipRepository, CompanyRepository companyRepository, ModelMapper modelMapper)
    {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
        this.modelMapper = modelMapper;
    }

    public InternshipDto createInternship(InternshipDto internshipDto)
    {
        return companyRepository.findById(internshipDto.getCompanyId())
                .map(company ->
                {
                    Internship internship = modelMapper.map(internshipDto, Internship.class);
                    internship.setCompany(company);
                    Internship savedInternship = internshipRepository.save(internship);
                    return modelMapper.map(savedInternship, InternshipDto.class);
                })
                .orElseThrow(() -> new CompanyNotFoundException(internshipDto.getCompanyId()));
    }

    public List<InternshipDto> getAllInternships()
    {
        return internshipRepository.findAll()
                .stream()
                .map(internship -> modelMapper.map(internship, InternshipDto.class))
                .toList();
    }

    public Optional<InternshipDto> getInternshipById(String id)
    {
        return internshipRepository.findById(id)
                .map(internship -> modelMapper.map(internship, InternshipDto.class));
    }

    public List<InternshipDto> getInternshipByCompany(String companyId)
    {
        return internshipRepository.findAllByCompany_CompanyId(companyId)
                .stream()
                .map(internship -> modelMapper.map(internship, InternshipDto.class))
                .toList();
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

                    return modelMapper.map(savedInternship, InternshipDto.class);
                })
                .orElseThrow(() -> new InternshipNotFoundException("Internship not found with id: " + internshipId));
    }

    public void deleteInternship(String id)
    {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new InternshipNotFoundException("Internship not found with id: " + id));
        internshipRepository.delete(internship);
    }
}
