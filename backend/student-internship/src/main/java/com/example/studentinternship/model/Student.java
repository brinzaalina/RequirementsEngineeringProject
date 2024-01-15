package com.example.studentinternship.model;

import jakarta.persistence.Entity;

@Entity
public class Student extends User
{
    private String university;

    public Student() {
    }

    public Student(String name, String email, String password, Role role, String university) {
        super(name, email, password, role);
        this.university = university;
    }

    public String getUniversity()
    {
        return university;
    }

    public void setUniversity(String university)
    {
        this.university = university;
    }
}

