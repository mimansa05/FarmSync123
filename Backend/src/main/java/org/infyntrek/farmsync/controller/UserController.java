package org.infyntrek.farmsync.controller;

import org.infyntrek.farmsync.dto.UserResponse;
import org.infyntrek.farmsync.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authenticated user endpoints for reading account-specific data.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(userService.getCurrentUser(authentication.getName()));
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("User dashboard is accessible");
    }
}
