package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.exception.ShowTimeNotFoundException;

import com.ie303project.fullstackbackend.model.ShowTime;
import com.ie303project.fullstackbackend.repository.ShowTimeRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class ShowTimeController {
    @Autowired
    private ShowTimeRepository showtimeRepository;

    //Add Show Time into Database
    @PostMapping("/showtime")
    ShowTime newShowTime(@RequestBody ShowTime newShowTime)
    {
        return showtimeRepository.save(newShowTime);
    }

    @GetMapping("/showtimes")
    public List<ShowTime> getAllShowTimes() {
        return showtimeRepository.findAll();
    }
    @GetMapping("/showtimes/{filmId}")
    public List<ShowTime> getShowTimesByFilmIdAndStatus(@PathVariable Long filmId) {
        return showtimeRepository.findByFilmIdAndShowtimeStatus(filmId, 1L);
    }
}
