import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user to your database
    // const user = await saveUserToDatabase({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'User registration failed' },
      { status: 400 }
    );
  }
}
    