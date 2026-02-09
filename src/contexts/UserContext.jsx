import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true)

  const login = () => {
    setToken(true)
  }

  const logout = () => {
    setToken(false)
  }

  const value = {
    token,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
