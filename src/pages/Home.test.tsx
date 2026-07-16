import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders every prototype section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    ;[
      '设计 · 连接未来',
      '我们能做什么',
      '工业设计项目',
      '品牌与数字项目',
      '荣誉与认可',
      '我们设计未来',
    ].forEach((label) => {
      expect(screen.getByText(label, { exact: false })).toBeInTheDocument()
    })
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(12)
  })
})
