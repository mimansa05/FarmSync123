package org.infyntrek.farmsync.controller;

import jakarta.validation.Valid;
import org.infyntrek.farmsync.dto.AuthRequest;
import org.infyntrek.farmsync.dto.AuthResponse;
import org.infyntrek.farmsync.dto.OtpRequest;
import org.infyntrek.farmsync.dto.RegisterRequest;
import org.infyntrek.farmsync.dto.VerifyOtpRequest;
import org.infyntrek.farmsync.service.AuthService;
import org.infyntrek.farmsync.service.impl.EmailService;
import org.infyntrek.farmsync.service.impl.OtpService;
import org.infyntrek.farmsync.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Handles authentication (signup/login) and email-based OTP verification.
 *
 * OTP flow:
 * 1. Client requests OTP → /send-otp
 * 2. OTP is generated, cached (5 min TTL), and emailed
 * 3. Client submits OTP → /verify-otp
 * 4. On success, OTP is invalidated
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final EmailService emailService;

    public AuthController(AuthService authService,
                          OtpService otpService,
                          @Autowired(required = false) EmailService emailService) {
        this.authService = authService;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    /**
     * Registers a new user and returns JWT.
     * NOTE: Currently does NOT enforce OTP verification.
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    /**
     * Authenticates user credentials and returns JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    /**
     * Generates a 6-digit OTP, stores it in memory with 5-minute expiry,
     * and sends it to the provided email.
     *
     * Behavior:
     * - If OTP already exists for email → overwritten
     * - No rate limiting applied (add later if needed)
     */
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@Valid @RequestBody OtpRequest request) {
        String email = request.getEmail();

        String otp = OtpUtil.generateOtp();

        // Save OTP with expiry in cache
        otpService.saveOtp(email, otp);

        // Send OTP via email if service is available
        if (emailService != null) {
            emailService.sendOtp(email, otp);
        }

        return ResponseEntity.ok("OTP sent");
    }

    /**
     * Resends OTP with 30-second cooldown enforcement.
     */
    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@Valid @RequestBody OtpRequest request) {
        String email = request.getEmail();

        if (!otpService.canResendOtp(email)) {
            long remaining = otpService.getRemainingCooldown(email);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Please wait " + remaining + " seconds before requesting another OTP");
        }

        String otp = OtpUtil.generateOtp();

        // Save OTP with expiry in cache
        otpService.saveOtp(email, otp);

        // Send OTP via email if service is available
        if (emailService != null) {
            emailService.sendOtp(email, otp);
        }

        return ResponseEntity.ok("OTP resent");
    }

    /**
     * Validates the OTP against cached value.
     *
     * Cases:
     * - null → expired or not generated
     * - mismatch → invalid OTP
     * - match → success and OTP is deleted
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        if (otpService.isBlocked(email)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Too many failed attempts. Please request a new OTP.");
        }

        boolean success = otpService.verifyOtp(email, otp);

        if (!success) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        return ResponseEntity.ok("Verified");
    }
}