import { read, write } from "./storage";
import type { Transaction } from "../domain/Transaction";

export function getTransactions(): Transaction[] {
    return read("transactions");
}

export function getTransactionsForAccount(accountId: Number): Transaction[] {
    const transactions = getTransactions();
    const transactionsForAccount = transactions.filter((transaction) => {
        if(transaction.transfer_type == "transfer")
            return transaction.source_account == accountId || transaction.destination_account == accountId
        return transaction.source_account == accountId
    })
    return transactionsForAccount
}

export function addTransaction(details: Omit<Transaction, "transaction_id" | "timestamp">): Transaction {
    const transactions = getTransactions();
    const lastId = Math.max(0, ...transactions.map((transaction) => transaction.transaction_id));
    const date = new Date()
    const transaction: Transaction = { transaction_id: lastId + 1, ...details, timestamp: date.toLocaleString() };

    write("transactions", [...transactions, transaction]);

    return transaction;
}
