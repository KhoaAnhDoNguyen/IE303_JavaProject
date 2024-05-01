package com.ie303project.fullstackbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Film")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_film")
    private Long IDFilm;
    @Column(name = "film_name")
    private String filmName;
    @Column(name = "type")
    private String Type;
    @Column(name = "time")
    private int Time;
    @Column(name = "country")
    private String Country;
    @Column(name = "object")
    private String Object;
    @Column(name = "director")
    private String Director;
    @Column(name = "actor")
    private String Actor;
    @Column(name = "premiere")
    private String Premiere;
    @Column(name = "content")
    private String Content;
    @Column(name = "status")
    private int status;
    @Column(name = "image")
    private String Image;
    @Column(name = "demo")
    private String Demo;

    public Long getIDFilm() {
        return IDFilm;
    }

    public void setIDFilm(Long IDFilm) {
        this.IDFilm = IDFilm;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String FilmName) {
        filmName = FilmName;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public int getTime() {
        return Time;
    }

    public void setTime(int time) {
        Time = time;
    }

    public String getCountry() {
        return Country;
    }

    public void setCountry(String country) {
        Country = country;
    }

    public String getObject() {
        return Object;
    }

    public void setObject(String object) {
        Object = object;
    }

    public String getDirector() {
        return Director;
    }

    public void setDirector(String director) {
        Director = director;
    }

    public String getActor() {
        return Actor;
    }

    public void setActor(String actor) {
        Actor = actor;
    }

    public String getPremiere() {
        return Premiere;
    }

    public void setPremiere(String premiere) {
        Premiere = premiere;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int Status) {
        status = Status;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public String getDemo() {
        return Demo;
    }

    public void setDemo(String demo) {
        Demo = demo;
    }
}
