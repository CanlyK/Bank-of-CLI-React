import { read, write } from "./storage";
import type { Transaction } from "../domain/Transaction";

export function getTransactions(): Transaction[] {
    return read("transactions");
}

export function addTransaction(details: Omit<Transaction, "transaction_id">): Transaction {
    const transactions = getTransactions();
    const lastId = Math.max(0, ...transactions.map((transaction) => transaction.transaction_id));
    const transaction: Transaction = { transaction_id: lastId + 1, ...details };

    write("transactions", [...transactions, transaction]);

    return transaction;
}
