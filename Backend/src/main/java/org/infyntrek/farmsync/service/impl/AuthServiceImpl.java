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
 * Handles signup and login while keeping JWT creation outside the controller layer.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Creates a new USER account, stores a BCrypt password hash, and returns a JWT.
     */
    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(buildClaims(savedUser), savedUser);

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
     * Adds useful identity claims to the token for downstream consumers.
     */
    private Map<String, Object> buildClaims(User user) {
        return Map.of(
                "userId", user.getId(),
                "role", user.getRole().name(),
                "name", user.getName()
        );
    }

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
