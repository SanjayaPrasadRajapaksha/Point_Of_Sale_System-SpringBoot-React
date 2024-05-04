package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Category;

@Service
public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategory(long id);

    Category createCategory(Category category);

    Category updateCategory(Category category, long id);
}
