"use client";

import { updateTodoItem } from "@/actions/updateTodoItem";
import TodoItem from "@/components/TodoItem";
import { TodoItemType } from "@/types/TodoItemType";
import { useState } from "react";

// Note: I couldn't use form actions nor useOptimistic because it's using the mock data.
// So I had to use local state to manage the todo items.

interface TodoListProps {
  todos: TodoItemType[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [items, setItems] = useState<(TodoItemType)[]>(todos);

  const update = async (id: string, isComplete: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isComplete } : item
      )
    );
    try {
      await updateTodoItem(id, isComplete);
    } catch {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isComplete: !isComplete } : item
        )
      ); // revert on error
    }
  };

  if (items.length === 0) {
    return <div className="text-gray-500 text-center italic">You have no todos.</div>;
  }

  const sortedItems = [...items].sort((a, b) => {
    if (a.isComplete !== b.isComplete) {
      return a.isComplete ? 1 : -1;
    }
    const now = new Date();
    const aOverdue = new Date(a.dueDate) < now;
    const bOverdue = new Date(b.dueDate) < now;
    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <>
      {sortedItems.map((item, idx) => (
        <div key={item.id}>
          <TodoItem
            id={item.id}
            description={item.description}
            isComplete={item.isComplete}
            dueDate={item.dueDate}
            update={update}
          />
          {idx < todos.length - 1 && <hr className="border-gray-300 my-6" />}
        </div>
      ))}
    </>
  );
}

export default TodoList;