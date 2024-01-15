package com.example.studentinternship.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Recruiter extends User {

    @ManyToOne
    @JoinColumn(name = "companyId")
    private Company company;

    public Recruiter(String name, String email, String password, Role role) {
        super(name, email, password, role);
    }

    public Recruiter() {

    }

    public Company getCompany()
    {
        return company;
    }

    public void setCompany(Company company)
    {
        this.company = company;
    }
}

