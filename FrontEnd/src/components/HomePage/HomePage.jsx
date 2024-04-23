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

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setMovies(response.data);
      console.log(movies)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const prevMovie = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const nextMovie = () => {
    setCurrentIndex(prevIndex => prevIndex < movies.length - 3 ? prevIndex + 1 : prevIndex);
  };

  const [showVideo, setShowVideo] = useState(false);

  const handleToggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className='homepage-container'>
      <Header className="custom-overlay"/>
      <div className='homepage-main'>
        <div className='movie-showing'>
            <div className='ms-text'>PHIM ĐANG CHIẾU</div>
            <div className='ms-film'>

                <ChevronLeft className="chevron-button" size={50} onClick={prevMovie} disabled={currentIndex === 0} />

                {/* <div className='ms-film-detail'>
                    {movies.slice(currentIndex, currentIndex + 3).map(movie => (
                      <div key={movie.id} >
                          <div className='ms-film-title'>{movie.name}</div>
                      </div>

                    ))} 
                </div> */}

                <div className='ms-film-detail'>
                    <img src=".\src\assets\Films\quy-thuat.png" alt="FilmLogo" className="ms-film-img" />
                    <div className='ms-film-title'>QUỶ THUẬT</div>
                    <div className='trailer-ticket'>
                      <div className="trailer" onClick={handleToggleVideo}>
                          <Youtube /> Xem Trailer
                      </div>
                      {showVideo && (
                        <VideoPlayer
                          url="https://www.youtube.com/watch?v=ZJQOD8ovRQc" // Thay URL_YOUTUBE_VIDEO bằng đường dẫn của video trên YouTube
                          onClose={handleToggleVideo}
                        />
                      )}

                      <div className="ticket-text">ĐẶT VÉ</div>
                    </div>
                </div>


                <ChevronRight className="chevron-button" size={50} onClick={nextMovie} disabled={currentIndex >= movies.length - 3}  />

            </div>
        </div>
    
      </div>
    </div>
  )
}

export default HomePage
