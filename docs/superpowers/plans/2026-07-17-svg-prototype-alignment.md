# SVG 素材与原型对齐实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `0713切图` 中尚未使用的 7 个有效 SVG 全部用于对应页面，并修正本轮原型复核确认的结构与文案差异。

**Architecture:** SVG 复制到 `public/assets` 后使用稳定英文文件名，由页面数据数组直接引用；不新增图标组件或依赖。调整只覆盖原型可明确验证的首页服务/奖项、案例说明和联系模块，不改动已匹配的公共导航、横幅与页脚。

**Tech Stack:** React 19、TypeScript、CSS、Vitest、Testing Library、Vite

## Global Constraints

- 四张原型图是唯一视觉基准。
- 优先使用 `0713切图` 提供的官方 SVG，不使用替代图标。
- 所有素材在 `public/assets` 使用稳定英文 kebab-case 名称。
- 保持四条现有路由与移动端无横向溢出。
- 修改后必须通过 `npm run check` 并完成 1920px 与 390px 视觉检查。

---

### Task 1: 建立 SVG 使用契约

**Files:**
- Modify: `src/pages/Home.test.tsx`
- Modify: `src/pages/Contact.test.tsx`
- Modify: `src/pages/Cases.test.tsx`

**Interfaces:**
- Consumes: 页面渲染后的真实 `img[src]`、奖项顺序与案例说明 DOM。
- Produces: 对 7 个新增 SVG 引用和三处原型差异的回归保护。

- [ ] **Step 1: 写首页失败测试**

断言服务区包含 `/assets/home/icon-strategy.svg`、`icon-industrial.svg`、`icon-supply-chain.svg`，并断言奖项 alt 顺序为 K-DESIGN、RED DOT、MUSE、IDA、iF。

- [ ] **Step 2: 写联系页失败测试**

断言联系卡使用 `icon-phone.svg`、`icon-email.svg`、`icon-location.svg`、`icon-business.svg`，并出现“有想法？我们很乐意倾听”。

- [ ] **Step 3: 写案例页失败测试**

断言项目说明包含原型中的两段正文，且说明容器使用 `case-intro__content` 单列契约。

- [ ] **Step 4: 运行测试确认 RED**

运行：`npm test -- src/pages/Home.test.tsx src/pages/Contact.test.tsx src/pages/Cases.test.tsx`

预期：因 SVG 路径、奖项顺序、联系文案和案例容器尚未实现而失败。

### Task 2: 复制并接入全部剩余 SVG

**Files:**
- Create: `public/assets/home/icon-strategy.svg`
- Create: `public/assets/home/icon-industrial.svg`
- Create: `public/assets/home/icon-supply-chain.svg`
- Create: `public/assets/contact/icon-phone.svg`
- Create: `public/assets/contact/icon-email.svg`
- Create: `public/assets/contact/icon-location.svg`
- Create: `public/assets/contact/icon-business.svg`
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Contact.tsx`

**Interfaces:**
- Consumes: `0713切图/0713切图/首页` 与 `联系` 中的原始 SVG。
- Produces: 页面可直接使用的 7 个静态资源 URL。

- [ ] **Step 1: 复制并按用途重命名 SVG**

首页映射：`wodeyanjiu 1.svg` → `icon-strategy.svg`，`jiaohusheji 1.svg` → `icon-industrial.svg`，`weibiaoti-4 1.svg` → `icon-supply-chain.svg`。

联系映射：`dianhuazixun 1.svg` → `icon-phone.svg`，`Group 42.svg` → `icon-email.svg`，`Group 40.svg` → `icon-location.svg`，`Group 46.svg` → `icon-business.svg`。

- [ ] **Step 2: 首页使用原始 SVG 并校正奖项顺序**

服务数据改为可选 `image` 或 Lucide `icon`，三项使用 SVG，结构与品牌两项保留现有矢量组件；奖项顺序改为 K-DESIGN、RED DOT、MUSE、IDA、iF。

- [ ] **Step 3: 联系卡使用四个原始 SVG**

电话、邮箱、地址、商务合作卡改为 `img.contact-method__icon`；微信卡保留真实二维码，不添加替代线性图标；咨询标题改为“有想法？我们很乐意倾听”。

- [ ] **Step 4: 运行首页与联系页测试确认 GREEN**

运行：`npm test -- src/pages/Home.test.tsx src/pages/Contact.test.tsx`

预期：全部通过。

### Task 3: 对齐案例说明与视觉细节

**Files:**
- Modify: `src/pages/Cases.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: 现有案例图片、原型中的 YUHAN SMART KETTLE 标题与正文。
- Produces: 单列案例说明区、SVG 图标一致尺寸、原型化编号标签。

- [ ] **Step 1: 将案例说明改为原型单列结构**

使用 `case-intro__content` 包住英文标签、标题和两段说明；移除不在原型中的服务内容/项目时间定义列表。

- [ ] **Step 2: 更新 CSS**

为服务 SVG 与联系 SVG 提供与原型一致的图标尺寸；案例说明限制阅读宽度；首页项目编号使用红色方形标签；保持 820px 与 560px 断点无溢出。

- [ ] **Step 3: 运行目标测试确认 GREEN**

运行：`npm test -- src/pages/Cases.test.tsx src/pages/Home.test.tsx src/pages/Contact.test.tsx`

预期：全部通过。

### Task 4: 完整验证与发布

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-koosimy-static-site-design.md`（补充实际 SVG 映射说明）

**Interfaces:**
- Consumes: 完成后的源码与素材。
- Produces: 可复现的验证证据和远端更新提交。

- [ ] **Step 1: 检查所有源 SVG 均有项目哈希匹配**

运行 PowerShell 文件哈希对照，预期 `0713切图/0713切图` 中 10 个有效 SVG 均能匹配 `public/assets` 中的项目文件。

- [ ] **Step 2: 运行完整质量检查**

运行：`npm run check`

预期：ESLint、全部 Vitest 测试、TypeScript 和 Vite 构建退出码为 0。

- [ ] **Step 3: 浏览器视觉检查**

在 1920px 和 390px 视口检查四页首屏、服务图标、联系卡、案例说明、横向溢出和控制台错误。

- [ ] **Step 4: 提交并推送**

提交信息：`fix: align SVG assets with KOOSIMY prototypes`，推送 `main` 到 `origin`。

