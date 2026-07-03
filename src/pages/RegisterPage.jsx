import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth.js'

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  const onSubmit = (values) => {
    setServerError('')
    setSubmitting(true)
    registerUser(values)
      .then(() => setSuccess(true))
      .catch((err) => setServerError(err.message || 'Registration failed.'))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ maxWidth: 460 }}>
        <div className="auth-brand">
          <span className="dot" /> Shopfront
        </div>
        <p className="text-soft mb-4">Create an account to get started.</p>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        {success ? (
          <Alert variant="success">
            Account created! Since this runs against DummyJSON's mock API, the account
            isn't actually persisted server-side — please log in using one of the{' '}
            <a href="https://dummyjson.com/users" target="_blank" rel="noreferrer">
              published test users
            </a>{' '}
            instead.
            <div className="mt-3">
              <Button className="btn-teal" onClick={() => navigate('/login')}>
                Go to login
              </Button>
            </div>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  {...register('firstName', { required: 'Required' })}
                  isInvalid={!!errors.firstName}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Last name</Form.Label>
                <Form.Control {...register('lastName')} />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register('username', { required: 'Username is required' })}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: 'Email is required' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (v) => v === password || 'Passwords do not match'
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="btn-teal w-100" disabled={submitting}>
              {submitting ? <Spinner animation="border" size="sm" /> : 'Create account'}
            </Button>
          </Form>
        )}

        <p className="mt-4 mb-0" style={{ fontSize: '0.86rem' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
