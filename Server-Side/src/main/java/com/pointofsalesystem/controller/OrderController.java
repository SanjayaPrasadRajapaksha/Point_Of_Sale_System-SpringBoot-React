package com.pointofsalesystem.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.dto.OrderedProductDto;
import com.pointofsalesystem.entity.Order;
import com.pointofsalesystem.service.OrderService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<Order> getAllOrders(@RequestBody Order order) {
        return orderService.getAllOrders();
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<Order> postMethodName(@PathVariable long id) {
        Order order = orderService.getOrder(id);

        if (order == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(order);

    }

    @PostMapping("/order")
    public ResponseEntity<Order> creatOrder() {
        Order order = new Order();

        order.setTotalPrice(0);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderedProducts(null);

        Order createOrder = orderService.createOrder(order);

        return ResponseEntity.status(201).body(createOrder);

    }

    @PostMapping("/order/{id}/addProduct")
    public ResponseEntity<Order> addProductToOrder(@PathVariable long id,
            @RequestBody OrderedProductDto orderedProductDto) {

        Order order = orderService.addProductToOrder(id, orderedProductDto.getProduct_id(),
                orderedProductDto.getQuantity());

        return ResponseEntity.status(201).body(order);
    }

    @DeleteMapping("/order/{id}")
    public void deleteOrder(@PathVariable long id) {
        orderService.deleteOrder(id);
    }
}
