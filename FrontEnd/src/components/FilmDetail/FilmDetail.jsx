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
  MapPin
} from "react-feather";
import VideoPlayer from "../HomePage/VideoPlayer.jsx";
import Header from "../SharePages/Header/Header.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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

  //Cinema
  const [selectedPosition, setSelectedPosition] = useState("Hồ Chí Minh");
  const [listCinemas, setListCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedCinemaInfo, setSelectedCinemaInfo] = useState(null);

  const handleCinemaChoose = (index) => {
    if (selectedCinema === index) {
      setSelectedCinema(null);
      setSelectedCinemaInfo(null);
    }
    else {
      setSelectedCinema(index);
      setSelectedCinemaInfo(listCinemas[index]);
    }
  }

  console.log(selectedCinemaInfo);

  useEffect(() => {
    if (selectedShowtime !== null) {
      fetchCinemaByLocation(selectedPosition);
    }
  }, [selectedShowtime]);


  const fetchCinemaByLocation = async (location) => {
    try {
      if (selectedShowtimeInfo) {
        const result = await axios.get(`http://localhost:8080/cinemas/${idfilm}/${selectedShowtimeInfo.id_showtime}/${location}`);
        setListCinemas(result.data);
      }
    } catch (error) {
      console.error('Error fetching cinemas:', error);
    }
  };
  
  const handleCinemaClick = (text) => {
    setSelectedPosition(text);
    fetchCinemaByLocation(text);
  };
  
  useEffect(() => {
    fetchCinemaByLocation(selectedPosition);
  }, []);
  

  
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

      {showSelectCinema && 
        <div className="cinema-container">
          <div className="cinema-title">
                <div className="cinema-text">DANH SÁCH RẠP</div>
          <div className="cinema-location">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <MapPin size={18} color="yellow" style={{ marginTop: "-2px" }} /> <span className="selected-cinema">{selectedPosition}</span>
            </button>
          <ul className="dropdown-menu custom-dropdown" aria-labelledby="dropdownMenuButton">
            <li><p className="dropdown-item my-1 custom-item" href="#" onClick={() => handleCinemaClick('Hồ Chí Minh')}>Hồ Chí Minh</p></li>
            <li><p className="dropdown-item my-1 custom-item" href="#" onClick={() => handleCinemaClick('Bình Dương')}>Bình Dương</p></li>
            <li><p className="dropdown-item my-1 custom-item" href="#" onClick={() => handleCinemaClick('Đà Lạt')}>Đà Lạt</p></li>
          </ul>
          </div>
          </div>
          
          <div className="cinema-list"> 
              {listCinemas.length > 0 ? (
                  listCinemas.map((cinema, index) => (
                    <div key={index} className={"cinema-detail" + (selectedCinema === index ? " selected" : "")} onClick={() => handleCinemaChoose(index)}> 
                    <div className="cinema-name-time"> 
                    <div className="cinema-name">{cinema.name_cinema}</div>
                    <div className="cinema-time">
                        {cinema.time_open}<span style={{ margin: '0 5px' }}>~</span>{cinema.time_close}
                    </div>
                    </div>
                    <div className="cinema-address">{cinema.address}</div>
                    <div className="cinema-room">Room : {cinema.room}</div>
                    </div>
              ))) : (
                  <div className="no-cinemas">Phim hiện chưa có tại rạp này</div>
                )}
          </div>

        </div>
      }
    </div>
  );
}

export default FilmDetail;
