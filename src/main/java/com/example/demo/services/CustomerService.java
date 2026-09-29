package com.example.demo.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Customer;

@Service
public class CustomerService {

    private List<Customer> customers = new ArrayList<>(Arrays.asList(
        new Customer(1, "John Doe"),
        new Customer(2, "Sarah Smith"),
        new Customer(3, "Mike Johnson")
    ));

    private int nextCustomerId = 4;

    public List<Customer> getAllCustomers() {
        return customers;
    }

    public Customer getCustomerById(int id) {
        for (Customer customer : customers) {
            if (customer.getId() == id) {
                return customer;
            }
        }
        return null;
    }

    public Customer createCustomer(Customer customer) {
        customer.setId(nextCustomerId++);
        if (customer.getAccounts() == null) {
            customer.setAccounts(new ArrayList<>());
        }
        customers.add(customer);
        return customer;
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {
        Customer customer = getCustomerById(id);
        if (customer == null) {
            return null;
        }
        customer.setName(updatedCustomer.getName());
        return customer;
    }

    public boolean deleteCustomer(int id) {
        Customer customer = getCustomerById(id);
        if (customer == null) {
            return false;
        }
        customers.remove(customer);
        return true;
    }
}
