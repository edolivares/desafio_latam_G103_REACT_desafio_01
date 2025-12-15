import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '@css/main.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import CardPizza from '@components/CardPizza'

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error cargando productos:', error))
  }, [])

  return (
    <div className="app-container">
      <Header />
      
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
      
      <Footer />
    </div>
  )
}

export default App
