# KOOSIMY Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the four-route KOOSIMY React website so its desktop layouts match the supplied prototypes and remain usable on mobile.

**Architecture:** Keep Vite, React, TypeScript, React Router, Tailwind, and GSAP. Replace the corrupted page implementation with focused shared components and one data-driven component per route; copy the source artwork into a normalized `public/assets` tree.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, React Router 7, Tailwind CSS 3, GSAP 3, Vitest, Testing Library.

## Global Constraints

- The four prototype JPG files are the only visual source of truth.
- `/cases` is the single “玉环职智能水壶” case-study page.
- Desktop rendering targets the 1920px prototype composition; tablet and mobile preserve content order.
- No mojibake, placeholder imagery, or broken local asset requests may remain.
- The final repository is pushed to `https://github.com/StevenJacen/koosimy.git` on `main`.

---

### Task 1: Test Harness and Application Shell

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Create: `src/components/ScrollToTop.tsx`

**Interfaces:**
- Produces: four routes (`/`, `/cases`, `/about`, `/contact`) and automatic scroll reset.
- Consumes: page components with default React exports.

- [ ] **Step 1: Add the test runner dependencies and scripts**

Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event`; add scripts `test`, `test:watch`, and `check` (`npm run lint && npm run test && npm run build`). Configure Vite with `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true }`.

- [ ] **Step 2: Write the failing route test**

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'

it.each([
  ['/', '设计 · 连接未来'],
  ['/cases', '玉环职智能水壶'],
  ['/about', '让好设计 成就商业价值'],
  ['/contact', '联系我们'],
])('renders %s', (route, heading) => {
  render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
  expect(screen.getByText(heading, { exact: false })).toBeInTheDocument()
})
```

- [ ] **Step 3: Run the route test and observe the expected failure**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because the current source contains corrupted Chinese copy.

- [ ] **Step 4: Implement the minimal route shell**

Keep the four routes and add `<ScrollToTop />` above `<Routes>`. `ScrollToTop` reads `useLocation().pathname`, calls `window.scrollTo({ top: 0, left: 0 })` in an effect, and returns `null`.

- [ ] **Step 5: Run the route test again after page tasks provide the headings**

Run: `npm test -- --run src/App.test.tsx`
Expected: PASS after Tasks 3–5.

### Task 2: Normalized Assets and Shared Brand Components

**Files:**
- Create: `public/assets/logo-koosimy.svg`
- Create: `public/assets/home/*`
- Create: `public/assets/cases/*`
- Create: `public/assets/about/*`
- Create: `public/assets/contact/*`
- Create: `public/assets/shared/*`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/FutureBanner.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/Reveal.tsx`
- Modify: `src/components/Layout.tsx`
- Create: `src/components/SiteHeader.test.tsx`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

**Interfaces:**
- `SectionHeading({ eyebrow, title, description?, align? })` renders consistent section titles.
- `Reveal({ children, className?, delay? })` animates once and respects reduced motion.
- `SiteHeader` exposes accessible desktop links and a toggleable mobile menu.
- `FutureBanner` and `SiteFooter` have no required props.

- [ ] **Step 1: Copy and normalize the supplied artwork**

Map the original files to English names, including `首页/BANNER.jpg` → `home/hero.jpg`, `案例/主图 1.jpg` → `cases/hero.jpg`, `关于/banner.jpg` → `about/hero.jpg`, `联系/BANNER.jpg` → `contact/hero.jpg`, the official logo SVG, QR image, map image, project imagery, portraits, partner images, and award logos.

- [ ] **Step 2: Write the failing navigation test**

```tsx
it('marks the current route and toggles the mobile menu', async () => {
  render(<MemoryRouter initialEntries={['/about']}><SiteHeader /></MemoryRouter>)
  expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute('aria-current', 'page')
  await userEvent.click(screen.getByRole('button', { name: '打开导航' }))
  expect(screen.getByRole('dialog', { name: '网站导航' })).toBeInTheDocument()
})
```

- [ ] **Step 3: Verify the navigation test fails**

Run: `npm test -- --run src/components/SiteHeader.test.tsx`
Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 4: Implement the shared components and global visual tokens**

Use semantic header/nav/footer markup, a 1440px `.site-container`, primary red `#e6002d`, responsive `clamp()` typography, image display defaults, visible focus rings, reduced-motion overrides, and body overflow protection. Replace `Navbar`, `Footer`, and `CTABanner` usage in `Layout` with the new shared components.

- [ ] **Step 5: Verify shared component tests**

Run: `npm test -- --run src/components/SiteHeader.test.tsx`
Expected: PASS.

