package com.example.studentinternship.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest registerRequest) {
        logger.log(Level.INFO, "Incoming register request");
        try {
            var authenticationResponse = authenticationService.registerStudent(registerRequest);
            return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register/recruiter")
    public ResponseEntity<?> registerRecruiter(@RequestBody RegisterRequest registerRequest) {
        logger.log(Level.INFO, "Incoming register request");
        try {
            var authenticationResponse = authenticationService.registerRecruiter(registerRequest);
            return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest loginRequest) {
        logger.log(Level.INFO, "Incoming authentication request");
        try {
            var authenticationResponse = authenticationService.authenticate(loginRequest);
            return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage() , HttpStatus.BAD_REQUEST);
        }
    }
}
