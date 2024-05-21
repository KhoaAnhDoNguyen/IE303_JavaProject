package com.ie303project.fullstackbackend.controller;
import com.ie303project.fullstackbackend.model.Ticket;
import com.ie303project.fullstackbackend.repository.TicketRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;
    @PostMapping("/ticket")
    Ticket newTicket(@RequestBody Ticket newTicket)
    {
        return ticketRepository.save(newTicket);
    }
    @GetMapping("/tickets")
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    @GetMapping("/tickets/{idCinema}")
    public List<Ticket> getTicketsByCinemaId(@PathVariable Long idCinema) {
        return ticketRepository.findByIdCinema(idCinema); // Changed to camelCase
    }
}
