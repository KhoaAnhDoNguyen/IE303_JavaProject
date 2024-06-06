package com.ie303project.fullstackbackend.controller;

import com.ie303project.fullstackbackend.exception.FilmNotFoundException;
import com.ie303project.fullstackbackend.model.Film;
import com.ie303project.fullstackbackend.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
public class FilmController {
    @Autowired
    private FilmRepository filmRepository;

    //Add Film into Database
    @PostMapping("/film")
    Film newFilm(@RequestBody Film newFilm)
    {
        return filmRepository.save(newFilm);
    }
    @GetMapping("/films/{IDFilm}")
    Film getFilmById(@PathVariable Long IDFilm) {
        return filmRepository.findById(IDFilm)
                .orElseThrow(() -> new FilmNotFoundException(IDFilm));
    }
    @GetMapping("/films")
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    @GetMapping("/films/status/1")
    public List<Film> getFilmsWithStatusOne() {
        return filmRepository.findByStatus(1);
    }

    @GetMapping("/films/status/0")
    public List<Film> getFilmsWithStatusZero() {
        return filmRepository.findByStatus(0);
    }

    @PutMapping("/film/{IDFilm}")
    Optional<Film> updateFilm(@RequestBody Film newFilm, @PathVariable Long IDFilm) {
        return filmRepository.findById(IDFilm)
                .map(film -> {
                    film.setFilmName(newFilm.getFilmName());
                    film.setType(newFilm.getType());
                    film.setTime(newFilm.getTime());
                    film.setCountry(newFilm.getCountry());
                    film.setObject(newFilm.getObject());
                    film.setDirector(newFilm.getDirector());
                    film.setActor(newFilm.getActor());
                    film.setPremiere(newFilm.getPremiere());
                    film.setContent(newFilm.getContent());
                    film.setStatus(newFilm.getStatus());
                    film.setImage(newFilm.getImage());
                    film.setDemo(newFilm.getDemo());
                    return filmRepository.save(film);
                });
    }

    @DeleteMapping("/film/{IDFilm}")
    String deleteFilm(@PathVariable Long IDFilm) {
        if (!filmRepository.existsById(IDFilm)) {
            throw new FilmNotFoundException(IDFilm);
        }
        filmRepository.deleteById(IDFilm);
        return "Film with id " + IDFilm + " has been deleted success.";
    }

}
