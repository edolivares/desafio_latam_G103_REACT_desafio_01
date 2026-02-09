import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import '@css/main.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { ProtectedRoute } from '@components/ProtectedRoute'
import { GuestOnlyRoute } from '@components/GuestOnlyRoute'
import { CartProvider } from '@contexts/CartContext'
import { UserProvider } from '@contexts/UserContext'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Cart from '@pages/Cart'
import PizzaInfo from '@pages/PizzaInfo'
import Profile from '@pages/Profile'
import NotFound from '@pages/NotFound'

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <div className="app-container">
            <Header />
            
            <div className="main-content-wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
                <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:slug" element={<PizzaInfo />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  )
}

export default App
