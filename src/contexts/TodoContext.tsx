'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Todo } from '@/types';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  isLoading: boolean;
  error: any;
  getTodoById: (id: number) => Todo | undefined;
  addTodo: (todo: Omit<Todo, 'id' | 'completed'>) => Promise<void>;
  updateTodo: (id: number, todo: Partial<Omit<Todo, 'id'>>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
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
  const { data: todos, error, isLoading } = useSWR<Todo[]>('/api/todos', fetcher);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (todos) {
      setFilteredTodos(todos);
    }
  }, [todos]);

  const getTodoById = (id: number) => {
    return todos?.find((todo) => todo.id === id);
  };

  const addTodo = async (todo: Omit<Todo, 'id' | 'completed'>) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    mutate('/api/todos');
  };

  const updateTodo = async (id: number, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
    await fetch(`/api/todos/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      }
    );
    mutate('/api/todos');
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    mutate('/api/todos');
  };

  const toggleTodo = async (id: number) => {
    const todo = todos?.find(t => t.id === id);
    if (!todo) return;
    await updateTodo(id, { completed: !todo.completed });
  };

  const searchTodos = (query: string) => {
    if (!todos) return;
    if (!query) {
      setFilteredTodos(todos);
    } else {
      const results = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          (todo.content && todo.content.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredTodos(results);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos || [],
        filteredTodos,
        isLoading,
        error,
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