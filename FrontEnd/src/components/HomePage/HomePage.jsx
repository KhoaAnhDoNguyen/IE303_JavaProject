import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './HomePage.css'
import Header from '../SharePages/Header/Header.jsx';

function HomePage() {

  return (
    <div className='homepage-container'>
      <Header />
      <div className='homepage-main'>
        <div className='movie-showing'>
            <div className='ms-text'>PHIM ĐANG CHIẾU</div>
            <div className='ms-film'>
                <div className='ms-film-detail'>
                    <img src=".\src\assets\quy-thuat.png" alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>QUỶ THUẬT</div>
                </div>

                <div className='ms-film-detail'>
                    <img src=".\src\assets\quy-thuat.png" alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>QUỶ THUẬT</div>
                </div>

                <div className='ms-film-detail'>
                    <img src=".\src\assets\quy-thuat.png" alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>QUỶ THUẬT</div>
                </div>

                <div className='ms-film-detail'>
                    <img src=".\src\assets\quy-thuat.png" alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>QUỶ THUẬT</div>
                </div>
            </div>
        </div>
    
      </div>
    </div>
  )
}

export default HomePage
