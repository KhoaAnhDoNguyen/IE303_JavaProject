package com.ie303project.fullstackbackend.repository;

import com.ie303project.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
