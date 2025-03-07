import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the JSON request body
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields (name, email, password) are required' },
        { status: 400 }
      );
    }

    console.log("Name:", name);
    console.log("Email:", email); // Corrected from 'name' to 'email'
    console.log("Password:", password);

    // Add your logic to handle the data, like saving to the database or further validation
    // For now, we just simulate a successful response
    // Here you can hash the password or check if the email already exists, etc.
    
    return NextResponse.json(
      { message: 'User registered successfully', user: { name, email } },
      { status: 201 }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
