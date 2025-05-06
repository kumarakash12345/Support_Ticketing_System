package com.example.demo.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply,Long> {
	List<Reply> findByTicketId(UUID ticketId);
}
