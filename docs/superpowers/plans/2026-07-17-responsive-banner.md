# Responsive Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every page Banner follow its source prototype aspect ratio and keep the full image visible at all browser widths.

**Architecture:** Introduce one `ResponsiveHero` component that owns the shared Banner structure and exposes the source aspect ratio through a CSS custom property. Keep page-specific copy and overlays in the page components, while one shared CSS contract controls sizing and media fitting.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Preserve the existing desktop prototype composition and page copy.
- Use the exact source ratios: home `3840 / 2162`, cases `3840 / 1896`, about `3840 / 2161`, contact `3840 / 2162`.
- Banner images must remain fully visible with zero `cover` cropping.
- Do not add new runtime dependencies or generate replacement artwork.
- Verify 1366, 1024, 768, and 390 pixel viewport widths.

---

### Task 1: Shared Responsive Hero Contract

**Files:**
- Create: `src/components/ResponsiveHero.tsx`
- Create: `src/components/ResponsiveHero.test.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Cases.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Contact.tsx`

**Interfaces:**
- Consumes: React `ReactNode` and `CSSProperties` types.
- Produces: `ResponsiveHero({ className, imageClassName?, src, alt, aspectRatio, children? })`.

- [ ] **Step 1: Write the failing component test**

```tsx
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
```

- [ ] **Step 2: Run the test to verify RED**

Run: `npm test -- src/components/ResponsiveHero.test.tsx`

Expected: FAIL because `ResponsiveHero.tsx` does not exist.

- [ ] **Step 3: Implement the shared component**

```tsx
import type { CSSProperties, ReactNode } from 'react'

interface ResponsiveHeroProps {
  className: string
  imageClassName?: string
  src: string
  alt: string
  aspectRatio: string
  children?: ReactNode
}

export default function ResponsiveHero(props: ResponsiveHeroProps) {
  const imageClasses = ['responsive-hero__media', props.imageClassName].filter(Boolean).join(' ')

  return (
    <section
      className={`responsive-hero ${props.className}`}
      style={{ '--hero-aspect': props.aspectRatio } as CSSProperties}
    >
      <img className={imageClasses} src={props.src} alt={props.alt} />
      {props.children}
    </section>
  )
}
```

- [ ] **Step 4: Replace the four page Hero section wrappers**

Use these exact aspect ratios:

```tsx
<ResponsiveHero className="home-hero" imageClassName="home-hero__image" src="/assets/home/hero.jpg" alt="未来感机器人产品设计" aspectRatio="3840 / 2162">
  {/* existing home overlay content */}
</ResponsiveHero>
```

Repeat for cases (`3840 / 1896`), about (`3840 / 2161`), and contact (`3840 / 2162`) while preserving existing child markup.

- [ ] **Step 5: Run the component and page tests to verify GREEN**

Run: `npm test -- src/components/ResponsiveHero.test.tsx src/pages/Home.test.tsx src/pages/Cases.test.tsx src/pages/About.test.tsx src/pages/Contact.test.tsx`

Expected: all selected tests PASS.

### Task 2: Proportional CSS and No-Crop Media

**Files:**
- Create: `src/banner-responsive.test.ts`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `.responsive-hero` and `.responsive-hero__media` from Task 1.
- Produces: one shared proportional sizing rule and small-screen typography overrides.

- [ ] **Step 1: Write the failing CSS contract test**

```ts
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./index.css', import.meta.url), 'utf8')

describe('responsive Banner CSS contract', () => {
  it('uses source aspect ratios and keeps the complete media visible', () => {
    expect(css).toMatch(/\.responsive-hero\s*\{[^}]*aspect-ratio:\s*var\(--hero-aspect\)/s)
    expect(css).toMatch(/\.responsive-hero__media\s*\{[^}]*object-fit:\s*contain/s)
  })

  it('does not restore fixed mobile Banner heights', () => {
    expect(css).not.toMatch(/\.cases-hero,\s*\.about-hero,\s*\.contact-hero\s*\{[^}]*height:\s*620px/s)
  })
})
```

- [ ] **Step 2: Run the test to verify RED**

Run: `npm test -- src/banner-responsive.test.ts`

Expected: FAIL because the shared responsive rules do not exist and the fixed mobile height remains.

- [ ] **Step 3: Add the shared proportional Banner rules**

```css
.responsive-hero {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: var(--hero-aspect);
  overflow: hidden;
}

.responsive-hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

Remove the viewport-, `vw`-, minimum-, and mobile fixed-height declarations from `.home-hero`, `.cases-hero`, `.about-hero`, and `.contact-hero`.

- [ ] **Step 4: Scale overlay copy at narrow widths**

At `max-width: 820px`, reduce Hero top padding and text sizes. At `max-width: 560px`, use compact eyebrow, heading, tagline, line, and service spacing so every overlay remains inside the proportional Banner.

- [ ] **Step 5: Run targeted tests to verify GREEN**

Run: `npm test -- src/banner-responsive.test.ts src/components/ResponsiveHero.test.tsx`

Expected: both test files PASS.

### Task 3: Full Verification and Publication

**Files:**
- Modify only if verification reveals an in-scope Banner defect.

**Interfaces:**
- Consumes: completed component and CSS contract.
- Produces: verified build and published `main` branch.

- [ ] **Step 1: Run the full project check**

Run: `npm run check`

Expected: ESLint, all Vitest tests, TypeScript, and Vite build PASS.

- [ ] **Step 2: Verify four widths in the browser**

For `/`, `/cases`, `/about`, and `/contact`, inspect 1366×900, 1024×768, 768×900, and 390×844. Confirm computed crop percentages are 0, the Hero aspect ratio matches its source, overlay bounds stay inside the Hero, and `scrollWidth === clientWidth`.

- [ ] **Step 3: Commit and push**

```bash
git add src/components/ResponsiveHero.tsx src/components/ResponsiveHero.test.tsx src/pages/Home.tsx src/pages/Cases.tsx src/pages/About.tsx src/pages/Contact.tsx src/banner-responsive.test.ts src/index.css
git commit -m "fix: make hero banners responsive without cropping"
git push origin main
```

- [ ] **Step 4: Confirm the remote branch**

Run: `git rev-parse HEAD` and `git ls-remote origin refs/heads/main`.

Expected: both hashes are identical and `git status --short --branch` is clean.
