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

  it('uses the single-column prototype introduction', () => {
    render(<Cases />)

    expect(screen.getByTestId('case-intro-content')).toHaveTextContent(
      '将净化、加热、冲泡、陪伴融为一体',
    )
    expect(screen.getByTestId('case-intro-content')).toHaveTextContent(
      '让科技不再只是功能动作，而成为空间中的一部分',
    )
  })
})
