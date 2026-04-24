package org.infyntrek.farmsync.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendOtp(String to, String otp) {
        if (mailSender == null) {
            logger.warn("Email sender is not configured; OTP will not be sent to {}", to);
            return;
        }

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("FarmSync Verification");
        msg.setText("Your OTP is: " + otp + " (valid 5 minutes)");
        try {
            mailSender.send(msg);
            logger.info("OTP sent successfully to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send OTP to {}: {}", to, e.getMessage());
            throw e; // Rethrow to be caught by GlobalExceptionHandler
        }
    }
}