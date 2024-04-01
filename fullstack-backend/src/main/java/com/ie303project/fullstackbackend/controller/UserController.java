package com.ie303project.fullstackbackend.controller;

import com.ie303project.fullstackbackend.model.User;
import com.ie303project.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    User newUser(@RequestBody User newUser)
    {
        return userRepository.save(newUser);
    }
}
