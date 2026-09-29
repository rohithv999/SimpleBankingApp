package com.example.demo.models;

import java.time.LocalDateTime;

public class Transaction {

    private int txnId;
    private String type;
    private double amount;
    private LocalDateTime date;

    public Transaction() {
    }

    public Transaction(int txnId, String type, double amount) {
        this.txnId = txnId;
        this.type = type;
        this.amount = amount;
        this.date = LocalDateTime.now();
    }

    public int getTxnId() {
        return txnId;
    }

    public void setTxnId(int txnId) {
        this.txnId = txnId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
