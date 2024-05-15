package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Cinema")
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_cinema")
    private Long id_cinema;
    @Column(name = "name_cinema")
    private String name_cinema;
    @Column(name = "address")
    private String address;
    @Column(name = "time_open")
    private String time_open;
    @Column(name = "time_close")
    private String time_close;
    @Column(name = "location")
    private String location;
    @Column(name = "room")
    private String room;
    @Column(name = "id_showtime")
    private Long idShowtime;
    @Column(name = "id_film")
    private Long filmId;

    public Long getId_cinema() {
        return id_cinema;
    }

    public void setId_cinema(Long id_cinema) {
        this.id_cinema = id_cinema;
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

    public String getTime_open() {
        return time_open;
    }

    public void setTime_open(String time_open) {
        this.time_open = time_open;
    }

    public String getTime_close() {
        return time_close;
    }

    public void setTime_close(String time_close) {
        this.time_close = time_close;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Long getId_showtime() {
        return idShowtime;
    }

    public void setId_showtime(Long id_showtime) {
        this.idShowtime = id_showtime;
    }

    public Long getFilmId() {
        return filmId;
    }

    public void setFilmId(Long filmId) {
        this.filmId = filmId;
    }
}
