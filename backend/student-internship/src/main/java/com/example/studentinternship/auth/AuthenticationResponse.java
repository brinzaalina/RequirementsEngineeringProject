package com.example.studentinternship.auth;

import lombok.Builder;

@Builder
public class AuthenticationResponse {
    private String token;
    private String email;
    private String userId;
    private String role;
    private Long availability;

    public AuthenticationResponse(String token, String email, String userId, String role, Long availability) {
        this.token = token;
        this.email = email;
        this.userId = userId;
        this.role = role;
        this.availability = availability;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public Long getAvailability() {
        return availability;
    }

    public void setAvailability(Long availability) {
        this.availability = availability;
    }

    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "token='" + token + '\'' +
                ", email='" + email + '\'' +
                ", userId='" + userId + '\'' +
                ", role='" + role + '\'' +
                ", availability=" + availability +
                '}';
    }
}
