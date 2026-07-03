import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Row, Col, Button, Spinner } from 'react-bootstrap'

const emptyDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  gender: 'male',
  age: ''
}

export default function UserForm({ show, user, onCancel, onSubmit, saving }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: emptyDefaults })

  useEffect(() => {
    if (show) {
      reset(
        user
          ? {
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              username: user.username || '',
              gender: user.gender || 'male',
              age: user.age ?? ''
            }
          : emptyDefaults
      )
    }
  }, [show, user, reset])

  const submit = (values) => {
    onSubmit({ ...values, age: values.age ? Number(values.age) : undefined })
  }

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Form onSubmit={handleSubmit(submit)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.15rem' }}>{user ? 'Edit user' : 'Add user'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
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
            <Col md={12}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register('username', { required: 'Required' })}
                isInvalid={!!errors.username}
              />
            </Col>
            <Col md={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: 'Required' })}
                isInvalid={!!errors.email}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" min={0} {...register('age')} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" className="btn-teal" disabled={saving}>
            {saving ? <Spinner animation="border" size="sm" /> : user ? 'Save changes' : 'Add user'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
