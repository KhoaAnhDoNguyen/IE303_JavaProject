package com.ie303project.fullstackbackend.repository;
import com.ie303project.fullstackbackend.model.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CinemaRepository extends JpaRepository<Cinema, Long>{
    List<Cinema> findByFilmIdAndIdShowtimeAndLocation(Long filmId, Long idShowtime, String location);
}
