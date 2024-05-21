package com.ie303project.fullstackbackend.repository;
import com.ie303project.fullstackbackend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByIdCinemaAndRoom(Long idCinema, String room);
}
