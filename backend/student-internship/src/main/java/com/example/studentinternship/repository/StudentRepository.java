package com.example.studentinternship.repository;

import com.example.studentinternship.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
