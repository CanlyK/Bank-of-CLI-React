import { useState } from "react";
import Card from "../common/Card";

interface WithdrawFormProps {
    onWithdraw: (amount: number) => void;
    onCancel: () => void;
}

export default function WithdrawForm({ onWithdraw, onCancel }: WithdrawFormProps) {
    const [amount, setAmount] = useState("");

    const submitWithdraw = (): void => {
        const withdrawAmount = Number(amount);

        if (!Number.isFinite(withdrawAmount) || withdrawAmount <= 0) {
            return;
        }

        onWithdraw(withdrawAmount);
        onCancel();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Withdraw Amount</h2>
                <p className="text-lg leading-tight italic">Input an amount to withdraw.</p>
            </div>
            <Card className="flex flex-col gap-2 px-12 py-5 border border-border">
                <label htmlFor="withdraw" className="text-lg italic">Amount</label>
                <div className="flex items-center text-5xl font-bold">
                    <span>$</span>
                    <input
                        type="number"
                        name="withdraw"
                        id="withdraw"
                        placeholder="0"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        className="w-full min-w-0 bg-transparent outline-none no-spinner"
                    />
                </div>
            </Card>
            <div className="flex flex-col gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-full bg-surface text-xl font-semibold cursor-pointer hover:bg-surface-hover"
                >
                    <span aria-hidden="true" className="text-base">✕</span>
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={submitWithdraw}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-accent-gradient text-xl font-semibold text-white cursor-pointer hover:opacity-90"
                >
                    <span aria-hidden="true" className="text-base">✓</span>
                    Confirm Withdrawal
                </button>
            </div>
        </div>
    );
}
