package org.infyntrek.farmsync.service.impl;

import java.util.Map;

import org.infyntrek.farmsync.dto.AuthRequest;
import org.infyntrek.farmsync.dto.AuthResponse;
import org.infyntrek.farmsync.dto.RegisterRequest;
import org.infyntrek.farmsync.entity.Role;
import org.infyntrek.farmsync.entity.User;
import org.infyntrek.farmsync.exception.EmailAlreadyExistsException;
import org.infyntrek.farmsync.exception.ResourceNotFoundException;
import org.infyntrek.farmsync.repository.UserRepository;
import org.infyntrek.farmsync.security.JwtService;
import org.infyntrek.farmsync.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Handles signup and login with enforced email verification via OTP.
 *
 * Registration flow:
 * 1. Client must verify email via OTP
 * 2. Only verified emails are allowed to register
 * 3. After successful signup, verification flag is cleared (one-time use)
 */
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;   // <-- added

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            OtpService otpService            // <-- added
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.otpService = otpService;
    }

    /**
     * Creates a new USER account after verifying email via OTP.
     */
    @Override
    public AuthResponse register(RegisterRequest request) {

        // Step 1: enforce OTP verification
        if (!otpService.isVerified(request.getEmail())) {
            throw new IllegalStateException("Email not verified");
        }

        // Step 2: prevent duplicate accounts
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        // Step 3: create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        // Step 4: generate JWT
        String jwtToken = jwtService.generateToken(buildClaims(savedUser), savedUser);

        // Step 5: clear verification flag (one-time use)
        otpService.removeVerified(request.getEmail());

        return buildAuthResponse(savedUser, jwtToken);
    }

    /**
     * Verifies credentials through Spring Security and returns a signed JWT.
     */
    @Override
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User account does not exist"));

        String jwtToken = jwtService.generateToken(buildClaims(user), user);
        return buildAuthResponse(user, jwtToken);
    }

    /**
     * Adds identity claims to JWT.
     */
    private Map<String, Object> buildClaims(User user) {
        return Map.of(
                "userId", user.getId(),
                "role", user.getRole().name(),
                "name", user.getName()
        );
    }

    /**
     * Standard response builder.
     */
    private AuthResponse buildAuthResponse(User user, String jwtToken) {
        return new AuthResponse(
                jwtToken,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}