import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Row, Col, Button, Spinner } from 'react-bootstrap'

const emptyDefaults = {
  title: '',
  description: '',
  price: '',
  category: '',
  brand: '',
  stock: '',
  thumbnail: ''
}

export default function ProductForm({ show, product, onCancel, onSubmit, saving }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: emptyDefaults })

  useEffect(() => {
    if (show) {
      reset(
        product
          ? {
              title: product.title || '',
              description: product.description || '',
              price: product.price ?? '',
              category: product.category || '',
              brand: product.brand || '',
              stock: product.stock ?? '',
              thumbnail: product.thumbnail || ''
            }
          : emptyDefaults
      )
    }
  }, [show, product, reset])

  const submit = (values) => {
    onSubmit({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock)
    })
  }

  return (
    <Modal show={show} onHide={onCancel} centered size="lg">
      <Form onSubmit={handleSubmit(submit)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.15rem' }}>
            {product ? 'Edit product' : 'Add product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={8}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                {...register('title', { required: 'Title is required' })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Label>Brand</Form.Label>
              <Form.Control {...register('brand')} />
            </Col>

            <Col md={4}>
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required', min: 0 })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                {...register('stock', { required: 'Stock is required', min: 0 })}
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">{errors.stock?.message}</Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                {...register('category', { required: 'Category is required' })}
                isInvalid={!!errors.category}
                placeholder="e.g. smartphones"
              />
              <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
            </Col>

            <Col md={12}>
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control {...register('thumbnail')} placeholder="https://…" />
            </Col>

            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} {...register('description')} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" className="btn-teal" disabled={saving}>
            {saving ? <Spinner animation="border" size="sm" /> : product ? 'Save changes' : 'Add product'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
