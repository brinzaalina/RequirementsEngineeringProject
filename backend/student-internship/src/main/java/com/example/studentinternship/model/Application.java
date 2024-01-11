package com.example.studentinternship.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Application
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long applicationId;
    private Long studentId; // Foreign Key
    private Long internshipId; // Foreign Key
    private String cvUri;
    private String status; // "Applied", "Accepted", "Rejected"

    public Long getApplicationId()
    {
        return applicationId;
    }

    public void setApplicationId(Long applicationId)
    {
        this.applicationId = applicationId;
    }

    public Long getStudentId()
    {
        return studentId;
    }

    public void setStudentId(Long studentId)
    {
        this.studentId = studentId;
    }

    public Long getInternshipId()
    {
        return internshipId;
    }

    public void setInternshipId(Long internshipId)
    {
        this.internshipId = internshipId;
    }

    public String getCvUri()
    {
        return cvUri;
    }

    public void setCvUri(String cvUri)
    {
        this.cvUri = cvUri;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }
}
