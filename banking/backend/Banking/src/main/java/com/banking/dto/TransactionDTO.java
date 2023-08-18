package com.banking.dto;

public class TransactionDTO {
    private String sender_name;
    private String receiver_name;
    private Long amount;

    public TransactionDTO(String sender_name, String receiver_name, Long amount) {
        this.sender_name = sender_name;
        this.receiver_name = receiver_name;
        this.amount = amount;
    }

    public String getSender_name() {
        return sender_name;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
