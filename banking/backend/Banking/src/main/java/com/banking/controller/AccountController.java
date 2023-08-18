package com.banking.controller;

import com.banking.dto.AccountDTO;
import com.banking.entity.Account;
import com.banking.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountServiceImpl accountService;

    @PostMapping("/addAccount")
    public String addAccount(@RequestBody AccountDTO accountDTO){
        return accountService.createAccount(accountDTO);
    }

    @PutMapping("/updateAccount")
    public String updateAccount(@RequestBody AccountDTO accountDTO){
        return accountService.updateAccount(accountDTO);
    }

    @GetMapping("/getAllAccountHolders")
    public List<String> getAllAccountHolders(){
        return accountService.getAllAccountHolders();
    }

    @PostMapping("/getDetails")
    public Account getDetails(@RequestBody AccountDTO accountDTO){ return accountService.getDetails(accountDTO.getName(),accountDTO.getPassword()); }
}
