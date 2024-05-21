package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_seat")
    private Long id_seat;
    @Column(name = "id_cinema")
    private Long idCinema;
    @Column(name = "num_col")
    private int num_col;
    @Column(name = "num_row")
    private int num_row;
    @Column(name = "room")
    private String room;

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Long getId_seat() {
        return id_seat;
    }

    public void setId_seat(Long id_seat) {
        this.id_seat = id_seat;
    }

    public Long getIdCinema() {
        return idCinema;
    }

    public void setIdCinema(Long idCinema) {
        this.idCinema = idCinema;
    }

    public int getNum_col() {
        return num_col;
    }

    public void setNum_col(int num_col) {
        this.num_col = num_col;
    }

    public int getNum_row() {
        return num_row;
    }

    public void setNum_row(int num_row) {
        this.num_row = num_row;
    }
}
