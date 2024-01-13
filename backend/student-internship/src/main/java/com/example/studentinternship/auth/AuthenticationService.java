package com.example.studentinternship.auth;

import com.example.studentinternship.configuration.JwtService;
import com.example.studentinternship.model.Role;
import com.example.studentinternship.model.User;
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

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.STUDENT)
                .build();

        User saved = userService.save(user);
        var tokenAvailability = user.getRole().equals(Role.RECRUITER) ? 30 : 1;
        var jwtToken = jwtService.generateToken(user, tokenAvailability);
        Long availability = jwtService.extractExpiration(jwtToken).getTime();
        return AuthenticationResponse.builder()
                .userId(saved.getId())
                .token(jwtToken)
                .availability(availability)
                .email(user.getEmail())
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
        var tokenAvailability = user.getRole().equals(Role.STUDENT) ? 30 : 1;
        var jwtToken = jwtService.generateToken(user, tokenAvailability);
        Long availability = jwtService.extractExpiration(jwtToken).getTime();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .availability(availability)
                .email(user.getEmail())
                .build();
    }


}
