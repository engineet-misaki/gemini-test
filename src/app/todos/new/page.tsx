'use client';

import { TodoForm } from '@/components/TodoForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTodoPage() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/todos');
  };

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <TodoForm onSave={handleSave} />
      <div className="mt-4">
        <Link href="/todos" className="text-blue-500 hover:underline">
          &larr; 一覧に戻る
        </Link>
      </div>
    </main>
  );
}
