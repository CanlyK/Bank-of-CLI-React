import Card from "../common/Card";
import Dropdown from "../common/Dropdown";
import TransactionTable from "./TransactionTable";
import type { Transaction } from "../../domain/Transaction";

interface TransactionHistoryProps {
    transactions: Transaction[];
    onDeposit: (amount: number) => void;
}

export default function TransactionHistory({ transactions, onDeposit }: TransactionHistoryProps) {
    return (
        <Card className="p-8">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-heading">Recent Transactions</h2>
                <Dropdown onDeposit={onDeposit} />
            </div>

            <TransactionTable transactions={transactions} />
        </Card>
    );
}
