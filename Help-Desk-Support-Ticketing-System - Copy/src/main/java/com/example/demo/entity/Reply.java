package com.example.demo.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Reply {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	private Tickets ticket;
	
	@ManyToOne
	private User users;
	
	private String message;
	
	private LocalDateTime timestamp;
	
	public Reply() {
		
	}

	public Reply(Long id, Tickets ticket, User users, String message, LocalDateTime timestamp) {
		super();
		this.id = id;
		this.ticket = ticket;
		this.users = users;
		this.message = message;
		this.timestamp = timestamp;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Tickets getTicket() {
		return ticket;
	}

	public void setTicket(Tickets ticket) {
		this.ticket = ticket;
	}

	public User getUsers() {
		return users;
	}

	public void setUsers(User users) {
		this.users = users;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Reply [id=" + id + ", ticket=" + ticket + ", users=" + users + ", message=" + message + ", timestamp="
				+ timestamp + "]";
	}
	

}
