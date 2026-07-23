import { Link } from 'react-router'
import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

interface Service {
  title: string
  description: [string, string]
  image: string
  testId?: string
}

const services: Service[] = [
  { image: '/assets/home/icon-strategy.svg', testId: 'service-icon-strategy', title: '策略研究', description: ['洞察市场与用户', '定义产品方向'] },
  { image: '/assets/home/icon-industrial.svg', testId: 'service-icon-industrial', title: '工业设计', description: ['创新设计与工程实现', '提升产品竞争力'] },
  { image: '/assets/home/icon-structure.svg', testId: 'service-icon-structure', title: '结构设计', description: ['结构与工艺维度', '确保量产可行'] },
  { image: '/assets/home/icon-brand.svg', testId: 'service-icon-brand', title: '品牌设计', description: ['品牌视觉与语言', '塑造品牌价值'] },
  { image: '/assets/home/icon-supply-chain.svg', testId: 'service-icon-supply-chain', title: '供应链支持', description: ['量产落地与供应链整合', '助力产品成功上市'] },
]

const industrialProjects = [
  {
    image: '/assets/home/industrial-equipment.jpg',
    number: '01',
    title: '工业设备与智能制造',
    description: ['清晰化设计，提升产品', '检测与精度'],
  },
  {
    image: '/assets/home/underwater-tool.jpg',
    number: '02',
    title: '工具装备与智能应用',
    description: ['高效动力平台，稳定高效'],
  },
  {
    image: '/assets/home/medical-device.jpg',
    number: '03',
    title: '医疗健康与生命科技',
    description: ['多功能监护仪', '守护健康睡眠'],
  },
  {
    image: '/assets/home/cookware.jpg',
    number: '04',
    title: '生活方式与家居用品',
    description: ['料理专家的厨房搭档', '美味生活每一天'],
  },
  {
    image: '/assets/home/smart-appliances.jpg',
    number: '05',
    title: '智能消费与生活电器',
    description: ['便携温控，专注用户体验'],
  },
]

const brandProjects = [
  {
    image: '/assets/home/brand-packaging.jpg',
    number: '01',
    title: '产品包装设计',
  },
  {
    image: '/assets/home/brand-system.jpg',
    number: '02',
    title: '品牌视觉系统',
  },
  {
    image: '/assets/home/signage.jpg',
    number: '03',
    title: '空间标识设计',
  },
  {
    image: '/assets/home/digital-product.jpg',
    number: '04',
    title: '数字产品案例',
  },
]

const awards = [
  { image: '/assets/home/award-kdesign.jpg', alt: 'K-DESIGN AWARD' },
  { image: '/assets/home/award-reddot.jpg', alt: 'RED DOT DESIGN AWARD' },
  { image: '/assets/home/award-muse.jpg', alt: 'MUSE DESIGN AWARDS' },
  { image: '/assets/home/award-ida.jpg', alt: 'IDA DESIGN AWARDS' },
  { image: '/assets/home/award-if.jpg', alt: 'iF DESIGN AWARD' },
]

export default function Home() {
  return (
    <div className="home-page" data-testid="home-page">
      <ResponsiveHero
        className="home-hero"
        imageClassName="home-hero__image"
        src="/assets/home/hero.jpg"
        alt="未来感机器人产品设计"
        aspectRatio="3840 / 2162"
      >
        <div className="site-container home-hero__content">
          <p className="home-hero__eyebrow">WE DESIGN THE FUTURE</p>
          <h1>
            DESIGN<br />
            BEYOND<br />
            <span className="home-hero__accent-line">IMAGINATION</span>
          </h1>
          <p className="home-hero__tagline">设计 · 连接未来</p>
        </div>
        <div className="site-container home-hero__service">一站式产品设计研发服务</div>
      </ResponsiveHero>

      <section className="home-services section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="WHAT WE DO"
              title="我们能做什么"
              description="以用户为中心，融合策略、设计与技术，打造有价值的产品体验。"
            />
            <Link className="text-link home-services__more" to="/about">了解更多 →</Link>
          </Reveal>
          <div className="home-services__grid">
            {services.map(({ image, testId, title, description }, index) => (
              <Reveal className="service-card" delay={index * 70} key={title}>
                <img className="service-card__icon" data-testid={testId} src={image} alt="" aria-hidden="true" />
                <strong>{title}</strong>
                <small>{description[0]}<br />{description[1]}</small>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section project-section--industrial section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="OUR CASE" title="工业设计项目" />
          </Reveal>
          <div className="industrial-grid">
            {industrialProjects.map((project, index) => (
              <Reveal className={`project-card project-card--industrial project-card--${index + 1}`} delay={index * 60} key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-card__shade" />
                <span className="project-card__number">{project.number}</span>
                <div className="project-card__content">
                  <h3>{project.title}</h3>
                  <p>{project.description[0]}{project.description[1] && <><br />{project.description[1]}</>}</p>
                  <Link to="/cases">查看案例 →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section project-section--brand section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="BRAND & DIGITAL PROJECT" title="品牌与数字项目" />
          </Reveal>
          <div className="brand-grid">
            {brandProjects.map((project, index) => (
              <Reveal className="project-card project-card--brand" delay={index * 60} key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-card__shade" />
                <span className="project-card__number">{project.number}</span>
                <div className="project-card__content">
                  <h3>{project.title}</h3>
                  <Link to="/cases">查看案例 →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="awards section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="AWARDS & RECOGNITION" title="荣誉与认可" />
          </Reveal>
          <div className="awards__grid">
            {awards.map((award) => (
              <div className="award-logo" key={award.alt}>
                <img data-testid="award-logo" src={award.image} alt={award.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-home.jpg" />
    </div>
  )
}
