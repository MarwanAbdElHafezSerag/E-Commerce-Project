import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Button, Badge } from 'react-bootstrap'
import { LuArrowLeft, LuPencil, LuTrash2, LuStar } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ProductForm from '../components/products/ProductForm.jsx'
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal.jsx'
import { categoryColor } from '../utils/categoryColor.js'
import * as productsApi from '../api/productsApi.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    setError('')
    productsApi
      .getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [id])

  const handleSubmit = (values) => {
    setSaving(true)
    productsApi
      .updateProduct(id, values)
      .then((result) => {
        setProduct((prev) => ({ ...prev, ...result }))
        setFormOpen(false)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false))
  }

  const handleDelete = () => {
    setDeleting(true)
    productsApi
      .deleteProduct(id)
      .then(() => navigate('/products'))
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false))
  }

  if (loading) {
    return (
      <DashboardLayout title="Product">
        <LoadingSpinner label="Loading product…" />
      </DashboardLayout>
    )
  }

  if (error || !product) {
    return (
      <DashboardLayout title="Product">
        <ErrorAlert message={error || 'Product not found.'} onRetry={load} />
        <Link to="/products" className="btn btn-outline-teal mt-2">
          <LuArrowLeft className="me-1" /> Back to products
        </Link>
      </DashboardLayout>
    )
  }

  const chip = categoryColor(product.category)

  return (
    <DashboardLayout
      title={product.title}
      subtitle="Product detail"
      actions={
        <div className="d-flex gap-2">
          <Button className="btn-outline-teal" onClick={() => setFormOpen(true)}>
            <LuPencil size={16} className="me-1" /> Edit
          </Button>
          <Button variant="outline-danger" onClick={() => setDeleteOpen(true)}>
            <LuTrash2 size={16} className="me-1" /> Delete
          </Button>
        </div>
      }
    >
      <Link to="/products" className="d-inline-flex align-items-center gap-1 text-soft text-decoration-none mb-3">
        <LuArrowLeft size={16} /> Back to products
      </Link>

      <div className="card-surface p-4">
        <Row className="g-4">
          <Col md={5}>
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="w-100 rounded"
              style={{ objectFit: 'cover', aspectRatio: '1/1' }}
            />
            {product.images?.length > 1 && (
              <Row className="g-2 mt-2">
                {product.images.slice(0, 4).map((img, i) => (
                  <Col xs={3} key={i}>
                    <img src={img} alt="" className="w-100 rounded" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col md={7}>
            <span className="category-chip mb-2" style={{ background: chip.bg, color: chip.fg }}>
              {product.category}
            </span>
            <h2 className="mt-2 mb-1" style={{ fontSize: '1.5rem' }}>{product.title}</h2>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="price-tag" style={{ fontSize: '1.4rem' }}>${product.price}</span>
              <span className="rating-pill">
                <LuStar size={12} fill="#9a6a10" /> {product.rating}
              </span>
              <Badge bg={product.stock > 0 ? 'success' : 'secondary'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>
            {product.brand && <p className="text-soft mb-2">Brand: {product.brand}</p>}
            <p>{product.description}</p>
          </Col>
        </Row>
      </div>

      <ProductForm
        show={formOpen}
        product={product}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        saving={saving}
      />
      <ConfirmDeleteModal
        show={deleteOpen}
        itemLabel={product.title}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  )
}
