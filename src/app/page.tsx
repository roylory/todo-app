import React, { Suspense } from 'react';
import TodoListSkeleton from '@/components/TodoListSkeleton';
import TodoListContainer from '@/components/TodoListContainer';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-6 sm:mt-12 max-w-xl w-full mx-auto px-6">
        <Suspense fallback={<TodoListSkeleton />}>
          <TodoListContainer />
        </Suspense>
      </div>
    </div>
  );
}
