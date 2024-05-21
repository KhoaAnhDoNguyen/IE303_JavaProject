package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_booking")
    private Long id_booking;
    @Column(name = "id")
    private Long id;
    @Column(name = "id_film")
    private Long idFilm;
    @Column(name = "id_showtime")
    private Long idShowtime;
    @Column(name = "id_cinema")
    private Long idCinema;
    @Column(name = "id_ticket")
    private Long idTicket;
    @Column(name = "id_seat")
    private Long idSeat;
    @Column(name = "film_name")
    private String filmName;
    @Column(name = "name_cinema")
    private String name_cinema;
    @Column(name = "address")
    private String address;
    @Column(name = "room")
    private String room;
    @Column(name = "date_show")
    private String date_show;
    @Column(name = "year_show")
    private String year_show;
    @Column(name = "day_show")
    private String day_show;
    @Column(name = "time_show")
    private String time_show;
    @Column(name = "name_ticket")
    private String name_ticket;
    @Column(name = "type_ticket")
    private String type_ticket;
    @Column(name = "seat")
    private String seat;
    @Column(name = "total_price")
    private Long price;

    public Long getId_booking() {
        return id_booking;
    }

    public void setId_booking(Long id_booking) {
        this.id_booking = id_booking;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long ID) {
        id = ID;
    }

    public Long getIdFilm() {
        return idFilm;
    }

    public void setIdFilm(Long IdFilm) {
        idFilm = IdFilm;
    }

    public Long getIdShowtime() {
        return idShowtime;
    }

    public void setIdShowtime(Long IdShowtime) {
        idShowtime = IdShowtime;
    }

    public Long getIdCinema() {
        return idCinema;
    }

    public void setIdCinema(Long IdCinema) {
        idCinema = IdCinema;
    }

    public Long getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(Long IdTicket) {
        idTicket = IdTicket;
    }

    public Long getIdSeat() {
        return idSeat;
    }

    public void setIdSeat(Long IdSeat) {
        idSeat = IdSeat;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String FilmName) {
        filmName = FilmName;
    }

    public String getName_cinema() {
        return name_cinema;
    }

    public void setName_cinema(String name_cinema) {
        this.name_cinema = name_cinema;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getDate_show() {
        return date_show;
    }

    public void setDate_show(String date_show) {
        this.date_show = date_show;
    }

    public String getYear_show() {
        return year_show;
    }

    public void setYear_show(String year_show) {
        this.year_show = year_show;
    }

    public String getDay_show() {
        return day_show;
    }

    public void setDay_show(String day_show) {
        this.day_show = day_show;
    }

    public String getTime_show() {
        return time_show;
    }

    public void setTime_show(String time_show) {
        this.time_show = time_show;
    }

    public String getName_ticket() {
        return name_ticket;
    }

    public void setName_ticket(String name_ticket) {
        this.name_ticket = name_ticket;
    }

    public String getType_ticket() {
        return type_ticket;
    }

    public void setType_ticket(String type_ticket) {
        this.type_ticket = type_ticket;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
