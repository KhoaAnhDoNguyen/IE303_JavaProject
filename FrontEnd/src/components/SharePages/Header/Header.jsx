import React, { useContext, useState } from 'react';
import "./Header.css";
import { Search } from "react-feather";
import { User } from "react-feather";
import { Link } from "react-router-dom";
import { MapPin } from "react-feather";
import { Link as ScrollLink } from "react-scroll";
import UserContext from "../../User/UserContext.jsx";
import { Button } from 'react-bootstrap';

function Header() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogoClick = () => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  };

  const userInfo = user && user.length > 0 ? user[0] : null;
  console.log(userInfo)
  const [showLogout, setShowLogout] = useState(false);
  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };
  
  const handleLogOut = () => {
    updateUser(null);
  };
  
  
  return (
    <div className="header">
      <div className="first-part">
        <div className="logo-container">
          <Link to="/" onClick={handleLogoClick}>
            <img src="/src/assets/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <ScrollLink to="movie-showing" smooth={true} duration={500}>
          <div className="ticket-booking">
            <img
              src="/src/assets/ticket.png"
              alt="Logo"
              className="ticket-icon"
            />
            <span style={{ cursor: "pointer" }}>ĐẶT VÉ NGAY</span>
          </div>
        </ScrollLink>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm phim, rạp, vé, tin tức..."
            className="search-input"
          />
          <div className="search-icon">
            <Search />
          </div>
        </div>

        <div className="login">
          <div className="login-icon">
            <User color="#FFFF" />
          </div>
          <div className="login-text">
            {userInfo  ? (
              // In các thành phần trong user nếu tồn tại
              <>
              <span className="login-link" onClick={handleUserClick}>Xin chào {userInfo.name} !</span>
              {showLogout && (
                <div className="logout-button-container">
                <Button variant="danger" className="ml-2 mt-n3" onClick={handleLogOut}>
                  Đăng xuất
                </Button>
                </div>
              )}
              </>
            ) : (
              <>
                <Link to="/login" className="login-link">Đăng nhập</Link>
                <div style={{ marginLeft: "7px", marginRight: "7px", color: "white", marginTop: "10px" }}> / </div>
                <Link to="/signup" className="login-link">Đăng ký</Link>
              </>
            )}
          </div>
        </div>

        <div className="flag">
          <img src="/src/assets/vnflag.png" alt="Flag" className="flag-icon" />
          <div className="flag-text">VN</div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          height: "1px",
          marginLeft: "190px",
          marginRight: "190px",
          marginTop: "20px",
        }}
      ></div>

      <div className="second-part">
        <Link to="/cinema" className="cinema">
          <MapPin style={{ marginRight: "10px" }} />
          Danh sách rạp
        </Link>
        <div className="more-info">
          <Link to="/promotion" className="promotion">
            Khuyến mãi
          </Link>
          <Link to="/introduce" className="introduce">
            Giới thiệu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
