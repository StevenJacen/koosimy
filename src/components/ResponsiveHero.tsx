import type { CSSProperties, ReactNode } from 'react'

interface ResponsiveHeroProps {
  className: string
  imageClassName?: string
  src: string
  alt: string
  aspectRatio: string
  children?: ReactNode
}

export default function ResponsiveHero({
  className,
  imageClassName,
  src,
  alt,
  aspectRatio,
  children,
}: ResponsiveHeroProps) {
  const imageClasses = ['responsive-hero__media', imageClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={`responsive-hero ${className}`}
      style={{ '--hero-aspect': aspectRatio } as CSSProperties}
    >
      <img className={imageClasses} src={src} alt={alt} />
      {children}
    </section>
  )
}
