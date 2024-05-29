package com.ie303project.fullstackbackend.service;

import com.ie303project.fullstackbackend.model.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingEmail(EmailRequest emailRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailRequest.getEmail());
            message.setSubject("Xác nhận đặt vé thành công");
            message.setText("Cảm ơn bạn đã đặt vé! Tên ghế của bạn là: " + emailRequest.getSeatName() + "\n\n" + emailRequest.getMessage());
            message.setFrom("your-email@gmail.com");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();  // In lỗi ra console
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
