package com.example.studentinternship.controller;

import com.example.studentinternship.dto.StudentDto;
import com.example.studentinternship.dto.StudentMapper;
import com.example.studentinternship.service.internship.InternshipService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internship")
public class InternshipController {

    private final InternshipService internshipService;
    private final StudentMapper studentMapper;

    public InternshipController(InternshipService internshipService,
                                StudentMapper studentMapper) {
        this.internshipService = internshipService;
        this.studentMapper = studentMapper;
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
}
