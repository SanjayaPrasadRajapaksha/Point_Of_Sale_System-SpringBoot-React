package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Order;
import com.pointofsalesystem.entity.Product;

@Service
public interface OrderService {
    List<Order> getAllOrders();

    Order getOrder(long id);

    Order createOrder(Order order);

    void deleteOrder(long id);

    Order addProductToOrder(long order_id, long product_id, double quantity);

}
