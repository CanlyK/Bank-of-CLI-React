import type { User } from '../domain/Account';

export async function getMe(token: string): Promise<User> {
    const response = await fetch(`http://localhost:8080/api/users/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
}
