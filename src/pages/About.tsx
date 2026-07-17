import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

const capabilities = [
  { number: '01', title: '策略研究', english: 'STRATEGY RESEARCH', description: '洞察用户、行业与技术趋势，为创新找到清晰方向。' },
  { number: '02', title: '工业设计', english: 'INDUSTRIAL DESIGN', description: '建立产品与品牌的长期设计语言，连接商业目标。' },
  { number: '03', title: '结构设计', english: 'STRUCTURE DESIGN', description: '兼顾美学、功能与制造，塑造具有辨识度的产品体验。' },
  { number: '04', title: '品牌设计', english: 'BRAND DESIGN', description: '从核心概念到完整视觉系统，让品牌表达一致而有力。' },
  { number: '05', title: '工业链支持', english: 'SUPPLY CHAIN', description: '联动结构、工程与供应链，推动创意成为可靠产品。' },
]

const founders = [
  {
    image: '/assets/about/founder-tangmin.jpg',
    name: '唐敏',
    role: '创始人 / 设计总监',
    description: '深耕工业设计与品牌创新，以系统化设计方法帮助企业建立持久竞争力。',
  },
  {
    image: '/assets/about/founder-tanqicai.jpg',
    name: '谭奇才',
    role: '联合创始人 / 总经理',
    description: '专注产品创新与产业落地，连接设计、技术、制造和市场的完整价值链。',
  },
]

const team = [
  ['team-01.jpg', '工业设计师'], ['team-02.jpg', '品牌设计师'], ['team-03.jpg', '结构工程师'],
  ['team-02.jpg', '用户研究员'], ['team-03.jpg', '产品经理'], ['team-01.jpg', '视觉设计师'],
  ['team-03.jpg', 'CMF 设计师'], ['team-01.jpg', '供应链经理'], ['team-02.jpg', '交互设计师'],
  ['team-01.jpg', '项目经理'],
]

const partnerLogos = Array.from({ length: 12 }, (_, index) =>
  `/assets/about/partners/partner-${String(index + 1).padStart(2, '0')}.jpg`,
)

export default function About() {
  return (
    <div className="about-page" data-testid="about-page">
      <ResponsiveHero
        className="about-hero"
        src="/assets/about/hero.jpg"
        alt="KOOSIMY 设计工作室"
        aspectRatio="3840 / 2161"
      >
        <div className="site-container about-hero__content">
          <p>WE DESIGN THE FUTURE</p>
          <h1 className="about-hero__display">
            DESIGN<br />BEYOND<br /><span>IMAGINATION</span>
          </h1>
          <p className="about-hero__tagline">设计 · 连接未来</p>
        </div>
        <div className="site-container about-hero__service">一站式产品设计研发服务</div>
      </ResponsiveHero>

      <section className="about-profile section-pad">
        <div className="site-container">
          <div className="about-profile__intro">
            <Reveal className="about-profile__copy">
              <SectionHeading eyebrow="COMPANY PROFILE" title="公司简介" />
              <h3>让好设计 成就商业价值</h3>
              <div>
                <p>
                  酷施美是一家专注于产品创新的设计咨询公司。我们以用户洞察为起点，
                  将策略、工业设计、品牌与工程落地融为一体，为客户创造具有商业价值的产品。
                </p>
                <p>
                  团队扎根上海，服务覆盖消费电子、智能家电、医疗健康、工业装备与生活方式等领域。
                </p>
              </div>
            </Reveal>
            <Reveal className="about-profile__studio" delay={80}>
              <img src="/assets/about/studio.jpg" alt="KOOSIMY 上海办公空间" loading="lazy" />
            </Reveal>
          </div>
          <div className="stats-grid">
            <div><strong>8+</strong><span>年设计经验</span></div>
            <div><strong>100+</strong><span>合作客户</span></div>
            <div><strong>300+</strong><span>落地项目</span></div>
            <div><strong>1</strong><span>一站式服务</span></div>
          </div>
        </div>
      </section>

      <section className="capabilities section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="COMPANY PROFILE" title="服务能力" />
          <div className="capability-list">
            {capabilities.map((item) => (
              <Reveal className="capability-row" key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><small>{item.english}</small></div>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="founders section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="FOUNDERS" title="创始团队" />
          <div className="founders__list">
            {founders.map((founder, index) => (
              <Reveal className={`founder-card ${index % 2 ? 'founder-card--reverse' : ''}`} key={founder.name}>
                <div className="founder-card__image"><img src={founder.image} alt={founder.name} loading="lazy" /></div>
                <div className="founder-card__copy">
                  <span>0{index + 1}</span>
                  <h3>{founder.name}</h3>
                  <strong>{founder.role}</strong>
                  <p>{founder.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="OUR TEAM" title="团队成员" />
          <div className="team-grid">
            {team.map(([image, role], index) => (
              <figure className="team-card" key={`${role}-${index}`}>
                <img src={`/assets/about/${image}`} alt={role} loading="lazy" />
                <figcaption><strong>KOOSIMY</strong><span>{role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="partners section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="PARTNER"
            title="合作伙伴"
            description="我们与各行业领先品牌持续合作，以专业设计能力推动产品创新与商业增长。"
          />
          <div className="partners__grid">
            {partnerLogos.map((logo, index) => (
              <div className="partner-logo" key={logo}>
                <img src={logo} alt={`合作伙伴 ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-about.jpg" />
    </div>
  )
}
