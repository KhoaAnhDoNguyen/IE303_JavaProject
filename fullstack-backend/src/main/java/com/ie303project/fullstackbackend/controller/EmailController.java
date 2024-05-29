package com.ie303project.fullstackbackend.controller;

import com.ie303project.fullstackbackend.model.EmailRequest;
import com.ie303project.fullstackbackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin("http://localhost:5173")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendBookingEmail(emailRequest);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();  // In lỗi ra console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email: " + e.getMessage());
        }
    }
}
