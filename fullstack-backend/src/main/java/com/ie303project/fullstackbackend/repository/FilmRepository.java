package com.ie303project.fullstackbackend.repository;

import com.ie303project.fullstackbackend.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film, Long> {
    List<Film> findByStatus(int status);
}

