/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import html from '../index.html?raw'
import css from './index.css?raw'
import entry from './main.tsx?raw'

describe('Figma feedback CSS contract', () => {
  it('uses the approved color, content width, typography, and header geometry', () => {
    expect(css).toMatch(/--red:\s*#e50036/i)
    expect(css).toMatch(
      /\.site-container\s*\{[^}]*width:\s*min\(87\.5vw,\s*1680px\)/s,
    )
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
      /\.future-banner\s*\{[^}]*align-items:\s*flex-start[^}]*padding-top:\s*clamp\([^;]*52px\)/s,
    )
    expect(css).toMatch(
      /\.cases-page\s+\.future-banner\s*\{[^}]*padding-top:\s*clamp\([^;]*100px\)/s,
    )
    expect(css).toMatch(
      /\.contact-page\s+\.future-banner\s*\{[^}]*aspect-ratio:\s*3840\s*\/\s*1590[^}]*padding-top:\s*clamp\([^;]*129px\)/s,
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
      /\.site-footer\s*\{[^}]*padding:\s*clamp\([^;]*75px\)\s+0\s+clamp\([^;]*24px\)/s,
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

  it('matches the prototype section heights on the home and case pages', () => {
    expect(css).toMatch(
      /\.home-services\s*\{[^}]*padding:\s*clamp\([^;]*132px\)\s+0\s+clamp\([^;]*49px\)/s,
    )
    expect(css).toMatch(
      /\.home-services\s+\.site-container\s*\{[^}]*grid-template-columns:\s*minmax\(clamp\([^;]*404px\),\s*0\.9fr\)\s+minmax\(0,\s*2\.7fr\)/s,
    )
    expect(css).toMatch(
      /\.home-services__grid\s*\{[^}]*border-left:\s*0/s,
    )
    expect(css).toMatch(
      /\.service-card\s*\{[^}]*min-height:\s*clamp\([^;]*235px\)[^}]*border-right:\s*1px\s+solid\s+rgba\(229,\s*0,\s*54,\s*0\.5\)/s,
    )
    expect(css).toMatch(
      /\.service-card__icon,\s*\.service-card svg\s*\{[^}]*margin-bottom:\s*clamp\([^;]*46px\)/s,
    )
    expect(css).toMatch(
      /\.project-section\s*\{[^}]*padding:\s*clamp\([^;]*120px\)\s+0\s+clamp\([^;]*48px\)/s,
    )
    expect(css).toMatch(
      /\.project-section--industrial\s*\{[^}]*padding-bottom:\s*clamp\([^;]*57px\)/s,
    )
    expect(css).toMatch(
      /\.brand-grid\s*\{[^}]*gap:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /\.awards\s*\{[^}]*padding:\s*clamp\([^;]*120px\)\s+0\s+clamp\([^;]*150px\)/s,
    )
    expect(css).toMatch(
      /\.case-intro\s*\{[^}]*padding-block:\s*clamp\([^;]*124px\)\s+clamp\([^;]*218\.6px\)/s,
    )
    expect(css).toMatch(
      /\.case-intro\s*>\s*\.site-container\s*\{[^}]*width:\s*min\(84\.375vw,\s*1620px\)/s,
    )
    expect(css).toMatch(
      /\.case-gallery\s*\{[^}]*width:\s*min\(84\.375vw,\s*1620px\)[^}]*padding-bottom:\s*clamp\([^;]*131px\)/s,
    )
    expect(css).toMatch(
      /\.related-cases\s*>\s*\.site-container\s*\{[^}]*width:\s*min\(84\.375vw,\s*1620px\)/s,
    )
    expect(css).toMatch(
      /\.cases-page\s+\.future-banner\s+\.site-container,\s*\.contact-page\s+\.future-banner\s+\.site-container\s*\{[^}]*width:\s*min\(84\.375vw,\s*1620px\)/s,
    )
    expect(css).toMatch(
      /\.related-cases__grid\s*\{[^}]*gap:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /@media\s*\(max-width:\s*1200px\)[\s\S]*\.related-cases__arrow--previous\s*\{[^}]*left:\s*0[^}]*\}[\s\S]*\.related-cases__arrow--next\s*\{[^}]*right:\s*0/s,
    )
  })

  it('matches the about-page regions and uses the prototype border hierarchy', () => {
    expect(css).toMatch(
      /\.about-page\s+\.site-container\s*\{[^}]*width:\s*min\(84\.375vw,\s*1620px\)/s,
    )
    expect(css).toMatch(
      /\.about-profile\s*\{[^}]*padding-block:\s*clamp\([^;]*124px\)\s+clamp\([^;]*79px\)/s,
    )
    expect(css).toMatch(
      /\.about-profile__intro\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*0\.93fr\)\s+minmax\(0,\s*1fr\)[^}]*align-items:\s*end/s,
    )
    expect(css).toMatch(
      /\.about-profile__copy div p\s*\{[^}]*font-size:\s*clamp\([^;]*22px\)[^}]*line-height:\s*2/s,
    )
    expect(css).toMatch(
      /\.stats-grid\s*\{[^}]*margin-top:\s*clamp\([^;]*110px\)[^}]*border:\s*1px\s+solid\s+#bfbfbf/s,
    )
    expect(css).toMatch(
      /\.capability-list\s*\{[^}]*border-top:\s*1px\s+solid\s+#747474/s,
    )
    expect(css).toMatch(
      /\.capability-row\s*\{[^}]*border-bottom:\s*1px\s+solid\s+#ccc/s,
    )
    expect(css).toMatch(
      /\.capabilities\s*\{[^}]*padding:\s*clamp\([^;]*100px\)\s+0\s+clamp\([^;]*78px\)/s,
    )
    expect(css).toMatch(
      /\.capability-row\s*\{[^}]*min-height:\s*clamp\([^;]*9\.7vw,\s*188px\)/s,
    )
    expect(css).toMatch(
      /\.capability-row\s*\{[^}]*grid-template-columns:\s*minmax\([^;]*326px\)\s+minmax\(0,\s*1fr\)/s,
    )
    expect(css).toMatch(
      /\.capability-row:last-child\s*\{[^}]*border-bottom:\s*0/s,
    )
    expect(css).toMatch(
      /\.founders\s*\{[^}]*padding:\s*clamp\([^;]*62px\)\s+0\s+clamp\([^;]*52px\)/s,
    )
    expect(css).toMatch(
      /\.founders__list\s*\{[^}]*width:\s*min\(79\.792vw,\s*1532px\)[^}]*gap:\s*clamp\([^;]*133px\)[^}]*margin:\s*clamp\([^;]*107px\)\s+auto\s+0\s+16px/s,
    )
    expect(css).toMatch(
      /\.founder-card\s*\{[^}]*border:\s*1px\s+solid\s+#b8b8b8/s,
    )
    expect(css).toMatch(
      /\.founder-card__copy\s*\{[^}]*transform:\s*translateY\(3px\)/s,
    )
    expect(css).toMatch(
      /\.founder-card__copy h3\s*\{[^}]*margin:\s*0\s+0\s+clamp\([^;]*64px\)[^}]*font-size:\s*clamp\([^;]*40px\)[^}]*font-weight:\s*600/s,
    )
    expect(css).toMatch(
      /\.founder-card__copy p\s*\{[^}]*font-size:\s*clamp\([^;]*20px\)[^}]*font-weight:\s*500[^}]*line-height:\s*1\.38/s,
    )
    expect(css).toMatch(
      /\.founder-card__decor-label\s*\{[^}]*color:\s*#d2d4d7[^}]*font-size:\s*clamp\([^;]*24px\)/s,
    )
    expect(css).toMatch(
      /\.founder-card__decor-dots\s*\{[^}]*width:\s*50px[^}]*height:\s*52px/s,
    )
    expect(css).toMatch(
      /\.founder-card__decor-axis\s*\{[^}]*width:\s*15px[^}]*height:\s*132px/s,
    )
    const tabletStart = css.indexOf(
      '@media (min-width: 821px) and (max-width: 1309px)',
    )
    const tabletEnd = css.indexOf('@media (max-width: 820px)', tabletStart)
    const tabletFounderRules = css.slice(tabletStart, tabletEnd)

    expect(tabletStart).toBeGreaterThan(-1)
    expect(tabletEnd).toBeGreaterThan(tabletStart)
    expect(tabletFounderRules).toMatch(
      /\.founder-card__decorations\s*\{[^}]*display:\s*none/s,
    )
    expect(tabletFounderRules).toMatch(
      /\.founder-card--reverse\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s,
    )
    expect(css).toMatch(
      /\.team-section\s*\{[^}]*padding:\s*clamp\([^;]*112px\)\s+0\s+clamp\([^;]*19px\)/s,
    )
    expect(css).toMatch(
      /\.partners\s*\{[^}]*padding:\s*clamp\([^;]*120px\)\s+0\s+clamp\([^;]*227px\)/s,
    )
    expect(css).toMatch(
      /\.partners__grid\s*\{[^}]*gap:\s*clamp\([^;]*100px\)\s+clamp\([^;]*76px\)[^}]*margin-top:\s*clamp\([^;]*120px\)/s,
    )
  })

  it('matches the contact region heights and removes terminal responsive borders', () => {
    expect(css).toMatch(
      /\.contact-methods\s*\{[^}]*padding:\s*clamp\([^;]*125px\)\s+0\s+clamp\([^;]*153px\)/s,
    )
    expect(css).toMatch(
      /\.contact-method\s*\{[^}]*min-height:\s*clamp\([^;]*28\.7vw,\s*556px\)[^}]*border-right:\s*1px\s+solid\s+#bfbfbf/s,
    )
    expect(css).toMatch(
      /\.location-section\s*\{[^}]*padding:\s*clamp\([^;]*164px\)\s+0\s+clamp\([^;]*72px\)/s,
    )
    expect(css).toMatch(
      /\.location-map\s*\{[^}]*width:\s*100%[^}]*min-width:\s*0/s,
    )
    expect(css).toMatch(
      /\.location-info\s*>\s*div:last-child\s*\{[^}]*border-right:\s*0/s,
    )
    expect(css).toMatch(
      /@media\s*\(max-width:\s*560px\)[\s\S]*\.location-info\s*>\s*div:last-child\s*\{[^}]*border-bottom:\s*0/s,
    )
    expect(css).toMatch(
      /@media\s*\(max-width:\s*560px\)[\s\S]*\.contact-method:last-child\s*\{[^}]*border-bottom:\s*0/s,
    )
  })

  it('anchors project copy from the top and lets case sentences flow naturally', () => {
    expect(css).toMatch(
      /\.project-card__content\s*\{[^}]*inset:\s*clamp\([^;]*114px\)[^}]*auto/s,
    )
    expect(css).toMatch(
      /\.case-intro__sentence\s*\{[^}]*display:\s*inline/s,
    )
    expect(css).not.toMatch(/\.site-footer__legal\s*\{/)
  })

  it('keeps the supplied founder SVG geometry and directional transforms intact', () => {
    const arrow = readFileSync(
      resolve(process.cwd(), 'public/assets/about/arrow-4.svg'),
      'utf8',
    )
    const dots = readFileSync(
      resolve(process.cwd(), 'public/assets/about/group-93.svg'),
      'utf8',
    )

    expect(arrow).toContain('viewBox="0 0 15 132"')
    expect(arrow).toContain('#ED141F')
    expect(dots).toContain('viewBox="0 0 56 58"')
    expect(dots.match(/<circle/g)).toHaveLength(9)
    expect(css).toMatch(
      /\.founder-card__decor-axis\s*\{[^}]*transform-origin:\s*7\.364px\s+131\.015px/s,
    )
    expect(css).toMatch(
      /\.founder-card__decor-axis--horizontal\s*\{[^}]*transform:\s*rotate\(90deg\)/s,
    )
    expect(css).toMatch(
      /\.founder-card--reverse \.founder-card__decor-axis--vertical\s*\{[^}]*transform:\s*rotate\(180deg\)/s,
    )
  })
})
