package com.pointofsalesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pointofsalesystem.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
