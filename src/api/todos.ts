export interface Todo {
  id: number
  title: string
  completed: boolean
}

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?_limit=10`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed }),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return res.json()
}
