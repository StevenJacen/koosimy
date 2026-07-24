import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('uses the shorter contact hero ratio from the prototype', () => {
    const { container } = render(<Contact />)

    expect(
      container.querySelector('.contact-hero')?.getAttribute('style'),
    ).toContain('--hero-aspect: 3840 / 2112')
  })

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
      screen.getByRole('heading', { name: '多平台触达快速响应' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '我们在这里' }),
    ).toBeInTheDocument()
  })

  it('keeps the social-platform heading on the two prototype lines', () => {
    render(<Contact />)

    const heading = screen.getByRole('heading', {
      name: '多平台触达快速响应',
    })

    expect(heading.querySelector('br')).toBeInTheDocument()
  })

  it('renders every contact method as an explicit two-line detail', () => {
    const { container } = render(<Contact />)

    const methods = Array.from(container.querySelectorAll('.contact-method'))
    expect(methods).toHaveLength(5)
    expect(methods.map((method) => method.querySelectorAll('br').length)).toEqual([
      1, 1, 1, 1, 1,
    ])

    expect(methods[0]).toHaveTextContent(
      '电话咨询19301490913周一到周五 9:00-18:00',
    )
    expect(methods[1]).toHaveTextContent(
      '邮箱联系tanqicai@koosimy.com24小时邮件响应',
    )
    expect(methods[2]).toHaveTextContent(
      '微信咨询扫码添加微信专业顾问在线沟通',
    )
    expect(methods[3]).toHaveTextContent(
      '公司地址上海市闵行区光中路255号2栋508室',
    )
    expect(methods[4]).toHaveTextContent(
      '商务合作微信号 koosimy获取项目支持',
    )
  })

  it('uses the consultation artwork as a full background layer without a CTA', () => {
    const { container } = render(<Contact />)

    const consultation = container.querySelector('.consultation__grid')
    expect(consultation).not.toHaveClass('site-container')
    expect(
      consultation?.querySelector(':scope > .consultation__image'),
    ).toBeInTheDocument()
    expect(
      consultation?.querySelector('.consultation__content'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /发送项目需求/ }),
    ).not.toBeInTheDocument()

    const copy = container.querySelector('.consultation__copy')
    expect(copy?.querySelectorAll('br')).toHaveLength(3)
    expect(copy).toHaveTextContent(
      '无论您有产品创意，品牌升级需求，还是项目合作意向，我们都愿意成为您最可趣的设计伙伴。随时联系我们，开启一段有价值的对话。',
    )
  })

  it('renders the prototype visit guidance with its dedicated building icon', () => {
    const { container } = render(<Contact />)

    expect(container.querySelector('.lucide-clock-3')).toBeInTheDocument()
    expect(container.querySelector('.lucide-car-front')).toBeInTheDocument()
    expect(container.querySelector('.lucide-building-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('location-info-visit-icon')).toHaveAttribute(
      'src',
      '/assets/contact/icon-visit.svg',
    )

    const guidance = Array.from(
      container.querySelectorAll('.location-info > div'),
    )
    expect(guidance).toHaveLength(3)
    expect(
      guidance.map((item) => item.querySelectorAll('br').length),
    ).toEqual([1, 1, 1])
    expect(guidance[0]).toHaveTextContent(
      '办公时间周一至周五09:30-18:30法定节假日休息',
    )
    expect(guidance[1]).toHaveTextContent(
      '交通指南距离地铁5号线颛桥站1.6公里园区提供访客停车位',
    )
    expect(guidance[2]).toHaveTextContent(
      '来访建议为了您有更好的参考体验来访前请与我们联系',
    )
  })

  it('labels every social platform with a search affordance and account subtitle', () => {
    const { container } = render(<Contact />)

    ;['普象', '小红书', '站酷', '抖音'].forEach((platform) => {
      expect(screen.getByText(platform)).toBeInTheDocument()
    })
    expect(screen.getAllByText('酷施美KOOSIMY 设计')).toHaveLength(4)
    expect(
      container.querySelectorAll('.social-platform .lucide-search'),
    ).toHaveLength(4)
    expect(screen.getByText('Platform Rapid response')).toBeInTheDocument()
    expect(
      screen.getByText('上海市闵行区上海市闵行区光中路255号 2栋508'),
    ).toBeInTheDocument()
  })
})
