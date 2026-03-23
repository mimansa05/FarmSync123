package org.infyntrek.farmsync.service;

import java.util.List;
import org.infyntrek.farmsync.dto.UserResponse;

/**
 * Business contract for reading user-related data.
 */
public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getCurrentUser(String email);
}
