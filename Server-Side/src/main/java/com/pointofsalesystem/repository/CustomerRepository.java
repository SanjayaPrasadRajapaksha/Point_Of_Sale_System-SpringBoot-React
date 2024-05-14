package com.pointofsalesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pointofsalesystem.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository <Customer,Long> {
    
}
