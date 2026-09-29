package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Account;
import com.example.demo.models.Transaction;
import com.example.demo.services.AccountService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody CreateAccountRequest request) {
        Account account = accountService.createAccount(request.getUserId(), request.getAccountType());
        return account == null ? ResponseEntity.notFound().build()
                : ResponseEntity.status(HttpStatus.CREATED).body(account);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable int id) {
        Account account = accountService.getAccount(id);
        return account == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable int id, @RequestBody UpdateAccountRequest request) {
        Account account = accountService.updateAccount(id, request.getAccountType());
        return account == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(account);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable int id) {
        return accountService.deleteAccount(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<Account> deposit(@PathVariable int id, @RequestBody AmountRequest request) {
        Account account = accountService.deposit(id, request.getAmount());
        return account == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok(account);
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<Account> withdraw(@PathVariable int id, @RequestBody AmountRequest request) {
        Account account = accountService.withdraw(id, request.getAmount());
        return account == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok(account);
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable int id) {
        List<Transaction> transactions = accountService.getTransactions(id);
        return transactions == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(transactions);
    }

    public static class CreateAccountRequest {
        private int userId;
        private String accountType;
        public CreateAccountRequest() {}
        public int getUserId() { return userId; }
        public void setUserId(int userId) { this.userId = userId; }
        public String getAccountType() { return accountType; }
        public void setAccountType(String accountType) { this.accountType = accountType; }
    }

    public static class UpdateAccountRequest {
        private String accountType;
        public UpdateAccountRequest() {}
        public String getAccountType() { return accountType; }
        public void setAccountType(String accountType) { this.accountType = accountType; }
    }

    public static class AmountRequest {
        private double amount;
        public AmountRequest() {}
        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
    }
}
