package com.ie303project.fullstackbackend.exception;

public class ShowTimeNotFoundException extends RuntimeException{
    public ShowTimeNotFoundException(Long id_showtime) {
        super("Could not found the show time with id: " + id_showtime);
    }
}
