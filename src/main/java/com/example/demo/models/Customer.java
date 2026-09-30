package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Document(collection = "customers")
public class Customer {

    @Id
    private int id;

    private String name;

    @JsonManagedReference
    private List<Account> accounts;

    public Customer() {
        this.accounts = new ArrayList<>();
    }

    public Customer(int id, String name) {
        this.id = id;
        this.name = name;
        this.accounts = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}