import { useState, useEffect, useRef, useContext } from "react";
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
import UserContext from "../User/UserContext.jsx";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FilmDetail() {
  //User
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userInfo = user && user.length > 0 ? user[0] : null;
  //console.log(userInfo.name)

  const cinemaRef = useRef(null);
  const ticketRef = useRef(null);
  const seatRef = useRef(null);
  const bookingRef = useRef(null);
  const filmRef = useRef(null);

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
    window.scrollTo(0, 0);
    loadFilm();
    //document.getElementById("filmDetail").scrollIntoView(); 
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
      setShowSelectTicket(false);
      setShowSelectSeat(false);
      setSelectedCinema(null);
      setSelectedCinemaInfo(null);
      setSelectedTicket(null);
      setSelectedTicketInfo(null);
    } else {
      setSelectedShowtime(index); // Nếu chưa được chọn thì lưu chỉ số của showtime được chọn
      setShowSelectCinema(true); // Hiển thị "Chọn vé"
      setSelectedShowtimeInfo(showtimes[index]);
      // Scroll to cinema section
      setTimeout(() => {
        if (cinemaRef.current) {
          cinemaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  };

  //Cinema
  const [selectedPosition, setSelectedPosition] = useState("Hồ Chí Minh");
  const [listCinemas, setListCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedCinemaInfo, setSelectedCinemaInfo] = useState(null);
  const [showSelectTicket, setShowSelectTicket] = useState(false);

  const handleCinemaChoose = (index) => {
    if (selectedCinema === index) {
      setSelectedCinema(null);
      setSelectedCinemaInfo(null);
      setShowSelectTicket(false);
      setShowSelectSeat(false);
      setSelectedTicket(null);
      setSelectedTicketInfo(null);
      setSelectedSeat(null); // Bỏ chọn ghế nếu đã được chọn trước đó
      setShowBooking(false);
    }
    else {
      setSelectedCinema(index);
      setSelectedCinemaInfo(listCinemas[index]);
      setShowSelectTicket(true);
      loadTickets(listCinemas[index].id_cinema);
      loadSeats(listCinemas[index].id_cinema, listCinemas[index].room);
      setSelectedTicket(null);
      setSelectedTicketInfo(null);
      setSelectedSeat(null);
      setShowSelectSeat(false);
      setShowBooking(false);
      setTimeout(() => {
        if (ticketRef.current) {
          ticketRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

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
    setShowSelectTicket(false);
    setSelectedCinema(null);
    setShowSelectSeat(false);
    setSelectedTicket(null);
  };
  
  useEffect(() => {
    fetchCinemaByLocation(selectedPosition);
  }, []);
  
  //Ticket
  const [listTickets, setListTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketInfo, setSelectedTicketInfo] = useState(null);
  const [showSelectSeat, setShowSelectSeat] = useState(false);

  const loadTickets = async (id_cinema) => {
    const result = await axios.get(`http://localhost:8080/tickets/${id_cinema}`);
    setListTickets(result.data);
  };

  const handleTicketChoose = (index) => {
    if (selectedTicket === index) {
      setSelectedTicket(null);
      setSelectedTicketInfo(null);
      setShowSelectSeat(false);
      setShowBooking(false);
      setSelectedSeat(null); // Bỏ chọn ghế nếu đã được chọn trước đó
    }
    else {
      setSelectedTicket(index);
      setSelectedTicketInfo(listTickets[index]);
      setShowSelectSeat(true);
      setSelectedSeat(null);
      setShowBooking(false);
      setTimeout(() => {
        if (seatRef.current) {
          seatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  //Seat
  const [listSeats, setListSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [boughtSeat, setBoughtSeat] = useState([])
  const boughtSeatList = boughtSeat.map(seat => seat.seat);

  const loadSeats = async (id_cinema, room) => {
    const result = await axios.get(`http://localhost:8080/seats/${id_cinema}/${room}`);
    setListSeats(result.data);
  };

  const loadBoughtSeats = async (idFilm, idShowtime, idCinema, idSeat) => {
    try {
      const result = await axios.get(`http://localhost:8080/bookings/${idFilm}/${idShowtime}/${idCinema}/${idSeat}`);
      setBoughtSeat(prev => [...prev, ...result.data]); // Append the results to the current state
    } catch (error) {
      console.error('Error loading bought seats:', error);
    }
  };
  

  useEffect(() => {
    if (selectedShowtimeInfo !== null && selectedCinemaInfo !== null && listSeats.length > 0) {
      const seatIds = listSeats.map(seat => seat.id_seat);
      seatIds.forEach(idSeat => {
        loadBoughtSeats(idfilm, selectedShowtimeInfo.id_showtime, selectedCinemaInfo.id_cinema, idSeat);
      });
    }
  }, [selectedShowtimeInfo, selectedCinemaInfo, listSeats]);
  

  const getAlphabetChar = index => {
    return String.fromCharCode(65 + index); // Chữ cái A có mã Unicode là 65
  };
  
  const handleSeatClick = (seatLabel) => {
    if (boughtSeatList.includes(seatLabel)) {
      alert("Ghế đã có người đặt vui lòng chọn ghế khác");
      setShowBooking(false);
    } else if (selectedSeat === seatLabel) {
      setSelectedSeat(null); // Bỏ chọn ghế nếu đã được chọn trước đó
      setShowBooking(false);
    } else {
      setSelectedSeat(seatLabel); // Chọn ghế nếu chưa được chọn
      setShowBooking(true);
      setTimeLeft(300);
      setTimeout(() => {
        if (bookingRef.current) {
          bookingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  };

  //Booking
  const [showBooking, setShowBooking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
  if (showBooking) {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setSelectedSeat(null); // Hủy ghế đang chọn khi hết thời gian
          setShowBooking(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }
}, [showBooking]);

  const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setSelectedShowtime(null);
    setShowSelectCinema(false);
    setSelectedCinema(null);
    setShowSelectTicket(false);
    setSelectedTicket(null);
    setShowSelectSeat(false);
    setShowBooking(false);
    window.scrollTo(0, 0);
    };

  const handleBookingConfirmation = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt vé!");
      navigate(`/login`)
    }
    else{
      const bookingData = {
        id : userInfo.id,

        idFilm : film.idfilm,
        idShowtime :  selectedShowtimeInfo.id_showtime,
        idCinema : selectedCinemaInfo.id_cinema,

        idTicket : selectedTicketInfo.id_ticket,
        idSeat : listSeats[0].id_seat,

        filmName: film.filmName,
        name_cinema: selectedCinemaInfo.name_cinema,
        address: selectedCinemaInfo.address,
        room: selectedCinemaInfo.room,
        time_show: selectedShowtimeInfo.time_show,
        day_show: selectedShowtimeInfo.day_show,
        date_show: selectedShowtimeInfo.date_show,
        year_show: selectedShowtimeInfo.year_show,
        type_ticket: selectedTicketInfo.type_ticket,
        name_ticket : selectedTicketInfo.name_ticket,
        seat: selectedSeat,
        price: selectedTicketInfo.price
      };
      console.log(bookingData)
      try {
        const response = await axios.post('http://localhost:8080/booking', bookingData);
        setOpen(true);
        /*setTimeout(() => {
          if (filmRef.current) {
            filmRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);*/
      } catch (error) {
        console.error('Error confirming booking:', error);
        // Xử lý lỗi khi đặt vé thất bại, ví dụ: hiển thị thông báo lỗi
      }

    }
  }


  return (
    <div className="filmdetail-container" id="filmDetail">
      <Header />
      <div className="filmdetail-show" ref={filmRef}>
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
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            MÔ TẢ
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 16 }}>
            Đạo diễn: {film.director}
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 16 }}>
            Diễn viên: {film.actor}
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 16 }}>
            Khởi chiếu: {film.premiere}
          </div>
          <div
            style={{
              marginTop: 15,
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            NỘI DUNG PHIM
          </div>
          <div style={{ marginTop: 7, color: "white", fontSize: 16 }}>
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
        {showtimes.length > 0 ? (
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
        ) :  (
          <div className="no-showtime">Phim hiện chưa có lịch chiếu</div>
        )}
      </div>

      {showSelectCinema && 
        <div className="cinema-container" ref={cinemaRef}>
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
                    <div className="cinema-room">Room: {cinema.room}</div>
                    </div>
              ))) : (
                  <div className="no-cinemas">Phim hiện chưa có tại rạp này</div>
                )}
          </div>
        </div>
      }

      {showSelectTicket && 
          <div className="ticket-container" ref={ticketRef}>
              <div className="ticket-text-hp">CHỌN LOẠI VÉ</div>
              <div className="ticket-list">
                {( listTickets.map((ticket, index) => (
                    <div key={index} className={"ticket-detail" + (selectedTicket === index ? " selected" : "")} onClick={() => handleTicketChoose(index)}> 
                        <div className="name-ticket">{ticket.name_ticket}</div>
                        <div className="type-ticket">{ticket.type_ticket}</div>
                        <div className="price-ticket">{ticket.price.toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                )))}
              </div>
          </div>
      }

      {
        showSelectSeat &&
        <div className="seat-container" ref={seatRef}>
          <div class="screen">
              <div className="screen-text">MÀN CHIẾU</div>
              <div className="line"></div>
          </div>


          <div className="seat-plan">
          {listSeats.map(seat => (
              <div key={seat.id_seat}>
              {[...Array(seat.num_row)].map((_, rowIndex) => (
                  <div key={rowIndex} className={`seat-row row-${rowIndex}`}>
                  <div className="row-label">{getAlphabetChar(rowIndex)}</div>
                  {[...Array(seat.num_col)].map((_, colIndex) => {
                  const seatLabel = `${getAlphabetChar(rowIndex)}${colIndex + 1}`;
                  const isBoughtSeat = boughtSeatList.includes(seatLabel);
                  const isSelected = selectedSeat === seatLabel;
          return (
            <div
              key={colIndex}
              className={`seat ${isSelected ? 'selected' : ''} ${isBoughtSeat ? 'bought' : ''}`}
              onClick={() => handleSeatClick(seatLabel)}
            >
              {seatLabel} {/* Hiển thị ghế */}
            </div>
          );
                    })}
              </div>
              ))}
            </div>
            ))}
        </div>
        </div>
      }

{showBooking && selectedCinemaInfo!=null && selectedTicketInfo!=null &&
  <div className="booking-container" ref={bookingRef}>
    <div className="booking-part">
      <div className="booking-payment">
        <div className="booking-filmname">{film.filmName}</div>
        <div className="booking-time">
          THỜI GIAN GIỮ VÉ: 
          <span className="countdown-timer">{formatTime(timeLeft)}</span>
        </div>
        <div className="booking-cinema">
          <div className="booking-cinema-title">Thông tin rạp</div>
          <div className="booking-cinema-name">{selectedCinemaInfo.name_cinema}</div>
          <div className="booking-cinema-address">{selectedCinemaInfo.address}</div>
        </div>
        <div className="booking-time-title">Thời gian</div>
        <div className="booking-time-detail">
          <div className="booking-time-hour">{selectedShowtimeInfo.time_show}</div>
          <div className="booking-time-day">{selectedShowtimeInfo.day_show}</div>
          <div className="booking-time-date">{selectedShowtimeInfo.date_show}/{selectedShowtimeInfo.year_show}</div>
        </div>
        <div className="booking-ticket">
          <div className="booking-room">
            <div className="booking-room-title">Phòng chiếu</div>
            <div className="booking-room-num">{selectedCinemaInfo.room}</div>
          </div>
          <div className="booking-number">
            <div className="booking-number-title">Số vé</div>
            <div className="booking-number-num">1</div>
          </div>
          <div className="booking-ticket-type">
            <div className="booking-ticket-type-title">Loại vé</div>
            <div className="booking-ticket-type-seat">{selectedTicketInfo.name_ticket}</div>
          </div>
        </div>
        <div className="booking-seat">
          <div className="booking-seat-type">
            <div className="booking-seat-type-title">Loại ghế</div>
            <div className="booking-seat-type-num">{selectedTicketInfo.type_ticket}</div>
          </div>
          <div className="booking-seat-num">
            <div className="booking-seat-num-title">Số ghế</div>
            <div className="booking-seat-num-number">{selectedSeat}</div>
          </div>
        </div>
        <div class="dashed-line-horizontal"></div>
        <div className="booking-payement">
          <div className="booking-payment-title">SỐ TIỀN CẦN THANH TOÁN</div>
          <div className="booking-payment-price">{selectedTicketInfo.price.toLocaleString('vi-VN')} VNĐ</div>
        </div>
      </div>
      <div className="booking-check">
      <div className="booking-warning">Vui lòng kiểm tra thông tin trước khi đặt vé</div>
      <div className="booking-ticket-booking" onClick={handleBookingConfirmation}>
            <img
              src="/src/assets/ticket.png"
              alt="Logo"
              className="booking-ticket-icon"
            />
            <span style={{ cursor: "pointer" }}>XÁC NHẬN ĐẶT VÉ</span>
      </div>
        {/* Dialog thông báo mua vé thành công */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Mua vé thành công!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Chúc mừng! Bạn đã mua vé thành công.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

      </div>
    </div>
  </div>
}

    </div>
  );
}

export default FilmDetail;
