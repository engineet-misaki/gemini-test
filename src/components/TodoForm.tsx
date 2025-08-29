'use client';

import { useState, useEffect } from 'react';
import { useTodos } from '@/contexts/TodoContext';
import { Todo } from '@/types';

interface TodoFormProps {
  todo?: Todo;
  onSave?: () => void;
}

export const TodoForm = ({ todo, onSave }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addTodo, updateTodo } = useTodos();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setContent(todo.content);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (todo) {
      updateTodo(todo.id, { title, content });
    } else {
      addTodo({ title, content });
      setTitle('');
      setContent('');
    }

    if (onSave) {
      onSave();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">{todo ? 'TODOを編集' : '新しいTODOを追加'}</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="例: Next.jsの学習"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          placeholder="例: App Routerの基本的な使い方をマスターする"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {todo ? '更新' : '追加'}
      </button>
    </form>
  );
};
