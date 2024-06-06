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
            message.setText("\t\t\t"+"THÔNG TIN CHI TIẾT VÉ!" + "\n\n" +
                    "Tên ghế của bạn là: " + emailRequest.getSeatName() + "\n" +
                    "Loại ghế: " +  emailRequest.getNameticket() + "\n\n" +
                    "\t\t\t\t" + "Thông tin phim" + "\n" +
                    "Tên phim: " + emailRequest.getFilmName() + "\n" +
                    "Ngày công chiếu: " + emailRequest.getDayshow() + ", " + emailRequest.getDateshow() + "/" + emailRequest.getYearshow() + "\n\n" +
                    "\t\t\t\t" + "Thông tin rạp" + "\n" +
                    "Tên rạp: " + emailRequest.getNamecinema() + "\n" +
                    "Số phòng: " + emailRequest.getRoom() + "\n" +
                    "Địa chỉ: " + emailRequest.getAddress() + "\n\n" +
                    "\t\t\t\t" + "Thông tin vé" + "\n" +
                    "Loại vé: " + emailRequest.getTypeticket() + "\n" +
                    "Giá tiền tổng: " + emailRequest.getPrice() + "đ" + " (ĐÃ THANH TOÁN)" +
                     "\n\n" + emailRequest.getMessage() + "\n" +
                    "Người làm đơn:  Admin Khoa"

            );
            message.setFrom("your-email@gmail.com");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();  // In lỗi ra console
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
