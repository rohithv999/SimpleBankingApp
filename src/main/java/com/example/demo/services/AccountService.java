package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Account;
import com.example.demo.models.Customer;
import com.example.demo.models.Transaction;
import com.example.demo.repositories.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerService customerService;

    public AccountService(AccountRepository accountRepository,
            CustomerService customerService) {

        this.accountRepository = accountRepository;
        this.customerService = customerService;

        // Add starter accounts only if MongoDB has none
        if (accountRepository.count() == 0) {
            createInitialAccount(1, "SAVINGS", 1000.00);
            createInitialAccount(2, "CHECKING", 500.00);
            createInitialAccount(3, "SAVINGS", 750.00);
        }
    }

    private void createInitialAccount(int customerId,
            String accountType,
            double balance) {

        Customer customer = customerService.getCustomerById(customerId);

        if (customer != null) {
            int accountId = (int) accountRepository.count() + 1;

            Account account = new Account(accountId, customer, accountType, balance);

            accountRepository.save(account);
        }
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account createAccount(int userId, String accountType) {

        Customer customer = customerService.getCustomerById(userId);

        if (customer == null) {
            return null;
        }

        int nextAccountId = accountRepository.findAll()
                .stream()
                .mapToInt(Account::getAccountId)
                .max()
                .orElse(0) + 1;

        Account account = new Account(nextAccountId, customer, accountType, 0.00);

        return accountRepository.save(account);
    }

    public Account getAccount(int accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    public Account updateAccount(int accountId, String accountType) {

        Account account = getAccount(accountId);

        if (account == null) {
            return null;
        }

        account.setAccountType(accountType);

        return accountRepository.save(account);
    }

    public boolean deleteAccount(int accountId) {

        if (!accountRepository.existsById(accountId)) {
            return false;
        }

        accountRepository.deleteById(accountId);

        return true;
    }

    public Account deposit(int accountId, double amount) {

        Account account = getAccount(accountId);

        if (account == null || amount <= 0) {
            return null;
        }

        account.setBalance(account.getBalance() + amount);

        int nextTransactionId = account.getTransactions()
                .stream()
                .mapToInt(Transaction::getTxnId)
                .max()
                .orElse(0) + 1;

        account.getTransactions().add(
                new Transaction(nextTransactionId, "DEPOSIT", amount));

        return accountRepository.save(account);
    }

    public Account withdraw(int accountId, double amount) {

        Account account = getAccount(accountId);

        if (account == null ||
                amount <= 0 ||
                amount > account.getBalance()) {

            return null;
        }

        account.setBalance(account.getBalance() - amount);

        int nextTransactionId = account.getTransactions()
                .stream()
                .mapToInt(Transaction::getTxnId)
                .max()
                .orElse(0) + 1;

        account.getTransactions().add(
                new Transaction(nextTransactionId, "WITHDRAW", amount));

        return accountRepository.save(account);
    }

    public List<Transaction> getTransactions(int accountId) {

        Account account = getAccount(accountId);

        return account == null
                ? null
                : account.getTransactions();
    }
}