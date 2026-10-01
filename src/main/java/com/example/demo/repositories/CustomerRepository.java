package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.Customer;

import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, Integer> {

    List<Customer> findByNameStartingWithIgnoreCase(String name);

}