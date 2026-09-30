package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.Account;

public interface AccountRepository extends MongoRepository<Account, Integer> {
}