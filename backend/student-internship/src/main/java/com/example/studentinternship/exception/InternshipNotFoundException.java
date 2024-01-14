package com.example.studentinternship.exception;

public class InternshipNotFoundException extends NotFoundException
{
    public InternshipNotFoundException(String internshipId)
    {
        super("Cannot find internship with id: " + internshipId);
    }
}
