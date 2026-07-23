import FutureBanner from '../components/FutureBanner'
import Reveal from '../components/Reveal'
import ResponsiveHero from '../components/ResponsiveHero'
import SectionHeading from '../components/SectionHeading'

const platforms = [
  ['/assets/contact/platform-puxiang.jpg', '普象工业设计小站'],
  ['/assets/contact/platform-rednote.jpg', '小红书'],
  ['/assets/contact/platform-zcool.jpg', '站酷'],
  ['/assets/contact/platform-douyin.jpg', '抖音'],
]

export default function Contact() {
  return (
    <div className="contact-page" data-testid="contact-page">
      <ResponsiveHero
        className="contact-hero"
        src="/assets/contact/hero.jpg"
        alt="红色现代建筑空间"
        aspectRatio="3840 / 2162"
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
              <span>电话咨询</span><a href="tel:19301490913">19301490913</a>
            </Reveal>
            <Reveal className="contact-method" delay={60}>
              <img className="contact-method__icon" data-testid="contact-icon-email" src="/assets/contact/icon-email.svg" alt="" aria-hidden="true" />
              <span>邮箱联系</span><a href="mailto:tanqicai@koosimy.com">tanqicai@koosimy.com</a>
            </Reveal>
            <Reveal className="contact-method contact-method--qr" delay={120}>
              <img src="/assets/contact/wechat-qr.jpg" alt="KOOSIMY 微信二维码" />
              <span>微信咨询</span><p>扫码添加微信<br />专业顾问在线沟通</p>
            </Reveal>
            <Reveal className="contact-method" delay={180}>
              <img className="contact-method__icon" data-testid="contact-icon-location" src="/assets/contact/icon-location.svg" alt="" aria-hidden="true" />
              <span>公司地址</span><p>上海市闵行区光中路255号2栋508</p>
            </Reveal>
            <Reveal className="contact-method" delay={240}>
              <img className="contact-method__icon" data-testid="contact-icon-business" src="/assets/contact/icon-business.svg" alt="" aria-hidden="true" />
              <span>商务合作</span><p>微信号 koosimy<br />获取项目支持</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="consultation section-pad">
        <div className="site-container consultation__grid">
          <Reveal className="consultation__copy">
            <h2>有想法？<span>我们很乐意倾听</span></h2>
            <p>
              无论您有产品创意、品牌升级需求，还是项目合作意向，
              我们都愿意成为您最可靠的设计伙伴。随时联系我们，开启一段有价值的对话。
            </p>
            <a className="consultation__link" href="mailto:tanqicai@koosimy.com?subject=KOOSIMY 项目咨询">
              发送项目需求 →
            </a>
          </Reveal>
          <Reveal className="consultation__image" delay={100}>
            <img src="/assets/contact/consultation.jpg" alt="产品设计咨询沟通" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="location-section section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="LOCATION" title="我们在这里" />
          <div className="location-address">
            <img src="/assets/contact/icon-location.svg" alt="" aria-hidden="true" />
            <p><strong>公司地址</strong><span>上海市闵行区光中路255号 2栋508</span></p>
          </div>
          <div className="location-section__grid">
            <Reveal className="location-map">
              <img src="/assets/contact/map.jpg" alt="KOOSIMY 公司位置地图" loading="lazy" />
            </Reveal>
            <div className="location-info">
              <div><span>WORKING HOURS</span><strong>周一至周五<br />09:30 — 18:30</strong></div>
              <div><span>TRANSPORTATION</span><strong>地铁12号线虹莘路站<br />驾车可预约园区停车</strong></div>
              <div><span>VISIT GUIDE</span><strong>为了节省您的参考体验<br />来访前请提前联系我们</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-platforms section-pad">
        <div className="site-container">
          <div className="social-platforms__intro">
            <SectionHeading eyebrow="Platform Rapid response" title="多平台触达 快速响应" />
            <p>通过多平台与我们保持联络，我们将第一时间回应您的需求。</p>
          </div>
          <div className="social-platforms__grid">
            {platforms.map(([image, label]) => (
              <div className="social-platform" key={label}>
                <img src={image} alt={label} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FutureBanner image="/assets/shared/future-contact.jpg" />
    </div>
  )
}
