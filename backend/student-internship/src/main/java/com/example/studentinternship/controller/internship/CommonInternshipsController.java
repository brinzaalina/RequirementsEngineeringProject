package com.example.studentinternship.controller.internship;

import com.example.studentinternship.dto.InternshipDto;
import com.example.studentinternship.exception.InternshipNotFoundException;
import com.example.studentinternship.service.internship.InternshipService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class CommonInternshipsController
{
    private final InternshipService internshipService;

    public CommonInternshipsController(InternshipService internshipService)
    {
        this.internshipService = internshipService;
    }

    @GetMapping
    public ResponseEntity<Page<InternshipDto>> getAllInternships(
            @RequestParam(value = "locations", required = false) List<String> locations,
            @RequestParam(value = "fields", required = false) List<String> fields,
            @RequestParam(value = "salaryFilter", required = false) Boolean salaryFilter,
            @RequestParam(value = "titleSearch", required = false) String titleSearch,
            Pageable pageable)
    {
        Page<InternshipDto> page = internshipService.getAllInternships(locations, fields, salaryFilter, titleSearch, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipDto> getInternshipById(@PathVariable(value = "id") String internshipId)
    {
        InternshipDto Internship = internshipService.getInternshipById(internshipId)
                .orElseThrow(() -> new InternshipNotFoundException(internshipId));
        return ResponseEntity.ok().body(Internship);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = internshipService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/fields")
    public ResponseEntity<List<String>> getAllFields() {
        List<String> fields = internshipService.getAllFields();
        return ResponseEntity.ok(fields);
    }
}
