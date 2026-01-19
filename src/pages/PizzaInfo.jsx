import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { FaCheese, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '@contexts/CartContext'
import { toast } from 'react-toastify'

function PizzaInfo() {
  const { slug } = useParams()
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza)
      toast.success(`${pizza.name} añadida al carrito`)
    }
  }

  useEffect(() => {
    fetch(`https://simple-api-backend-nodejs-express-f.vercel.app/api/pizzas/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pizza no encontrada')
        }
        return response.json()
      })
      .then(data => {
        setPizza(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error cargando pizza:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="page-container">
        <Container className="mt-5 mb-5">
          <p className="text-center">Cargando información de la pizza...</p>
        </Container>
      </div>
    )
  }

  if (error || !pizza) {
    return (
      <div className="page-container">
        <Container className="mt-5 mb-5">
          <div className="text-center">
            <h2>Pizza no encontrada</h2>
            <p className="text-muted">{error || 'La pizza que buscas no existe'}</p>
            <Button as={Link} to="/" variant="primary" className="mt-3">
              <FaArrowLeft className="me-2" />
              Volver al inicio
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Container className="mt-5 mb-5">
        <Button 
          as={Link} 
          to="/" 
          variant="outline-secondary" 
          className="mb-4"
        >
          <FaArrowLeft className="me-2" />
          Volver
        </Button>

        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src={pizza.image} alt={pizza.name} />
            </Card>
          </Col>
          <Col md={6}>
            <h1 className="mb-3 fw-bold">{pizza.name}</h1>
            <hr />
            <p className="lead mb-4">{pizza.description}</p>
            
            <div className="mb-4">
              <h4 className="mb-3">
                <FaCheese className="me-2" />
                Ingredientes:
              </h4>
              <ul>
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            <div className="mb-4">
              <h3 className="fw-bold text-primary mb-3">
                Precio: ${pizza.price.toLocaleString()}
              </h3>
            </div>

            <div className="d-grid gap-2">
              <Button variant="dark" size="lg" className="py-3" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" />
                Añadir al Carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PizzaInfo
