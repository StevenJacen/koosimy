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
    expect(screen.getByTestId('case-intro-content')).toHaveTextContent(
      '它不仅是一台饮水设备，更像是一件安静陪伴生活的智能家居产品',
    )
  })

  it('renders each introduction sentence in a whitespace-free block span', () => {
    render(<Cases />)

    const expectedParagraphs = [
      [
        '这是一款为现代生活方式而设计的智能即热净饮水壶，将净化、加热、冲泡、陪伴融为一体。',
        '简约一体化机身搭配悬浮式透明水箱，以克制而高级的设计语言，自然融入居家、卧室、办公桌等多种生活场景。',
      ],
      [
        '创新的下沉式取水空间与折叠托盘设计，不仅兼容不同高度杯具，也让使用过程更整洁优雅。',
        '柔和氛围灯与透明视窗结合，让科技不再只是功能动作，而成为空间中的一部分。',
      ],
      [
        '它不仅是一台饮水设备，更像是一件安静陪伴生活的智能家居产品。',
        '在每一次接水、加热与等待之间，让日常变得更温柔、更有品质感。',
      ],
    ]
    const paragraphs = screen
      .getByTestId('case-intro-content')
      .querySelectorAll('p:not(.case-intro__index)')

    expect(paragraphs).toHaveLength(expectedParagraphs.length)
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const sentences = paragraph.querySelectorAll(
        ':scope > .case-intro__sentence',
      )
      expect([...sentences].map((sentence) => sentence.textContent)).toEqual(
        expectedParagraphs[paragraphIndex],
      )
      expect(paragraph.textContent).toBe(
        expectedParagraphs[paragraphIndex].join(''),
      )
    })
  })

  it('uses chevrons for the related-case carousel controls', () => {
    render(<Cases />)

    expect(
      screen
        .getByRole('button', { name: '上一个案例' })
        .querySelector('.lucide-chevron-left'),
    ).toBeInTheDocument()
    expect(
      screen
        .getByRole('button', { name: '下一个案例' })
        .querySelector('.lucide-chevron-right'),
    ).toBeInTheDocument()
  })

  it('groups each related case label in a metadata wrapper', () => {
    render(<Cases />)

    const cards = document.querySelectorAll('.related-card')
    expect(cards).toHaveLength(2)
    cards.forEach((card) => {
      const metadata = card.querySelector('.related-card__metadata')
      expect(metadata).toBeInTheDocument()
      expect(
        [...(metadata?.children ?? [])].map((element) => element.tagName),
      ).toEqual(['P', 'H3', 'SPAN'])
    })
  })

  it('matches the approved gallery and bilingual related-case structure', () => {
    render(<Cases />)

    expect(document.querySelector('.case-story')).not.toBeInTheDocument()
    expect(screen.getByTestId('case-gallery')).toBeInTheDocument()
    expect(screen.getAllByTestId('related-case-english')).toHaveLength(2)
    expect(screen.getByText('KONKA CHERRY POT')).toBeInTheDocument()
  })
})
