"use client";

import { updateTodoItem } from "@/actions/updateTodoItem";
import TodoItem from "@/components/TodoItem";
import { TodoItemType } from "@/types/TodoItemType";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Note: I couldn't use form actions nor useOptimistic because it's using the mock data.
// So I had to use local state to manage the todo items.

interface TodoListProps {
  todos: TodoItemType[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [items, setItems] = useState<(TodoItemType)[]>(todos);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    if (!a.dueDate && b.dueDate) {
      return 1;
    }
    if (a.dueDate && !b.dueDate) {
      return -1;
    }
    const now = new Date();
    const aOverdue = a.dueDate ? new Date(a.dueDate) < now : false;
    const bOverdue = b.dueDate ? new Date(b.dueDate) < now : false;
    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }
    return (a.dueDate ? new Date(a.dueDate).getTime() : 0) - (b.dueDate ? new Date(b.dueDate).getTime() : 0);
  });

  return (
    <>
      <AnimatePresence>
        {sortedItems.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <TodoItem
              id={item.id}
              description={item.description}
              isComplete={item.isComplete}
              dueDate={item.dueDate}
              update={update}
            />
            {idx < todos.length - 1 && <hr className="border-gray-300 my-6" />}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

export default TodoList;