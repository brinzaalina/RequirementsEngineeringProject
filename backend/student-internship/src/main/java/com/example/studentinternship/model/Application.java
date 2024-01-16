package com.example.studentinternship.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Application
{
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    private String applicationId;
    @ManyToOne
    @JoinColumn(name = "studentId", nullable = false)
    private Student student; // Foreign Key
    @ManyToOne
    @JoinColumn(name = "internshipId", nullable = false)
    private Internship internship; // Foreign Key
    private String cvUri;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status; // "Applied", "Accepted", "Rejected"

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Internship getInternship() {
        return internship;
    }

    public void setInternship(Internship internship) {
        this.internship = internship;
    }

    public String getCvUri()
    {
        return cvUri;
    }

    public void setCvUri(String cvUri)
    {
        this.cvUri = cvUri;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Application{" +
                "applicationId=" + applicationId +
                ", student=" + student +
                ", internship=" + internship +
                ", cvUri='" + cvUri + '\'' +
                ", status=" + status +
                '}';
    }
}
