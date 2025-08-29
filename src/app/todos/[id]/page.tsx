'use client';

import { useTodos } from '@/contexts/TodoContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TodoDetailPage() {
  const { getTodoById } = useTodos();
  const params = useParams();
  const id = Number(params.id);
  const todo = getTodoById(id);

  if (!todo) {
    return (
      <main className="container mx-auto p-4 max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">TODOが見つかりません</h1>
          <Link href="/todos" className="text-blue-500 hover:underline mt-4 inline-block">
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 break-words">{todo.title}</h1>
        <p className="text-gray-600 mb-2">ステータス: {todo.completed ? '完了' : '未完了'}</p>
        <hr className="my-4" />
        <p className="text-lg text-gray-800 whitespace-pre-wrap break-words">{todo.content || '内容がありません'}</p>
        <div className="mt-6">
          <Link href="/todos" className="text-blue-500 hover:underline">
            &larr; 一覧に戻る
          </Link>
          <Link href={`/todos/${todo.id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4">
            編集する
          </Link>
        </div>
      </div>
    </main>
  );
}
