import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  id: string;
}

// IDで指定したTODOを取得
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });
  if (!todo) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json(todo);
}

// TODOを更新
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  const { title, content, completed } = await request.json();
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(params.id) },
    data: {
      title,
      content,
      completed,
    },
  });
  return NextResponse.json(updatedTodo);
}

// TODOを削除
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  await prisma.todo.delete({
    where: { id: Number(params.id) },
  });
  return new NextResponse(null, { status: 204 });
}
