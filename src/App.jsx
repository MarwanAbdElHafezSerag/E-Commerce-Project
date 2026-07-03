import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartsPage from './pages/CartsPage.jsx'
import CartDetailPage from './pages/CartDetailPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carts"
        element={
          <ProtectedRoute>
            <CartsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carts/:id"
        element={
          <ProtectedRoute>
            <CartDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <UserDetailPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
