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
import logo from "../assets/Logo.png";
import logoDark from "../assets/LogoDark.svg";

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

    const deposit = (amount: number): string | null => {
        const depositError = transactionService.getAmountError(amount);

        if (depositError) {
            return depositError;
        }

        transactionService.deposit(CURRENT_ACCOUNT_ID, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
        return null;
    };

    const withdraw = (amount: number): string | null => {
        const withdrawError = transactionService.getWithdrawError(CURRENT_ACCOUNT_ID, amount);

        if (withdrawError) {
            return withdrawError;
        }

        transactionService.withdraw(CURRENT_ACCOUNT_ID, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
        return null;
    };

    const transfer = (toAccountId: number, amount: number): transactionService.TransferErrors | null => {
        const transferErrors = transactionService.getTransferErrors(CURRENT_ACCOUNT_ID, toAccountId, amount);

        if (transferErrors) {
            return transferErrors;
        }

        transactionService.transfer(CURRENT_ACCOUNT_ID, toAccountId, amount);
        setAccount(getAccountById(CURRENT_ACCOUNT_ID));
        setTransactions(getTransactions());
        return null;
    };

    return (
        <div>
            <header className="flex items-center gap-3 px-4 pt-6 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-8">
                <img src={logo} alt="Bank of CLI" className="size-10 sm:size-14 dark:hidden" />
                <img src={logoDark} alt="Bank of CLI" className="hidden size-10 sm:size-14 dark:block" />
                <Navbar onDeposit={deposit} onWithdraw={withdraw} onTransfer={transfer} />
            </header>
            <div className="flex flex-col gap-6 w-full mx-auto px-4 py-6 sm:px-8 lg:w-7/10 lg:px-0">
                <div>
                    <h1 className="text-3xl font-bold sm:text-4xl">Welcome back, {account.name}.</h1>
                    <p className="mt-2 text-sm">Stay on top of your account activity and transactions.</p>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <CurrentBalance balance={account.balance} loading={isLoading} />
                    <BalanceHistory loading={isLoading} />
                </div>
                <TransactionHistory transactions={transactions} onDeposit={deposit} onWithdraw={withdraw} onTransfer={transfer} loading={isLoading} />
            </div>
        </div>
    );
}
