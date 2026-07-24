import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Home from './Home'

function expectFixedLines(element: Element, lines: string[]) {
  const expectedNodes = lines.flatMap((line, index) => (
    index === 0 ? [line] : ['BR', line]
  ))
  const actualNodes = Array.from(element.childNodes).map((node) => (
    node.nodeName === 'BR' ? 'BR' : node.textContent
  ))

  expect(actualNodes).toEqual(expectedNodes)
}

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
    expect(screen.getByText('工业设备与智能制造')).toBeInTheDocument()
    expect(screen.getByText('工具装备与智能应用')).toBeInTheDocument()
    expect(screen.getByText('空间标识设计')).toBeInTheDocument()
  })

  it('uses the prototype service copy without English subtitles and preserves its fixed lines', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const services = [
      ['策略研究', 'STRATEGY RESEARCH', ['洞察市场与用户', '定义产品方向']],
      ['工业设计', 'INDUSTRIAL DESIGN', ['创新设计与工程实现', '提升产品竞争力']],
      ['结构设计', 'STRUCTURE DESIGN', ['结构与工艺维度', '确保量产可行']],
      ['品牌设计', 'BRAND DESIGN', ['品牌视觉与语言', '塑造品牌价值']],
      ['供应链支持', 'SUPPLY CHAIN', ['量产落地与供应链整合', '助力产品成功上市']],
    ] as const

    services.forEach(([title, english, lines]) => {
      const card = screen.getByText(title, { selector: 'strong' }).closest('.service-card')
      expect(card).not.toBeNull()
      expect(card?.textContent).not.toContain(english)

      const description = card?.querySelector('small')
      expect(description).not.toBeNull()
      expectFixedLines(description as Element, [...lines])
    })
  })

  it('uses the prototype project copy and preserves the designed description line counts', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const industrialProjects = [
      ['工业设备与智能制造', ['清晰化设计，提升产品', '检测与精度']],
      ['工具装备与智能应用', ['高效动力平台，稳定高效']],
      ['医疗健康与生命科技', ['多功能监护仪', '守护健康睡眠']],
      ['生活方式与家居用品', ['料理专家的厨房搭档', '美味生活每一天']],
      ['智能消费与生活电器', ['便携温控，专注用户体验']],
    ] as const

    industrialProjects.forEach(([title, lines]) => {
      const card = screen.getByRole('heading', { name: title }).closest('.project-card')
      expect(card).not.toBeNull()

      const description = card?.querySelector('.project-card__content p')
      expect(description).not.toBeNull()
      expectFixedLines(description as Element, [...lines])
    })

    ;['产品包装设计', '品牌视觉系统', '空间标识设计', '数字产品案例'].forEach((title) => {
      const card = screen.getByRole('heading', { name: title }).closest('.project-card')
      expect(card).not.toBeNull()
      expect(card?.querySelector('.project-card__content p')).not.toBeInTheDocument()
    })
  })

  it('exposes the red hero line as an independently targetable line', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const accentLine = screen.getByText('IMAGINATION')

    expect(accentLine).toHaveClass('home-hero__accent-line')
    expect(accentLine.parentElement?.tagName).toBe('H1')
    expect(accentLine.previousSibling?.nodeName).toBe('BR')
  })

  it('includes every project action required by the design', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /了解更多/ })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /查看案例/ })).toHaveLength(9)
    expect(screen.getByText('清晰化设计，提升产品', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('洞察市场与用户', { exact: false })).toBeInTheDocument()
  })

  it('uses dark copy only on the three light prototype project images', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const darkTitles = [
      '医疗健康与生命科技',
      '生活方式与家居用品',
      '产品包装设计',
    ]
    expect(document.querySelectorAll('.project-card--dark')).toHaveLength(3)
    darkTitles.forEach((title) => {
      expect(
        screen.getByRole('heading', { name: title }).closest('.project-card'),
      ).toHaveClass('project-card--dark')
    })
  })
})
