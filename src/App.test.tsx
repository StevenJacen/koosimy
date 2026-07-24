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

  it('keeps the shared footer limited to prototype content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.queryByText(/Icons by Nobita \(IcoFont\)/)).not.toBeInTheDocument()
    expect(screen.queryByText(/All rights reserved/)).not.toBeInTheDocument()
    expect(
      screen.getByText('上海市闵行区上海市闵行区光中路255号 2栋508'),
    ).toBeInTheDocument()
  })

  it('renders the prototype check icons and footer QR captions', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getAllByTestId('future-check-icon')).toHaveLength(3)
    expect(screen.getByText('联系我们', { selector: 'figcaption' })).toBeInTheDocument()
    expect(screen.getByText('抖音搜索', { selector: 'figcaption' })).toBeInTheDocument()
  })
})
