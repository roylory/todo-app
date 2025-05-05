'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { updateTodoItem } from '@/actions/updateTodoItem';

interface TodoItemProps {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date;
}

// Note: I couldn't use form actions nor useOptimistic because it's using the mock data.

const TodoItem: React.FC<TodoItemProps> = ({ id, description, isComplete, dueDate }) => {
  const [localComplete, setLocalComplete] = useState(isComplete);
  const [isPending, setIsPending] = useState(false);

  async function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked;
    setLocalComplete(checked);
    setIsPending(true);
    try {
      await updateTodoItem(id, checked);
    } catch (e) {
      setLocalComplete(isComplete); // revert on error
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        name="isComplete"
        checked={localComplete}
        disabled={isPending}
        onChange={handleCheckboxChange}
        className="w-5 h-5 accent-gray-500 focus:ring-gray-500 cursor-pointer"
      />
      <span className={twMerge(
        'text-base flex-1 text-gray-800',
        localComplete && 'line-through',
        isPending && 'text-gray-500')}>{description}</span>
      {dueDate && (
        <span className="text-gray-500 text-sm font-mono">
          Due {new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
