package com.example.studentinternship.controller;

import com.example.studentinternship.model.Application;
import com.example.studentinternship.service.internship.InternshipService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    private final InternshipService internshipService;

    public ApplicationController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsForStudent(@PathVariable String studentId) {
        return List.of();
//        return internshipService.getApplicationsForStudent(studentId);
    }
}
