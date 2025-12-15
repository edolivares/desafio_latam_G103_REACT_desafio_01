import { Card, Button } from 'react-bootstrap'
import { FaEye, FaShoppingCart, FaCheese } from 'react-icons/fa'

function CardPizza({ producto }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={producto.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{producto.name}</Card.Title>
        <hr />
        <Card.Text className="text-center">
          Ingredientes:
        </Card.Text>
        <Card.Text className="text-center">
          <FaCheese className="me-2" />
          {producto.ingredients.join(', ')}
        </Card.Text>
        <hr />
        <Card.Text className="fw-bold mb-3 price-label text-center">
          Precio: ${producto.price.toLocaleString()}
        </Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button variant="outline-dark" className="flex-fill">
            <FaEye className="me-2" />
            Ver Más
          </Button>
          <Button variant="dark" className="flex-fill">
            <FaShoppingCart className="me-2" />
            Añadir
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardPizza

