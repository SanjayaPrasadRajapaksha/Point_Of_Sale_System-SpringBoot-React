package com.pointofsalesystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.entity.Product;
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

    @GetMapping("/products")
    public List<Product> getAlProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/product")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
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
