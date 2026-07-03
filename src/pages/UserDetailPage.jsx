import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { LuArrowLeft, LuPencil, LuTrash2 } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import UserDetails from '../components/users/UserDetails.jsx'
import UserForm from '../components/users/UserForm.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal.jsx'
import * as usersApi from '../api/usersApi.js'

export default function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    setError('')
    usersApi
      .getUser(id)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [id])

  const handleSubmit = (values) => {
    setSaving(true)
    usersApi
      .updateUser(id, values)
      .then((result) => {
        setUser((prev) => ({ ...prev, ...result }))
        setFormOpen(false)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false))
  }

  const handleDelete = () => {
    setDeleting(true)
    usersApi
      .deleteUser(id)
      .then(() => navigate('/users'))
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false))
  }

  if (loading) {
    return (
      <DashboardLayout title="User">
        <LoadingSpinner label="Loading user…" />
      </DashboardLayout>
    )
  }

  if (error || !user) {
    return (
      <DashboardLayout title="User">
        <ErrorAlert message={error || 'User not found.'} onRetry={load} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title={`${user.firstName} ${user.lastName}`}
      subtitle="User detail"
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
      <Link to="/users" className="d-inline-flex align-items-center gap-1 text-soft text-decoration-none mb-3">
        <LuArrowLeft size={16} /> Back to users
      </Link>

      <UserDetails user={user} />

      <UserForm
        show={formOpen}
        user={user}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        saving={saving}
      />
      <ConfirmDeleteModal
        show={deleteOpen}
        itemLabel={`${user.firstName} ${user.lastName}`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  )
}
