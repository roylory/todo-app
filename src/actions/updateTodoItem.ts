export async function updateTodoItem(
  id: string,
  isComplete: boolean
): Promise<{
  status: "success" | "error";
}> {
  const response = await fetch(
    "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch/" + id,
    {
      method: "PATCH",
      headers: {
        "X-Api-Key":
          "PMAK-65a6d95a73d7f315b0b3ae13-28f9a3fada28cc91e0990b112478319641",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isComplete,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update todo item");
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error("Failed to update todo item");
  }

  return {
    status: "success",
  };
}
