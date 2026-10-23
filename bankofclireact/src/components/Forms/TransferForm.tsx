import { useState } from "react";
import Card from "../common/Card";
import type { TransferErrors } from "../../services/transactionService";

interface TransferFormProps {
    onTransfer: (toUsername: string, amount: number) => Promise<TransferErrors | null>;
    onCancel: () => void;
    isAmountInput: (input: string) => boolean;
}

export function isUsernameInput(value: string): boolean {
    return value.length <= 20;
}

export default function TransferForm({ onTransfer, onCancel, isAmountInput }: TransferFormProps) {
    const [amount, setAmount] = useState("");
    const [toUsername, setToUsername] = useState("");
    const [amountError, setAmountError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const submitTransfer = async (): Promise<void> => {
        const trimmed = toUsername.trim();

        if (trimmed === "") {
            setUsernameError("You must input a username.");
            return;
        }

        const errors = await onTransfer(trimmed, Number(amount));

        if (errors) {
            setAmountError(errors.amount ?? null);
            setUsernameError(errors.account ?? null);
            setGeneralError(errors.general ?? null);
            return;
        }

        setAmountError(null);
        setUsernameError(null);
        setGeneralError(null);
        onCancel();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Transfer Amount</h2>
                <p className="text-lg leading-tight italic">Input an amount and a recipient username.</p>
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
                <label htmlFor="transfer-username" className="text-lg italic">Recipient username:</label>
                <div className="flex items-center text-4xl font-bold sm:text-5xl">
                    <input
                        type="text"
                        name="transfer-username"
                        id="transfer-username"
                        placeholder="username"
                        value={toUsername}
                        maxLength={20}
                        autoComplete="off"
                        onChange={(event) => {
                            if (isUsernameInput(event.target.value)) {
                                setToUsername(event.target.value);
                                setUsernameError(null);
                            }
                        }}
                        aria-invalid={usernameError !== null}
                        className="w-full min-w-0 bg-transparent outline-none text-2xl sm:text-3xl"
                    />
                </div>
                {usernameError && <p role="alert" className="text-sm text-failure">{usernameError}</p>}
                {generalError && <p role="alert" className="text-sm text-failure">{generalError}</p>}
            </Card>
            <div className="flex flex-col gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-md bg-surface text-xl font-semibold cursor-pointer hover:bg-surface-hover"
                >
                    <span aria-hidden="true" className="text-base"></span>
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={submitTransfer}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-accent-gradient text-xl font-semibold text-white cursor-pointer hover:opacity-90"
                >
                    <span aria-hidden="true" className="text-base"></span>
                    Confirm Transfer
                </button>
            </div>
        </div>
    );
}