package com.pointofsalesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pointofsalesystem.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository <Order, Long>{
    
}
