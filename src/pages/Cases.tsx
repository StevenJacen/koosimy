import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const relatedCases = [
  {
    image: '/assets/cases/related-cookware.jpg',
    category: '厨具设计',
    title: '樱桃系列智能厨具',
  },
  {
    image: '/assets/cases/related-robot.jpg',
    category: '机器人设计',
    title: '荒漠巡检机器人',
  },
  {
    image: '/assets/home/underwater-tool.jpg',
    category: '装备设计',
    title: '水下智能作业设备',
  },
]

export default function Cases() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCases = [0, 1].map((offset) => relatedCases[(startIndex + offset) % relatedCases.length])
  const move = (direction: number) => {
    setStartIndex((current) => (current + direction + relatedCases.length) % relatedCases.length)
  }

  return (
    <div className="cases-page" data-testid="cases-page">
      <section className="cases-hero">
        <img src="/assets/cases/kettle-hero.jpg" alt="玉环职智能水壶设计" />
      </section>

      <section className="case-intro section-pad">
        <div className="site-container">
          <div className="case-intro__content" data-testid="case-intro-content">
            <Reveal>
              <p className="case-intro__index">YUHAN SMART KETTLE</p>
              <h1>玉环职智能水壶</h1>
              <p>
                这是一款为现代生活方式而设计的智能即热净饮水壶，将净化、加热、冲泡、陪伴融为一体。
                简约一体化机身搭配悬浮式透明水箱，以克制而高级的设计语言，自然融入居家、卧室、办公桌等多种生活场景。
              </p>
              <p>
                创新的下沉式取水空间与折叠托盘设计，不仅兼容不同高度杯具，也让使用过程更整洁优雅。
                柔和氛围灯与透明视窗结合，让科技不再只是功能动作，而成为空间中的一部分。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal className="case-visual case-visual--detail">
        <img src="/assets/cases/kettle-detail.jpg" alt="智能水壶产品结构与使用细节" loading="lazy" />
      </Reveal>

      <section className="case-story section-pad">
        <div className="site-container case-story__heading">
          <span>02</span>
          <h2>简洁的秩序感，<br />让科技回归日常。</h2>
          <p>
            通过一体化水箱、隐藏式控制区和克制的比例关系，建立统一的家电视觉体系，
            同时兼顾加水、清洁与取用体验。
          </p>
        </div>
        <div className="case-visual case-visual--crop">
          <img src="/assets/cases/kettle-hero.jpg" alt="智能水壶顶部水箱设计" loading="lazy" />
        </div>
      </section>

      <section className="related-cases section-pad">
        <div className="site-container">
          <div className="related-cases__head">
            <SectionHeading eyebrow="SEE MORE" title="查看更多案例" />
            <div className="related-cases__controls">
              <button type="button" aria-label="上一个案例" onClick={() => move(-1)}><ArrowLeft /></button>
              <button type="button" aria-label="下一个案例" onClick={() => move(1)}><ArrowRight /></button>
            </div>
          </div>
          <div className="related-cases__grid">
            {visibleCases.map((item, index) => (
              <article className="related-card" key={`${item.title}-${index}`}>
                <div className="related-card__image"><img src={item.image} alt={item.title} loading="lazy" /></div>
                <p>{item.category}</p>
                <h3 data-testid="related-case-title">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-cases.jpg" />
    </div>
  )
}
