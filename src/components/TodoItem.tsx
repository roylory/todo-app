import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TodoItemProps {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, description, isComplete, dueDate }) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={isComplete}
        readOnly
        className="w-5 h-5 accent-gray-500 focus:ring-gray-500 cursor-pointer"
      />
      <span className={twMerge('text-base flex-1 text-gray-800', isComplete && 'line-through')}>{description}</span>
      {dueDate && (
        <span className="text-gray-500 text-sm font-mono">
          Due {new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
