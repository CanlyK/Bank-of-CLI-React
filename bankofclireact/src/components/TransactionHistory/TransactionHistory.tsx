import Card from "../common/Card";
import Dropdown from "../common/Dropdown";
import TransactionTable from "./TransactionTable";
import type { Transaction } from "../../domain/Transaction";
import type { TransferErrors } from "../../services/transactionService";

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
    return (
        <Card className="p-4 sm:p-8">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-heading">Recent Transactions</h2>
                <Dropdown onDeposit={onDeposit} onWithdraw={onWithdraw} onTransfer={onTransfer}/>
            </div>

            <TransactionTable transactions={transactions} loading={loading} />
        </Card>
    );
}
