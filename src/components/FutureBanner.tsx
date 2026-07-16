interface FutureBannerProps {
  image?: string
}

export default function FutureBanner({
  image = '/assets/shared/future-home.jpg',
}: FutureBannerProps) {
  return (
    <section className="future-banner">
      <img className="future-banner__image" src={image} alt="" loading="lazy" />
      <div className="site-container future-banner__content">
        <p className="future-banner__english">WE DESIGN THE FUTURE</p>
        <h2>我们设计未来</h2>
        <ul>
          <li>融合策略、设计与技术</li>
          <li>助力企业创新升级</li>
          <li>赋能商业成功</li>
        </ul>
      </div>
    </section>
  )
}
