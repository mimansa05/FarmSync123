package org.infyntrek.farmsync.service.impl;

import java.util.List;
import org.infyntrek.farmsync.dto.UserResponse;
import org.infyntrek.farmsync.entity.User;
import org.infyntrek.farmsync.exception.ResourceNotFoundException;
import org.infyntrek.farmsync.repository.UserRepository;
import org.infyntrek.farmsync.service.UserService;
import org.springframework.stereotype.Service;

/**
 * Reads user data and maps entities into API-safe response objects.
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
