import { getTodoList } from "@/actions/getTodoList";
import TodoItem from "@/components/TodoItem";
import { TodoItemType } from "@/types/TodoItemType";

async function TodoList() {
  const todos: TodoItemType[] = await getTodoList();
  todos.sort((a, b) => {
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
    </>
  );
}

export default TodoList;