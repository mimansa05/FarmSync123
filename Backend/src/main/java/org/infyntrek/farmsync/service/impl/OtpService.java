package org.infyntrek.farmsync.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    // Stores OTP + expiry
    private final Map<String, OtpData> cache = new ConcurrentHashMap<>();

    // Stores emails that passed OTP verification
    private final Set<String> verifiedEmails = ConcurrentHashMap.newKeySet();

    // Stores last OTP send time for cooldown
    private final Map<String, Long> lastSendTime = new ConcurrentHashMap<>();

    // Stores failed attempt count per email
    private final Map<String, Integer> failedAttempts = new ConcurrentHashMap<>();

    // Constants
    private static final long OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
    private static final long RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
    private static final int MAX_FAILED_ATTEMPTS = 5;

    // Inner class to hold OTP data
    static class OtpData {
        String otp;
        long expiry;
    }

    // Save OTP with 5-minute expiry
    public void saveOtp(String email, String otp) {
        OtpData data = new OtpData();
        data.otp = otp;
        data.expiry = System.currentTimeMillis() + OTP_EXPIRY_MS;

        cache.put(email, data);
        lastSendTime.put(email, System.currentTimeMillis());
        failedAttempts.remove(email); // Reset attempts on new OTP

        logger.info("OTP generated for email: {}", email);
    }

    // Check if resend is allowed (30s cooldown)
    public boolean canResendOtp(String email) {
        Long lastTime = lastSendTime.get(email);
        if (lastTime == null) return true;
        return System.currentTimeMillis() - lastTime >= RESEND_COOLDOWN_MS;
    }

    // Get remaining cooldown time in seconds
    public long getRemainingCooldown(String email) {
        Long lastTime = lastSendTime.get(email);
        if (lastTime == null) return 0;
        long elapsed = System.currentTimeMillis() - lastTime;
        long remaining = RESEND_COOLDOWN_MS - elapsed;
        return Math.max(0, remaining / 1000);
    }

    // Fetch OTP only if valid (non-expired)
    public String getOtp(String email) {
        OtpData data = cache.get(email);

        if (data == null || System.currentTimeMillis() > data.expiry) {
            cache.remove(email);
            return null;
        }

        return data.otp;
    }

    // Verify OTP with attempt limiting
    public boolean verifyOtp(String email, String otp) {
        String storedOtp = getOtp(email);

        if (storedOtp == null) {
            logger.warn("OTP verification failed for {}: OTP expired or not found", email);
            return false;
        }

        if (!storedOtp.equals(otp)) {
            int attempts = failedAttempts.getOrDefault(email, 0) + 1;
            failedAttempts.put(email, Math.min(attempts, MAX_FAILED_ATTEMPTS));

            if (attempts >= MAX_FAILED_ATTEMPTS) {
                cache.remove(email);
                logger.warn("OTP verification blocked for {}: max attempts exceeded", email);
                return false;
            }

            logger.warn("OTP verification failed for {}: invalid OTP (attempt {}/{})", email, attempts, MAX_FAILED_ATTEMPTS);
            return false;
        }

        // Success
        deleteOtp(email);
        failedAttempts.remove(email);
        markVerified(email);
        logger.info("OTP verification successful for email: {}", email);
        return true;
    }

    // Check if email is blocked due to max attempts
    public boolean isBlocked(String email) {
        return failedAttempts.getOrDefault(email, 0) >= MAX_FAILED_ATTEMPTS;
    }

    // Remove OTP manually (after verification)
    public void deleteOtp(String email) {
        cache.remove(email);
    }

    // Mark email as verified after correct OTP
    public void markVerified(String email) {
        verifiedEmails.add(email);
    }

    // Check if email is verified
    public boolean isVerified(String email) {
        return verifiedEmails.contains(email);
    }

    // Remove verified flag after signup (one-time use)
    public void removeVerified(String email) {
        verifiedEmails.remove(email);
    }
}