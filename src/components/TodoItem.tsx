'use client';

import Link from 'next/link';
import { useTodos } from '@/contexts/TodoContext';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo } = useTodos();

  const handleDelete = () => {
    if (window.confirm(`「${todo.title}」を本当に削除しますか？`)) {
      deleteTodo(todo.id);
    }
  };

  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <Link href={`/todos/${todo.id}`} className={`ml-4 text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={`/todos/${todo.id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">
          編集
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          削除
        </button>
      </div>
    </li>
  );
};
