import { useState } from "react";
import Card from "../common/Card";

interface DepositFormProps {
    onDeposit: (amount: number) => void;
    onCancel: () => void;
}

export default function DepositForm({ onDeposit, onCancel }: DepositFormProps) {
    const [amount, setAmount] = useState("");

    const submitDeposit = (): void => {
        const depositAmount = Number(amount);

        if (!Number.isFinite(depositAmount) || depositAmount <= 0) {
            return;
        }

        onDeposit(depositAmount);
        onCancel();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Confirm Transaction</h2>
                <p className="text-lg leading-tight italic">Are you sure you want to deposit amount?</p>
            </div>
            <Card className="flex flex-col gap-2 px-12 py-5 border border-border">
                <label htmlFor="deposit" className="text-lg italic">Amount</label>
                <div className="flex items-center text-5xl font-bold">
                    <span>$</span>
                    <input
                        type="number"
                        name="deposit"
                        id="deposit"
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
                    className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-full bg-white text-xl font-semibold cursor-pointer hover:bg-surface-hover"
                >
                    <span aria-hidden="true" className="text-base">✕</span>
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={submitDeposit}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-accent-gradient text-xl font-semibold text-white cursor-pointer hover:opacity-90"
                >
                    <span aria-hidden="true" className="text-base">✓</span>
                    Confirm transfer
                </button>
            </div>
        </div>
    );
}
