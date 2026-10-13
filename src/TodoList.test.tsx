import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithQueryClient } from './test-utils'
import TodoList from './TodoList'
import type { Todo } from './api/todos'

const mockTodos: Todo[] = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
]

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('TodoList', () => {
  it('shows a loading state before data arrives', () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}) as never)

    renderWithQueryClient(<TodoList />)

    expect(screen.getByLabelText('loading todos')).toBeInTheDocument()
  })

  it('renders fetched todos', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockTodos,
    } as Response)

    renderWithQueryClient(<TodoList />)

    expect(await screen.findByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
    expect(screen.getByLabelText('toggle Buy milk')).not.toBeChecked()
    expect(screen.getByLabelText('toggle Walk the dog')).toBeChecked()
  })

  it('shows an error message when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as Response)

    renderWithQueryClient(<TodoList />)

    expect(await screen.findByText('Could not load todos.')).toBeInTheDocument()
  })

  it('toggles a todo when its checkbox is clicked', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockImplementation((_url, options) => {
      if ((options as RequestInit | undefined)?.method === 'PATCH') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ...mockTodos[0], completed: true }),
        } as Response)
      }
      return Promise.resolve({ ok: true, json: async () => mockTodos } as Response)
    })

    renderWithQueryClient(<TodoList />)

    const checkbox = await screen.findByLabelText('toggle Buy milk')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    await waitFor(() => expect(checkbox).toBeChecked())
  })
})
