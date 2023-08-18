package com.banking.controller;

import com.banking.dto.TransactionDTO;
import com.banking.entity.Transaction;
import com.banking.service.TransactionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionServiceImpl transactionService;

    @PostMapping("/addTransaction")
    public String addTransaction(@RequestBody TransactionDTO transactionDTO){
        return transactionService.transaction(transactionDTO);
    }

    @GetMapping("/getTransactions/{name}")
    public List<Transaction> getTransactions(@PathVariable("name") String name){
        return transactionService.getTransactions(name);
    }

    @GetMapping("/getById/{id}")
    public Transaction getById(@PathVariable("id") Long id){
        Optional<Transaction> optionalTransaction = transactionService.getById(id);
        return optionalTransaction.orElseGet(Transaction::new);
    }
}
