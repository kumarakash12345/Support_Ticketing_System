package com.example.demo.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.TicketRequestDTO;
import com.example.demo.DTO.TicketUpdateDTO;
import com.example.demo.Repository.TicketRepository;
import com.example.demo.Repository.UsersRepository;
import com.example.demo.entity.Priority;
import com.example.demo.entity.Status;
import com.example.demo.entity.Tickets;
import com.example.demo.entity.User;

@Service
public class TicketService {

	@Autowired
	private  TicketRepository ticketRepository;
	@Autowired
	private UsersRepository userRepository;

	public Tickets createTicket(TicketRequestDTO dto, String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("USer not found"));

		Tickets ticket = new Tickets();
		ticket.setUser(user);
		ticket.setTitle(dto.getTitle());
		ticket.setDescription(dto.getDescription());
		ticket.setPriority(dto.getPriority());
		ticket.setDepartment(dto.getDepartment());
		ticket.setStatus(Status.OPEN);
		ticket.setCreatedAt(LocalDateTime.now());
		ticket.setUpdatedAt(LocalDateTime.now());

		return ticketRepository.save(ticket);

	}

	public List<Tickets> getAllTickets(){
		return ticketRepository.findAll();

	}
	public List<Tickets> getUserTickets(UUID userId){
		return ticketRepository.findByUserId(userId);
	}
	public Tickets getTicketById(UUID ticketId) {
		return ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found"));
	}
	public Tickets updateTicket(UUID ticketId, TicketUpdateDTO dto) {
		Tickets ticket = getTicketById(ticketId);

		if (dto.getStatus() != null) ticket.setStatus(dto.getStatus());
		if (dto.getPriority() != null) ticket.setPriority(dto.getPriority());
		if (dto.getDepartment() != null) ticket.setDepartment(dto.getDepartment());
		if (dto.getAssignedToId() != null) {
			User agent = userRepository.findById(dto.getAssignedToId())
					.orElseThrow(() -> new RuntimeException("Assigned user not found"));
			ticket.setAssignedto(agent);
		}

		ticket.setUpdatedAt(LocalDateTime.now());
		return ticketRepository.save(ticket);
	}

	public void deleteTicket(UUID ticketId) {
		ticketRepository.deleteById(ticketId);
	}

	public List<Tickets> filterTickets(Status status, Priority priority, String department) {
		if (status != null) return ticketRepository.findByStatus(status);
		if (priority != null) return ticketRepository.findByPriority(priority);
		if (department != null) return ticketRepository.findByDepartment(department);
		return ticketRepository.findAll();
	}

}
