import { describe, expect, it } from 'vitest'
import css from './index.css?raw'

describe('Figma feedback CSS contract', () => {
  it('uses the approved color, content width, typography, and header geometry', () => {
    expect(css).toMatch(/--red:\s*#e50036/i)
    expect(css).toMatch(/\.site-container\s*\{[^}]*1680px/s)
    expect(css).toMatch(/\.site-header\s*\{[^}]*position:\s*absolute/s)
    expect(css).toMatch(/\.site-header\s*\{[^}]*height:\s*134px/s)
    expect(css).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/)
    expect(css).toMatch(/MiSans/)
    expect(css).toMatch(/Source Han Sans SC/)
    expect(css).not.toMatch(/Arial|Helvetica/)
  })

  it('does not turn inactive navigation or service cards red on hover', () => {
    expect(css).not.toMatch(
      /\.site-nav__link:hover[^{]*\{[^}]*color:\s*var\(--red\)/s,
    )
    expect(css).not.toMatch(
      /\.service-card:hover\s*\{[^}]*background:\s*var\(--red\)/s,
    )
  })

  it('keeps the corrected sections white and uses the exact footer ratio', () => {
    expect(css).toMatch(
      /\.project-section--industrial\s*\{[^}]*background:\s*#fff/s,
    )
    expect(css).toMatch(/\.related-cases\s*\{[^}]*background:\s*#fff/s)
    expect(css).toMatch(/\.team-section\s*\{[^}]*background:\s*#fff/s)
    expect(css).toMatch(/\.social-platforms\s*\{[^}]*background:\s*#fff/s)
    expect(css).toMatch(
      /\.site-footer\s*\{[^}]*aspect-ratio:\s*1920\s*\/\s*553/s,
    )
  })

  it('keeps large artwork uncropped and preserves the taller contact banner', () => {
    expect(css).toMatch(
      /\.responsive-hero__media\s*\{[^}]*object-fit:\s*contain/s,
    )
    expect(css).toMatch(
      /\.future-banner__image\s*\{[^}]*object-fit:\s*contain/s,
    )
    expect(css).toMatch(
      /\.contact-page\s+\.future-banner\s*\{[^}]*aspect-ratio:\s*3840\s*\/\s*1590/s,
    )
  })
})
