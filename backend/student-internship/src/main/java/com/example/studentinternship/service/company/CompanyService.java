package com.example.studentinternship.service.company;

import com.example.studentinternship.dto.CompanyDto;
import com.example.studentinternship.exception.CompanyNotFoundException;
import com.example.studentinternship.model.Company;
import com.example.studentinternship.model.Internship;
import com.example.studentinternship.model.Recruiter;
import com.example.studentinternship.repository.CompanyRepository;
import com.example.studentinternship.repository.RecruiterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService
{
    private final CompanyRepository companyRepository;

    private final RecruiterRepository recruiterRepository;

    private final ModelMapper modelMapper;

    public CompanyService(CompanyRepository companyRepository, RecruiterRepository recruiterRepository, ModelMapper modelMapper)
    {
        this.companyRepository = companyRepository;
        this.recruiterRepository = recruiterRepository;
        this.modelMapper = modelMapper;
    }

    public CompanyDto createCompany(CompanyDto companyDto)
    {
        Company company = modelMapper.map(companyDto, Company.class);
        return modelMapper.map(companyRepository.save(company), CompanyDto.class);
    }

    public List<CompanyDto> getAllCompanies()
    {
        return companyRepository.findAll()
                .stream()
                .map(company -> modelMapper.map(company, CompanyDto.class))
                .toList();
    }

    public Optional<CompanyDto> getCompanyById(String id)
    {
        return companyRepository.findById(id)
                .map(company -> modelMapper.map(company, CompanyDto.class));
    }

    public Optional<CompanyDto> getCompanyByName(String name)
    {
        return companyRepository.findByCompanyName(name)
                .map(company -> modelMapper.map(company, CompanyDto.class));
    }

    public Optional<CompanyDto> getCompanyByUserId(String userId)
    {
        return recruiterRepository
                .findById(userId)
                .map(Recruiter::getCompany)
                .map(company -> modelMapper.map(company, CompanyDto.class));
    }

    public CompanyDto updateCompany(String id, CompanyDto companyDto)
    {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
        company.setCompanyName(companyDto.getCompanyName());
        company.setCompanyDetails(companyDto.getCompanyDetails());
        return modelMapper.map(companyRepository.save(company), CompanyDto.class);
    }

    public void deleteCompany(String id)
    {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
        companyRepository.delete(company);
    }
}
