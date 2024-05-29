package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "user_film")
public class User_Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_user_film")
    private Long id_user_film;
    @Column(name = "id_user")
    private Long idUser;
    @Column(name = "id_film")
    private Long idFilm;
    @Column(name = "name")
    private String name;
    @Column(name = "star")
    private Long star;
    @Column(name = "comments")
    private String comments;

    public Long getId_user_film() {
        return id_user_film;
    }

    public void setId_user_film(Long id_user_film) {
        this.id_user_film = id_user_film;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdFilm() {
        return idFilm;
    }

    public void setIdFilm(Long idFilm) {
        this.idFilm = idFilm;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getStar() {
        return star;
    }

    public void setStar(Long star) {
        this.star = star;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
