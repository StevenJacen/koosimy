import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

const caseIntroParagraphs = [
  {
    lineBreaks: true,
    sentences: [
      '这是一款为现代生活方式而设计的智能即热净饮水壶，将“净化、加热、冲泡、陪伴”融为一体。',
      '简约一体化机身搭配悬浮式透明水箱，以克制而高级的设计语言，自然融入厨房、卧室、办公桌等多种生活场景。',
    ],
  },
  {
    lineBreaks: false,
    sentences: [
      '创新的下沉式取水空间与折叠托盘设计，不仅兼容不同高度杯具，也让使用过程更整洁优雅。',
      '柔和氛围灯与透明视窗结合，让“烧水”不再只是功能动作，而成为空间中的一部分。',
    ],
  },
  {
    lineBreaks: true,
    sentences: [
      '它不仅是一台饮水设备，更像是一件安静陪伴生活的智能家居产品。',
      '在每一次接水、加热与等待之间，让日常变得更温柔、更有品质感。',
    ],
  },
]

const relatedCases = [
  {
    image: '/assets/cases/related-cookware.jpg',
    title: '康佳樱桃锅',
    english: 'KONKA Cherry Pot',
  },
  {
    image: '/assets/cases/related-robot.jpg',
    title: '康佳樱桃锅',
    english: 'KONKA Cherry Pot',
  },
  {
    image: '/assets/home/underwater-tool.jpg',
    title: '水下智能作业设备',
    english: 'UNDERWATER INTELLIGENT EQUIPMENT',
  },
]

export default function Cases() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCases = [0, 1].map((offset) => relatedCases[(startIndex + offset) % relatedCases.length])
  const move = (direction: number) => {
    setStartIndex((current) => (current + direction * 2 + relatedCases.length) % relatedCases.length)
  }

  return (
    <div className="cases-page" data-testid="cases-page">
      <ResponsiveHero
        className="cases-hero"
        src="/assets/cases/kettle-hero.jpg"
        alt="玉环职智能水壶设计"
        aspectRatio="3840 / 1896"
      />

      <section className="case-intro section-pad">
        <div className="site-container">
          <div className="case-intro__content" data-testid="case-intro-content">
            <Reveal>
              <p className="case-intro__index">YUHAN SMART KETTLE</p>
              <h1>玉环职智能水壶</h1>
              {caseIntroParagraphs.map(({ lineBreaks, sentences }, paragraphIndex) => (
                <p
                  className={`case-intro__paragraph${paragraphIndex === 0 ? ' case-intro__paragraph--lead' : ''}`}
                  key={sentences[0]}
                >
                  {sentences.map((sentence) => (
                    <span
                      className={`case-intro__sentence${lineBreaks ? ' case-intro__sentence--line' : ''}`}
                      key={sentence}
                    >
                      {sentence}
                    </span>
                  ))}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="site-container case-gallery" data-testid="case-gallery">
        <Reveal className="case-gallery__top">
          <img src="/assets/cases/kettle-detail.jpg" alt="智能水壶取水空间与整机细节" loading="lazy" />
        </Reveal>
        <Reveal className="case-gallery__lower" delay={80}>
          <img src="/assets/cases/kettle-lower.jpg" alt="智能水壶顶部水箱设计" loading="lazy" />
        </Reveal>
      </section>

      <section className="related-cases section-pad">
        <div className="site-container">
          <div className="related-cases__head">
            <SectionHeading eyebrow="SEE MORE" title="查看更多案例" />
          </div>
          <div className="related-cases__carousel">
            <button className="related-cases__arrow related-cases__arrow--previous" type="button" aria-label="上一个案例" onClick={() => move(-1)}><ChevronLeft /></button>
            <div className="related-cases__grid">
              {visibleCases.map((item) => (
                <article className="related-card" key={item.image}>
                  <div className="related-card__image"><img src={item.image} alt={item.title} loading="lazy" /></div>
                  <div className="related-card__metadata">
                    <h3 className="related-card__title" data-testid="related-case-title">{item.title}</h3>
                    <span className="related-card__english" data-testid="related-case-english">{item.english}</span>
                  </div>
                </article>
              ))}
            </div>
            <button className="related-cases__arrow related-cases__arrow--next" type="button" aria-label="下一个案例" onClick={() => move(1)}><ChevronRight /></button>
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-cases.jpg" />
    </div>
  )
}
