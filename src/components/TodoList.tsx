'use client';

import { useTodos } from '@/contexts/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { filteredTodos } = useTodos();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">TODOリスト</h2>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">表示するTODOがありません。</p>
      )}
    </div>
  );
};
