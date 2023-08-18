package com.banking.service;

import com.banking.dao.AccountRepository;
import com.banking.dao.TransactionRepository;
import com.banking.dto.TransactionDTO;
import com.banking.entity.Account;
import com.banking.entity.Transaction;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public String transaction(TransactionDTO transactionDTO) {
        Transaction transaction = mapper.map(transactionDTO,Transaction.class);
        Account senderAccount = accountRepository.findByName(transaction.getSender_name());
        Account receiverAccount = accountRepository.findByName(transaction.getReceiver_name());
        try{
            transaction.setSid(senderAccount.getId());
            transaction.setRid(receiverAccount.getId());
            if(transaction.getAmount()<senderAccount.getSaving()){
                senderAccount.setSaving(senderAccount.getSaving()-transaction.getAmount());
                senderAccount.setAmount(senderAccount.getAmount()-transaction.getAmount());
                receiverAccount.setSaving(receiverAccount.getSaving()+ transaction.getAmount());
                receiverAccount.setAmount(receiverAccount.getAmount()+transaction.getAmount());
                transaction.setRid(receiverAccount.getId());
                transaction.setSid(senderAccount.getId());
                transaction.setStatus("Successful");
                transactionRepository.save(transaction);
                return "transaction was successful";
            }
            else{
                transaction.setRid(receiverAccount.getId());
                transaction.setSid(senderAccount.getId());
                transaction.setStatus("Failed(Insufficient funds)");
                transactionRepository.save(transaction);
                return "transaction was failed";
            }
        }
        catch(Exception exception){
            transaction.setRid(receiverAccount.getId());
            transaction.setSid(senderAccount.getId());
            transaction.setStatus("Failed(server issue)");
            transactionRepository.save(transaction);
            return "transaction was failed";
        }
    }

    @Override
    public List<Transaction> getTransactions(String name) {
        List<Transaction> transactions = transactionRepository.findAll();
        List<Transaction> filteredTransactions = new ArrayList<Transaction>();
        transactions.forEach(transaction -> {
            if(Objects.equals(transaction.getReceiver_name(), name) || Objects.equals(transaction.getSender_name(), name)){
                filteredTransactions.add(transaction);
            }
        });
        Collections.reverse(filteredTransactions);
        return filteredTransactions;
    }

    @Override
    public Optional<Transaction> getById(Long id) {
        return transactionRepository.findById(id);
    }
}
