package com.banking.service;

import com.banking.dto.AccountDTO;
import com.banking.entity.Account;

import java.util.List;

public interface AccountService {

    public String createAccount(AccountDTO accountDTO);
    public String updateAccount(AccountDTO accountDTO);

    public Account getDetails(String name, String password);
    public List<String> getAllAccountHolders();
}
