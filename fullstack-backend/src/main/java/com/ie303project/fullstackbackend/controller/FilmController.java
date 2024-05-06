package com.ie303project.fullstackbackend.controller;

import com.ie303project.fullstackbackend.exception.FilmNotFoundException;
import com.ie303project.fullstackbackend.model.Film;
import com.ie303project.fullstackbackend.repository.FilmRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
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

    @DeleteMapping("/film/{IDFilm}")
    String deleteFilm(@PathVariable Long IDFilm) {
        if (!filmRepository.existsById(IDFilm)) {
            throw new FilmNotFoundException(IDFilm);
        }
        filmRepository.deleteById(IDFilm);
        return "Film with id " + IDFilm + " has been deleted success.";
    }

}
