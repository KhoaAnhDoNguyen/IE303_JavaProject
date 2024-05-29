package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.model.User_Film;
import com.ie303project.fullstackbackend.repository.UserFilmRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class UserFilmController {
    @Autowired
    private UserFilmRepository userfilmRepository;
    @PostMapping("/userfilm")
    User_Film newUser_Film(@RequestBody User_Film newUser_Film)
    {
        return userfilmRepository.save(newUser_Film);
    }
    @GetMapping("/userfilm/{idFilm}")
    public List<User_Film> getUserFilmbyIdFilm(@PathVariable Long idFilm) {
        return userfilmRepository.findByIdFilm(idFilm); // Changed to camelCase
    }
}
