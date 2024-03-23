package com.ie303project.fullstackbackend.repository;

import com.ie303project.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public class UserRepository extends JpaRepository<User,Long>{
}
