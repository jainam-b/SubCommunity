import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method
export async function GET() {
  return NextResponse.json({ message: 'hello' });
}

// POST method
export async function POST(req: Request) {
  try {
    const { title, description, imageUrl } = await req.json();

    // Ensure all necessary data is present
    if (!title || !description || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prisma create query
    const newDesign = await prisma.design.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(newDesign, { status: 201 });
  } catch (error) {
    console.error('Error creating design:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
