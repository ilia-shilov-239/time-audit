import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { fetchTodos, toggleTodo, type Todo } from './api/todos'

export default function TodoList() {
  const queryClient = useQueryClient()

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const mutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: (updated) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((t) => (t.id === updated.id ? { ...t, completed: updated.completed } : t)),
      )
    },
  })

  if (isPending) return <CircularProgress aria-label="loading todos" />
  if (isError) return <Alert severity="error">Could not load todos.</Alert>

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id} disablePadding>
          <Checkbox
            checked={todo.completed}
            onChange={() => mutation.mutate(todo)}
            inputProps={{ 'aria-label': `toggle ${todo.title}` }}
          />
          <ListItemText
            primary={
              <Typography
                sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.title}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
