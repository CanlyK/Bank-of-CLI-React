import { useState } from "react";
import { getAccountById } from "../data/accountRepository";
import { getTransactions } from "../data/transactionRepository";
import * as transactionService from "../services/transactionService";
import type { Account } from "../domain/Account";
import type { Transaction } from "../domain/Transaction";

interface Banking {
    account: Account;
    transactions: Transaction[];
    deposit: (amount: number) => void;
}

export function useBanking(accountId: number): Banking {
    const [account, setAccount] = useState<Account>(() => getAccountById(accountId));
    const [transactions, setTransactions] = useState<Transaction[]>(() => getTransactions());

    const deposit = (amount: number): void => {
        transactionService.deposit(accountId, amount);
        setAccount(getAccountById(accountId));
        setTransactions(getTransactions());
    };

    return { account, transactions, deposit };
}
