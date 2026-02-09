import { Navigate } from 'react-router-dom'
import { useUser } from '@contexts/UserContext'

export function GuestOnlyRoute({ children }) {
  const { token } = useUser()

  if (token) {
    return <Navigate to="/" replace />
  }

  return children
}
