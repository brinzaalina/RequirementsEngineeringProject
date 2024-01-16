package com.example.studentinternship.dto;

import com.example.studentinternship.model.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    @Mapping(target = "email", source = "student.email")
    @Mapping(target = "university", source = "student.university")
    @Mapping(target = "name", source = "student.name")
    StudentDto entityToDto(Student student);
}
