import CurrentBalance from "../components/CurrentBalance";
import BalanceHistory from "../components/BalanceHistory";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import { useBanking } from "../hooks/useBanking";

const CURRENT_ACCOUNT_ID = 1;

export default function Dashboard() {
    const { account, transactions, deposit } = useBanking(CURRENT_ACCOUNT_ID);

    return (
        <div className="flex flex-col gap-6 w-7/10 mx-auto py-8">
            <div>
                <h1 className="text-4xl font-bold">Welcome back, {account.name}.</h1>
                <p className="mt-2 text-sm">Stay on top of your account activity and transactions.</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <CurrentBalance balance={account.balance} />
                <BalanceHistory />
            </div>
            <TransactionHistory transactions={transactions} onDeposit={deposit} />
        </div>
    );
}
