package com.example.demo.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;


public interface UsersRepository extends JpaRepository<User,UUID> {
	
	Optional<User> findByEmail(String email);

}
