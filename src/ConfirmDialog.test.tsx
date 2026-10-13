import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmDialog from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    render(<ConfirmDialog open={false} onConfirm={vi.fn()} onCancel={vi.fn()} />)

    expect(screen.queryByText('Clear completed todos?')).not.toBeInTheDocument()
  })

  it('renders its title and body text when open', () => {
    render(<ConfirmDialog open={true} onConfirm={vi.fn()} onCancel={vi.fn()} />)

    expect(screen.getByText('Clear completed todos?')).toBeInTheDocument()
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument()
  })

  it('calls onConfirm when Ok is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()

    render(<ConfirmDialog open={true} onConfirm={onConfirm} onCancel={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Ok' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(<ConfirmDialog open={true} onConfirm={vi.fn()} onCancel={onCancel} />)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when the dialog is dismissed via Escape', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(<ConfirmDialog open={true} onConfirm={vi.fn()} onCancel={onCancel} />)
    await user.keyboard('{Escape}')

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
