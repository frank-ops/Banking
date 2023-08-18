package com.banking.service;

import com.banking.dto.TransactionDTO;
import com.banking.entity.Transaction;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionService {

    public String transaction(TransactionDTO transactionDTO);
    public List<Transaction> getTransactions(String name);
    public Optional<Transaction> getById(Long id);

}
