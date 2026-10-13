import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TodoList from './TodoList'

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todos
      </Typography>
      <TodoList />
    </Container>
  )
}
