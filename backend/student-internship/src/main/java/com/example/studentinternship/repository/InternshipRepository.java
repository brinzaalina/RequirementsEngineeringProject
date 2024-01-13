package com.example.studentinternship.repository;

import com.example.studentinternship.model.Internship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, String>, JpaSpecificationExecutor<Internship>
{
    Page<Internship> findAllByCompanyCompanyId(String companyId, Pageable pageable);

    @Query("SELECT DISTINCT i.location FROM Internship i")
    List<String> findDistinctLocations();

    @Query("SELECT DISTINCT i.field FROM Internship i")
    List<String> findDistinctFields();
}
