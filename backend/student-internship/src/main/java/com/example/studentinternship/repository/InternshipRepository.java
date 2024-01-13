package com.example.studentinternship.repository;

import com.example.studentinternship.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, String>
{
    List<Internship> findAllByCompany_CompanyId(String companyId);
}
