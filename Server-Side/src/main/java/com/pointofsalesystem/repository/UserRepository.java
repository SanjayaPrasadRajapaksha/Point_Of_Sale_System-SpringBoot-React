package com.pointofsalesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pointofsalesystem.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
