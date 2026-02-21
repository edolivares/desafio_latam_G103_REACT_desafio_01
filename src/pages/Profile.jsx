import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { FaUser, FaPhone, FaMapMarkerAlt, FaPlusCircle, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa'
import { useUser } from '@contexts/UserContext'

const API_ME_URL = 'https://simple-api-backend-nodejs-express-f.vercel.app/api/auth/me'

function Profile() {
  const navigate = useNavigate()
  const { userToken, userEmail, performLogout } = useUser()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userToken) return

    const fetchMe = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_ME_URL, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        const data = await res.json()

        if (!res.ok) {
          setError(data?.message || 'Error al cargar el perfil')
          setUserData(null)
          return
        }

        setUserData(data)
      } catch (err) {
        console.error(err)
        setError('Error de conexión')
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [userToken])

  if (loading) {
    return (
      <div className="page-container">
        <Container className="mt-5 mb-5">
          <p className="text-center">Cargando perfil...</p>
        </Container>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="page-container">
        <Container className="mt-5 mb-5">
          <Card>
            <Card.Body className="text-center py-5">
              <p className="text-danger mb-0">{error || 'No se pudo cargar el perfil'}</p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }

  const personal = userData.personal || {}
  const phones = userData.phones || []
  const addresses = userData.addresses || []

  const InfoRow = ({ label, value }) => (
    <div className="d-flex flex-column flex-sm-row py-2 border-bottom border-light">
      <span className="text-muted small text-uppercase me-2 profile-info-row-label">{label}</span>
      <span className="text-dark">{value || '—'}</span>
    </div>
  )

  const SectionHeader = ({ icon: Icon, title }) => (
    <Card.Header className="bg-white border-bottom fw-semibold d-flex justify-content-between align-items-center">
      <span>
        <Icon className="me-2 text-primary" />
        {title}
      </span>
      <FaPlusCircle className="text-primary profile-section-add-icon" />
    </Card.Header>
  )

  const formatAddress = (addr) => {
    const parts = [addr.street, addr.unit, addr.city, addr.region, addr.country, addr.zipCode].filter(Boolean)
    return parts.join(', ') || '—'
  }

  return (
    <div className="page-container">
      <Container className="mt-5 mb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <h1 className="mb-1 fw-bold">
              <FaUser className="me-2" />
              Mi perfil
            </h1>
            {userEmail && (
              <p className="text-muted small mb-0">{userEmail}</p>
            )}
          </div>
          <Button variant="outline-danger" onClick={() => performLogout(navigate)}>
            <FaSignOutAlt className="me-2" />
            Cerrar sesión
          </Button>
        </div>

        <Row>
          <Col lg={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-white border-bottom fw-semibold d-flex justify-content-between align-items-center">
                <span>
                  <FaUser className="me-2 text-primary" />
                  Información personal
                </span>
                <FaEdit className="text-primary profile-section-add-icon" />
              </Card.Header>
              <Card.Body>
                <InfoRow label="Email" value={userData.email} />
                <InfoRow label="Nombre" value={personal.firstName} />
                <InfoRow label="Apellido" value={personal.lastName} />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="h-100">
              <SectionHeader icon={FaPhone} title="Teléfonos registrados" />
              <Card.Body>
                {phones.length === 0 ? (
                  <p className="text-muted mb-0">Sin teléfonos registrados</p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {phones.map((phone) => (
                      <div key={phone.id} className="profile-item-card border rounded p-3">
                        <span className="text-muted small text-uppercase">{phone.label || 'Teléfono'}</span>
                        <p className="mb-0 mt-1">{phone.number}</p>
                        <div className="d-flex gap-2 mt-3">
                          <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" />
                            Editar
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <FaTrash className="me-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="mb-4">
            <Card>
              <SectionHeader icon={FaMapMarkerAlt} title="Direcciones registradas" />
              <Card.Body>
                {addresses.length === 0 ? (
                  <p className="text-muted mb-0">Sin direcciones registradas</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="profile-item-card border rounded p-3">
                        <span className="text-muted small text-uppercase">{addr.label || 'Dirección'}</span>
                        <p className="mb-0 mt-1">{formatAddress(addr)}</p>
                        <div className="d-flex gap-2 mt-3">
                          <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" />
                            Editar
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <FaTrash className="me-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
