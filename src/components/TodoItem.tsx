import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TodoItemProps {
  id: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, description, completed, dueDate }) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={completed}
        readOnly
        className={twMerge('w-5 h-5', completed && 'bg-gray-500')}
      />
      <span className={twMerge('text-base flex-1', completed && 'line-through')}>{description}</span>
      {dueDate && (
        <span className="text-gray-500 text-sm font-mono">
          Due {new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
