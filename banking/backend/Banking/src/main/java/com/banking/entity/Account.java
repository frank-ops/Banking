package com.banking.entity;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(unique = true)
    private String name;
    private String password;
    private Long amount;
    private Long fixed;
    private Long saving;

    public Account() {
    }

    public Account(String name, String password, Long amount, Long fixed, Long saving) {
        this.name = name;
        this.password= password;
        this.amount = amount;
        this.fixed = fixed;
        this.saving = saving;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getFixed() {
        return fixed;
    }

    public void setFixed(Long fixed) {
        this.fixed = fixed;
    }

    public Long getSaving() {
        return saving;
    }

    public void setSaving(Long saving) {
        this.saving = saving;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", amount=" + amount +
                ", fixed=" + fixed +
                ", saving=" + saving +
                '}';
    }
}
