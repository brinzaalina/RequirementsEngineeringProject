package com.example.studentinternship.controller;

import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.model.Company;
import com.example.studentinternship.service.company.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController
{
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService)
    {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company)
    {
        Company newCompany = companyService.createCompany(company);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies()
    {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok().body(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable(value = "id") String companyId)
    {
        Company company = companyService.getCompanyById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException(companyId));
        return ResponseEntity.ok().body(company);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable(value = "id") String companyId,
                                                 @RequestBody Company companyDetails)
    {
        Company updatedCompany = companyService.updateCompany(companyId, companyDetails);
        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable(value = "id") String companyId)
    {
        companyService.deleteCompany(companyId);
        return ResponseEntity.noContent().build();
    }
}
