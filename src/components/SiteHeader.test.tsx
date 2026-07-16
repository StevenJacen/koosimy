import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import SiteHeader from './SiteHeader'

describe('SiteHeader', () => {
  it('marks the active route and toggles the mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/about']}>
        <SiteHeader />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await user.click(screen.getByRole('button', { name: '打开导航' }))
    expect(screen.getByRole('dialog', { name: '网站导航' })).toBeInTheDocument()
  })
})
