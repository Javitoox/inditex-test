'use client';

import { useCallback } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Search = ({
  value,
  onChange,
  placeholder = 'Buscar por marca o modelo...',
}: SearchProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
};
