package org.infyntrek.farmsync.controller;

import jakarta.validation.Valid;
import org.infyntrek.farmsync.dto.AuthRequest;
import org.infyntrek.farmsync.dto.AuthResponse;
import org.infyntrek.farmsync.dto.RegisterRequest;
import org.infyntrek.farmsync.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public authentication endpoints for signup and login.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registers a new user account and returns a JWT for immediate use.
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    /**
     * Authenticates user credentials and returns a fresh JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
