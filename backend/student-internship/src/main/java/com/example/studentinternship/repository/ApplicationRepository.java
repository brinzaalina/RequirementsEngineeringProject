package com.example.studentinternship.repository;

import com.example.studentinternship.model.Application;
import com.example.studentinternship.model.Internship;
import com.example.studentinternship.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByInternship_InternshipId(String internshipId);

    boolean existsByInternshipAndStudent(Internship internship, Student student);

    List<Application> findByStudent_Id(String studentId);
}
