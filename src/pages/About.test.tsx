import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import About from './About'

const renderAbout = () => render(
  <MemoryRouter>
    <About />
  </MemoryRouter>,
)

describe('About', () => {
  it('renders the company proof points', () => {
    renderAbout()

    ;['8+', '100+', '300+', '创始团队', '团队成员', '合作伙伴'].forEach(
      (label) => {
        expect(screen.getByText(label, { exact: false })).toBeInTheDocument()
      },
    )
  })

  it('keeps the complete approved partner narrative', () => {
    renderAbout()

    expect(screen.getByText(/已成功携手上海电气、西屋、大宇等超200家/)).toBeInTheDocument()
    expect(screen.getByText(/打造出1000余个优秀案例/)).toBeInTheDocument()
    expect(screen.getByText(/用严谨创新、精益求精的设计助力成就产品和品牌价值/)).toBeInTheDocument()
  })

  it('renders the company profile as whitespace-free semantic paragraphs', () => {
    renderAbout()

    const expectedParagraphs = [
      '酷施美是一家专注于产品创新设计的专业机构。我们以用户为中心，融合策略、设计与技术，为客户提供从洞察到落地的一站式产品设计研发服务，帮助企业提升产品竞争力，连接未来的更多可能。',
      '我们聚焦智能家居、生活电器、美容个护、消费电子、医疗健康及新消费产品等领域，以用户需求与市场趋势为核心，将设计美学、结构工程与品牌战略深度融合，为客户提供兼具创新性、实用性与市场竞争力的产品解决方案。',
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
    renderAbout()

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

  it('uses the supplied SVG artwork for every founder-card decoration', () => {
    renderAbout()

    document.querySelectorAll('.founder-card').forEach((card) => {
      const arrows = card.querySelectorAll<HTMLImageElement>(
        'img.founder-card__decor-axis',
      )
      const dots = card.querySelector<HTMLImageElement>(
        'img.founder-card__decor-dots',
      )

      expect(arrows).toHaveLength(2)
      arrows.forEach((arrow) => {
        expect(arrow.getAttribute('src')).toBe('/assets/about/arrow-4.svg')
        expect(arrow).toHaveAttribute('alt', '')
      })
      expect(dots?.getAttribute('src')).toBe('/assets/about/group-93.svg')
      expect(dots).toHaveAttribute('alt', '')
      expect(card.querySelector('.founder-card__decor-dot')).not.toBeInTheDocument()
    })
  })

  it('structures every team caption as a name, role, and decorative rule', () => {
    renderAbout()

    const captions = document.querySelectorAll('.team-card figcaption')
    expect(captions).toHaveLength(10)
    captions.forEach((caption) => {
      expect(caption.querySelector('.team-card__name')).toHaveTextContent(
        '吴海涛',
      )
      expect(
        caption.querySelector('.team-card__role')?.textContent,
      ).toBe('结构设计负责人')
      expect(caption.querySelector('.team-card__rule')).toHaveAttribute(
        'aria-hidden',
        'true',
      )
    })
    expect(screen.getByText('TEAM MEMBER')).toBeInTheDocument()
  })

  it('uses the five exact prototype capability descriptions without numeric or English labels', () => {
    renderAbout()

    const expected = [
      ['策略研究', '从市场趋势、用户需求、竞品格局与产品机会出发，帮助客户明确产品定位与发展方向。通过前期调研与策略分析，梳理产品核心价值、目标用户场景及创新切入点，为后续设计研发提供清晰依据。'],
      ['工业设计', '围绕产品外观、功能体验、人机交互与品牌识别进行系统化设计，将创意概念转化为具备市场竞争力的产品方案。我们注重造型美感、使用体验与商业价值的平衡，提升产品的视觉吸引力与用户认可度。'],
      ['结构设计', '结合产品功能、内部布局、材料特性、生产工艺与装配方式，进行结构深化与工程验证。通过合理的结构方案，保障产品的稳定性、安全性、可制造性与后期量产落地效率。'],
      ['品牌设计', '从品牌定位、视觉识别、产品语言与传播表达出发，构建统一且具有辨识度的品牌形象。通过品牌策略与设计系统的整合，强化产品与品牌之间的关联，提升品牌价值感与市场记忆点。'],
      ['工业链支持', '依托设计研发与生产资源协同能力，提供从样机打样、材料工艺、供应商对接到量产跟进的支持服务。帮助客户降低沟通与试错成本，推动产品从概念设计到生产上市的高效落地。'],
    ]
    const rows = Array.from(document.querySelectorAll('.capability-row'))

    expect(rows).toHaveLength(expected.length)
    rows.forEach((row, index) => {
      expect(row.querySelector('h3')).toHaveTextContent(expected[index][0])
      expect(row.querySelector('p')).toHaveTextContent(expected[index][1])
      expect(row.querySelector('small')).not.toBeInTheDocument()
      expect(row.textContent).not.toMatch(/0[1-5]/)
    })
    expect(screen.getAllByText('COMPANYPROFILE')).toHaveLength(2)
  })

  it('does not add founder numbers or red role labels absent from the prototype', () => {
    renderAbout()

    document.querySelectorAll('.founder-card').forEach((card) => {
      expect(card.querySelector('.founder-card__index')).not.toBeInTheDocument()
      expect(card.querySelector('.founder-card__role')).not.toBeInTheDocument()
    })
  })
})
