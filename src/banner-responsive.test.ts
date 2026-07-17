import { describe, expect, it } from 'vitest'
import css from './index.css?raw'

describe('responsive Banner CSS contract', () => {
  it('uses source aspect ratios and keeps the complete media visible', () => {
    expect(css).toMatch(
      /\.responsive-hero\s*\{[^}]*aspect-ratio:\s*var\(--hero-aspect\)/s,
    )
    expect(css).toMatch(
      /\.responsive-hero__media\s*\{[^}]*object-fit:\s*contain/s,
    )
  })

  it('does not restore fixed mobile Banner heights', () => {
    expect(css).not.toMatch(
      /\.cases-hero,\s*\.about-hero,\s*\.contact-hero\s*\{[^}]*height:\s*620px/s,
    )
  })
})
