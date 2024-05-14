package com.pointofsalesystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pointofsalesystem.entity.Customer;
import com.pointofsalesystem.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomer() {
      return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(long id) {
       return customerRepository.findById(id).orElse(null);
    }

    @Override
    public Customer createCustomer(Customer customer) {
       return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Customer customer, long id) {
       Customer exsistingCustomer = customerRepository.findById(id).orElse(null);

       if (exsistingCustomer == null) {
           return null;
       }
       exsistingCustomer.setTitle(customer.getTitle());
       exsistingCustomer.setName(customer.getName());
       exsistingCustomer.setAddress(customer.getAddress());
       exsistingCustomer.setPhone(customer.getPhone());
       exsistingCustomer.setEmail(customer.getEmail());
       return customerRepository.save(exsistingCustomer);
    }

    @Override
    public void deleteCustomer(long id) {
       customerRepository.deleteById(id);
    }
    
}
