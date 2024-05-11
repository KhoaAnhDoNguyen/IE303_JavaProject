package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Showtime")
public class ShowTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_showtime")
    private Long id_showtime;
    @Column(name = "date_show")
    private String date_show;
    @Column(name = "year_show")
    private String year_show;
    @Column(name = "day_show")
    private String day_show;
    @Column(name = "time_show")
    private String time_show;
    @Column(name = "showtime_status")
    private Long showtimeStatus;
    @Column(name = "id_film")
    private Long filmId;

    public Long getId_showtime() {
        return id_showtime;
    }

    public void setId_showtime(Long id_showtime) {
        this.id_showtime = id_showtime;
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

    public Long getShowtime_status() {
        return showtimeStatus;
    }

    public void setShowtime_status(Long showtime_status) {
        this.showtimeStatus = showtime_status;
    }

    public Long getId_film() {
        return filmId;
    }

    public void setId_film(Long id_film) {
        this.filmId = id_film;
    }
}
