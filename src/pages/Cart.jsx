import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '@contexts/CartContext'
import { useUser } from '@contexts/UserContext'
import '@css/cart.css'

function Cart() {
  const { cart, updateQuantity, calculateTotal, loading } = useCart()
  const { token } = useUser()

  const getProductName = (name) => {
    return name.replace('Pizza ', '')
  }

  if (loading) {
    return (
      <div className="page-container">
        <Container className="mt-5 mb-5">
          <p className="text-center">Cargando carrito...</p>
        </Container>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Container className="mt-5 mb-5">
        <h2 className="text-center mb-4 fw-bold">Detalles del pedido:</h2>
        
        {cart.length === 0 ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <>
            <div className="mb-4">
              {cart.map((item) => (
                <div key={item.productId} className="d-flex align-items-center mb-3 p-3 border rounded">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="me-3 cart-item-image"
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{getProductName(item.name)}</h5>
                    <p className="mb-0 text-muted">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2 cart-quantity-button"
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      <FaMinus />
                    </Button>
                    <div className="mx-2 cart-quantity-display">
                      {item.quantity}
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="cart-quantity-button"
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center p-3 border-top">
                <h4 className="mb-0 fw-bold">Total: ${calculateTotal().toLocaleString()}</h4>
              </div>
            </div>

            <div className="d-grid">
              {token ? (
                <Button 
                  variant="dark" 
                  size="lg"
                  className="py-3"
                >
                  Pagar
                </Button>
              ) : (
                <div className="text-center p-3 border rounded bg-light">
                  <p className="mb-2">Necesitas iniciar sesión para poder pagar.</p>
                  <Button as={Link} to="/login" variant="primary">
                    Ir a Iniciar sesión
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

export default Cart