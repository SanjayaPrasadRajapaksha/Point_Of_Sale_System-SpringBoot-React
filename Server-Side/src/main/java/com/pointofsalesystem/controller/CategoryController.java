package com.pointofsalesystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.entity.Category;
import com.pointofsalesystem.service.CategoryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategory(id);

        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(200).body(category);
    }

    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {

        Category createCategory = categoryService.createCategory(category);
        return ResponseEntity.status(201).body(createCategory);
    }

    @PutMapping("/category/{id}")
    public Category updateCategory(@PathVariable long id, @RequestBody Category category) {

        return categoryService.updateCategory(category, id);
    }
}
