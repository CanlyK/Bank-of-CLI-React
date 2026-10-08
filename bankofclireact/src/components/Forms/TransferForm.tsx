import { useState } from "react";
import Card from "../common/Card";
import type { TransferErrors } from "../../services/transactionService";

interface TransferFormProps {
    onTransfer: (toAccountId: number, amount: number) => TransferErrors | null;
    onCancel: () => void;
    isAmountInput: (input: string) => boolean;
}

export function isAccountIdInput(value: string): boolean {
    return /^\d*$/.test(value);
}

export default function TransferForm({ onTransfer, onCancel, isAmountInput }: TransferFormProps) {
    const [amount, setAmount] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [amountError, setAmountError] = useState<string | null>(null);
    const [accountError, setAccountError] = useState<string | null>(null);

    const submitTransfer = (): void => {
        const errors = onTransfer(Number(toAccountId), Number(amount));

        if (errors) {
            setAmountError(errors.amount ?? null);
            setAccountError(toAccountId === "" ? "You must input an account ID." : errors.account ?? null);
            return;
        }

        onCancel();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Transfer Amount</h2>
                <p className="text-lg leading-tight italic">Input an amount to transfer.</p>
            </div>
            <Card className="flex flex-col gap-2 px-6 py-5 border border-border sm:px-12">
                <label htmlFor="transfer-amount" className="text-lg italic">Amount</label>
                <div className="flex items-center text-4xl font-bold sm:text-5xl">
                    <span>$</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        name="transfer-amount"
                        id="transfer-amount"
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
                <label htmlFor="transfer-account" className="text-lg italic">Account ID:</label>
                <div className="flex items-center text-4xl font-bold sm:text-5xl">
                    <input
                        type="text"
                        inputMode="numeric"
                        name="transfer-account"
                        id="transfer-account"
                        placeholder="0"
                        value={toAccountId}
                        onChange={(event) => {
                            if (isAccountIdInput(event.target.value)) {
                                setToAccountId(event.target.value);
                                setAccountError(null);
                            }
                        }}
                        aria-invalid={accountError !== null}
                        className="w-full min-w-0 bg-transparent outline-none no-spinner"
                    />
                </div>
                {accountError && <p role="alert" className="text-sm text-failure">{accountError}</p>}
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
                    onClick={submitTransfer}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-accent-gradient text-xl font-semibold text-white cursor-pointer hover:opacity-90"
                >
                    <span aria-hidden="true" className="text-base">✓</span>
                    Confirm Transfer
                </button>
            </div>
        </div>
    );
}
