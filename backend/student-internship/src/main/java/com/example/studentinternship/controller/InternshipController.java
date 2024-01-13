package com.example.studentinternship.controller;

import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.service.InternshipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController
{
    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService)
    {
        this.internshipService = internshipService;
    }

    @PostMapping
    public ResponseEntity<InternshipDto> createInternship(@RequestBody InternshipDto internshipDto)
    {
        InternshipDto newCompany = internshipService.createInternship(internshipDto);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InternshipDto>> getAllInternships()
    {
        List<InternshipDto> internships = internshipService.getAllInternships();
        return ResponseEntity.ok().body(internships);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<InternshipDto>> getAllInternshipsByCompany(@PathVariable(value = "companyId") String companyId)
    {
        List<InternshipDto> internships = internshipService.getInternshipByCompany(companyId);
        return ResponseEntity.ok().body(internships);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipDto> getInternshipById(@PathVariable(value = "id") String InternshipId)
    {
        InternshipDto Internship = internshipService.getInternshipById(InternshipId)
                .orElseThrow(() -> new InternshipNotFoundException(InternshipId));
        return ResponseEntity.ok().body(Internship);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipDto> updateInternship(@PathVariable(value = "id") String InternshipId,
                                                 @RequestBody InternshipDto InternshipDetails)
    {
        InternshipDto updatedInternship = internshipService.updateInternship(InternshipId, InternshipDetails);
        return ResponseEntity.ok(updatedInternship);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable(value = "id") String InternshipId)
    {
        internshipService.deleteInternship(InternshipId);
        return ResponseEntity.noContent().build();
    }
}
