package com.banking.service;

import com.banking.dao.AccountRepository;
import com.banking.dto.AccountDTO;
import com.banking.entity.Account;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper mapper;


    @Override
    public String createAccount(AccountDTO accountDTO) {
        try {
            Account account = mapper.map(accountDTO, Account.class);
            accountRepository.save(account);
            return "Account Created successfully";
        }
        catch(Exception exception){
            return "Account Creation was failed";
        }
    }

    @Override
    @Transactional
    public String updateAccount(AccountDTO accountDTO) {
        try {
            Account account = accountRepository.findByName(accountDTO.getName());
            if (accountDTO.getAmount() != null) {
                account.setAmount(accountDTO.getAmount());
            }
            if (accountDTO.getFixed() != null) {
                account.setFixed(accountDTO.getFixed());
            }
            if (accountDTO.getSaving() != null) {
                account.setSaving(accountDTO.getSaving());
            }
            return "account updated Successfully";
        }
        catch(Exception exception)
        {
            return "account update failed";
        }
    }

    @Override
    public Account getDetails(String name, String password) {
        Account accountDisplay = new Account();
        try {
            Account account = accountRepository.findByName(name);
            if (Objects.equals(account.getPassword(), password)) {
                return account;
            }
            return accountDisplay;
        }
        catch(Exception exception){
            return accountDisplay;
        }
    }

    @Override
    public List<String> getAllAccountHolders() {
        List<Account> accounts = accountRepository.findAll();
        List<String> accountHolders= new ArrayList<String>();
        accounts.forEach(account -> {
            accountHolders.add(account.getName());
        });
        return accountHolders;
    }
}
