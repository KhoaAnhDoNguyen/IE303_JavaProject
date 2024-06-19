import React, { useContext, useState, useEffect } from 'react';
import "./Header.css";
import { Search } from "react-feather";
import { User } from "react-feather";
import { Link, useNavigate  } from "react-router-dom";
import { MapPin } from "react-feather";
import { Link as ScrollLink } from "react-scroll";
import UserContext from "../../User/UserContext.jsx";
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Header() {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const userInfo1 = user && user.length > 0 ? user[0] : null;
  const [isAdmin1, setIsAdmin1] = useState(false);

  useEffect(() => {
      if (userInfo1 && userInfo1.role === "admin") {
          setIsAdmin1(true);
      } else {
          setIsAdmin1(false);
      }
  }, [userInfo1]);
  console.log(isAdmin1);

  const handleLogoClick = () => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  };

  const userInfo = user && user.length > 0 ? user[0] : null;
  //console.log(userInfo)
  const [showLogout, setShowLogout] = useState(false);
  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };
  
  const handleLogOut = () => {
    updateUser(null);
  };
  
   // Tìm kiếm
const [searchQuery, setSearchQuery] = useState("");
const [allFilms, setAllFilms] = useState([]);
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
  const fetchFilms = async () => {
    try {
      const result = await axios.get('http://localhost:8080/films');
      setAllFilms(result.data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };
  fetchFilms();
}, []);

const handleSearchInputChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.length > 0) {
    const filteredFilms = allFilms.filter(film =>
      film.filmName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredFilms);
  } else {
    setSearchResults([]);
  }
};

const handleSearchResultClick = (idfilm) => {
  setSearchQuery(""); // Xóa nội dung tìm kiếm sau khi chọn phim
  setSearchResults([]); // Ẩn kết quả tìm kiếm
  navigate(`/filmdetail/${idfilm}`);
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
              placeholder="Tìm phim bạn yêu thích..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchInputChange}
          />
          <div className="search-icon">
              <Search />
          </div>
            {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((film) => (
                    <div
                      key={film.idfilm}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(film.idfilm)}
                    >
                    <img src={film.image} alt={film.filmName} className="search-result-image" />
                    <span className="search-result-name">{film.filmName}</span>
                    </div>
                    ))}
            </div>
            )}
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
          <MapPin style={{ marginRight: "10px", marginTop:'-10px' }} />
          Danh sách rạp
        </Link>
        {isAdmin1 && (
            <Link to="/filmadd" className="filmadd">Thêm phim</Link>
        )}
        {isAdmin1 && (
            <Link to="/filmrevenue" className="filmrevenue">Doanh thu phim</Link>
        )}
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
