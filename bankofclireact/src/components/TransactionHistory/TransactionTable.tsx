import type { Transaction } from "../../domain/Transaction";

const COLUMNS = ["Date/Time", "Category", "Destination", "Status", "Amount"];

interface TransactionTableProps {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <div>
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="bg-accent-light/20">
                        {COLUMNS.map((column) => (
                            <th key={column} className="px-4 py-2.5 font-medium first:rounded-l-md last:rounded-r-md">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transaction_id} className="border-b border-border">
                            <td className="px-4 py-4">{transaction.transaction_id}</td>
                            <td className="px-4 py-4 uppercase">{transaction.transfer_type}</td>
                            <td className="px-4 py-4">{transaction.source_account}</td>
                            <td className="px-4 py-4">{transaction.destination_account}</td>
                            <td className="px-4 py-4">{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
