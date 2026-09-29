package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Account;
import com.example.demo.models.Customer;
import com.example.demo.models.Transaction;

@Service
public class AccountService {

    private List<Account> accounts = new ArrayList<>();
    private CustomerService customerService;
    private int nextAccountId = 4;
    private int nextTransactionId = 1;

    public AccountService(CustomerService customerService) {
        this.customerService = customerService;

        createInitialAccount(1, "SAVINGS", 1000.00);
        createInitialAccount(2, "CHECKING", 500.00);
        createInitialAccount(3, "SAVINGS", 750.00);
    }

    private void createInitialAccount(int customerId, String accountType, double balance) {
        Customer customer = customerService.getCustomerById(customerId);
        Account account = new Account(accounts.size() + 1, customer, accountType, balance);
        accounts.add(account);
        customer.getAccounts().add(account);
    }

    public List<Account> getAllAccounts() {
        return accounts;
    }

    public Account createAccount(int userId, String accountType) {
        Customer customer = customerService.getCustomerById(userId);
        if (customer == null) return null;

        Account account = new Account(nextAccountId++, customer, accountType, 0.00);
        accounts.add(account);
        customer.getAccounts().add(account);
        return account;
    }

    public Account getAccount(int accountId) {
        for (Account account : accounts) {
            if (account.getAccountId() == accountId) return account;
        }
        return null;
    }

    public Account updateAccount(int accountId, String accountType) {
        Account account = getAccount(accountId);
        if (account == null) return null;
        account.setAccountType(accountType);
        return account;
    }

    public boolean deleteAccount(int accountId) {
        Account account = getAccount(accountId);
        if (account == null) return false;

        if (account.getCustomer() != null) {
            account.getCustomer().getAccounts().remove(account);
        }
        accounts.remove(account);
        return true;
    }

    public Account deposit(int accountId, double amount) {
        Account account = getAccount(accountId);
        if (account == null || amount <= 0) return null;

        account.setBalance(account.getBalance() + amount);
        account.getTransactions().add(new Transaction(nextTransactionId++, "DEPOSIT", amount));
        return account;
    }

    public Account withdraw(int accountId, double amount) {
        Account account = getAccount(accountId);
        if (account == null || amount <= 0 || amount > account.getBalance()) return null;

        account.setBalance(account.getBalance() - amount);
        account.getTransactions().add(new Transaction(nextTransactionId++, "WITHDRAW", amount));
        return account;
    }

    public List<Transaction> getTransactions(int accountId) {
        Account account = getAccount(accountId);
        return account == null ? null : account.getTransactions();
    }
}
