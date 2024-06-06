import React, { useContext, useState } from 'react';
import "./Footer.css";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function Footer() {
    const handleLogoClick = () => {
        window.scrollTo(0, 0); // Cuộn về đầu trang
      };

    return (  
        <div className='footer'>
        <div className="footer-container">
            <div className="logo-container">
                <Link to="/" onClick={handleLogoClick}>
                    <img src="/src/assets/logo.png" alt="Logo" className="logo-footer" />
                </Link>
                <ScrollLink to="movie-showing" smooth={true} duration={500}>
                    <div className="ticket-booking-footer">
                    <img
                        src="/src/assets/ticket.png"
                        alt="Logo"
                        className="ticket-icon"
                    />
                    <span style={{ cursor: "pointer", marginLeft : "15px" }}>ĐẶT VÉ NGAY</span>
                    </div>
                </ScrollLink>
            </div>

            <div className='account-footer'>
                <div className='account-text-footer'>TÀI KHOẢN</div>
                <Link to="/login" className="login-link-footer">Đăng nhập</Link>
                <Link to="/signup" className="login-link-footer">Đăng ký</Link>
                <div  className='membership-footer'>Membership</div>
            </div>

            <div className='film-footer'>
                <div className='film-text-footer'>XEM PHIM</div>
                <ScrollLink to="movie-showing" smooth={true} duration={500}>
                    <div className="movie-showing-footer">Phim đang chiếu</div>
                </ScrollLink>

                <ScrollLink to="movie-coming-soon" smooth={true} duration={500}>
                    <div className="movie-coming-soon-footer">Phim sắp chiếu</div>
                </ScrollLink>
            </div>

            <div className='cinesta-footer'>
                <div  className='cinesta-text-footer'>MECINE</div>
                <div  className='introduce-footer'>Giới thiệu</div>
                <div  className='contact-footer'>Liên hệ</div>
                <div  className='hiring-footer'>Tuyển dụng</div>
            </div>
            </div>

            <div className='line-footer'></div>

            <div className='second-part-footer'>
                   <div>CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM - RẠP CHIẾU PHIM NGÔI SAO</div>
                   <div>ĐỊA CHỈ: 135 HAI BÀ TRƯNG, PHƯỜNG BẾN NGHẺ, QUẬN 1, TP.HCM</div>
                   <div>GIẤY CNĐKDN SỐ: 0312742744, ĐĂNG KÝ LĂN ĐẦU NGÀY 18/04/2014, ĐĂNG KÝ THAY ĐỐI LẦN THỨ 2 NGÀY 15/09/2014, CẤP BỒI SÔ KH&ĐT TP.HCM</div>
            </div>
            </div>
    );
}

export default Footer;