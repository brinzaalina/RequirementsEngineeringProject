package com.example.studentinternship.model;

import jakarta.persistence.Entity;

@Entity
public class Student extends User
{
    private String university;

    @Override
    public String getUniversity()
    {
        return university;
    }

    @Override
    public void setUniversity(String university)
    {
        this.university = university;
    }
}

