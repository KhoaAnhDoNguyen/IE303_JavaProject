package com.ie303project.fullstackbackend.repository;
import com.ie303project.fullstackbackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByIdAndIdFilmAndIdShowtimeAndIdCinemaAndIdSeat(
            Long id, Long idFilm, Long idShowtime, Long idCinema,  Long idSeat);
}
