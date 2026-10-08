import { useState } from "react";
import Card from "../common/Card";

interface WithdrawFormProps {
    onWithdraw: (amount: number) => string | null;
    onCancel: () => void;
    isAmountInput: (input: string) => boolean;
}

export default function WithdrawForm({ onWithdraw, onCancel, isAmountInput }: WithdrawFormProps) {
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState<string | null>(null);

    const submitWithdraw = (): void => {
        const error = onWithdraw(Number(amount));

        if (error) {
            setAmountError(error);
            return;
        }

        onCancel();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Withdraw Amount</h2>
                <p className="text-lg leading-tight italic">Input an amount to withdraw.</p>
            </div>
            <Card className="flex flex-col gap-2 px-6 py-5 border border-border sm:px-12">
                <label htmlFor="withdraw" className="text-lg italic">Amount</label>
                <div className="flex items-center text-4xl font-bold sm:text-5xl">
                    <span>$</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        name="withdraw"
                        id="withdraw"
                        placeholder="0"
                        value={amount}
                        onChange={(event) => {
                            if (isAmountInput(event.target.value)) {
                                setAmount(event.target.value);
                                setAmountError(null);
                            }
                        }}
                        aria-invalid={amountError !== null}
                        className="w-full min-w-0 bg-transparent outline-none no-spinner"
                    />
                </div>
                {amountError && <p role="alert" className="text-sm text-failure">{amountError}</p>}
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
