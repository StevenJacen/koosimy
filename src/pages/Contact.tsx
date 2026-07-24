import { Building2, CarFront, Clock3, Search } from 'lucide-react'
import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

const platforms = [
  {
    image: '/assets/contact/platform-puxiang.jpg',
    label: '普象',
    alt: '普象工业设计小站',
  },
  {
    image: '/assets/contact/platform-rednote.jpg',
    label: '小红书',
    alt: 'KOOSIMY 小红书主页',
  },
  {
    image: '/assets/contact/platform-zcool.jpg',
    label: '站酷',
    alt: 'KOOSIMY 站酷主页',
  },
  {
    image: '/assets/contact/platform-douyin.jpg',
    label: '抖音',
    alt: 'KOOSIMY 抖音主页',
  },
]

export default function Contact() {
  return (
    <div className="contact-page" data-testid="contact-page">
      <ResponsiveHero
        className="contact-hero"
        src="/assets/contact/hero.jpg"
        alt="红色现代建筑空间"
        aspectRatio="3840 / 2112"
      >
        <div className="site-container contact-hero__content">
          <p>联系我们</p>
          <h1>CONTACT<br /><span>KOOSIMY</span></h1>
          <div className="contact-hero__line" />
          <strong>设计 · 连接未来</strong>
          <b>一站式产品设计研发服务</b>
        </div>
      </ResponsiveHero>

      <section className="contact-methods section-pad">
        <div className="site-container">
          <div className="contact-methods__grid">
            <Reveal className="contact-method">
              <img className="contact-method__icon" data-testid="contact-icon-phone" src="/assets/contact/icon-phone.svg" alt="" aria-hidden="true" />
              <span>电话咨询</span>
              <p>
                <a href="tel:19301490913">19301490913</a><br />
                周一到周五 9:00-18:00
              </p>
            </Reveal>
            <Reveal className="contact-method" delay={60}>
              <img className="contact-method__icon" data-testid="contact-icon-email" src="/assets/contact/icon-email.svg" alt="" aria-hidden="true" />
              <span>邮箱联系</span>
              <p>
                <a href="mailto:tanqicai@koosimy.com">tanqicai@koosimy.com</a><br />
                24小时邮件响应
              </p>
            </Reveal>
            <Reveal className="contact-method contact-method--qr" delay={120}>
              <img src="/assets/contact/wechat-qr.jpg" alt="KOOSIMY 微信二维码" />
              <span>微信咨询</span><p>扫码添加微信<br />专业顾问在线沟通</p>
            </Reveal>
            <Reveal className="contact-method" delay={180}>
              <img className="contact-method__icon" data-testid="contact-icon-location" src="/assets/contact/icon-location.svg" alt="" aria-hidden="true" />
              <span>公司地址</span><p>上海市闵行区光中路255号<br />2栋508室</p>
            </Reveal>
            <Reveal className="contact-method" delay={240}>
              <img className="contact-method__icon" data-testid="contact-icon-business" src="/assets/contact/icon-business.svg" alt="" aria-hidden="true" />
              <span>商务合作</span><p>微信号 koosimy<br />获取项目支持</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="consultation section-pad">
        <div className="consultation__grid">
          <Reveal className="consultation__image" delay={100}>
            <img src="/assets/contact/consultation.jpg" alt="产品设计咨询沟通" loading="lazy" />
          </Reveal>
          <div className="site-container consultation__content">
            <Reveal className="consultation__copy">
              <h2>有想法？<span>我们很乐意倾听</span></h2>
              <p>
                无论您有产品创意，品牌升级需求，<br />
                还是项目合作意向，<br />
                我们都愿意成为您最可趣的设计伙伴。<br />
                随时联系我们，开启一段有价值的对话。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="location-section section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="LOCATION" title="我们在这里" />
          <div className="location-address">
            <img src="/assets/contact/icon-location.svg" alt="" aria-hidden="true" />
            <p><strong>公司地址</strong><span>上海市闵行区上海市闵行区光中路255号 2栋508</span></p>
          </div>
          <div className="location-section__grid">
            <Reveal className="location-map">
              <img src="/assets/contact/map.jpg" alt="KOOSIMY 公司位置地图" loading="lazy" />
            </Reveal>
            <div className="location-info">
              <div>
                <Clock3 className="location-info__icon" aria-hidden="true" />
                <span>办公时间</span>
                <strong>周一至周五09:30-18:30<br />法定节假日休息</strong>
              </div>
              <div>
                <CarFront className="location-info__icon" aria-hidden="true" />
                <span>交通指南</span>
                <strong>距离地铁5号线颛桥站1.6公里<br />园区提供访客停车位</strong>
              </div>
              <div>
                <Building2 className="location-info__icon" aria-hidden="true" />
                <span>来访建议</span>
                <strong>为了您有更好的参考体验<br />来访前请与我们联系</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-platforms section-pad">
        <div className="site-container">
          <div className="social-platforms__intro">
            <SectionHeading
              eyebrow="Platform Rapid response"
              title={<>多平台触达<br />快速响应</>}
            />
            <p>通过多平台与我们保持联络，我们将第一时间回应您的需求。</p>
          </div>
          <div className="social-platforms__grid">
            {platforms.map(({ image, label, alt }) => (
              <div className="social-platform" key={label}>
                <img src={image} alt={alt} loading="lazy" />
                <div className="social-platform__meta">
                  <strong>{label}</strong>
                  <Search className="social-platform__search" aria-hidden="true" />
                  <span>酷施美KOOSIMY 设计</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-contact.jpg" />
    </div>
  )
}
