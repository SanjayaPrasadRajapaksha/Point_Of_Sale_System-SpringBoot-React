package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Category;
import com.pointofsalesystem.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategory(long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category, long id) {
        Category exsistinCategory = categoryRepository.findById(id).orElse(null);

        if (exsistinCategory == null) {
            return null;
        }
        exsistinCategory.setCategory_name(category.getCategory_name());

        return categoryRepository.save(exsistinCategory);
    }

}
