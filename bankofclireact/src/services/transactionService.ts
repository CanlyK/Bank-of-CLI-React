const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export interface TransactionDto {
    id: number;
    amount: number;
    transferType: string;
    timestamp: string;
    sourceUsername: string;
    destinationUsername: string | null;
    description: string | null;
}

export interface TransferErrors {
    amount?: string;
    account?: string;
    general?: string;
}

export function getAmountError(amount: number): string | null {
    if (!Number.isFinite(amount) || amount <= 0) {
        return "You must input an amount.";
    }
    return null;
}

async function readErrorMessage(response: Response): Promise<string> {
    try {
        const data = await response.json();
        return data.errors?.[0] ?? `Request failed (${response.status})`;
    } catch {
        return `Request failed (${response.status})`;
    }
}

async function postTransaction(path: string, token: string, body: unknown): Promise<TransactionDto> {
    const response = await fetch(`${API_BASE}/api/transactions/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }
    return response.json();
}

export async function deposit(
    token: string,
    username: string,
    amount: number,
    description?: string
): Promise<TransactionDto> {
    const amountError = getAmountError(amount);
    if (amountError) throw new Error(amountError);

    return postTransaction("deposit", token, { username, amount, description });
}

export async function withdraw(
    token: string,
    username: string,
    amount: number,
    description?: string
): Promise<TransactionDto> {
    const amountError = getAmountError(amount);
    if (amountError) throw new Error(amountError);

    return postTransaction("withdraw", token, { username, amount, description });
}

export async function transfer(
    token: string,
    username: string,
    destinationUsername: string,
    amount: number,
    description?: string
): Promise<TransactionDto> {
    const amountError = getAmountError(amount);
    if (amountError) throw new Error(amountError);

    return postTransaction("transfer", token, {
        username,
        destinationUsername,
        amount,
        description,
    });
}

export async function getTransactions(token: string, username: string): Promise<TransactionDto[]> {
    const response = await fetch(
        `${API_BASE}/api/transactions?username=${encodeURIComponent(username)}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }
    return response.json();
}