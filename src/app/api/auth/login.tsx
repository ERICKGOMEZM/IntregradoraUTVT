
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Lógica de autenticación
    if (email === "user@example.com" && password === "password") {
        return NextResponse.json({ message: 'Login successful' });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
