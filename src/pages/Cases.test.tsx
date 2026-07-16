import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Cases from './Cases'

describe('Cases', () => {
  it('renders the kettle study and advances related cases', async () => {
    const user = userEvent.setup()
    render(<Cases />)

    expect(
      screen.getByRole('heading', { name: '玉环职智能水壶' }),
    ).toBeInTheDocument()
    const firstBefore = screen.getAllByTestId('related-case-title')[0].textContent
    await user.click(screen.getByRole('button', { name: '下一个案例' }))
    expect(screen.getAllByTestId('related-case-title')[0]).not.toHaveTextContent(
      firstBefore ?? '',
    )
  })
})
