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

  it('uses the supplied service SVGs and prototype award order', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('service-icon-strategy')).toHaveAttribute(
      'src',
      '/assets/home/icon-strategy.svg',
    )
    expect(screen.getByTestId('service-icon-industrial')).toHaveAttribute(
      'src',
      '/assets/home/icon-industrial.svg',
    )
    expect(screen.getByTestId('service-icon-supply-chain')).toHaveAttribute(
      'src',
      '/assets/home/icon-supply-chain.svg',
    )
    expect(screen.getAllByTestId('award-logo').map((image) => image.getAttribute('alt'))).toEqual([
      'K-DESIGN AWARD',
      'RED DOT DESIGN AWARD',
      'MUSE DESIGN AWARDS',
      'IDA DESIGN AWARDS',
      'iF DESIGN AWARD',
    ])
    expect(screen.getByText('工业装备与智能制造')).toBeInTheDocument()
    expect(screen.getByText('工具装备与智能应用')).toBeInTheDocument()
    expect(screen.getByText('空间导视设计')).toBeInTheDocument()
  })

  it('includes every project action required by the design', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /了解更多/ })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /查看案例/ })).toHaveLength(9)
    expect(screen.getByText('用系统设计串联高效生产与安全操作')).toBeInTheDocument()
    expect(screen.getByText('让品牌在包装、空间与数字触点保持一致')).toBeInTheDocument()
    expect(screen.getByText('定义产品机会，建立清晰创新方向')).toBeInTheDocument()
  })
})
