package com.example.demo.DTO;

import com.example.demo.entity.Priority;

public class TicketRequestDTO {
	private String title;
    private String description;
    private Priority  priority;
    private String department;
    
    public TicketRequestDTO() {
    	
    }
	public TicketRequestDTO(String title, String description, Priority priority, String department) {
		super();
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.department = department;
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
	@Override
	public String toString() {
		return "TicketDTO [title=" + title + ", description=" + description + ", priority=" + priority + ", department="
				+ department + "]";
	}

}
