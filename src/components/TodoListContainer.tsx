import { getTodoList } from "@/actions/getTodoList";
import { TodoItemType } from "@/types/TodoItemType";
import TodoList from "./TodoList";

async function TodoListContainer() {
  let todos: TodoItemType[] = await getTodoList();

  return (
    <TodoList todos={todos} />
  );
}

export default TodoListContainer;