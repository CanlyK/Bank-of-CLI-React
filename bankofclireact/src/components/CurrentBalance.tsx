import Card from "./common/Card";

interface CurrentBalanceProps {
    balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
    return (
        <Card className="flex flex-col min-h-52 p-4">
            <h2 className="text-base font-semibold">Current Balance</h2>
            <p className="flex flex-1 items-center px-5 text-4xl font-bold">${balance.toLocaleString()}</p>
        </Card>
    );
}
