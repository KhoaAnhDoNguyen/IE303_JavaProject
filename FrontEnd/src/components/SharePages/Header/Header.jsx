import React from 'react';
import './Header.css'
import { Search } from 'react-feather';

function Header() {
    return (  
        <div className='header'>
            <div className='first-part'>
                <div className="logo-container">
                    <img src=".\src\assets\logo.png" alt="Logo" className="logo" />
                </div>

                <div className='ticket-booking'>
                    <img src=".\src\assets\ticket.png" alt="Logo" className="logo" />
                    <div className="ticket-text">ĐẶT VÉ NGAY</div>
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
                
                <div>Login</div>
                <div>Flag</div>
            </div>
            <div className='second-part'>
                <div>Second Part</div>
            </div>
        </div>
    );
}

export default Header
