import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth.js'

export default function LoginPage() {
  const { login, isAuthenticated, initializing } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { username: 'emilys', password: 'emilyspass' } })

  if (!initializing && isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  const onSubmit = (values) => {
    setServerError('')
    setSubmitting(true)
    login(values)
      .then(() => navigate(location.state?.from?.pathname || '/', { replace: true }))
      .catch((err) => setServerError(err.message || 'Invalid username or password.'))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="dot" /> Shopfront
        </div>
        <p className="text-soft mb-4">Sign in to manage your store.</p>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              {...register('username', { required: 'Username is required' })}
              isInvalid={!!errors.username}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', { required: 'Password is required' })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btn-teal w-100" disabled={submitting}>
            {submitting ? <Spinner animation="border" size="sm" /> : 'Log in'}
          </Button>
        </Form>

        <p className="text-soft mt-4 mb-0" style={{ fontSize: '0.86rem' }}>
          Tip: DummyJSON test users work here — try <code>emilys</code> / <code>emilyspass</code>.
        </p>
        <p className="mt-2 mb-0" style={{ fontSize: '0.86rem' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
