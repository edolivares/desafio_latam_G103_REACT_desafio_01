import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import '@css/main.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { CartProvider } from '@contexts/CartContext'
import Home from '@pages/Home'
// import Login from '@pages/Login'
// import Register from '@pages/Register'
import Cart from '@pages/Cart'
import PizzaInfo from '@pages/PizzaInfo'

function App() {
  return (
    <CartProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="app-container">
          <Header />
          
          <div className="main-content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:slug" element={<PizzaInfo />} />
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
  )
}

export default App
