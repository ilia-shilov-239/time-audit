import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TodoList from './TodoList'
import ConfirmDialog from './ConfirmDialog'

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1" gutterBottom>
          Todos
        </Typography>
        <Button onClick={() => setDialogOpen(true)}>Clear completed</Button>
      </Stack>
      <TodoList />
      <ConfirmDialog
        open={dialogOpen}
        onConfirm={() => setDialogOpen(false)}
        onCancel={() => setDialogOpen(false)}
      />
    </Container>
  )
}
