import { TodoItemType } from "@/types/TodoItemType";

export async function getTodoList(): Promise<TodoItemType[]> {
  const response = await fetch(
    "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get",
    {
      headers: {
        "X-Api-Key":
          "PMAK-65a6d95a73d7f315b0b3ae13-28f9a3fada28cc91e0990b112478319641",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todo list");
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid response format");
  }

  return data.map((todo) => ({
    id: todo.id,
    description: todo.description,
    isComplete: todo.isComplete,
    dueDate: new Date(todo.dueDate),
  }));
}
