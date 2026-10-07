import Card from "./common/Card";
import Skeleton from "./common/Skeleton";

interface BalanceHistoryProps {
    loading?: boolean;
}

export default function BalanceHistory({ loading = false }: BalanceHistoryProps) {
    const graph = "Graph";

    return (
        <Card className="flex flex-col col-span-2 min-h-52 p-4">
            <h2 className="text-base font-semibold">Balance History</h2>
            {loading ? (
                <div className="flex flex-1 items-center">
                    <Skeleton variant="rounded" width="100%" height={144} />
                </div>
            ) : (
                <p className="flex flex-1 items-center justify-center text-sm text-muted">{graph}</p>
            )}
        </Card>
    );
}
