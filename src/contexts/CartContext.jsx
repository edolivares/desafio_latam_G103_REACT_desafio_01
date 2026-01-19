import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/cart.json`)
      .then(response => response.json())
      .then(data => {
        setCart(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error cargando carrito:', error)
        setLoading(false)
      })
  }, [])

  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.productId === productId) {
            const newQuantity = item.quantity + change
            return {
              ...item,
              quantity: newQuantity
            }
          }
          return item
        })
        .filter(item => {
          if (item.productId === productId && item.quantity <= 0) {
            return false
          }
          return true
        })
    })
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
            name: product.name,
            image: product.image
          }
        ]
      }
    })
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const value = {
    cart,
    loading,
    updateQuantity,
    addToCart,
    calculateTotal,
    setCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}