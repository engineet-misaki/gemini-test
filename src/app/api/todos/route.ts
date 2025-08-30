import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 全てのTODOを取得
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

// 新しいTODOを作成
export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newTodo = await prisma.todo.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(newTodo, { status: 201 });
}
