import { useLocation } from 'react-router-dom'
import '@css/main.css'
import '@css/header.css'
import NavbarComponent from '@components/Navbar'

function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const isHome = pathname === '/' || (pathname.endsWith('/') && pathSegments.length <= 1)
  const isLogin = pathname.includes('/login')
  const isRegister = pathname.includes('/register')
  const isCart = pathname.includes('/cart')
  
  const showHero = !isHome && !isLogin && !isRegister && !isCart

  return (
    <header className="header">
      <NavbarComponent />
      {showHero && (
        <section className="hero">
          <h1 className="hero-title">¡Pizzería Mamma Mia!</h1>
          <h2 className="hero-subtitle">¡Tenemos las mejores pizzas que podrás encontrar!</h2>
        </section>
      )}
    </header>
  )
}

export default Header

