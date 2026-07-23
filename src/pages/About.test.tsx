import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the company proof points', () => {
    render(<About />)

    ;['8+', '100+', '300+', '创始团队', '团队成员', '合作伙伴'].forEach(
      (label) => {
        expect(screen.getByText(label, { exact: false })).toBeInTheDocument()
      },
    )
  })

  it('keeps the complete approved partner narrative', () => {
    render(<About />)

    expect(screen.getByText(/已成功携手上海电气、西屋、大宇等超200家/)).toBeInTheDocument()
    expect(screen.getByText(/打造出1000余个优秀案例/)).toBeInTheDocument()
    expect(screen.getByText(/用严谨创新、精益求精的设计助力成就产品和品牌价值/)).toBeInTheDocument()
  })
})