### Task 3: Home Page

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.test.tsx`

**Interfaces:**
- Produces the prototype sections in this order: hero, services, industrial projects, brand/digital projects, awards, `FutureBanner`.
- Uses normalized image paths under `/assets/home` and `/assets/shared`.

- [ ] **Step 1: Write the failing home composition test**

```tsx
it('renders all prototype home sections in order', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  const labels = ['设计 · 连接未来', '我们能做什么', '工业设计项目', '品牌与数字项目', '荣誉与认可', '我们设计未来']
  labels.forEach((label) => expect(screen.getByText(label, { exact: false })).toBeInTheDocument())
  expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(12)
})
```

- [ ] **Step 2: Verify the home test fails for corrupted/missing content**

Run: `npm test -- --run src/pages/Home.test.tsx`
Expected: FAIL on the first missing readable Chinese heading.

- [ ] **Step 3: Rebuild the home page**

Implement the hero with the supplied robot artwork, the five-service border grid, the exact 2+3 industrial collage, four-card brand/digital row, five-award row, and shared banner. Use real Chinese copy from the prototype and lazy-load below-the-fold images.

- [ ] **Step 4: Verify the home page**

Run: `npm test -- --run src/pages/Home.test.tsx`
Expected: PASS.

### Task 4: Case Study Page

**Files:**
- Modify: `src/pages/Cases.tsx`
- Create: `src/pages/Cases.test.tsx`

**Interfaces:**
- Produces one case study and a two-card “查看更多案例” carousel.
- Carousel buttons have accessible labels `上一个案例` and `下一个案例`.

- [ ] **Step 1: Write the failing case-study interaction test**

```tsx
it('renders the kettle study and advances related cases', async () => {
  render(<Cases />)
  expect(screen.getByRole('heading', { name: '玉环职智能水壶' })).toBeInTheDocument()
  const firstBefore = screen.getAllByTestId('related-case-title')[0].textContent
  await userEvent.click(screen.getByRole('button', { name: '下一个案例' }))
  expect(screen.getAllByTestId('related-case-title')[0]).not.toHaveTextContent(firstBefore ?? '')
})
```

- [ ] **Step 2: Verify the case-study test fails**

Run: `npm test -- --run src/pages/Cases.test.tsx`
Expected: FAIL because the readable heading/carousel behavior is absent.

- [ ] **Step 3: Rebuild the case-study page**

Use the supplied kettle hero and detail photographs at the prototype aspect ratios. Add three related-case entries and show two at once so either arrow rotates the order without inventing a separate detail route.

- [ ] **Step 4: Verify the case-study page**

Run: `npm test -- --run src/pages/Cases.test.tsx`
Expected: PASS.

### Task 5: About and Contact Pages

**Files:**
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Contact.tsx`
- Create: `src/pages/About.test.tsx`
- Create: `src/pages/Contact.test.tsx`

**Interfaces:**
- About produces hero, profile, metrics, capabilities, founders, team, partners, banner.
- Contact produces hero, five methods, consultation, location, platforms, banner.
- Telephone uses `tel:19301490913`; email uses `mailto:tanqicai@koosimy.com`.

- [ ] **Step 1: Write failing page tests**

```tsx
it('renders the about proof points', () => {
  render(<About />)
  ;['8+', '100+', '300+', '创始团队', '团队成员', '合作伙伴'].forEach((text) =>
    expect(screen.getByText(text, { exact: false })).toBeInTheDocument())
})

it('renders actionable contact details', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /19301490913/ })).toHaveAttribute('href', 'tel:19301490913')
  expect(screen.getByRole('link', { name: /tanqicai@koosimy.com/ })).toHaveAttribute('href', 'mailto:tanqicai@koosimy.com')
  expect(screen.getByAltText('KOOSIMY 公司位置地图')).toBeInTheDocument()
})
```

- [ ] **Step 2: Verify both tests fail**

Run: `npm test -- --run src/pages/About.test.tsx src/pages/Contact.test.tsx`
Expected: FAIL because current copy and links are corrupted or missing.

- [ ] **Step 3: Rebuild About and Contact**

Create the exact prototype section sequence with supplied portraits, team images, partner artwork, QR code, map, contact icons, and platform marks. Use semantic links for phone/email and static artwork for the map rather than an external embed.

- [ ] **Step 4: Verify both pages**

Run: `npm test -- --run src/pages/About.test.tsx src/pages/Contact.test.tsx`
Expected: PASS.

### Task 6: Static Hosting, Visual QA, and Publication

**Files:**
- Modify: `index.html`
- Create: `public/404.html`
- Modify: `.gitignore`
- Modify: `README.md`

**Interfaces:**
- `index.html` supplies KOOSIMY metadata and title.
- `404.html` redirects static-hosting deep links back through the SPA entry.

- [ ] **Step 1: Add metadata and static-route fallback**

Set the document language to `zh-CN`, title to `酷施美 KOOSIMY｜一站式产品设计研发服务`, add the matching description, and create the GitHub Pages-compatible SPA redirect document.

- [ ] **Step 2: Run all automated verification**

Run: `npm run check`
Expected: ESLint exits 0, all Vitest tests pass, TypeScript/Vite build exits 0.

- [ ] **Step 3: Run visual verification**

Start `npm run dev -- --host 127.0.0.1`, capture all four routes at 1440×1000 and 390×844, and compare against the prototypes. Fix horizontal overflow, incorrect section order, broken images, mojibake, spacing, and crop mismatches; repeat screenshots after each correction.

- [ ] **Step 4: Verify repository scope and commit**

Run `git status -sb`, `git diff --check`, and inspect `git diff --stat`. Stage the website, tests, normalized assets, spec, plan, and README only. Commit with `feat: build KOOSIMY prototype website`.

- [ ] **Step 5: Push the verified site**

Run: `git push -u origin main`
Expected: remote branch `main` is created at `StevenJacen/koosimy`.
