import React from 'react';
import './Header.css'
import { Search } from 'react-feather';
import { User } from 'react-feather';
import { Link } from 'react-router-dom';
import { MapPin } from 'react-feather';

function Header() {
    return (  
        <div className='header'>
            <div className='first-part'>
                <div className="logo-container">
                    <Link to="/">
                        <img src="/src/assets/logo.png" alt="Logo" className="logo" />
                    </Link>
                </div>

                <div className='ticket-booking'>
                    <img src="/src/assets/ticket.png" alt="Logo" className="ticket-icon" /><span>ĐẶT VÉ NGAY</span>
                </div>

                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder="Tìm phim, rạp, vé, tin tức..."
                        className="search-input"
                    />
                    <div className="search-icon">
                        <Search />
                    </div>
                </div>
                
                <div className='login'>
                    <div className='login-icon'><User color="#FFFF"/></div>
                    <div className='login-text'>
                        <Link to="/login" className="login-link">Đăng nhập </Link> 
                        <div  style={{marginLeft: '7px', marginRight: '7px', color: 'white'}}> / </div> 
                        <Link to="/signup" className="login-link"> Đăng ký</Link>
                    </div>
                </div>

                <div className='flag'>
                    <img src="/src/assets/vnflag.png" alt="Flag" className="flag-icon" />
                    <div className='flag-text'>VN</div>
                </div>
                
            </div>

            <div style={{ backgroundColor: 'white', height: '1px', marginLeft: '200px', marginRight: '200px', marginTop:'20px'  }}>
            </div>

            <div className='second-part'>
                <Link to="/cinema" className="cinema"><MapPin style={{ marginRight: '10px'}}/>Danh sách rạp</Link>
                <div className='more-info'>
                    <Link to="/promotion" className='promotion'>Khuyến mãi</Link>
                    <Link to="/introduce" className='introduce'>Giới thiệu</Link> 
                </div>
                
            </div>
        </div>
    );
}

export default Header
