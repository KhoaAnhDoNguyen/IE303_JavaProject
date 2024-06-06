import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./HomePage.css";
import Header from "../SharePages/Header/Header.jsx";
import Footer from "../SharePages/Footer/Footer.jsx";
import { ChevronLeft, ChevronRight, Youtube } from "react-feather";
import axios from "axios";
import VideoPlayer from "./VideoPlayer.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContext from "../User/UserContext.jsx";
import { confirmAlert } from 'react-confirm-alert';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function HomePage() {
    // User
    const { user } = useContext(UserContext);
    const userInfo = user && user.length > 0 ? user[0] : null;
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [userInfo]);
    console.log(isAdmin);

    // Animation for Poster
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    // Movie showing
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showVideo, setShowVideo] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get("http://localhost:8080/films/status/1");
            setMovies(response.data);
            setShowVideo(new Array(response.data.length).fill(false));
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const prevMovie = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const nextMovie = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < movies.length - 4 ? prevIndex + 1 : prevIndex
        );
    };

    const handleToggleVideo = (index) => {
        const updatedShowVideo = [...showVideo];
        updatedShowVideo[index] = !updatedShowVideo[index];
        setShowVideo(updatedShowVideo);
    };

    // Movie coming soon
    const [movies_cs, setMovies_cs] = useState([]);
    const [currentIndex_cs, setCurrentIndex_cs] = useState(0);
    const [showVideo_cs, setShowVideo_cs] = useState([]);

    useEffect(() => {
        fetchMovies_cs();
    }, []);

    const fetchMovies_cs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/films/status/0");
            setMovies_cs(response.data);
            setShowVideo_cs(new Array(response.data.length).fill(false));
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const prevMovie_cs = () => {
        setCurrentIndex_cs((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const nextMovie_cs = () => {
        setCurrentIndex_cs((prevIndex) =>
            prevIndex < movies_cs.length - 4 ? prevIndex + 1 : prevIndex
        );
    };

    const handleToggleVideo_cs = (index_cs) => {
        const updatedShowVideo_cs = [...showVideo_cs];
        updatedShowVideo_cs[index_cs] = !updatedShowVideo_cs[index_cs];
        setShowVideo_cs(updatedShowVideo_cs);
    };


    //Admin Function
    const handleDelete = (idfilm) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa phim này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: async () => {
                        try {
                            await axios.delete(`http://localhost:8080/film/${idfilm}`);
                            fetchMovies(); // Gọi lại hàm fetchMovies để cập nhật danh sách phim
                            fetchMovies_cs();
                            toast.success("Xóa phim thành công!", {
                                autoClose: 1000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } catch (error) {
                            console.error("Error deleting movie:", error);
                        }
                    }
                },
                {
                    label: 'Không',
                    onClick: () => {}
                }
            ]
        });
    };
    
    
    return (
        <div className="homepage-container">
            <Header />
            <div className="homepage-main">
                <div className="homepage-body">
                <ToastContainer />
                    <div className="poster">
                        <Slider {...settings}>
                            <div className="text-center d-flex justify-content-center align-items-center">
                                <img
                                    src="/src/assets/Poster/lat-mat-7.webp"
                                    alt="image1"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="text-center d-flex justify-content-center align-items-center">
                                <img
                                    src="/src/assets/Poster/vay-ham.webp"
                                    alt="image2"
                                    className="img-fluid"
                                />
                            </div>
                        </Slider>
                    </div>

                    <div id="movie-showing" className="movie-showing">
                        <div className="ms-text">PHIM ĐANG CHIẾU</div>
                        <div className="ms-film">
                            <ChevronLeft
                                className="chevron-button"
                                style={{ marginLeft: 50 }}
                                size={80}
                                onClick={prevMovie}
                                disabled={currentIndex === 0}
                            />
                            {movies
                                .slice(currentIndex, currentIndex + 4)
                                .map((movie, index) => (
                                    <div className="ms-film-detail" key={movie.idfilm}>
                                        <Link to={`/filmdetail/${movie.idfilm}`} className="Link">
                                            <img
                                                src={movie.image}
                                                alt="FilmLogo"
                                                className="ms-film-img"
                                            />
                                            <div className="ms-film-title">{movie.filmName}</div>
                                        </Link>
                                        <div className="trailer-ticket">
                                            <div
                                                className="trailer"
                                                onClick={() => handleToggleVideo(currentIndex + index)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Youtube /> Xem Trailer
                                            </div>
                                            {showVideo[currentIndex + index] && (
                                                <VideoPlayer
                                                    url={movie.demo}
                                                    onClose={() => handleToggleVideo(currentIndex + index)}
                                                />
                                            )}
                                            <Link to={`/filmdetail/${movie.idfilm}`} className="Link">
                                                <div className="ticket-text">ĐẶT VÉ</div>
                                            </Link>
                                        </div>
                                      {isAdmin && (
                                            <div className="admin-function">
                                                    <button className="delete-button" onClick={() => handleDelete(movie.idfilm)}>Xóa</button>
                                                    <Link to={`/filmedit/${movie.idfilm}`} className="edit-button">Sửa</Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            <ChevronRight
                                className="chevron-button"
                                style={{ marginRight: 70 }}
                                size={80}
                                onClick={nextMovie}
                                disabled={currentIndex > movies.length - 4}
                            />
                        </div>
                    </div>

                    <div id="movie-coming-soon" className="movie-coming-soon">
                        <div className="mcs-text">PHIM SẮP CHIẾU</div>
                        <div className="mcs-film">
                            <ChevronLeft
                                className="chevron-button-cs"
                                style={{ marginLeft: 50 }}
                                size={80}
                                onClick={prevMovie_cs}
                                disabled={currentIndex_cs === 0}
                            />
                            {movies_cs
                                .slice(currentIndex_cs, currentIndex_cs + 4)
                                .map((movie_cs, index_cs) => (
                                    <div className="mcs-film-detail" key={movie_cs.idfilm}>
                                        <Link to={`/filmdetail/${movie_cs.idfilm}`} className="Link">
                                            <img
                                                src={movie_cs.image}
                                                alt="FilmLogo"
                                                className="mcs-film-img"
                                            />
                                            <div className="mcs-film-title">{movie_cs.filmName}</div>
                                        </Link>
                                        <div className="trailer-ticket-cs">
                                            <div
                                                className="trailer-cs"
                                                onClick={() =>
                                                    handleToggleVideo_cs(currentIndex_cs + index_cs)
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Youtube /> Xem Trailer
                                            </div>
                                            {showVideo_cs[currentIndex_cs + index_cs] && (
                                                <VideoPlayer
                                                    url={movie_cs.demo}
                                                    onClose={() =>
                                                        handleToggleVideo_cs(currentIndex_cs + index_cs)
                                                    }
                                                />
                                            )}
                                            <div className="ticket-text-cs">ĐẶT VÉ</div>
                                        </div>
                                        {isAdmin && (
                                            <div className="admin-function-cs">
                                                    <button className="delete-button-cs" onClick={() => handleDelete(movie_cs.idfilm)}>Xóa</button>
                                                    <Link to={`/filmedit/${movie_cs.idfilm}`} className="edit-button-cs">Sửa</Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            <ChevronRight
                                className="chevron-button-cs"
                                style={{ marginRight: 70 }}
                                size={80}
                                onClick={nextMovie_cs}
                                disabled={currentIndex_cs > movies_cs.length - 4}
                            />
                        </div>
                    </div>
                </div>
                <div className="membership">
                    <img
                        src="/src/assets/Membership/member-bg.webp"
                        alt="image1"
                        className="m-large"
                    />
                    <div className="membership-container">
                        <div className="membership-text">CHƯƠNG TRÌNH THÀNH VIÊN</div>
                        <div className="membership-small-pic">
                            <img
                                src="/src/assets/Membership/c-vip.jpg"
                                alt="image1"
                                className="m-small-1"
                            />
                            <img
                                src="/src/assets/Membership/cfriend.jpg"
                                alt="image1"
                                className="m-small-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
