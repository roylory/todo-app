import { getTodoList } from '../actions/getTodoList';

export default async function HomePage() {
  let todos = [];
  try {
    todos = await getTodoList();
  } catch (error) {
    // Optionally handle error
  }
  return (
    <div>
      <ul>
        {Array.isArray(todos) && todos.map((todo: any, idx: number) => (
          <li key={todo.id || idx}>{todo.title || JSON.stringify(todo)}</li>
        ))}
      </ul>
    </div>
  );
}
