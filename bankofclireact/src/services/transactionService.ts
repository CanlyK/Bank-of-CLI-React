import { getAccountById, saveAccount } from "../data/accountRepository";
import { addTransaction } from "../data/transactionRepository";

export function deposit(accountId: number, amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Deposit amount must be greater than zero");
    }

    const account = getAccountById(accountId);
    saveAccount({ ...account, balance: account.balance + amount });

    addTransaction({amount, transfer_type: "deposit", source_account: accountId, destination_account: 0,})
}

export function withdraw(accountId: number, amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Withdraw amount must be greater than zero");
    }

    const account = getAccountById(accountId);
    saveAccount({ ...account, balance: account.balance - amount });

    addTransaction({amount, transfer_type: "withdraw", source_account: accountId, destination_account: 0})

}

export function transfer(fromAccountId: number, toAccountId: number, amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Transfer amount must be greater than zero");
    }

    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);
    saveAccount({ ...fromAccount, balance: fromAccount.balance - amount });
    saveAccount({ ...toAccount, balance: toAccount.balance + amount });

    addTransaction({amount, transfer_type: "transfer", source_account: fromAccountId, destination_account: toAccountId})
}
