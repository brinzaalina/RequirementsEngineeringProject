package com.example.studentinternship.dto;

public class InternshipDto
{
    private String internshipId;
    private String title;
    private String description;
    private String companyId;
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

    public String getCompanyId()
    {
        return companyId;
    }

    public void setCompanyId(String companyId)
    {
        this.companyId = companyId;
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
