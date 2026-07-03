import { useEffect, useState } from 'react'
import { Modal, Form, Button, Row, Col, Spinner, Table } from 'react-bootstrap'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const emptyLine = { id: '', quantity: 1 }

export default function CartForm({ show, cart, onCancel, onSubmit, saving }) {
  const [userId, setUserId] = useState('')
  const [lines, setLines] = useState([{ ...emptyLine }])

  useEffect(() => {
    if (show) {
      if (cart) {
        setUserId(cart.userId ?? '')
        setLines(
          cart.products?.length
            ? cart.products.map((p) => ({ id: p.id, quantity: p.quantity }))
            : [{ ...emptyLine }]
        )
      } else {
        setUserId('')
        setLines([{ ...emptyLine }])
      }
    }
  }, [show, cart])

  const updateLine = (index, field, value) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)))
  }

  const addLine = () => setLines((prev) => [...prev, { ...emptyLine }])
  const removeLine = (index) => setLines((prev) => prev.filter((_, i) => i !== index))

  const submit = (e) => {
    e.preventDefault()
    const products = lines
      .filter((l) => l.id)
      .map((l) => ({ id: Number(l.id), quantity: Number(l.quantity) || 1 }))

    onSubmit({ userId: Number(userId), products })
  }

  return (
    <Modal show={show} onHide={onCancel} centered size="lg">
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.15rem' }}>{cart ? 'Edit cart' : 'Add cart'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. 5"
              />
            </Col>
          </Row>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <Form.Label className="mb-0">Products</Form.Label>
            <Button size="sm" variant="outline-teal" onClick={addLine} type="button">
              <LuPlus size={14} className="me-1" /> Add line
            </Button>
          </div>

          <Table size="sm" borderless>
            <thead>
              <tr className="text-soft" style={{ fontSize: '0.8rem' }}>
                <th>Product ID</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td>
                    <Form.Control
                      type="number"
                      value={line.id}
                      onChange={(e) => updateLine(i, 'id', e.target.value)}
                      placeholder="e.g. 12"
                    />
                  </td>
                  <td style={{ width: 120 }}>
                    <Form.Control
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(e) => updateLine(i, 'quantity', e.target.value)}
                    />
                  </td>
                  <td style={{ width: 44 }}>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      type="button"
                      onClick={() => removeLine(i)}
                      disabled={lines.length === 1}
                    >
                      <LuTrash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" className="btn-teal" disabled={saving}>
            {saving ? <Spinner animation="border" size="sm" /> : cart ? 'Save changes' : 'Add cart'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
