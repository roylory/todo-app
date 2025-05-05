import React, { Suspense } from 'react';
import TodoListSkeleton from '@/components/TodoListSkeleton';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-6 sm:mt-12 max-w-xl w-full mx-auto px-6">
        <Suspense fallback={<TodoListSkeleton />}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  );
}
