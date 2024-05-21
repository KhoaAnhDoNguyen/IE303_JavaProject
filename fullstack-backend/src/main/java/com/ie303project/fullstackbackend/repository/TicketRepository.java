package com.ie303project.fullstackbackend.repository;
import com.ie303project.fullstackbackend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByIdCinema(Long idCinema);
}
