import { getAccountById, saveAccount } from "../data/accountRepository";
import { addTransaction } from "../data/transactionRepository";
import type { Transaction } from "../domain/Transaction";

export function deposit(accountId: number, amount: number): Transaction {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Deposit amount must be greater than zero");
    }

    const account = getAccountById(accountId);
    saveAccount({ ...account, balance: account.balance + amount });

    return addTransaction({
        amount,
        transfer_type: "deposit",
        source_account: accountId,
        destination_account: 0,
    });
}
