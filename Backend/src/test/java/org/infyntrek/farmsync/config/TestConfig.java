package org.infyntrek.farmsync.config;

import org.infyntrek.farmsync.service.impl.EmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

/**
 * Test configuration that provides a no-op EmailService for tests.
 */
@Configuration
@Profile("test")
public class TestConfig {

    @Bean
    @Primary
    public EmailService emailService() {
        return new TestEmailService();
    }

    /**
     * Test implementation that doesn't send actual emails.
     */
    public static class TestEmailService extends EmailService {
        @Override
        public void sendOtp(String to, String otp) {
            // No-op for tests - don't actually send emails
            // Log for debugging if needed
        }
    }
}