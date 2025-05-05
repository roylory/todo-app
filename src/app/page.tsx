import { TodoItemType } from '@/types/TodoItemType';
import { getTodoList } from '../actions/getTodoList';
import TodoItem from '@/components/TodoItem';

export default async function HomePage() {
  let todos: TodoItemType[] = [];
  try {
    todos = await getTodoList();
    todos.sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? 1 : -1; // Completed items come last
      }
      const now = new Date();
      const aOverdue = new Date(a.dueDate) < now;
      const bOverdue = new Date(b.dueDate) < now;
      if (aOverdue !== bOverdue) {
        return aOverdue ? -1 : 1; // Overdue items come first
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); // Sort by due date
    });
  } catch (error) {
    // Optionally handle error
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-12 max-w-xl w-full mx-auto px-4">
        {todos.map((todo, idx) => (
          <div key={todo.id}>
            <TodoItem
              id={todo.id}
              description={todo.description}
              isComplete={todo.isComplete}
              dueDate={todo.dueDate}
            />
            {idx < todos.length - 1 && <hr className="border-gray-300 my-6" />}
          </div>
        ))}
      </div>
    </div>
  );
}
