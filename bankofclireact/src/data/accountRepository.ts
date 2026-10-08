import { read, write } from "./storage";
import type { Account } from "../domain/Account";

export function getAccounts(): Account[] {
    return read("accounts");
}

export function getAccountById(accountId: number): Account {
    const account = getAccounts().find((acc) => acc.account_id === accountId);

    if (!account) {
        throw new Error(`Account ${accountId} was not found`);
    }

    return account;
}

export function saveAccount(account: Account): void {
    const accounts = getAccounts().map((acc) =>
        acc.account_id === account.account_id ? account : acc
    );

    write("accounts", accounts);
}

export function addAccount(accountId: number, username: string, pin: string): Account {
    const accounts = getAccounts();
    const account: Account = { account_id: accountId, name: username, pin: pin, balance: 0 };

    write("accounts", [...accounts, account]);

    return account;
}