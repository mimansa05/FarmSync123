package org.infyntrek.farmsync.controller;

import java.util.List;
import org.infyntrek.farmsync.dto.UserResponse;
import org.infyntrek.farmsync.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin-only endpoints used to manage or inspect protected resources.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/health")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminHealth() {
        return ResponseEntity.ok("Admin endpoint is accessible");
    }
}
