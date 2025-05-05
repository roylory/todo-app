'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TodoItemProps {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate?: Date;
  update: (id: string, isComplete: boolean) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, description, isComplete, dueDate, update }) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        name="isComplete"
        checked={isComplete}
        onChange={() => update(id, !isComplete)}
        className="w-5 h-5 accent-gray-500 focus:ring-gray-500 cursor-pointer"
      />
      <span className={twMerge('text-base flex-1 text-gray-800 line-clamp-1', isComplete && 'line-through')}>{description}</span>
      {dueDate && (
        <span
          className={twMerge(
            'text-xs sm:text-sm font-mono',
            !isComplete && new Date(dueDate) < new Date() ? 'text-red-500' : 'text-gray-500'
          )}
        >
          Due {new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
