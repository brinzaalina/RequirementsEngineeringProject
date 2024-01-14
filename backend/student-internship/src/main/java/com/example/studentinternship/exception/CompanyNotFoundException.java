package com.example.studentinternship.exception;

public class CompanyNotFoundException extends NotFoundException
{
    public CompanyNotFoundException(String companyId)
    {
        super("Cannot find company with id: " + companyId);
    }
}
