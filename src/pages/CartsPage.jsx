import { useEffect, useState, useCallback } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { LuPlus } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import CartTable from '../components/carts/CartTable.jsx'
import CartForm from '../components/carts/CartForm.jsx'
import PaginationBar from '../components/common/PaginationBar.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal.jsx'
import { usePagination } from '../hooks/usePagination.js'
import * as cartsApi from '../api/cartsApi.js'

const PAGE_SIZE = 10

export default function CartsPage() {
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userFilter, setUserFilter] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editingCart, setEditingCart] = useState(null)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const { page, limit, skip, totalPages, setTotal, goToPage, resetToFirstPage } = usePagination(PAGE_SIZE)

  const load = useCallback(() => {
    setLoading(true)
    setError('')

    if (userFilter) {
      cartsApi
        .getCartsByUser(userFilter)
        .then((data) => {
          setCarts(data.carts || [])
          setTotal(data.carts?.length || 0)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
      return
    }

    cartsApi
      .getCarts({ limit, skip })
      .then((data) => {
        setCarts(data.carts)
        setTotal(data.total)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFilter, limit, skip])

  useEffect(() => {
    load()
  }, [load])

  const openAddForm = () => {
    setEditingCart(null)
    setFormOpen(true)
  }

  const openEditForm = (cart) => {
    setEditingCart(cart)
    setFormOpen(true)
  }

  const handleFormSubmit = (values) => {
    setSaving(true)
    const request = editingCart
      ? cartsApi.updateCart(editingCart.id, values)
      : cartsApi.addCart(values)

    request
      .then((result) => {
        if (editingCart) {
          setCarts((prev) => prev.map((c) => (c.id === editingCart.id ? { ...c, ...result } : c)))
        } else {
          setCarts((prev) => [{ ...result, id: result.id ?? Date.now() }, ...prev])
        }
        setFormOpen(false)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false))
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setDeleting(true)
    cartsApi
      .deleteCart(deleteTarget.id)
      .then(() => {
        setCarts((prev) => prev.filter((c) => c.id !== deleteTarget.id))
        setDeleteTarget(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false))
  }

  return (
    <DashboardLayout
      title="Carts"
      subtitle="View and manage shopping carts"
      actions={
        <Button className="btn-teal d-flex align-items-center gap-1" onClick={openAddForm}>
          <LuPlus size={16} /> Add cart
        </Button>
      }
    >
      <div className="card-surface p-3 mb-3">
        <Row className="g-2 align-items-center">
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Filter by user ID…"
              value={userFilter}
              onChange={(e) => {
                setUserFilter(e.target.value)
                resetToFirstPage()
              }}
            />
          </Col>
        </Row>
      </div>

      <ErrorAlert message={error} onRetry={load} />

      {loading ? (
        <LoadingSpinner label="Loading carts…" />
      ) : carts.length === 0 ? (
        <div className="empty-state card-surface">No carts found.</div>
      ) : (
        <>
          <CartTable carts={carts} onEdit={openEditForm} onDelete={setDeleteTarget} />
          {!userFilter && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationBar page={page} totalPages={totalPages} onChange={goToPage} />
            </div>
          )}
        </>
      )}

      <CartForm
        show={formOpen}
        cart={editingCart}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        saving={saving}
      />
      <ConfirmDeleteModal
        show={!!deleteTarget}
        itemLabel={deleteTarget ? `Cart #${deleteTarget.id}` : ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  )
}
