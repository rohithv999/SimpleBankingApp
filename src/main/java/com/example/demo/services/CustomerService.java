package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Customer;
import com.example.demo.repositories.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;

        // Add starter customers only if MongoDB is empty
        if (customerRepository.count() == 0) {
            customerRepository.save(new Customer(1, "John Doe"));
            customerRepository.save(new Customer(2, "Sarah Smith"));
            customerRepository.save(new Customer(3, "Mike Johnson"));
        }
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer createCustomer(Customer customer) {

        if (customer.getAccounts() == null) {
            customer.setAccounts(new ArrayList<>());
        }

        return customerRepository.save(customer);
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {

        Customer customer = getCustomerById(id);

        if (customer == null) {
            return null;
        }

        customer.setName(updatedCustomer.getName());

        return customerRepository.save(customer);
    }

    public boolean deleteCustomer(int id) {

        if (!customerRepository.existsById(id)) {
            return false;
        }

        customerRepository.deleteById(id);
        return true;
    }

    public List<Customer> findCustomersByFirstName(String firstName) {
        return customerRepository.findByNameStartingWithIgnoreCase(firstName);
    }
}