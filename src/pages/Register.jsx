import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useUser } from '@contexts/UserContext'

const API_REGISTER_URL = 'https://simple-api-backend-nodejs-express-f.vercel.app/api/auth/register'

function Register() {
  const navigate = useNavigate()
  const { login, setOverlayMessage } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    firstName: '',
    lastName: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido'
    }

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

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Debes confirmar tu contraseña'
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setOverlayMessage('Registrando...')
    try {
      const res = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim()
        })
      })
      const data = await res.json()
      const apiError = data?.error || data?.message

      if (!res.ok) {
        if (apiError) {
          if (apiError.toLowerCase().includes('first name') || apiError.toLowerCase().includes('last name')) {
            toast.error('Nombre y apellido son requeridos')
          } else if (apiError.toLowerCase().includes('email and password')) {
            toast.error('Email y contraseña son requeridos')
          } else if (apiError.toLowerCase().includes('invalid email')) {
            toast.error('Email no válido')
          } else if (apiError.toLowerCase().includes('at least 6')) {
            toast.error('La contraseña debe tener al menos 6 caracteres')
          } else if (apiError.toLowerCase().includes('already exists')) {
            toast.error('Ya existe un usuario con ese email')
          } else {
            toast.error(apiError)
          }
        } else {
          toast.error('Error al registrarse')
        }
        setOverlayMessage(null)
        return
      }

      if (data.token) {
        login(data.token, data.email ?? formData.email.trim())
        toast.success('Registro exitoso')
        navigate('/')
      } else {
        toast.success('Registro exitoso. Ya puedes iniciar sesión.')
        navigate('/login')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error de conexión. Intenta de nuevo.')
    } finally {
      setOverlayMessage(null)
    }
  }

  return (
    <div className="page-container">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Registro</Card.Title>
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

                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Ingresa tu nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                      autoComplete="off"
                    />
                    {errors.firstName && (
                      <span className="text-danger small d-block mt-1">{errors.firstName}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Ingresa tu apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                      autoComplete="off"
                    />
                    {errors.lastName && (
                      <span className="text-danger small d-block mt-1">{errors.lastName}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña (mín. 6 caracteres)"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <span className="text-danger small d-block mt-1">{errors.password}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm_password"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      isInvalid={!!errors.confirm_password}
                      autoComplete="new-password"
                    />
                    {errors.confirm_password && (
                      <span className="text-danger small d-block mt-1">{errors.confirm_password}</span>
                    )}
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Registrarse
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

export default Register
