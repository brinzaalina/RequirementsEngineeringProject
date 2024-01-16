package com.example.studentinternship.service.internship;

import com.example.studentinternship.configuration.SecurityHelper;
import com.example.studentinternship.dto.CreateInternshipDto;
import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.exception.NotFoundException;
import com.example.studentinternship.model.*;
import com.example.studentinternship.repository.*;
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

    private final ApplicationRepository applicationRepository;

    private final StudentRepository studentRepository;

    private final ModelMapper modelMapper;

    public InternshipService(InternshipRepository internshipRepository,
                             CompanyRepository companyRepository,
                             UserRepository userRepository,
                             ApplicationRepository applicationRepository,
                             StudentRepository studentRepository,
                             ModelMapper modelMapper)
    {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
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
        Specification<Internship> spec = InternshipSpecifications.withDynamicFilter(
                locations,
                fields,
                salaryFilter,
                titleSearch
        );
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

    public void applyToInternship(String internshipId) {
        studentRepository.findById(SecurityHelper.getUserId())
                        .ifPresent(student -> internshipRepository.findById(internshipId)
                                .ifPresent(internship -> {
                                    if(!applicationRepository.existsByInternshipAndStudent(internship, student)) {
                                        var application = new Application();
                                        application.setStudent(student);
                                        application.setInternship(internship);
                                        application.setStatus(ApplicationStatus.APPLIED);
                                        applicationRepository.save(application);
                                    }
                                }));
    }

    public void rejectApplication(String applicationId) {
        applicationRepository.findById(applicationId)
                .ifPresent(application -> {
                    application.setStatus(ApplicationStatus.REJECTED);
                    applicationRepository.save(application);
                });
    }

    public void acceptApplication(String applicationId) {
        applicationRepository.findById(applicationId)
                .ifPresent(application -> {
                    application.setStatus(ApplicationStatus.ACCEPTED);
                    applicationRepository.save(application);
                });
    }

    public List<Student> findCandidatesForInternship(String internshipId) {
        return applicationRepository.findByInternship_InternshipId(internshipId).stream()
                .map(Application::getStudent)
                .toList();
    }

    public List<Application> getApplicationsForStudent(String studentId) {
        return applicationRepository.findByStudent_Id(studentId);
    }

    public List<Application> getApplicationsForInternship(String internshipId) {
        return applicationRepository.findByInternship_InternshipId(internshipId);
    }
}
