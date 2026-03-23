package org.infyntrek.farmsync.service;

import org.infyntrek.farmsync.dto.AuthRequest;
import org.infyntrek.farmsync.dto.AuthResponse;
import org.infyntrek.farmsync.dto.RegisterRequest;

/**
 * Business contract for registration and login flows.
 */
public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse authenticate(AuthRequest request);
}
