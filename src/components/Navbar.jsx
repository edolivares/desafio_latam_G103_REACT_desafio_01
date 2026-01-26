import { Container, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaPizzaSlice, FaShoppingCart, FaHome, FaUnlock, FaLock, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useCart } from '@contexts/CartContext'

function NavbarComponent() {
  const { calculateTotal } = useCart()
  const total = calculateTotal()
  const token = false

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaPizzaSlice className="me-2" />
          Pizzería Mamma Mía
        </Navbar.Brand>
        <Button variant="outline-light" as={Link} to="/" className="me-2">
          <FaHome className="me-2" />
          Home
        </Button>
        <Button variant="outline-light" as={Link} to="/profile" className="me-2">
          <FaUser className="me-2" />
          Profile
        </Button>
        {!token ? (
          <>
            <Button variant="outline-light" as={Link} to="/login" className="me-2">
              <FaUnlock className="me-2" />
              Login
            </Button>
            <Button variant="outline-light" as={Link} to="/register" className="me-2">
              <FaLock className="me-2" />
              Register
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-light" as={Link} to="/profile" className="me-2">
              <FaUser className="me-2" />
              Profile
            </Button>
            <Button variant="outline-light" className="me-2">
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </>
        )}
        <Button variant="outline-light" as={Link} to="/cart" className="ms-auto">
          <FaShoppingCart className="me-2" />
          Total: ${total.toLocaleString()}
        </Button>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent

