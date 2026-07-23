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

  it('renders the company profile as whitespace-free semantic paragraphs', () => {
    render(<About />)

    const expectedParagraphs = [
      '酷施美是一家专注于产品创新设计的专业机构。我们以用户为中心，融合策略、设计与技术，为客户提供从洞察到落地的一站式产品设计研发服务，帮助企业提升产品竞争力，连接未来的更多可能。',
      '我们深耕智能家居、生活电器、美容个护、消费电子、医疗健康及新消费产品等多个行业，服务涵盖产品设计、品牌创意、UI/APP界面等体验服务方向。',
      '凭借对市场、科技与消费趋势的敏锐洞察，力求产出兼具商业创新性、实用性与市场竞争力的产品解决方案。',
    ]
    const narrative = screen.getByTestId('company-profile-narrative')
    const paragraphs = narrative.querySelectorAll(':scope > p')

    expect(paragraphs).toHaveLength(expectedParagraphs.length)
    paragraphs.forEach((paragraph, index) => {
      expect(paragraph.textContent).toBe(expectedParagraphs[index])
      expect(paragraph.textContent).not.toMatch(/\s/)
    })
  })

  it('renders each founder verified profile as four semantic lines', () => {
    render(<About />)

    const expectedFounders = [
      {
        name: '唐敏',
        lines: [
          '华东理工大学工业设计工程硕士',
          '无创空间联合创始人',
          '8年综合产品设计经验',
          '曾获IF、kdesign等国际设计大奖',
        ],
      },
      {
        name: '谭祺才',
        lines: [
          '上海电机学院-工业设计专业',
          '获得比赛类奖项若干，专利十余项',
          '6年综合产品设计&量产支持经验',
          '现负责团队业务的营销推广',
        ],
      },
    ]
    const cards = document.querySelectorAll('.founder-card')

    expect(cards).toHaveLength(expectedFounders.length)
    cards.forEach((card, index) => {
      const lines = card.querySelectorAll('.founder-card__bio-line')
      expect([...lines].map((line) => line.textContent)).toEqual(
        expectedFounders[index].lines,
      )
      expect(card.querySelector('h3')).toHaveTextContent(
        expectedFounders[index].name,
      )
    })
  })

  it('structures every team caption as a name, role, and decorative rule', () => {
    render(<About />)

    const captions = document.querySelectorAll('.team-card figcaption')
    expect(captions).toHaveLength(10)
    captions.forEach((caption) => {
      expect(caption.querySelector('.team-card__name')).toHaveTextContent(
        '吴海涛',
      )
      expect(
        caption.querySelector('.team-card__role')?.textContent,
      ).not.toBe('')
      expect(caption.querySelector('.team-card__rule')).toHaveAttribute(
        'aria-hidden',
        'true',
      )
    })
  })
})
