import Card from "./common/Card";

export default function BalanceHistory() {
    const graph = "Graph";

    return (
        <Card className="flex flex-col col-span-2 min-h-52 p-4">
            <h2 className="text-base font-semibold">Balance History</h2>
            <p className="flex flex-1 items-center justify-center text-sm text-muted">{graph}</p>
        </Card>
    );
}
