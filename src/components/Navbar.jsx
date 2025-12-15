import { Container, Navbar, Button } from 'react-bootstrap'
import { FaPizzaSlice, FaShoppingCart, FaHome, FaUnlock, FaLock, FaUser, FaSignOutAlt } from 'react-icons/fa'

function NavbarComponent() {
  const total = 25000
  const token = false

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <FaPizzaSlice className="me-2" />
          Pizzería Mamma Mía
        </Navbar.Brand>
        <Button variant="outline-light" href="/" className="me-2">
          <FaHome className="me-2" />
          Home
        </Button>
        {!token ? (
          <>
            <Button variant="outline-light" className="me-2">
              <FaUnlock className="me-2" />
              Login
            </Button>
            <Button variant="outline-light" className="me-2">
              <FaLock className="me-2" />
              Register
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-light" className="me-2">
              <FaUser className="me-2" />
              Profile
            </Button>
            <Button variant="outline-light" className="me-2">
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </>
        )}
        <Button variant="outline-light" className="ms-auto">
          <FaShoppingCart className="me-2" />
          Total: ${total.toLocaleString()}
        </Button>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent

