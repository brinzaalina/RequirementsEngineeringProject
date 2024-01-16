package com.example.studentinternship.dto;

public class ApplicationDto {
    private String applicationId;
    private String studentName;
    private String cvUri;
    private String status;

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCvUri() {
        return cvUri;
    }

    public void setCvUri(String cvUri) {
        this.cvUri = cvUri;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
