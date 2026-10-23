import Navbar from "../components/Navbar/Navbar";
import CurrentBalance from "../components/CurrentBalance";
import BalanceHistory from "../components/BalanceHistory";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import { useEffect, useState } from "react";
import * as transactionService from "../services/transactionService";
import type { Transaction } from "../domain/Transaction";
import type { User } from "../domain/Account";
import logo from "../assets/Logo.png";
import logoDark from "../assets/LogoDark.svg";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getMe } from "../services/userService";



export default function Dashboard() {
    const location = useLocation();
    const accountId: number | undefined = location.state?.accountId;
    const accessToken: string = location.state?.accessToken;

    if (accountId == null || !accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <DashboardContent accessToken={accessToken} />;
}

function DashboardContent({ accessToken }: { accessToken: string }) {
    const [account, setAccount] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<transactionService.TransactionDto[]>([]);
    const loadDashboard = async (): Promise<void> => {
        const user = await getMe(accessToken);
        const history = await transactionService.getTransactions(accessToken, user.username);
        setAccount(user);
        setTransactions(history);
    };

    useEffect(() => {
        setIsLoading(true);
        loadDashboard()
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const deposit = async (amount: number): Promise<string | null> => {
        const error = transactionService.getAmountError(amount);
        if (error) return error;
        if (!account) return "Account not loaded.";

        try {
            await transactionService.deposit(accessToken, account.username, amount);
        } catch (err) {
            return err instanceof Error ? err.message : "Deposit failed.";
        }

        toast.success("Deposit successful!");
        await loadDashboard();
        return null;
    };

    const withdraw = async (amount: number): Promise<string | null> => {
        const error = transactionService.getAmountError(amount);
        if (error) return error;
        if (!account) return "Account not loaded.";

        try {
            await transactionService.withdraw(accessToken, account.username, amount);
        } catch (err) {
            return err instanceof Error ? err.message : "Withdraw failed.";
        }

        toast.success("Withdraw successful!");
        await loadDashboard();
        return null;
    };

    const transfer = async (
        toUsername: string,
        amount: number
    ): Promise<transactionService.TransferErrors | null> => {
        const error = transactionService.getAmountError(amount);
        if (error) return { amount: error };
        if (!account) return { general: "Account not loaded." };

        try {
            await transactionService.transfer(accessToken, account.username, toUsername, amount);
        } catch (err) {
            return { general: err instanceof Error ? err.message : "Transfer failed." };
        }

        toast.success("Transfer successful!");
        await loadDashboard();
        return null;
    };

    if (!account) {
        return <div className="p-4">Loading...</div>;
    }

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
                    <BalanceHistory
                        transactions={transactions}
                        username={account.username}
                        balance={account.balance}
                        loading={isLoading}
                    />
                </div>
                <TransactionHistory
                    transactions={transactions}
                    onDeposit={deposit}
                    onWithdraw={withdraw}
                    onTransfer={transfer}
                    loading={isLoading}
                />
            </div>
        </div>
    );
}