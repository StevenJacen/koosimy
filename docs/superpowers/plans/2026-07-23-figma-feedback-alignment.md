# KOOSIMY Figma Feedback Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align all four KOOSIMY pages with the approved Figma feedback and local prototypes while preserving full Banner images at every supported width.

**Architecture:** Keep the existing React route and shared-component structure, but revise page data/markup and replace the single global stylesheet with design-token-driven responsive composition. Treat the Figma feedback as a DOM/CSS contract: tests first assert required content and layout tokens, then production code and assets are updated, followed by browser measurements and screenshot comparison.

**Tech Stack:** React 19, TypeScript, React Router, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Desktop design reference is `1920px`; content width is `1680px` with `120px` side margins.
- Brand red is exactly `#E50036`.
- Desktop header is `134px`, overlays the Banner, and uses translucent white.
- MiSans and Source Han Sans font stacks replace Helvetica and Arial declarations.
- Hero images retain source aspect ratios and use `object-fit: contain`.
- Desktop footer follows `1920 × 553px`.
- No new runtime dependency, generated visual, or temporary Figma URL.
- Contact page uses `联系.jpg` because the Figma Starter API limit prevented another context export.

---

### Task 1: Add Figma Feedback Regression Contracts

**Files:**
- Modify: `src/pages/Home.test.tsx`
- Modify: `src/pages/Cases.test.tsx`
- Modify: `src/pages/About.test.tsx`
- Modify: `src/pages/Contact.test.tsx`
- Create: `src/figma-feedback.test.ts`

**Interfaces:**
- Consumes: existing page components and `src/index.css`.
- Produces: regression assertions for required copy, removed sections, asset mapping, and layout tokens.

- [ ] **Step 1: Add failing page-contract tests**

Add assertions that require:

```tsx
expect(screen.getByRole('link', { name: /了解更多/ })).toBeInTheDocument()
expect(screen.getAllByText(/查看案例/)).toHaveLength(9)
expect(screen.getByText(/它不仅是一台饮水设备/)).toBeInTheDocument()
expect(document.querySelector('.case-story')).not.toBeInTheDocument()
expect(screen.getAllByTestId('related-case-english')).toHaveLength(2)
expect(screen.getByText(/经过多年的发展/)).toBeInTheDocument()
expect(screen.getByRole('heading', { name: /多平台触达 快速响应/ })).toBeInTheDocument()
```

- [ ] **Step 2: Add a failing CSS contract**

In `src/figma-feedback.test.ts`, load `index.css` as text and assert:

```ts
expect(css).toMatch(/--red:\s*#e50036/i)
expect(css).toMatch(/\.site-container\s*\{[^}]*1680px/s)
expect(css).toMatch(/\.site-header\s*\{[^}]*height:\s*134px/s)
expect(css).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/)
expect(css).not.toMatch(/Arial|Helvetica/)
expect(css).not.toMatch(/\.site-nav__link:hover[^}]*color:\s*var\(--red\)/s)
expect(css).toMatch(/\.site-footer\s*\{[^}]*aspect-ratio:\s*1920\s*\/\s*553/s)
```

- [ ] **Step 3: Run tests and verify RED**

Run:

```bash
npm test -- src/pages/Home.test.tsx src/pages/Cases.test.tsx src/pages/About.test.tsx src/pages/Contact.test.tsx src/figma-feedback.test.ts
```

Expected: FAIL because required copy, white-layout structure, footer attribution, and updated CSS tokens do not yet exist.

### Task 2: Align Shared Header, Typography, Future Banner, and Footer

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/FutureBanner.tsx`
- Modify: `src/index.css`
- Test: `src/components/SiteHeader.test.tsx`
- Test: `src/figma-feedback.test.ts`

**Interfaces:**
- Consumes: the existing `SiteHeader`, `FutureBanner`, and `SiteFooter` component API.
- Produces: `134px` overlay header, design font stack, translucent navigation, common future banner, exact red footer with attribution.

- [ ] **Step 1: Implement shared component markup**

Use the existing logo and contact QR assets, add a real Douyin image, and append:

```tsx
<p className="site-footer__attribution">
  Icons by Nobita (IcoFont), licensed under{' '}
  <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
</p>
```

- [ ] **Step 2: Implement shared design tokens and geometry**

Set `--red: #e50036`, `.site-container` to `min(100% - 240px, 1680px)`, make `.site-header` absolute and `134px` tall with `rgba(255,255,255,.8)`, scale the logo to the Figma proportion, and give `.site-footer` desktop `aspect-ratio: 1920 / 553`.

- [ ] **Step 3: Run shared tests and verify GREEN**

