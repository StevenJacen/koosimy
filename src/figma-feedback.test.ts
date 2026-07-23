import { describe, expect, it } from 'vitest'
import html from '../index.html?raw'
import css from './index.css?raw'
import entry from './main.tsx?raw'

describe('Figma feedback CSS contract', () => {
  it('uses the approved color, content width, typography, and header geometry', () => {
    expect(css).toMatch(/--red:\s*#e50036/i)
    expect(css).toMatch(/\.site-container\s*\{[^}]*1680px/s)
    expect(css).toMatch(/\.site-header\s*\{[^}]*position:\s*absolute/s)
    expect(css).toMatch(/\.site-header\s*\{[^}]*height:\s*134px/s)
    expect(css).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/)
    expect(css).toMatch(/Inter Variable/)
    expect(css).toMatch(/Noto Sans SC Variable/)
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

  it('bundles the design fonts instead of depending on a remote stylesheet', () => {
    expect(entry).toMatch(/@fontsource-variable\/inter/)
    expect(entry).toMatch(/@fontsource-variable\/noto-sans-sc/)
    expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/)
  })

  it('matches the desktop type scale from the prototype', () => {
    expect(css).toMatch(
      /\.section-heading__eyebrow\s*\{[^}]*font-size:\s*clamp\([^;]*32px\)/s,
    )
    expect(css).toMatch(
      /\.section-heading__title\s*\{[^}]*font-size:\s*clamp\([^;]*56px\)/s,
    )
    expect(css).toMatch(
      /\.section-heading__description\s*\{[^}]*font-size:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(/\.text-link\s*\{[^}]*font-size:\s*clamp\([^;]*28px\)/s)
    expect(css).toMatch(
      /\.future-banner__english\s*\{[^}]*font-size:\s*clamp\([^;]*56px\)/s,
    )
    expect(css).toMatch(
      /\.future-banner h2\s*\{[^}]*font-size:\s*clamp\([^;]*56px\)/s,
    )
    expect(css).toMatch(
      /\.future-banner ul\s*\{[^}]*font-size:\s*clamp\([^;]*28px\)/s,
    )
    expect(css).toMatch(
      /\.site-footer__brand p\s*\{[^}]*font-size:\s*clamp\([^;]*80px\)/s,
    )
    expect(css).toMatch(
      /\.site-footer__brand h2\s*\{[^}]*font-size:\s*clamp\([^;]*80px\)/s,
    )
    expect(css).toMatch(
      /\.site-footer__meta span\s*\{[^}]*font-size:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /\.site-footer\s*\{[^}]*padding:\s*clamp\([^;]*56px\)\s+0\s+clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /\.site-footer__grid\s*\{[^}]*gap:\s*clamp\([^;]*38px\)\s+clamp\(/s,
    )
  })

  it('preserves each contact icon ratio and the prototype contact hierarchy', () => {
    expect(css).toMatch(
      /\[data-testid="contact-icon-phone"\]\s*\{[^}]*width:\s*88px[^}]*height:\s*88px/s,
    )
    expect(css).toMatch(
      /\[data-testid="contact-icon-email"\]\s*\{[^}]*width:\s*103px[^}]*height:\s*68px/s,
    )
    expect(css).toMatch(
      /\[data-testid="contact-icon-location"\]\s*\{[^}]*width:\s*79px[^}]*height:\s*98px/s,
    )
    expect(css).toMatch(
      /\[data-testid="contact-icon-business"\]\s*\{[^}]*width:\s*102px[^}]*height:\s*85px/s,
    )
    expect(css).toMatch(
      /\.contact-method--qr > img\s*\{[^}]*width:\s*clamp\([^;]*135px\)[^}]*height:\s*clamp\([^;]*135px\)/s,
    )
    expect(css).toMatch(
      /\.contact-method > span\s*\{[^}]*font-size:\s*clamp\([^;]*40px\)/s,
    )
    expect(css).toMatch(
      /\.contact-method a,\s*\.contact-method p\s*\{[^}]*font-size:\s*clamp\([^;]*24px\)/s,
    )
  })

  it('uses the complete consultation artwork and correctly scaled location content', () => {
    expect(css).toMatch(
      /\.consultation__grid\s*\{[^}]*position:\s*relative[^}]*aspect-ratio:\s*3840\s*\/\s*1980/s,
    )
    expect(css).toMatch(
      /\.consultation__image\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/s,
    )
    expect(css).toMatch(
      /\.consultation__copy h2\s*\{[^}]*font-size:\s*clamp\([^;]*80px\)/s,
    )
    expect(css).toMatch(
      /\.consultation__copy > p\s*\{[^}]*font-size:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /\.location-address img\s*\{[^}]*width:\s*79px[^}]*height:\s*98px/s,
    )
    expect(css).toMatch(
      /\.location-address strong\s*\{[^}]*font-size:\s*clamp\([^;]*32px\)/s,
    )
  })

  it('scales the home cards, awards, cases, team, and partner marks to the design', () => {
    expect(css).toMatch(
      /\.home-hero h1,\s*\.about-hero__display\s*\{[^}]*font-size:\s*clamp\([^;]*80px\)/s,
    )
    expect(css).toMatch(
      /\.service-card strong\s*\{[^}]*font-size:\s*clamp\([^;]*32px\)/s,
    )
    expect(css).toMatch(
      /\.service-card small\s*\{[^}]*font-size:\s*clamp\([^;]*16px\)/s,
    )
    expect(css).toMatch(
      /\.project-card__number\s*\{[^}]*font-size:\s*clamp\([^;]*40px\)/s,
    )
    expect(css).toMatch(
      /\.award-logo\s*\{[^}]*height:\s*clamp\([^;]*276px\)/s,
    )
    expect(css).toMatch(
      /\.award-logo:nth-child\(2\) img\s*\{[^}]*width:\s*min\(100%,\s*245px\)/s,
    )
    expect(css).toMatch(
      /\.award-logo:nth-child\(3\) img\s*\{[^}]*width:\s*min\(100%,\s*362px\)/s,
    )
    expect(css).toMatch(
      /@media \(min-width:\s*1680px\)[\s\S]*grid-template-columns:\s*300px 245px 362px 276px 238px/s,
    )
    expect(css).toMatch(
      /\.related-cases__arrow svg\s*\{[^}]*width:\s*76px[^}]*height:\s*76px/s,
    )
    expect(css).toMatch(
      /\.partner-logo img\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/s,
    )
    expect(css).toMatch(
      /\.team-card strong\s*\{[^}]*font-size:\s*clamp\([^;]*16px\)/s,
    )
    expect(css).toMatch(
      /\.founder-card__bio-line\s*\{[^}]*display:\s*block/s,
    )
    expect(css).toMatch(
      /\.founder-card\s*\{[^}]*width:\s*100%[^}]*min-width:\s*0[^}]*aspect-ratio:\s*1532\s*\/\s*462[^}]*min-height:\s*330px/s,
    )
    expect(css).toMatch(
      /\.team-card__rule\s*\{[^}]*background:\s*var\(--red\)/s,
    )
  })
})
