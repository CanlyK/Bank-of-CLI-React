import Card from "./common/Card";
import Skeleton from "./common/Skeleton";
import BalanceGraph from "./BalanceGraph";
import type { Transaction } from "../domain/Transaction";

export interface BalancePoint {
    timestamp: string;
    balance: number;
}

function formatTimestamp(raw: string): string {
    const trimmed = raw.replace(/(\.\d{3})\d+/, "$1");
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? raw : date.toLocaleString();
}

function signedDelta(transaction: Transaction, username: string): number {
    const type = transaction.transferType.toLowerCase();

    if (type === "deposit") return transaction.amount;
    if (type === "withdraw") return -transaction.amount;
    if (type === "transfer") {
        return transaction.sourceUsername === username ? -transaction.amount : transaction.amount;
    }
    return 0;
}

export function buildBalanceHistory(
    transactions: Transaction[],
    username: string,
    currentBalance: number
): BalancePoint[] {
    const ordered = [...transactions].sort((a, b) => a.id - b.id);

    const totalDelta = ordered.reduce((sum, t) => sum + signedDelta(t, username), 0);
    let running = currentBalance - totalDelta;

    const points: BalancePoint[] = [{ timestamp: "Start", balance: running }];

    for (const transaction of ordered) {
        running += signedDelta(transaction, username);
        points.push({ timestamp: formatTimestamp(transaction.timestamp), balance: running });
    }

    return points;
}

interface BalanceHistoryProps {
    transactions: Transaction[];
    username: string;
    balance: number;
    loading?: boolean;
}

export default function BalanceHistory({ transactions, username, balance, loading = false }: BalanceHistoryProps) {
    const points = buildBalanceHistory(transactions, username, balance);

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