Run:

```bash
npm test -- src/components/SiteHeader.test.tsx src/figma-feedback.test.ts
```

Expected: PASS.

### Task 3: Align the Home Page

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`
- Test: `src/pages/Home.test.tsx`

**Interfaces:**
- Consumes: `/assets/home/*`, `ResponsiveHero`, `SectionHeading`, `FutureBanner`.
- Produces: Figma-aligned Home content with nine case links and five correctly ordered award marks.

- [ ] **Step 1: Add complete project metadata**

Give every industrial and brand project a `description` and render a semantic `Link` or anchor with `查看案例 →`. Add `了解更多 →` after the service description.

- [ ] **Step 2: Rebuild Home composition**

Use a black/red Banner text overlay without gray shade; white service/project/brand sections; a `2 + 3` industrial grid; a four-column brand grid; left-aligned freestanding award logos.

- [ ] **Step 3: Run the Home test and verify GREEN**

Run:

```bash
npm test -- src/pages/Home.test.tsx
```

Expected: PASS.

### Task 4: Align the Case Detail Page

**Files:**
- Modify: `src/pages/Cases.tsx`
- Modify: `src/index.css`
- Test: `src/pages/Cases.test.tsx`

**Interfaces:**
- Consumes: `/assets/cases/*`, carousel state, `ResponsiveHero`, `FutureBanner`.
- Produces: complete introduction, two-tier detail visuals, no `case-story`, white related-case carousel with bilingual labels.

- [ ] **Step 1: Complete the introduction and related-case data**

Add the missing final paragraph and an `english` value for all related cases, then render `data-testid="related-case-english"`.

- [ ] **Step 2: Remove the extra story block**

Delete the `.case-story` section and place the detail and lower visual in a `.case-gallery` matching the prototype.

- [ ] **Step 3: Replace circular controls with edge arrows**

Keep accessible buttons and carousel behavior while styling the buttons as unboxed chevrons at the left and right edges.

- [ ] **Step 4: Run the Cases test and verify GREEN**

Run:

```bash
npm test -- src/pages/Cases.test.tsx
```

Expected: PASS.

### Task 5: Align About and Contact

**Files:**
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Contact.tsx`
- Modify: `src/index.css`
- Test: `src/pages/About.test.tsx`
- Test: `src/pages/Contact.test.tsx`

**Interfaces:**
- Consumes: all existing About and Contact assets.
- Produces: complete Figma copy, compact About sections, and prototype-aligned Contact composition.

- [ ] **Step 1: Complete About copy**

Expand the company intro and capabilities and replace the partner description with the exact approved paragraph from the specification.

- [ ] **Step 2: Correct About geometry**

Use a compact company/stats flow, approximately `188px` capability rows, approximately `1532 × 462px` founder cards, white team section, and borderless partner logos.

- [ ] **Step 3: Correct Contact hierarchy**

Retain the approved section order, ensure all section titles are present, use a left-copy/right-image consultation layout, constrain the map ratio, and make the platform section white.

- [ ] **Step 4: Run About and Contact tests and verify GREEN**

Run:

```bash
npm test -- src/pages/About.test.tsx src/pages/Contact.test.tsx
```

Expected: PASS.

### Task 6: Responsive Browser Verification and Publication

**Files:**
- Modify only files where verification exposes an in-scope defect.
- Create: `comparison-screenshots/figma-feedback/*` screenshots and comparison composites when supported by the local renderer.

**Interfaces:**
- Consumes: completed site and local prototype images.
- Produces: validated build, visual comparison artifacts, and published `main`.

- [ ] **Step 1: Run the full project check**

Run:

```bash
npm run check
```

Expected: ESLint, all Vitest tests, TypeScript, and Vite production build PASS.

- [ ] **Step 2: Verify browser geometry**

For every route at widths `1366`, `1024`, `768`, and `390`, assert:

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth
```

Measure the Banner media and container rectangles to confirm the source ratio and zero crop, and confirm all overlay text rectangles remain inside the Banner.

- [ ] **Step 3: Compare desktop screenshots with prototypes**

Capture each rendered page at a 1920px viewport, place it beside the matching local prototype, and visually inspect header, section order, image proportions, section spacing, fonts, colors, future banner, and footer.

- [ ] **Step 4: Review React and verification guidance**

Apply the React best-practices review, then run the verification-before-completion checklist and re-run any command whose evidence is stale.

- [ ] **Step 5: Commit and push**

Run:

```bash
git add docs src public comparison-screenshots
git commit -m "fix: align site with figma feedback"
git push origin main
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected: the local and remote `main` hashes match and `git status --short --branch` is clean.
