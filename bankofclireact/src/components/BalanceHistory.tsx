import Card from "./common/Card";
import Skeleton from "./common/Skeleton";
import BalanceGraph from "./BalanceGraph";
import type { Transaction } from "../domain/Transaction";

export interface BalancePoint {
    timestamp: string;
    balance: number;
}

// How much a single transaction changed the balance of `accountId`.
function signedDelta(transaction: Transaction, accountId: number): number {
    const type = transaction.transfer_type.toLowerCase();

    if (type === "deposit") return transaction.amount;
    if (type === "withdraw") return -transaction.amount;
    if (type === "transfer") {
        // Outgoing transfers reduce the balance, incoming transfers increase it.
        return transaction.source_account === accountId ? -transaction.amount : transaction.amount;
    }
    return 0;
}

// Works backwards from the current balance so the final point always equals it.
export function buildBalanceHistory(
    transactions: Transaction[],
    accountId: number,
    currentBalance: number
): BalancePoint[] {
    const ordered = [...transactions].sort((a, b) => a.transaction_id - b.transaction_id);

    const totalDelta = ordered.reduce((sum, t) => sum + signedDelta(t, accountId), 0);
    let running = currentBalance - totalDelta;

    const points: BalancePoint[] = [{ timestamp: "Start", balance: running }];

    for (const transaction of ordered) {
        running += signedDelta(transaction, accountId);
        points.push({ timestamp: transaction.timestamp, balance: running });
    }

    return points;
}

interface BalanceHistoryProps {
    transactions: Transaction[];
    accountId: number;
    balance: number;
    loading?: boolean;
}

export default function BalanceHistory({ transactions, accountId, balance, loading = false }: BalanceHistoryProps) {
    const points = buildBalanceHistory(transactions, accountId, balance);

    return (
        <Card className="flex flex-col min-h-52 p-4 md:col-span-2">
            <h2 className="text-base font-semibold">Balance History</h2>
            {loading ? (
                <div className="flex flex-1 items-center">
                    <Skeleton variant="rounded" width="100%" height={144} />
                </div>
            ) : (
                <div className="flex flex-1 items-center">
                    <BalanceGraph points={points} />
                </div>
            )}
        </Card>
    );
}