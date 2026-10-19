
export interface LoginResponse {
    accountId: Number;
    username: string;
    pin: string;
}

export async function register(username: string, name: string, pin: string): Promise<void> {
    const response = await fetch("http://localhost:8080/api/auth/register", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            name: name,
            plainTextPin: pin
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors[0]);
    }

}

export async function login(username: string, pin: string): Promise<LoginResponse> {

    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            plainTextPin: pin
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors[0]);
    }
    const data = await response.json();
    return data.data;
}