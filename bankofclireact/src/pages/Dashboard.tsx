import Navbar from "../components/Navbar/Navbar";
import CurrentBalance from "../components/CurrentBalance";
import BalanceHistory from "../components/BalanceHistory";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import { useEffect, useState } from "react";
import { getAccountById } from "../data/accountRepository";
import { getTransactions } from "../data/transactionRepository";
import * as transactionService from "../services/transactionService";
import type { Account } from "../domain/Account";
import type { Transaction } from "../domain/Transaction";

// change current_account_id when connecting account and dashboard and dashboard actually starts using the logged in account
let CURRENT_ACCOUNT_ID = 1;
const LOADING_DELAY_MS = 1000;

export default function Dashboard() {
    const [account, setAccount] = useState<Account>(() => getAccountById(CURRENT_ACCOUNT_ID));
    const [transactions, setTransactions] = useState<Transaction[]>(() => getTransactions());
    const [isLoading, setIsLoading] = useState(true);

    // simulate load
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    const deposit = (amount: number): void => {
        transactionService.deposit(CURRENT_ACCOUNT_ID, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
    };

    const withdraw = (amount: number): void => {
        transactionService.withdraw(CURRENT_ACCOUNT_ID, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
    };

    const transfer = (toAccountId: number, amount: number): void => {
        transactionService.transfer(CURRENT_ACCOUNT_ID, toAccountId, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
    };

    return (
        <div className="flex flex-col gap-6 w-7/10 mx-auto py-8">
            <Navbar onDeposit={deposit} onWithdraw={withdraw} onTransfer={transfer} />
            <div>
                <h1 className="text-4xl font-bold">Welcome back, {account.name}.</h1>
                <p className="mt-2 text-sm">Stay on top of your account activity and transactions.</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <CurrentBalance balance={account.balance} loading={isLoading} />
                <BalanceHistory loading={isLoading} />
            </div>
            <TransactionHistory transactions={transactions} onDeposit={deposit} onWithdraw={withdraw} onTransfer={transfer} loading={isLoading} />
        </div>
    );
}
