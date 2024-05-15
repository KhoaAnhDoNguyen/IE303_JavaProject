package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.exception.CinemaNotFoundException;
import com.ie303project.fullstackbackend.model.Cinema;
import com.ie303project.fullstackbackend.repository.CinemaRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class CinemaController {
    @Autowired
    private CinemaRepository cinemaRepository;
    @PostMapping("/cinema")
    Cinema newCinema(@RequestBody Cinema newCinema)
    {
        return cinemaRepository.save(newCinema);
    }
    @GetMapping("/cinemas")
    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }
    @GetMapping("/cinemas/{filmId}/{idShowtime}/{location}")
    public List<Cinema> getCinemasByFilmAndShowtimeAndLocation(@PathVariable Long filmId,
                                                    @PathVariable Long idShowtime, @PathVariable String location) {
        return cinemaRepository.findByFilmIdAndIdShowtimeAndLocation(filmId, idShowtime, location);
    }
}
