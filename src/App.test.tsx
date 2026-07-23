import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('application routes', () => {
  it.each([
    ['/', 'home', '设计 · 连接未来'],
    ['/cases', 'cases', '玉环职智能水壶'],
    ['/about', 'about', '让好设计 成就商业价值'],
    ['/contact', 'contact', '联系我们'],
  ])('renders %s with the rebuilt page contract', (route, page, heading) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByTestId(`${page}-page`)).toBeInTheDocument()
    expect(screen.getAllByText(heading, { exact: false }).length).toBeGreaterThan(0)
  })

  it('credits the supplied icon set in the shared footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Icons by Nobita \(IcoFont\)/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'CC BY 4.0' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/',
    )
  })
})
