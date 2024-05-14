package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Customer;

@Service
public interface CustomerService {
    List<Customer> getAllCustomer();

    Customer getCustomerById(long id);

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Customer customer, long id);

    void deleteCustomer(long id);
}
