package com.ie303project.fullstackbackend.repository;

import com.ie303project.fullstackbackend.model.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {
    List<ShowTime> findByFilmIdAndShowtimeStatus(Long filmId, Long showtimeStatus);
}
