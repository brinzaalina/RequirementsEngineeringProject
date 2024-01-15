package com.example.studentinternship.repository;

import com.example.studentinternship.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String>
{
    Optional<Company> findByCompanyName(String companyName);
}
