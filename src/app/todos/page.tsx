'use client';

import Link from 'next/link';
import { TodoList } from '@/components/TodoList';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">TODO App</h1>
      </div>
      <div className="mb-4">
        <Link href="/todos/new" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center">
          新しいTODOを登録
        </Link>
      </div>
      <SearchBar />
      <TodoList />
    </main>
  );
}
