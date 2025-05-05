import React from 'react';
import { twJoin } from 'tailwind-merge';

const TodoListSkeleton = () => (
  <>
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx}>
        <div className="mb-6 animate-pulse flex items-center gap-4">
          <div className="w-6 h-6 bg-gray-100 rounded-sm" />
          <div className={twJoin(
            "h-5 bg-gray-100 rounded-sm flex-1",
            idx === 0 && "mr-20",
            idx === 1 && "mr-10",
            idx === 2 && "mr-30",
            idx === 3 && "mr-20",
          )} />
          <div className="h-5 bg-gray-100 rounded-sm w-24" />
        </div>
        {idx < 3 && <hr className="border-gray-300 my-6" />}
      </div>
    ))}
  </>
);

export default TodoListSkeleton;
