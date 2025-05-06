package com.example.demo.DTO;

public class ReplyDTO {
    private String message;
    
    public ReplyDTO() {
    	
    }

	public ReplyDTO(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ReplyDTO [message=" + message + "]";
	}
}
