package com.pointofsalesystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.dto.ProductDto;
import com.pointofsalesystem.entity.Category;
import com.pointofsalesystem.entity.Product;
import com.pointofsalesystem.service.CategoryService;
import com.pointofsalesystem.service.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/products")
    public List<Product> getAlProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable long id) {
        Product product = productService.getProductById(id);

        if (product == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(product);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        Category category = categoryService.getCategory(productDto.getCategory_id());

        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        product.setCategory(category);
        Product createProduct = productService.createProduct(product);

        return ResponseEntity.status(201).body(createProduct);

    }

    @PutMapping("product/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product) {

        return productService.updateProduct(product, id);
    }

    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }
}
