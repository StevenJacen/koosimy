import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('renders actionable contact details and the supplied map', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: /19301490913/ })).toHaveAttribute(
      'href',
      'tel:19301490913',
    )
    expect(
      screen.getByRole('link', { name: /tanqicai@koosimy.com/ }),
    ).toHaveAttribute('href', 'mailto:tanqicai@koosimy.com')
    expect(screen.getByAltText('KOOSIMY 公司位置地图')).toBeInTheDocument()
  })
})
