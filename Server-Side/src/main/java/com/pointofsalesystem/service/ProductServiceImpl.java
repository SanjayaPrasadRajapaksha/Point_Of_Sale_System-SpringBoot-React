package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Product;
import com.pointofsalesystem.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(long id) {
      return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product createProduct(Product product) {
       return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product Product, long id) {
       Product product = productRepository.findById(id).orElse(null);

       if (product == null) {
           return null;
       }
       product.setName(Product.getName());
       product.setPrice(Product.getPrice());
       product.setQuantity(Product.getQuantity());
       return productRepository.save(product);
    }

    @Override
    public void deleteProduct(long id) {
      productRepository.deleteById(id);
    }
    
}
