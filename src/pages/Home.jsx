import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CardPizza from '@components/CardPizza'

function Home() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://simple-api-backend-nodejs-express-f.vercel.app/api/pizzas')
      .then(response => response.json())
      .then(data => {
        setProductos(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error cargando productos:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="main-content mb-5">
        <Container className="mt-5">
          <p className="text-center">Cargando pizzas...</p>
        </Container>
      </main>
    )
  }

  return (
    <main className="main-content mb-5">
      <Container className="mt-5">
        <Row className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4}>
              <CardPizza producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}

export default Home

