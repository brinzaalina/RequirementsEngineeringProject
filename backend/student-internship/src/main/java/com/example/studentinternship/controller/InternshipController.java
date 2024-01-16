package com.example.studentinternship.controller;

import com.example.studentinternship.dto.ApplicationDto;
import com.example.studentinternship.dto.StudentDto;
import com.example.studentinternship.dto.StudentMapper;
import com.example.studentinternship.service.internship.InternshipService;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internship")
public class InternshipController {

    private final InternshipService internshipService;
    private final StudentMapper studentMapper;
    private final ModelMapper modelMapper;

    public InternshipController(InternshipService internshipService,
                                StudentMapper studentMapper, ModelMapper modelMapper) {
        this.internshipService = internshipService;
        this.studentMapper = studentMapper;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/apply/{internshipId}")
    @Secured("STUDENT")
    void applyToInternship(@PathVariable String internshipId) {
        internshipService.applyToInternship(internshipId);
    }

    @PostMapping("/accept/{applicationId}")
    @Secured("RECRUITER")
    void acceptApplication(@PathVariable String applicationId) {
        internshipService.acceptApplication(applicationId);
    }

    @PostMapping("/reject/{applicationId}")
    @Secured("RECRUITER")
    void rejectApplication(@PathVariable String applicationId) {
        internshipService.rejectApplication(applicationId);
    }

    @GetMapping("/candidates/{internshipId}")
    @Secured("RECRUITER")
    List<StudentDto> getCandidatesList(@PathVariable String internshipId) {
        return internshipService.findCandidatesForInternship(internshipId).stream()
                .map(studentMapper::entityToDto)
                .toList();
    }

    @GetMapping("/applications/{internshipId}")
    @Secured("RECRUITER")
    List<ApplicationDto> getApplicationsList(@PathVariable String internshipId) {
        return internshipService.getApplicationsForInternship(internshipId).stream()
                .map(application -> modelMapper.map(application, ApplicationDto.class))
                .toList();
    }
}
