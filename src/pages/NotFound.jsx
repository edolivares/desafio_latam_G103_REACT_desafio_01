import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

function NotFound() {
  return (
    <div className="page-container justify-content-center">
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center">
              <Card.Body className="py-5">
                <FaExclamationTriangle 
                  size={80} 
                  className="text-warning mb-4" 
                />
                <Card.Title as="h1" className="display-1 fw-bold mb-3">
                  404
                </Card.Title>
                <Card.Text as="h2" className="h4 mb-3">
                  Página no encontrada
                </Card.Text>
                <Card.Text className="text-muted mb-4">
                  Lo sentimos, la página que buscas no existe o ha sido movida.
                </Card.Text>
                <Button 
                  as={Link} 
                  to="/" 
                  variant="primary" 
                  size="lg"
                >
                  <FaHome className="me-2" />
                  Volver al Inicio
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound