import { useState } from "react";
import Card from "../common/Card";
import Dropdown from "../common/Dropdown";
import TransactionTable from "./TransactionTable";
import type { Transaction } from "../../domain/Transaction";
import type { TransferErrors } from "../../services/transactionService";

type TransactionCategory = "all" | "deposit" | "withdraw" | "transfer";
type SortOrder = "desc" | "asc";

const CATEGORY_OPTIONS: { value: TransactionCategory; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "deposit", label: "Deposit" },
    { value: "withdraw", label: "Withdraw" },
    { value: "transfer", label: "Transfer" },
];

interface TransactionHistoryProps {
    transactions: Transaction[];
    onDeposit: (amount: number) => string | null;
    onWithdraw: (amount: number) => string | null;
    onTransfer: (toAccountId: number, amount: number) => TransferErrors | null;
    loading?: boolean;
}

export function isAmountInput(value: string): boolean {
    return /^\d*\.?\d{0,2}$/.test(value);
}

export default function TransactionHistory({ transactions, onDeposit, onWithdraw, onTransfer, loading = false }: TransactionHistoryProps) {
    const [category, setCategory] = useState<TransactionCategory>("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    const visibleTransactions = transactions
        .filter((transaction) => category === "all" || transaction.transfer_type === category)
        .sort((a, b) => sortOrder === "asc" ? a.transaction_id - b.transaction_id : b.transaction_id - a.transaction_id);

    return (
        <Card className="p-4 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h2 className="text-base font-semibold text-heading">Recent Transactions</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setSortOrder((order) => order === "desc" ? "asc" : "desc")}
                        title="Sort by date"
                        className="px-5 py-2.5 rounded-lg bg-accent-light/20 text-xs cursor-pointer"
                    >
                        {sortOrder === "desc" ? "Newest first" : "Oldest first"}
                    </button>
                    <select
                        aria-label="Filter by category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value as TransactionCategory)}
                        className="px-4 py-2.5 rounded-lg bg-accent-light/20 text-xs cursor-pointer outline-none"
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <Dropdown onDeposit={onDeposit} onWithdraw={onWithdraw} onTransfer={onTransfer}/>
                </div>
            </div>

            <TransactionTable transactions={visibleTransactions} loading={loading} />
        </Card>
    );
}
