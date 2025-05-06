package com.example.demo.DTO;

import java.util.UUID;

import com.example.demo.entity.Priority;
import com.example.demo.entity.Status;

public class TicketUpdateDTO {
	private Status status;
    private Priority priority;
    private String department;
    private UUID assignedToId;
    
    public TicketUpdateDTO() {
    	
    }
	public TicketUpdateDTO(Status status, Priority priority, String department, UUID assignedToId) {
		super();
		this.status = status;
		this.priority = priority;
		this.department = department;
		this.assignedToId = assignedToId;
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
	public UUID getAssignedToId() {
		return assignedToId;
	}
	public void setAssignedToId(UUID assignedToId) {
		this.assignedToId = assignedToId;
	}
	@Override
	public String toString() {
		return "TicketUpdateDTO [status=" + status + ", priority=" + priority + ", department=" + department
				+ ", assignedToId=" + assignedToId + "]";
	}

}
