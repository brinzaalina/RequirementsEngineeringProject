package com.example.studentinternship.auth;

import com.example.studentinternship.configuration.JwtService;
import com.example.studentinternship.model.*;
import com.example.studentinternship.repository.CompanyRepository;
import com.example.studentinternship.repository.UserRepository;
import com.example.studentinternship.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final CompanyRepository companyRepository;

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 UserService userService, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.companyRepository = companyRepository;
    }

    public AuthenticationResponse registerRecruiter(RegisterRequest registerRequest) {
        var user = new Recruiter(registerRequest.getName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                Role.RECRUITER);
        if (companyRepository.findByCompanyName(registerRequest.getInstitutionName()).isEmpty()) {
            Company company = new Company();
            company.setCompanyName(registerRequest.getInstitutionName());
            companyRepository.save(company);
            user.setCompany(company);
        } else {
            Company company = companyRepository.findByCompanyName(registerRequest.getInstitutionName()).get();
            user.setCompany(company);
        }
        User saved = userService.save(user);
        var tokenAvailability = 100;
        var jwtToken = jwtService.generateToken(user, tokenAvailability);
        Long availability = jwtService.extractExpiration(jwtToken).getTime();
        return AuthenticationResponse.builder()
                .userId(saved.getId())
                .token(jwtToken)
                .availability(availability)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse registerStudent(RegisterRequest registerRequest) {
        var user = new Student(registerRequest.getName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                Role.STUDENT,
                registerRequest.getInstitutionName());
        User saved = userService.save(user);
        var tokenAvailability = 100;
        var jwtToken = jwtService.generateToken(user, tokenAvailability);
        Long availability = jwtService.extractExpiration(jwtToken).getTime();
        return AuthenticationResponse.builder()
                .userId(saved.getId())
                .token(jwtToken)
                .availability(availability)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest loginRequest) throws RuntimeException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("There is no user with the provided email and password!"));
        var tokenAvailability = user.getRole().equals(Role.STUDENT) ? 100 : 100;
        var jwtToken = jwtService.generateToken(user, tokenAvailability);
        Long availability = jwtService.extractExpiration(jwtToken).getTime();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .availability(availability)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
