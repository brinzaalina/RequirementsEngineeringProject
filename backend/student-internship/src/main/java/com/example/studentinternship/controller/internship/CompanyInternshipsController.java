package com.example.studentinternship.controller.internship;

import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.service.internship.InternshipService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies/internships")
public class CompanyInternshipsController
{
    private final InternshipService internshipService;

    public CompanyInternshipsController(InternshipService internshipService)
    {
        this.internshipService = internshipService;
    }

    @PostMapping
    public ResponseEntity<InternshipDto> createInternship(@RequestBody InternshipDto internshipDto)
    {
        InternshipDto newCompany = internshipService.createInternship(internshipDto);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @GetMapping("/all/{companyId}")
    public ResponseEntity<Page<InternshipDto>> getAllInternshipsByCompany(@PathVariable(value = "companyId") String companyId, Pageable pageable)
    {
        Page<InternshipDto> internships = internshipService.getAllInternshipsByCompany(companyId, pageable);
        return ResponseEntity.ok().body(internships);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipDto> updateInternship(@PathVariable(value = "id") String internshipId,
                                                          @RequestBody InternshipDto InternshipDetails)
    {
        InternshipDto updatedInternship = internshipService.updateInternship(internshipId, InternshipDetails);
        return ResponseEntity.ok(updatedInternship);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable(value = "id") String internshipId)
    {
        internshipService.deleteInternship(internshipId);
        return ResponseEntity.noContent().build();
    }
}
