package com.example.demo.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Tickets {
	@Id
	@GeneratedValue
	private UUID id;

	@ManyToOne
	private User user;

	private String title;

	private String description;

	@Enumerated(EnumType.STRING)
	private Status status;

	@Enumerated(EnumType.STRING)
	private  Priority priority;

	private String department;

	@ManyToOne
	private User assignedto;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
	
	public Tickets() {

	}

	public Tickets(UUID id, User user, String title, String description, Status status, Priority priority,
			String department, User assignedto, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.user = user;
		this.title = title;
		this.description = description;
		this.status = status;
		this.priority = priority;
		this.department = department;
		this.assignedto = assignedto;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public User getAssignedto() {
		return assignedto;
	}

	public void setAssignedto(User assignedto) {
		this.assignedto = assignedto;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "Tickets [id=" + id + ", user=" + user + ", title=" + title + ", description=" + description
				+ ", status=" + status + ", priority=" + priority + ", department=" + department + ", assignedto="
				+ assignedto + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}



}