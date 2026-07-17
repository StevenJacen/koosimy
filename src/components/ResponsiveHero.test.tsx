import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ResponsiveHero from './ResponsiveHero'

describe('ResponsiveHero', () => {
  it('shares one proportional media contract across page banners', () => {
    render(
      <ResponsiveHero
        className="home-hero"
        imageClassName="home-hero__image"
        src="/assets/home/hero.jpg"
        alt="未来感机器人产品设计"
        aspectRatio="3840 / 2162"
      >
        <span>Banner copy</span>
      </ResponsiveHero>,
    )

    const image = screen.getByRole('img', { name: '未来感机器人产品设计' })
    const hero = image.closest('section')

    expect(hero).toHaveClass('responsive-hero', 'home-hero')
    expect(hero).toHaveStyle({ '--hero-aspect': '3840 / 2162' })
    expect(image).toHaveClass('responsive-hero__media', 'home-hero__image')
    expect(screen.getByText('Banner copy')).toBeInTheDocument()
  })
})
