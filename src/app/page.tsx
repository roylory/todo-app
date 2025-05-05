import { TodoItemType } from '@/types/TodoItemType';
import { getTodoList } from '../actions/getTodoList';
import TodoItem from '@/components/TodoItem';

export default async function HomePage() {
  let todos: TodoItemType[] = [];
  try {
    todos = await getTodoList();
  } catch (error) {
    // Optionally handle error
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-8 max-w-xl w-full mx-auto px-4">
        {todos.map((todo, idx) => (
          <div key={todo.id}>
            <TodoItem
              id={todo.id}
              description={todo.description}
              completed={todo.completed}
              dueDate={todo.dueDate}
            />
            {idx < todos.length - 1 && <hr className="border-gray-300 my-6" />}
          </div>
        ))}
      </div>
    </div>
  );
}
