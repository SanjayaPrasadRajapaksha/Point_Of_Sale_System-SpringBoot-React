package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Product;


@Service
public interface ProductService {
     List<Product> getAllProducts();

    Product getProductById(long id);

    Product createProduct(Product product);

    Product updateProduct(Product product, long id);

    void deleteProduct(long id);
}
