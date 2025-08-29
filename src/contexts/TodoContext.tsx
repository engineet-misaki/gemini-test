'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '@/types';

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  getTodoById: (id: number) => Todo | undefined;
  addTodo: (todo: Omit<Todo, 'id' | 'completed'>) => void;
  updateTodo: (id: number, todo: Partial<Omit<Todo, 'id'>>) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  searchTodos: (query: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Next.jsの学習', content: 'App Routerを理解する', completed: false },
    { id: 2, title: 'Tailwind CSSの練習', content: 'レスポンシブデザインを実装する', completed: true },
    { id: 3, title: 'TODOアプリの作成', content: '詳細ページと編集機能を追加する', completed: false },
  ]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const getTodoById = (id: number) => {
    return todos.find((todo) => todo.id === id);
  };

  const addTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    const newTodo = { ...todo, id: Date.now(), completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const updateTodo = (id: number, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const searchTodos = (query: string) => {
    if (!query) {
      setFilteredTodos(todos);
    } else {
      const results = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          todo.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTodos(results);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        getTodoById,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        searchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
