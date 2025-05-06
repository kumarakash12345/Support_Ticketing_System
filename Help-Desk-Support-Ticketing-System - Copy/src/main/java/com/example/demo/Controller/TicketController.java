package com.example.demo.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.TicketRequestDTO;
import com.example.demo.DTO.TicketUpdateDTO;
import com.example.demo.Services.TicketService;
import com.example.demo.Services.UserService;
import com.example.demo.entity.Priority;
import com.example.demo.entity.Status;
import com.example.demo.entity.Tickets;
import com.example.demo.entity.User;

@RestController
@CrossOrigin(origins="http://localhost:5173")

@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private UserService userService;

    // ✅ Create a new ticket (User only)
    @PostMapping
    public ResponseEntity<Tickets> createTicket(@RequestBody TicketRequestDTO dto, Authentication auth) {
        String email = auth.getName();  // Get user email from authenticated session
        Tickets createdTicket = ticketService.createTicket(dto, email);
        return ResponseEntity.ok(createdTicket);
    }

    // ✅ Get tickets with optional filtering (Admin sees all, User sees own)
    @GetMapping
    public ResponseEntity<List<Tickets>> getTickets(
            Authentication auth,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String department) {

        String email = auth.getName();
        User user = userService.getUserByEmail(email); // Get user info

        List<Tickets> tickets;
        if ("ADMIN".equalsIgnoreCase(user.getRole().name())) {
            // Admin can filter and view all tickets
            tickets = ticketService.filterTickets(status, priority, department);
        } else {
            // User can only view their own tickets
            tickets = ticketService.getUserTickets(user.getId());
        }

        return ResponseEntity.ok(tickets);
    }

    // ✅ Get a single ticket by ID
    @GetMapping("/{ticketId}")
    public ResponseEntity<Tickets> getTicketById(@PathVariable UUID ticketId) {
        Tickets ticket = ticketService.getTicketById(ticketId);
        return ResponseEntity.ok(ticket);
    }

    // ✅ Update ticket details (Admin only)
    @PutMapping("/{ticketId}")
    public ResponseEntity<Tickets> updateTicket(@PathVariable UUID ticketId,
                                                @RequestBody TicketUpdateDTO dto) {
        Tickets updated = ticketService.updateTicket(ticketId, dto);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a ticket (Admin/User)
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<String> deleteTicket(@PathVariable UUID ticketId) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.ok("Ticket deleted successfully");
    }
}
