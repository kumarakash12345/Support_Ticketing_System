package com.example.demo.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.ReplyRepository;
import com.example.demo.Repository.TicketRepository;
import com.example.demo.Repository.UsersRepository;
import com.example.demo.entity.Reply;
import com.example.demo.entity.Tickets;
import com.example.demo.entity.User;

@Service
public class ReplyService {
	
	@Autowired
	private ReplyRepository replyRepository;
	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private UsersRepository userRepository;

	public Reply addReply(UUID ticketId, UUID userId,String message) {
		 Tickets ticket = ticketRepository.findById(ticketId)
	                .orElseThrow(() -> new RuntimeException("Ticket not found"));

	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        Reply reply = new Reply();
	        reply.setTicket(ticket);
	        reply.setUsers(user);
	        reply.setMessage(message);
	        reply.setTimestamp(LocalDateTime.now());
	        

	        return replyRepository.save(reply);
		
	}
	public List<Reply> getRepliesForTicket(UUID ticketId) {
        return replyRepository.findByTicketId(ticketId);
    }
}
