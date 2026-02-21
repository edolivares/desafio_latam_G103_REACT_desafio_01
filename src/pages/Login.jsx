import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useUser } from '@contexts/UserContext'

const API_LOGIN_URL = 'https://simple-api-backend-nodejs-express-f.vercel.app/api/auth/login'

function Login() {
  const navigate = useNavigate()
  const { login, setOverlayMessage } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e) => {
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

    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    setOverlayMessage('Iniciando sesión')
    try {
      const res = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        })
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data?.message || 'Error al iniciar sesión')
        setLoading(false)
        setOverlayMessage(null)
        return
      }

      if (data.token) {
        login(data.token, data.email ?? formData.email.trim())
        toast.success('Login exitoso!')
        navigate('/')
      } else {
        toast.error('Respuesta inválida del servidor')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
      setOverlayMessage(null)
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
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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