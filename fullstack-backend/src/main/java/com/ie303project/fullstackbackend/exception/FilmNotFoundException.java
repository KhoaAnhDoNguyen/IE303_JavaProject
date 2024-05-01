package com.ie303project.fullstackbackend.exception;

public class FilmNotFoundException extends RuntimeException{
    public FilmNotFoundException(Long IDFilm) {
        super("Could not found the film with id: " + IDFilm);
    }
}
