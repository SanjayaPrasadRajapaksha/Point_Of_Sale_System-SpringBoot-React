package com.pointofsalesystem.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.pointofsalesystem.dto.OrderedProductDto;
import com.pointofsalesystem.entity.Order;
import com.pointofsalesystem.service.OrderService;
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
    public Order postMethodName(@PathVariable long id) {
        return orderService.getOrder(id);
    }

    @PostMapping("/order")
    public Order creatOrder() {
        Order order = new Order();

        order.setTotalPrice(0);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderedProducts(null);

        return orderService.createOrder(order);

    }

    @PostMapping("/order/{id}/addProduct")
    public Order addProductToOrder(@PathVariable long id, @RequestBody OrderedProductDto orderedProductDto) {

        return orderService.addProductToOrder(id, orderedProductDto.getProduct_id(), orderedProductDto.getQuantity());
    }

}
