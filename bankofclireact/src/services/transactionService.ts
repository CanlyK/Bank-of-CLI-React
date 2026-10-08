import { getAccountById, getAccounts, saveAccount } from "../data/accountRepository";
import { addTransaction } from "../data/transactionRepository";

export interface TransferErrors {
    amount?: string;
    account?: string;
}

export function getAmountError(amount: number): string | null {
    if (!Number.isFinite(amount) || amount <= 0) {
        return "You must input an amount.";
    }

    return null;
}

export function getWithdrawError(accountId: number, amount: number): string | null {
    const amountError = getAmountError(amount);

    if (amountError) {
        return amountError;
    }

    if (amount > getAccountById(accountId).balance) {
        return "You can't withdraw more than your balance.";
    }

    return null;
}

export function getTransferError(fromAccountId: number, toAccountId: number): string | null {
    if (fromAccountId === toAccountId) {
        return "You can't transfer to your own account.";
    }

    if (!getAccounts().some((account) => account.account_id === toAccountId)) {
        return "That account doesn't exist.";
    }

    return null;
}

export function getTransferErrors(fromAccountId: number, toAccountId: number, amount: number): TransferErrors | null {
    const errors: TransferErrors = {};
    const amountError = getAmountError(amount);
    const accountError = getTransferError(fromAccountId, toAccountId);

    if (amountError) {
        errors.amount = amountError;
    } else if (amount > getAccountById(fromAccountId).balance) {
        errors.amount = "You can't transfer more than your balance.";
    }

    if (accountError) {
        errors.account = accountError;
    }

    return errors.amount || errors.account ? errors : null;
}

export function deposit(accountId: number, amount: number): void {
    const amountError = getAmountError(amount);

    if (amountError) {
        throw new Error(amountError);
    }

    const account = getAccountById(accountId);
    saveAccount({ ...account, balance: account.balance + amount });

    addTransaction({amount, transfer_type: "deposit", source_account: accountId, destination_account: 0,})
}

export function withdraw(accountId: number, amount: number): void {
    const withdrawError = getWithdrawError(accountId, amount);

    if (withdrawError) {
        throw new Error(withdrawError);
    }

    const account = getAccountById(accountId);
    saveAccount({ ...account, balance: account.balance - amount });

    addTransaction({amount, transfer_type: "withdraw", source_account: accountId, destination_account: 0})

}

export function transfer(fromAccountId: number, toAccountId: number, amount: number): void {
    const transferErrors = getTransferErrors(fromAccountId, toAccountId, amount);

    if (transferErrors) {
        throw new Error(transferErrors.amount ?? transferErrors.account);
    }

    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);
    saveAccount({ ...fromAccount, balance: fromAccount.balance - amount });
    saveAccount({ ...toAccount, balance: toAccount.balance + amount });

    addTransaction({amount, transfer_type: "transfer", source_account: fromAccountId, destination_account: toAccountId})
}
