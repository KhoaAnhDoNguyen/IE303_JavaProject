import { useState, useEffect } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import './HomePage.css'
import Header from '../SharePages/Header/Header.jsx';
import { ChevronLeft, ChevronRight, Youtube } from 'react-feather';
import axios from 'axios';
import VideoPlayer from './VideoPlayer.jsx'; 

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/films/status/1');
      setMovies(response.data);
      // Khởi tạo mảng showVideo với tất cả giá trị false ban đầu
      setShowVideo(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const prevMovie = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const nextMovie = () => {
    setCurrentIndex(prevIndex => prevIndex < movies.length - 4 ? prevIndex + 1 : prevIndex);
  };

  const handleToggleVideo = (index) => {
    // Tạo một bản sao của mảng showVideo
    const updatedShowVideo = [...showVideo];
    // Đảo ngược trạng thái của video tại chỉ số index
    updatedShowVideo[index] = !updatedShowVideo[index];
    // Cập nhật mảng showVideo mới
    setShowVideo(updatedShowVideo);
  };

  return (
    <div className='homepage-container'>
      <Header className="custom-overlay"/>
      <div className='homepage-main'>
        <div className='movie-showing'>
            <div className='ms-text'>PHIM ĐANG CHIẾU</div>
            <div className='ms-film'>

                < ChevronLeft className="chevron-button" style={{marginLeft: 50}} size={80} onClick={prevMovie} disabled={currentIndex === 0} />

                {movies.slice(currentIndex, currentIndex + 4).map((movie, index) => (
                <div className='ms-film-detail' key={movie.id_film}>

                    <img src={movie.image} alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>{movie.filmName}</div>
                    <div className='trailer-ticket'>
                      <div className="trailer" onClick={() => handleToggleVideo(currentIndex + index)}>
                          <Youtube /> Xem Trailer
                      </div>

                      {showVideo[currentIndex + index] && (
                        <VideoPlayer
                          url={movie.demo} 
                          onClose={() => handleToggleVideo(currentIndex + index)}
                        />
                      )}

                      <div className="ticket-text">ĐẶT VÉ</div>
                    </div>

                </div>
                ))}

                <ChevronRight className="chevron-button" style={{marginRight: 70}} size={80} onClick={nextMovie} disabled={currentIndex >= (movies.length - 4)}  />

            </div>
        </div>
    
      </div>
    </div>
  )
}


export default HomePage
