package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.model.Booking;
import com.ie303project.fullstackbackend.repository.BookingRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;
    @PostMapping("/booking")
    Booking newBooking(@RequestBody Booking newBooking)
    {
        return bookingRepository.save(newBooking);
    }
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    @GetMapping("/bookings/{idFilm}/{idShowtime}/{idCinema}/{idSeat}")
    public List<Booking> getBookingsByMultipleParams(
            @PathVariable Long idFilm,
            @PathVariable Long idShowtime,
            @PathVariable Long idCinema,
            @PathVariable Long idSeat) {
        return bookingRepository.findByIdFilmAndIdShowtimeAndIdCinemaAndIdSeat(
                idFilm, idShowtime, idCinema,  idSeat);
    }

}
