const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export interface LoginResponse {
    accountId: number;
    username: string;
    accessToken: string;
}

async function readErrorMessage(response: Response): Promise<string> {
    try {
        const data = await response.json();
        return data.errors?.[0] ?? `Request failed (${response.status})`;
    } catch {
        return `Request failed (${response.status})`;
    }
}

export async function register(username: string, name: string, pin: string): Promise<void> {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            name,
            plainTextPin: pin,
        }),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }
}

export async function login(username: string, pin: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            plainTextPin: pin,
        }),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const data = await response.json();
    return data.data;
}