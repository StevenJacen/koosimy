import {
  Blocks,
  Box,
  ChartNoAxesCombined,
  PenTool,
  ScanSearch,
} from 'lucide-react'
import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const services = [
  { icon: ScanSearch, title: '策略研究', english: 'STRATEGY RESEARCH' },
  { icon: ChartNoAxesCombined, title: '工业设计', english: 'INDUSTRIAL DESIGN' },
  { icon: Box, title: '结构设计', english: 'STRUCTURE DESIGN' },
  { icon: PenTool, title: '品牌设计', english: 'BRAND DESIGN' },
  { icon: Blocks, title: '供应链支持', english: 'SUPPLY CHAIN' },
]

const industrialProjects = [
  { image: '/assets/home/industrial-equipment.jpg', number: '01', title: '工业设备' },
  { image: '/assets/home/underwater-tool.jpg', number: '02', title: '水下设备' },
  { image: '/assets/home/medical-device.jpg', number: '03', title: '医疗器械' },
  { image: '/assets/home/cookware.jpg', number: '04', title: '生活厨具' },
  { image: '/assets/home/smart-appliances.jpg', number: '05', title: '智能家电' },
]

const brandProjects = [
  { image: '/assets/home/brand-packaging.jpg', title: '品牌包装设计' },
  { image: '/assets/home/brand-system.jpg', title: '品牌视觉系统' },
  { image: '/assets/home/signage.jpg', title: '导视系统设计' },
  { image: '/assets/home/digital-product.jpg', title: '数字产品设计' },
]

const awards = [
  { image: '/assets/home/award-muse.jpg', alt: 'MUSE DESIGN AWARDS' },
  { image: '/assets/home/award-ida.jpg', alt: 'IDA DESIGN AWARDS' },
  { image: '/assets/home/award-if.jpg', alt: 'iF DESIGN AWARD' },
  { image: '/assets/home/award-kdesign.svg', alt: 'K-DESIGN AWARD' },
  { image: '/assets/home/award-reddot.svg', alt: 'RED DOT DESIGN AWARD' },
]

export default function Home() {
  return (
    <div className="home-page" data-testid="home-page">
      <section className="home-hero">
        <img className="home-hero__image" src="/assets/home/hero.jpg" alt="未来感机器人产品设计" />
        <div className="site-container home-hero__content">
          <p className="home-hero__eyebrow">WE DESIGN THE FUTURE</p>
          <h1>
            DESIGN<br />
            BEYOND<br />
            <span>IMAGINATION</span>
          </h1>
          <p className="home-hero__tagline">设计 · 连接未来</p>
        </div>
        <div className="site-container home-hero__service">一站式产品设计研发服务</div>
      </section>

      <section className="home-services section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="WHAT WE DO"
              title="我们能做什么"
              description="以用户为中心，融合策略、设计与技术，打造有价值的产品体验。"
            />
          </Reveal>
          <div className="home-services__grid">
            {services.map(({ icon: Icon, title, english }, index) => (
              <Reveal className="service-card" delay={index * 70} key={title}>
                <Icon aria-hidden="true" />
                <strong>{title}</strong>
                <span>{english}</span>
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
                <h3>{project.title}</h3>
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
                <h3>{project.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="awards section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="AWARDS & RECOGNITION" title="荣誉与认可" align="center" />
          </Reveal>
          <div className="awards__grid">
            {awards.map((award) => (
              <div className="award-logo" key={award.alt}>
                <img src={award.image} alt={award.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-home.jpg" />
    </div>
  )
}
