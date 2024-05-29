package com.ie303project.fullstackbackend.repository;
import com.ie303project.fullstackbackend.model.User_Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface UserFilmRepository extends JpaRepository<User_Film, Long> {
    List<User_Film> findByIdFilm(Long idFilm);
}
