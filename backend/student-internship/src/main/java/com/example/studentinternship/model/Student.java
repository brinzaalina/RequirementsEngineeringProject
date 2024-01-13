package com.example.studentinternship.model;

import jakarta.persistence.Entity;

@Entity
public class Student extends User
{
    private String university;

    public Student() {
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

