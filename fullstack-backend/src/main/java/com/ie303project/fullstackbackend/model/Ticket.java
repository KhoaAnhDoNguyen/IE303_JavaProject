package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_ticket")
    private Long id_ticket;
    @Column(name = "name_ticket")
    private String name_ticket;
    @Column(name = "type_ticket")
    private String type_ticket;
    @Column(name = "price")
    private Long price;
    @Column(name = "id_cinema")
    private Long idCinema;

    public Long getId_ticket() {
        return id_ticket;
    }

    public void setId_ticket(Long id_ticket) {
        this.id_ticket = id_ticket;
    }

    public String getName_ticket() {
        return name_ticket;
    }

    public void setName_ticket(String name_ticket) {
        this.name_ticket = name_ticket;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getId_cinema() {
        return idCinema;
    }

    public void setId_cinema(Long id_cinema) {
        this.idCinema = id_cinema;
    }

    public String getType_ticket() {
        return type_ticket;
    }

    public void setType_ticket(String type_ticket) {
        this.type_ticket = type_ticket;
    }
}
