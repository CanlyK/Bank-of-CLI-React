import Card from "./common/Card";
import Skeleton from "./common/Skeleton";

interface CurrentBalanceProps {
    balance: number;
    loading?: boolean;
}

export default function CurrentBalance({ balance, loading = false }: CurrentBalanceProps) {
    return (
        <Card className="flex flex-col min-h-52 p-4">
            <h2 className="text-base font-semibold">Current Balance</h2>
            <p className="flex flex-1 items-center px-5 text-4xl font-bold">
                {loading ? <Skeleton variant="text" width="60%" /> : `$${balance.toLocaleString()}`}
            </p>
        </Card>
    );
}
