import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth()
  const location = useLocation()

  if (initializing) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Spinner animation="border" style={{ color: 'var(--teal)' }} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
