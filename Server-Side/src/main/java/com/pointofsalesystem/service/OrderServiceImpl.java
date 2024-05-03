package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Order;
import com.pointofsalesystem.entity.Product;
import com.pointofsalesystem.repository.OrderRepository;
import com.pointofsalesystem.repository.ProductRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }

    @Override
    public Order getOrder(long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order addProductToOrder(long order_id, long product_id, double quantity) {
        Order exsistingOrder = orderRepository.findById(order_id).orElse(null);

        if (exsistingOrder == null) {
            return null;
        }
        Product exsistingProduct = productRepository.findById(product_id).orElse(null);

        if (exsistingProduct == null) {
            return null;
        }
        exsistingOrder.setTotalPrice(exsistingOrder.getTotalPrice() + exsistingProduct.getPrice() * quantity);
        exsistingOrder.getOrderedProducts().add(exsistingProduct);

        return orderRepository.save(exsistingOrder);
    }

}
