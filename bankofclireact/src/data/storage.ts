import accounts from "./seed/accounts.json";
import transactions from "./seed/transactions.json";
import type { Account } from "../domain/Account";
import type { Transaction } from "../domain/Transaction";

interface StorageSchema {
    accounts: Account[];
    transactions: Transaction[];
}

type StorageKey = keyof StorageSchema;

const seedData: StorageSchema = {
    accounts: accounts.accounts,
    transactions: transactions.transactions,
};

export function read<K extends StorageKey>(key: K): StorageSchema[K] {
    const savedData = localStorage.getItem(key);
    return savedData === null ? seedData[key] : JSON.parse(savedData);
}

export function write<K extends StorageKey>(key: K, data: StorageSchema[K]): void {
    localStorage.setItem(key, JSON.stringify(data));
}
