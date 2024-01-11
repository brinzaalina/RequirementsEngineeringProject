package com.example.studentinternship.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Company
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long companyId;
    private String companyName;
    private String companyDetails; // description, contact details, etc.

    @OneToMany(mappedBy = "company")
    private List<Recruiter> recruiters;

    @OneToMany(mappedBy = "company")
    private List<Internship> internships;

    public List<Internship> getInternships()
    {
        return internships;
    }

    public void setInternships(List<Internship> internships)
    {
        this.internships = internships;
    }

    public Long getCompanyId()
    {
        return companyId;
    }

    public void setCompanyId(Long companyId)
    {
        this.companyId = companyId;
    }

    public String getCompanyName()
    {
        return companyName;
    }

    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }

    public String getCompanyDetails()
    {
        return companyDetails;
    }

    public void setCompanyDetails(String companyDetails)
    {
        this.companyDetails = companyDetails;
    }

    public List<Recruiter> getRecruiters()
    {
        return recruiters;
    }

    public void setRecruiters(List<Recruiter> recruiters)
    {
        this.recruiters = recruiters;
    }
}
