import { useState } from 'react'
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '+56 9 1234 5678',
    email: 'juan.perez@example.com'
  })

  const handleLogout = () => {
    toast.success('Sesión cerrada exitosamente')
    navigate('/')
  }

  return (
    <div className="page-container">
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <FaUser className="me-2" />
                  Perfil de Usuario
                </Card.Title>
                
                <Form>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.nombre}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.apellido}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Número de Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      value={userData.telefono}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={userData.email}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="danger" 
                      size="lg" 
                      onClick={handleLogout}
                      className="mt-3"
                    >
                      <FaSignOutAlt className="me-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
