import { useState } from 'react'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      toast.success('Login exitoso!', {
        position: "top-right",
        autoClose: 3000,
      })
      console.log('Datos del login:', formData)
    }
  }

  return (
    <div className="page-container">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Ingresa tu email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      autoComplete="off"
                    />
                    {errors.email && (
                      <span className="text-danger small d-block mt-1">{errors.email}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      autoComplete="off"
                    />
                    {errors.password && (
                      <span className="text-danger small d-block mt-1">{errors.password}</span>
                    )}
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Iniciar Sesión
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

export default Login