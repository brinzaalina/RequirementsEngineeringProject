package com.example.studentinternship.dto;

public class CompanyDto
{
    private String companyId;
    private String companyName;
    private String companyDetails;

    public String getCompanyId()
    {
        return companyId;
    }

    public String getCompanyName()
    {
        return companyName;
    }

    public String getCompanyDetails()
    {
        return companyDetails;
    }

    public void setCompanyId(String companyId)
    {
        this.companyId = companyId;
    }

    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }

    public void setCompanyDetails(String companyDetails)
    {
        this.companyDetails = companyDetails;
    }
}
