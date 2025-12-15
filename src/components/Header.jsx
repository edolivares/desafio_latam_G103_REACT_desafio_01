import '@css/main.css'
import '@css/header.css'
import NavbarComponent from '@components/Navbar'

function Header() {
  return (
    <header className="header">
      <NavbarComponent />
      <section className="hero">
        <h1 className="hero-title">¡Pizzería Mamma Mia!</h1>
        <h2 className="hero-subtitle">¡Tenemos las mejores pizzas que podrás encontrar!</h2>
      </section>
    </header>
  )
}

export default Header

