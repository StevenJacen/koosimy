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

  it('uses every supplied contact SVG and the prototype consultation copy', () => {
    render(<Contact />)

    ;[
      ['phone', '/assets/contact/icon-phone.svg'],
      ['email', '/assets/contact/icon-email.svg'],
      ['location', '/assets/contact/icon-location.svg'],
      ['business', '/assets/contact/icon-business.svg'],
    ].forEach(([name, src]) => {
      expect(screen.getByTestId(`contact-icon-${name}`)).toHaveAttribute('src', src)
    })
    expect(
      screen.getByRole('heading', { name: '有想法？我们很乐意倾听' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '多平台触达 快速响应' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '我们在这里' }),
    ).toBeInTheDocument()
  })
})
