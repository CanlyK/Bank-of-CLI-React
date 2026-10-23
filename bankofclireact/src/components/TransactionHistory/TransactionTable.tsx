import Skeleton from "../common/Skeleton";
import type { Transaction } from "../../domain/Transaction";

const COLUMNS = ["Date/Time", "Category", "From", "To", "Amount", "Description"];
const SKELETON_ROWS = [0, 1, 2, 3, 4];

interface TransactionTableProps {
    transactions: Transaction[];
    loading?: boolean;
}

export default function TransactionTable({ transactions, loading = false }: TransactionTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-xl text-left text-xs whitespace-nowrap">
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
                    {!loading && transactions.length === 0 && (
                        <tr>
                            <td colSpan={COLUMNS.length} className="px-4 py-6 text-center text-muted">
                                No transactions found.
                            </td>
                        </tr>
                    )}
                    {!loading && transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-border">
                            <td className="px-4 py-4">{new Date(transaction.timestamp).toLocaleString()}</td>
                            <td className="px-4 py-4 uppercase">{transaction.transferType}</td>
                            <td className="px-4 py-4">{transaction.sourceUsername}</td>
                            <td className="px-4 py-4">{transaction.destinationUsername ?? "-"}</td>
                            <td className="px-4 py-4">{transaction.amount}</td>
                            <td className="px-4 py-4">{transaction.description ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}