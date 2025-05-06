package com.example.demo.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Priority;
import com.example.demo.entity.Status;
import com.example.demo.entity.Tickets;

public interface TicketRepository extends JpaRepository<Tickets,UUID> {
	List<Tickets> findByUserId(UUID userId);
	List<Tickets> findByStatus(Status status);
	List<Tickets> findByPriority(Priority priority);
	List<Tickets> findByDepartment(String department);
	
}
