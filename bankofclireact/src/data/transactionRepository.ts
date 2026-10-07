import { read, write } from "./storage";
import type { Transaction } from "../domain/Transaction";

export function getTransactions(): Transaction[] {
    return read("transactions");
}

export function addTransaction(details: Omit<Transaction, "transaction_id" | "timestamp">): Transaction {
    const transactions = getTransactions();
    const lastId = Math.max(0, ...transactions.map((transaction) => transaction.transaction_id));
    const date = new Date()
    const transaction: Transaction = { transaction_id: lastId + 1, ...details, timestamp: date.toLocaleString() };

    write("transactions", [...transactions, transaction]);

    return transaction;
}
