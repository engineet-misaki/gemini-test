'use client';

import { useTodos } from '@/contexts/TodoContext';
import { TodoForm } from '@/components/TodoForm';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditTodoPage() {
  const { getTodoById } = useTodos();
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const todo = getTodoById(id);

  const handleSave = () => {
    router.push(`/todos/${id}`);
  };

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
      <TodoForm todo={todo} onSave={handleSave} />
      <div className="mt-4">
        <Link href={`/todos/${id}`} className="text-blue-500 hover:underline">
          &larr; 詳細に戻る
        </Link>
      </div>
    </main>
  );
}
