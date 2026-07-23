import { CircleCheck } from 'lucide-react'

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
          {['融合策略、设计与技术', '助力企业创新升级', '赋能商业成功'].map(
            (item) => (
              <li key={item}>
                <CircleCheck
                  aria-hidden="true"
                  data-testid="future-check-icon"
                />
                <span>{item}</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}
