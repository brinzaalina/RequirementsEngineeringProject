package com.example.studentinternship.service;

import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.model.Company;
import com.example.studentinternship.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService
{
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository)
    {
        this.companyRepository = companyRepository;
    }

    public Company createCompany(Company company)
    {
        return companyRepository.save(company);
    }

    public List<Company> getAllCompanies()
    {
        return companyRepository.findAll();
    }

    public Optional<Company> getCompanyById(String id)
    {
        return companyRepository.findById(id);
    }

    public Company updateCompany(String id, Company companyDetails)
    {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
        company.setCompanyName(companyDetails.getCompanyName());
        company.setCompanyDetails(companyDetails.getCompanyDetails());
        return companyRepository.save(company);
    }

    public void deleteCompany(String id)
    {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
        companyRepository.delete(company);
    }
}
