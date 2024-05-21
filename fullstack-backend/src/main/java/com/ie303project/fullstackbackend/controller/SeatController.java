package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.model.Seat;
import com.ie303project.fullstackbackend.repository.SeatRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class SeatController {
    @Autowired
    private SeatRepository seatRepository;
    @PostMapping("/seat")
    Seat newSeat(@RequestBody Seat newSeat)
    {
        return seatRepository.save(newSeat);
    }
    @GetMapping("/seats")
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }
    @GetMapping("/seats/{idCinema}/{room}")
    public List<Seat> getSeatsByCinemaId(@PathVariable Long idCinema, @PathVariable String room) {
        return seatRepository.findByIdCinemaAndRoom(idCinema, room); // Changed to camelCase
    }
}
