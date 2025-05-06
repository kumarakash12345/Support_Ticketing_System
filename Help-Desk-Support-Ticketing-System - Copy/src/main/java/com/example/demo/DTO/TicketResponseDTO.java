package com.example.demo.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TicketResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private String department;
    private String priority;
    private String status;
    private String createdBy;
    private String assignedTo;
    private List<ReplyResponseDTO> replies; 
    private LocalDateTime createdAt;
    
    public TicketResponseDTO() {
    	
    }
	public TicketResponseDTO(UUID id, String title, String description, String department, String priority,
			String status, String createdBy, String assignedTo, List<ReplyResponseDTO> replies,
			LocalDateTime createdAt) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.department = department;
		this.priority = priority;
		this.status = status;
		this.createdBy = createdBy;
		this.assignedTo = assignedTo;
		this.replies = replies;
		this.createdAt = createdAt;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public List<ReplyResponseDTO> getReplies() {
		return replies;
	}
	public void setReplies(List<ReplyResponseDTO> replies) {
		this.replies = replies;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	@Override
	public String toString() {
		return "TicketResponseDTO [id=" + id + ", title=" + title + ", description=" + description + ", department="
				+ department + ", priority=" + priority + ", status=" + status + ", createdBy=" + createdBy
				+ ", assignedTo=" + assignedTo + ", replies=" + replies + ", createdAt=" + createdAt + "]";
	}
}
