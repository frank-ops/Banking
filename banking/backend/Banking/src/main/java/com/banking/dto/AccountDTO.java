package com.banking.dto;

public class AccountDTO {

    private String name;
    private String password;
    private Long amount;
    private Long fixed;
    private Long saving;

    public AccountDTO(String name, String password, Long amount, Long fixed, Long saving) {
        this.name = name;
        this.password = password;
        this.amount = amount;
        this.fixed = fixed;
        this.saving = saving;
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
}
