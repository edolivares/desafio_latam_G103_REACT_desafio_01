import { createContext, useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserContext = createContext()

const STORAGE_KEY_TOKEN = 'pizza_user_token'
const STORAGE_KEY_EMAIL = 'pizza_user_email'

const getStoredToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEY_TOKEN)
  } catch {
    return null
  }
}

const getStoredEmail = () => {
  try {
    return localStorage.getItem(STORAGE_KEY_EMAIL)
  } catch {
    return null
  }
}

const setStoredToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token)
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN)
    }
  } catch (e) {
    console.error('Error al guardar token en localStorage:', e)
  }
}

const setStoredEmail = (email) => {
  try {
    if (email) {
      localStorage.setItem(STORAGE_KEY_EMAIL, email)
    } else {
      localStorage.removeItem(STORAGE_KEY_EMAIL)
    }
  } catch (e) {
    console.error('Error al guardar email en localStorage:', e)
  }
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => getStoredToken())
  const [userEmail, setUserEmail] = useState(() => getStoredEmail())
  const [overlayMessage, setOverlayMessage] = useState(null)
  const token = !!userToken

  const login = (apiToken, email = null) => {
    if (typeof apiToken !== 'string' || !apiToken.trim()) return
    const trimmed = apiToken.trim()
    setUserToken(trimmed)
    setStoredToken(trimmed)
    if (email != null && typeof email === 'string') {
      const emailTrimmed = email.trim()
      setUserEmail(emailTrimmed)
      setStoredEmail(emailTrimmed)
    }
  }

  const logout = () => {
    setUserToken(null)
    setUserEmail(null)
    setStoredToken(null)
    setStoredEmail(null)
  }

  const performLogout = (navigate = null) => {
    setOverlayMessage('Cerrando sesión')
    logout()
    if (typeof navigate === 'function') {
      navigate('/')
      toast.success('Sesión cerrada exitosamente')
    }
    setTimeout(() => setOverlayMessage(null), 400)
  }

  const value = {
    token,
    userToken,
    userEmail,
    login,
    logout,
    performLogout,
    setOverlayMessage
  }

  return (
    <UserContext.Provider value={value}>
      {overlayMessage && (
        <div
          className="user-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-white rounded shadow-lg p-4 d-flex flex-column align-items-center gap-3">
            <Spinner animation="border" variant="primary" />
            <span className="text-dark">{overlayMessage}</span>
          </div>
        </div>
      )}
      {children}
    </UserContext.Provider>
  )
}