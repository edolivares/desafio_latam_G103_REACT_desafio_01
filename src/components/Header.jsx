import { useLocation } from 'react-router-dom'
import '@css/main.css'
import '@css/header.css'
import NavbarComponent from '@components/Navbar'

function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const showHero = pathname === '/'

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