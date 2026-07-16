import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/cases', label: '案例' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = navLinks.map((link) => {
    const active = pathname === link.path
    return (
      <Link
        key={link.path}
        to={link.path}
        className={active ? 'site-nav__link is-active' : 'site-nav__link'}
        aria-current={active ? 'page' : undefined}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    )
  })

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link to="/" className="site-logo" aria-label="酷施美 KOOSIMY 首页">
          <img src="/assets/logo-koosimy.svg" alt="酷施美 KOOSIMY" />
        </Link>
        <nav className="site-nav site-nav--desktop" aria-label="主导航">
          {links}
        </nav>
        <button
          type="button"
          className="site-menu-button"
          aria-label={open ? '关闭导航' : '打开导航'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="site-menu" role="dialog" aria-label="网站导航">
          <nav className="site-menu__links" aria-label="移动导航">
            {links}
          </nav>
        </div>
      )}
    </header>
  )
}
