package com.ie303project.fullstackbackend.exception;

public class CinemaNotFoundException extends RuntimeException{
    public CinemaNotFoundException(Long id_cinema) {
        super("Could not found the cinema with id: " + id_cinema);
    }
}
