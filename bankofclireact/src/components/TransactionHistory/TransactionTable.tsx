import Skeleton from "../common/Skeleton";
import type { Transaction } from "../../domain/Transaction";

const COLUMNS = ["Date/Time", "Category", "From Account ID", "To Account ID", "Amount"];
const SKELETON_ROWS = [0, 1, 2, 3, 4];

interface TransactionTableProps {
    transactions: Transaction[];
    loading?: boolean;
}

export default function TransactionTable({ transactions, loading = false }: TransactionTableProps) {
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
                    {loading && SKELETON_ROWS.map((row) => (
                        <tr key={row} className="border-b border-border">
                            {COLUMNS.map((column) => (
                                <td key={column} className="px-4 py-4">
                                    <Skeleton variant="text" width="70%" />
                                </td>
                            ))}
                        </tr>
                    ))}
                    {!loading && transactions.map((transaction) => (
                        <tr key={transaction.transaction_id} className="border-b border-border">
                            <td className="px-4 py-4">{transaction.timestamp}</td>
                            <td className="px-4 py-4 uppercase">{transaction.transfer_type}</td>
                            <td className="px-4 py-4">{transaction.transfer_type == "transfer" ? transaction.source_account : "-"}</td>
                            <td className="px-4 py-4">{transaction.transfer_type == "transfer" ? transaction.destination_account : "-"}</td>
                            <td className="px-4 py-4">{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
