import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

const companyProfileParagraphs = [
  '酷施美是一家专注于产品创新设计的专业机构。我们以用户为中心，融合策略、设计与技术，为客户提供从洞察到落地的一站式产品设计研发服务，帮助企业提升产品竞争力，连接未来的更多可能。',
  '我们深耕智能家居、生活电器、美容个护、消费电子、医疗健康及新消费产品等多个行业，服务涵盖产品设计、品牌创意、UI/APP界面等体验服务方向。',
  '凭借对市场、科技与消费趋势的敏锐洞察，力求产出兼具商业创新性、实用性与市场竞争力的产品解决方案。',
]

const capabilities = [
  {
    number: '01',
    title: '策略研究',
    english: 'STRATEGY RESEARCH',
    description: '从市场趋势、用户需求、竞品格局与产业机会出发，帮助客户明确产品定位与发展方向。通过前期策略与场景分析，梳理产品核心价值、目标用户与体验逻辑，为后续设计决策提供清晰依据。',
  },
  {
    number: '02',
    title: '工业设计',
    english: 'INDUSTRIAL DESIGN',
    description: '围绕产品外观、功能体验、人机交互与品牌识别进行系统化设计，将创新理念转化为兼具市场竞争力的产品方案。我们注重造型美感、使用体验与制造合理性的平衡，提升产品的视觉吸引力与用户认同。',
  },
  {
    number: '03',
    title: '结构设计',
    english: 'STRUCTURE DESIGN',
    description: '结合产品功能、内部构成、材料特性、生产工艺与装配方式，进行结构设计与工程验证。通过合理的结构方案，保障产品的稳定性、安全性、可制造性与后期维护效率。',
  },
  {
    number: '04',
    title: '品牌设计',
    english: 'BRAND DESIGN',
    description: '从品牌定位、视觉识别、产品语言与传播表达出发，构建统一且具有辨识度的品牌形象。通过品牌策略与设计系统的整合，强化产品与品牌之间的关联，提升品牌的整体市场记忆点。',
  },
  {
    number: '05',
    title: '工业链支持',
    english: 'SUPPLY CHAIN',
    description: '依托设计资源与生产端协同能力，提供从材料打样、结构工艺、供应商对接到量产落地的全流程支持，帮助客户降低沟通与试错成本，提升产品从概念设计到生产上市的落地效率。',
  },
]

const founders = [
  {
    image: '/assets/about/founder-tangmin.jpg',
    name: '唐敏',
    role: '创始人 / 设计总监',
    profile: [
      '华东理工大学工业设计工程硕士',
      '无创空间联合创始人',
      '8年综合产品设计经验',
      '曾获IF、kdesign等国际设计大奖',
    ],
  },
  {
    image: '/assets/about/founder-tanqicai.jpg',
    name: '谭祺才',
    role: '联合创始人 / 总经理',
    profile: [
      '上海电机学院-工业设计专业',
      '获得比赛类奖项若干，专利十余项',
      '6年综合产品设计&量产支持经验',
      '现负责团队业务的营销推广',
    ],
  },
]

const team = [
  { image: 'team-01.jpg', name: '吴海涛', role: '工业设计师' },
  { image: 'team-02.jpg', name: '吴海涛', role: '品牌设计师' },
  { image: 'team-03.jpg', name: '吴海涛', role: '结构工程师' },
  { image: 'team-02.jpg', name: '吴海涛', role: '用户研究员' },
  { image: 'team-03.jpg', name: '吴海涛', role: '产品经理' },
  { image: 'team-01.jpg', name: '吴海涛', role: '视觉设计师' },
  { image: 'team-03.jpg', name: '吴海涛', role: 'CMF 设计师' },
  { image: 'team-01.jpg', name: '吴海涛', role: '供应链经理' },
  { image: 'team-02.jpg', name: '吴海涛', role: '交互设计师' },
  { image: 'team-01.jpg', name: '吴海涛', role: '项目经理' },
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
              <div className="about-profile__narrative" data-testid="company-profile-narrative">
                {companyProfileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="about-profile__studio" delay={80}>
              <img src="/assets/about/studio.jpg" alt="KOOSIMY 上海办公空间" loading="lazy" />
            </Reveal>
          </div>
          <div className="stats-grid">
            <div><strong>8+</strong><span>行业深耕</span></div>
            <div><strong>100+</strong><span>服务客户</span></div>
            <div><strong>300+</strong><span>落地产品</span></div>
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
          <SectionHeading eyebrow="FOUNDING TEAM" title="创始团队" />
          <p className="founders__statement">以专业驱动创新</p>
          <div className="founders__list">
            {founders.map((founder, index) => (
              <Reveal className={`founder-card ${index % 2 ? 'founder-card--reverse' : ''}`} key={founder.name}>
                <div className="founder-card__image"><img src={founder.image} alt={founder.name} loading="lazy" /></div>
                <div className="founder-card__copy">
                  <span>0{index + 1}</span>
                  <h3>{founder.name}</h3>
                  <strong>{founder.role}</strong>
                  <p className="founder-card__bio">
                    {founder.profile.map((line) => (
                      <span className="founder-card__bio-line" key={line}>{line}</span>
                    ))}
                  </p>
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
            {team.map((member, index) => (
              <figure className="team-card" key={`${member.role}-${index}`}>
                <img src={`/assets/about/${member.image}`} alt={`${member.name}，${member.role}`} loading="lazy" />
                <figcaption className="team-card__caption">
                  <strong className="team-card__name">{member.name}</strong>
                  <span className="team-card__role">{member.role}</span>
                  <span className="team-card__rule" aria-hidden="true" />
                </figcaption>
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
            description="经过多年的发展，酷施美设计已成功携手上海电气、西屋、大宇等超200家国内外知名企业和新兴互联网品牌，打造出1000余个优秀案例。我们擅长为企业量身定制人性化的产品规划与设计服务，用严谨创新、精益求精的设计助力成就产品和品牌价值"
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
