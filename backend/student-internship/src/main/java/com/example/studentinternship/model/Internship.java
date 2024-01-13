package com.example.studentinternship.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Internship
{
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    private String internshipId;
    private String title;

    @Column(length = 512)
    private String description;

    @ManyToOne
    @JoinColumn(name = "companyId", nullable = false)
    private Company company;

    private String location;
    private String field;
    private Double salary;
    private Integer positions;

    public String getInternshipId()
    {
        return internshipId;
    }

    public void setInternshipId(String internshipId)
    {
        this.internshipId = internshipId;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Company getCompany()
    {
        return company;
    }

    public void setCompany(Company company)
    {
        this.company = company;
    }

    public String getLocation()
    {
        return location;
    }

    public void setLocation(String location)
    {
        this.location = location;
    }

    public String getField()
    {
        return field;
    }

    public void setField(String field)
    {
        this.field = field;
    }

    public Double getSalary()
    {
        return salary;
    }

    public void setSalary(Double salary)
    {
        this.salary = salary;
    }

    public Integer getPositions()
    {
        return positions;
    }

    public void setPositions(Integer positions)
    {
        this.positions = positions;
    }
}
