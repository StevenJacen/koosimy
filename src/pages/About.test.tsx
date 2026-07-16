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
})
