import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./FilmDetail.css";
import axios from "axios";
import {
  Tag,
  Clock,
  Globe,
  UserCheck,
  PlayCircle,
  Bold,
  Underline,
} from "react-feather";
import VideoPlayer from "../HomePage/VideoPlayer.jsx";
import Header from "../SharePages/Header/Header.jsx";

function FilmDetail() {
  //Film
  const [film, setFilm] = useState({
    filmName: "",
    status: "",
    type: "",
    object: "",
    content: "",
    time: "",
    country: "",
    premiere: "",
    director: "",
    actor: "",
    image: "",
    demo: "",
    idfilm: "",
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleToggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const { idfilm } = useParams();

  useEffect(() => {
    loadFilm();
    document.getElementById("filmDetail").scrollIntoView();
  }, []);

  const loadFilm = async () => {
    const result = await axios.get(`http://localhost:8080/films/${idfilm}`);
    setFilm(result.data);
  };

  //Show Times
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    loadShowtime();
  }, []);

  const loadShowtime = async () => {
    const result = await axios.get(`http://localhost:8080/showtimes/${idfilm}`);
    setShowtimes(result.data);
  };

  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showSelectCinema, setShowSelectCinema] = useState(false);
  const [selectedShowtimeInfo, setSelectedShowtimeInfo] = useState(null);
  const handleShowtimeClick = (index) => {
    if (selectedShowtime === index) {
      setSelectedShowtime(null); // Nếu showtime đã được chọn rồi thì bấm lại sẽ hủy chọn
      setShowSelectCinema(false); // Ẩn "Chọn vé"
      setSelectedShowtimeInfo(null);
    } else {
      setSelectedShowtime(index); // Nếu chưa được chọn thì lưu chỉ số của showtime được chọn
      setShowSelectCinema(true); // Hiển thị "Chọn vé"
      setSelectedShowtimeInfo(showtimes[index]);
    }
  };

  console.log(selectedShowtimeInfo);
  return (
    <div className="filmdetail-container" id="filmDetail">
      <Header />
      <div className="filmdetail-show">
        <img
          src={`.${film.image}`}
          alt="Film Poster"
          className="filmdetail-img"
        />
        <div className="filmdetail-info">
          <div className="filmdetail-name">{film.filmName}</div>
          <div style={{ marginTop: 15 }}>
            <Tag size={30} color="yellow" />
            <span style={{ color: "white", marginLeft: 15, fontSize: 20 }}>
              {film.type}
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <Clock size={30} color="yellow" />
            <span style={{ color: "white", marginLeft: 15, fontSize: 20 }}>
              {film.time}
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <Globe size={30} color="yellow" />
            <span style={{ color: "white", marginLeft: 15, fontSize: 20 }}>
              {film.country}
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <UserCheck size={30} color="yellow" />
            <span style={{ color: "white", marginLeft: 15, fontSize: 20 }}>
              {film.object}
            </span>
          </div>
          <div
            style={{
              marginTop: 15,
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            MÔ TẢ
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 20 }}>
            Đạo diễn: {film.director}
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 20 }}>
            Diễn viên: {film.actor}
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 20 }}>
            Khởi chiếu: {film.premiere}
          </div>
          <div
            style={{
              marginTop: 15,
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            NỘI DUNG PHIM
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 15 }}>
            {film.content}
          </div>
          <div
            style={{ marginTop: 15, cursor: "pointer" }}
            onClick={() => handleToggleVideo()}
          >
            <PlayCircle size={40} color="yellow" />
            <span
              style={{
                color: "white",
                marginLeft: 15,
                fontSize: 20,
                textDecoration: "Underline",
              }}
            >
              Xem Trailer
            </span>
            {isVideoOpen && (
              <VideoPlayer url={film.demo} onClose={handleToggleVideo} />
            )}
          </div>
        </div>
      </div>

      <div className="showtimes">
        <div className="showtimes-text">LỊCH CHIẾU</div>
        <div className="showtimes-detail">
          {showtimes.map((showtime, index) => (
            <div
              key={index}
              className={`showtime-item ${
                selectedShowtime === index ? "selected" : ""
              }`}
              onClick={() => handleShowtimeClick(index)}
            >
              <p>{showtime.date_show}</p>
              <p>{showtime.day_show}</p>
              <p>{showtime.time_show}</p>
            </div>
          ))}
        </div>
      </div>

      {showSelectCinema && <p>Chọn vé</p>}
    </div>
  );
}

export default FilmDetail;
