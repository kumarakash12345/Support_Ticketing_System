package com.example.demo.DTO;

import java.time.LocalDateTime;

public class ReplyResponseDTO {
    private String message;
    private String repliedBy;
    private LocalDateTime repliedAt;
    
    public ReplyResponseDTO() {
    	
    }
	public ReplyResponseDTO(String message, String repliedBy, LocalDateTime repliedAt) {
		super();
		this.message = message;
		this.repliedBy = repliedBy;
		this.repliedAt = repliedAt;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getRepliedBy() {
		return repliedBy;
	}
	public void setRepliedBy(String repliedBy) {
		this.repliedBy = repliedBy;
	}
	public LocalDateTime getRepliedAt() {
		return repliedAt;
	}
	public void setRepliedAt(LocalDateTime repliedAt) {
		this.repliedAt = repliedAt;
	}
	@Override
	public String toString() {
		return "ReplyResponseDTO [message=" + message + ", repliedBy=" + repliedBy + ", repliedAt=" + repliedAt + "]";
	}
}
