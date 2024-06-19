import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useParams, useLocation  } from "react-router-dom";
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
  MapPin,
  User,
  Star
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
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Rating, SpeedDialAction, TextField} from '@mui/material';

function FilmDetail() {
  //User
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userInfo = user && user.length > 0 ? user[0] : null;
  const location = useLocation();

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
  const [openSeatDialog, setOpenSeatDialog] = useState(false);

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
      setOpenSeatDialog(true);
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
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenComment(false);
    setSelectedShowtime(null);
    setShowSelectCinema(false);
    setSelectedCinema(null);
    setShowSelectTicket(false);
    setSelectedTicket(null);
    setShowSelectSeat(false);
    setShowBooking(false);
    window.scrollTo(0, 0);
    };

    const handleCmtClose = () => {
      setOpenComment(false);
    }

    const handleLoginDialogClose = () => {
      setOpenLoginDialog(false);
      navigate('/login', { state: { from: location } });
        };

  const handleBookingConfirmation = async () => {
    if (!user) {
      setOpenLoginDialog(true);
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
      //console.log(bookingData)
      try {
        const bookingResponse = await axios.post('http://localhost:8080/booking', bookingData);
        setOpen(true);
        // Reset rating and comment
        setRating(0);
        setComment("");
        console.log(bookingResponse.status)
        if (bookingResponse.status === 200) {
          const emailData = {
            email: userInfo.email,  // Giả sử email người dùng có sẵn trong userInfo
            seatName: selectedSeat,  // Giả sử selectedSeat là tên ghế
            
            filmName: film.filmName,
            namecinema: selectedCinemaInfo.name_cinema,
            address: selectedCinemaInfo.address,
            room: selectedCinemaInfo.room,
            timeshow: selectedShowtimeInfo.time_show,
            dayshow: selectedShowtimeInfo.day_show,
            dateshow: selectedShowtimeInfo.date_show,
            yearshow: selectedShowtimeInfo.year_show,
            typeticket: selectedTicketInfo.type_ticket,
            nameticket : selectedTicketInfo.name_ticket,
            price: selectedTicketInfo.price,

            message: "Thay mặt công ty TNHH MECINE. Cảm ơn bạn đã đặt vé!"  // Thông điệp tùy chỉnh
          };
  
          await axios.post('http://localhost:8080/send-email', emailData);
        }
      }
      catch (error) {
        console.error('Error confirming booking:', error);
        // Xử lý lỗi khi đặt vé thất bại, ví dụ: hiển thị thông báo lỗi
      }

    }
  }

  //Rating
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openLoginDialogComment, setOpenLoginDialogComment] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [listComment, setListComment] = useState([])
  const [currentCmtIndex, setCurrentCmtIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const loadCommets = async (idfilm) => {
    const result = await axios.get(`http://localhost:8080/userfilm/${idfilm}`);
    const comments = result.data;
    setListComment(result.data.reverse());
    if (comments.length > 0) {
      const totalStars = comments.reduce((sum, comment) => sum + comment.star, 0);
      const avgRating = (totalStars / comments.length).toFixed(1); // Làm tròn đến 1 chữ số
      setAverageRating(parseFloat(avgRating)); // Chuyển đổi thành số để loại bỏ số 0 không cần thiết
    }
  };
  console.log(averageRating);

  useEffect(() => {
    loadCommets(idfilm);
  }, []);

  const handleNext = () => {
    if (currentCmtIndex + 3 < listComment.length) {
      setCurrentCmtIndex(currentCmtIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentCmtIndex - 3 >= 0) {
      setCurrentCmtIndex(currentCmtIndex - 3);
    }
  };

  const displayedComments = listComment.slice(currentCmtIndex, currentCmtIndex + 3);

  const handleLoginDialogCommentClose = () => {
    setOpenLoginDialogComment(false);
    navigate('/login', { state: { from: location } });
    };
  
  const handleRatingChange = (event, newValue) => {
    if (newValue === null)
      setRating(0);
    else
      setRating(newValue);
  };
  
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleSubmitComment = async () => {
    if (!user) { // Check if the user is not logged in
      setOpenLoginDialogComment(true); // Show the login dialog
      return; // Exit the function if the user is not logged in
    }
    else {
    const commentData = {
      idUser : userInfo.id,
      idFilm : idfilm,
      name : userInfo.name,
      star : rating,
      comments : comment
    }
    console.log(commentData)
    try {
      const response = await axios.post('http://localhost:8080/userfilm', commentData);
      setOpenComment(true);
      loadCommets(idfilm);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  }};
  

  return (
    <div className="filmdetail-container" id="filmDetail">
      <Header />
      <div className="filmdetail-st" ref={filmRef}>
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
            <span className="rating-ave">{averageRating} <Star style={{ color: 'yellow', fill: 'yellow', marginBottom:'9px' }}/></span>
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
          <div style={{ marginTop: 7, color: "white", fontSize: 16, marginRight:150 }}>
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
          <div style={{ marginTop: 7, color: "white", fontSize: 16, marginRight:150 }}>
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
         <Dialog
      open={openSeatDialog}
      onClose={() => setOpenSeatDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ghế đã có người đặt vui lòng chọn ghế khác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSeatDialog(false)} color="primary">
          Đóng
        </Button>
      </DialogActions>
        </Dialog>
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
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: { 
                        padding: '20px', 
                        textAlign: 'center', 
                        borderRadius: '10px' 
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <CheckCircleOutlineIcon style={{ fontSize: '3rem', color: 'green' }} />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h5" gutterBottom>
                        Mua vé thành công!
                    </Typography>
                    <DialogContentText id="alert-dialog-description">
                        Chúc mừng! Bạn đã mua vé thành công.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        style={{ 
                            backgroundColor: 'red', 
                            color: 'white',
                            padding: '10px 20px'
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
        open={openLoginDialog}
        onClose={handleLoginDialogClose}
      >
        <DialogTitle>{"Yêu cầu đăng nhập"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng đăng nhập để tiếp tục đặt vé.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose} color="primary" autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  </div>
}
  
<div className="rating-container">
    <div className="rating-title">ĐÁNH GIÁ</div>
    {/* Giao diện đánh giá sao */}
    <div className="rating-section">
      <Rating
        name="film-rating"
        value={rating}
        onChange={handleRatingChange}
        max={5}
      />
    </div>

    {/* Ô để nhập đánh giá */}
    <div className="comment-section">
      <TextField
        id="comment"
        label="Nhập đánh giá của bạn"
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        variant="outlined"
      />
    </div>

    {/* Nút gửi đánh giá */}
    <div className="submit-button-cmt">
      <Button variant="contained" color="primary" onClick={handleSubmitComment}>
        Gửi đánh giá
      </Button>
    </div>

    <Dialog
      open={openLoginDialogComment}
      onClose={handleLoginDialogCommentClose}
    >
      <DialogTitle>{"Yêu cầu đăng nhập"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng đăng nhập để gửi đánh giá phim!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginDialogCommentClose} color="primary" autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>


    <Dialog
                open={openComment}
                onClose={handleCmtClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: { 
                        padding: '20px', 
                        textAlign: 'center', 
                        borderRadius: '10px' 
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <CheckCircleOutlineIcon style={{ fontSize: '3rem', color: 'green' }} />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h5" gutterBottom>
                        Gửi phản hồi thành công!
                    </Typography>
                    <DialogContentText id="alert-dialog-description">
                        Cảm ơn bạn đã đánh giá phim. Chúc bạn xem phim vui vẻ!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCmtClose} 
                        style={{ 
                            backgroundColor: 'red', 
                            color: 'white',
                            padding: '10px 20px'
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
          <div className="cmt-title">Đánh giá của người xem</div>
      {displayedComments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <User size={25} color="white" />
            <div className="comment-name">{comment.name}</div>
            <div className="comment-stars">
              {[...Array(comment.star)].map((_, i) => (
                <Star key={i} size={20} style={{ color: 'yellow', fill:'yellow' }} />
              ))}
            </div>
          </div>
          <div className="comment-text">{comment.comments}</div>
        </div>
      ))}
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentCmtIndex === 0} className="prev-button">Trước đó</button>
        <button onClick={handleNext} disabled={currentCmtIndex + 3 >= listComment.length} className="next-button">Tiếp theo</button>
      </div>
    </div>
  </div>

    </div>
  );
}

export default FilmDetail;
