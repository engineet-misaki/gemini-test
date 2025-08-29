'use client';

import { useState } from 'react';
import { useTodos } from '@/contexts/TodoContext';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchTodos } = useTodos();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    searchTodos(newQuery);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="TODOを検索..."
      />
    </div>
  );
};
