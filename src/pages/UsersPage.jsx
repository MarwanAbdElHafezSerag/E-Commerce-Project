import { useEffect, useState, useCallback } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { LuPlus } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import UserTable from '../components/users/UserTable.jsx'
import UserForm from '../components/users/UserForm.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import PaginationBar from '../components/common/PaginationBar.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal.jsx'
import { usePagination } from '../hooks/usePagination.js'
import * as usersApi from '../api/usersApi.js'

const PAGE_SIZE = 10

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const { page, limit, skip, totalPages, setTotal, goToPage, resetToFirstPage } = usePagination(PAGE_SIZE)

  const load = useCallback(() => {
    setLoading(true)
    setError('')

    let request
    if (query) {
      request = usersApi.searchUsers({ q: query, limit, skip })
    } else if (genderFilter) {
      request = usersApi.filterUsers('gender', genderFilter, { limit, skip })
    } else {
      request = usersApi.getUsers({ limit, skip })
    }

    request
      .then((data) => {
        setUsers(data.users)
        setTotal(data.total)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, genderFilter, limit, skip])

  useEffect(() => {
    load()
  }, [load])

  const handleSearch = (q) => {
    setQuery(q)
    setGenderFilter('')
    resetToFirstPage()
  }

  const handleGenderChange = (g) => {
    setGenderFilter(g)
    setQuery('')
    resetToFirstPage()
  }

  const openAddForm = () => {
    setEditingUser(null)
    setFormOpen(true)
  }

  const openEditForm = (user) => {
    setEditingUser(user)
    setFormOpen(true)
  }

  const handleFormSubmit = (values) => {
    setSaving(true)
    const request = editingUser
      ? usersApi.updateUser(editingUser.id, values)
      : usersApi.addUser(values)

    request
      .then((result) => {
        if (editingUser) {
          setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...result } : u)))
        } else {
          setUsers((prev) => [{ ...result, id: result.id ?? Date.now(), image: result.image || 'https://dummyjson.com/icon/user/128' }, ...prev])
        }
        setFormOpen(false)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false))
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setDeleting(true)
    usersApi
      .deleteUser(deleteTarget.id)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
        setDeleteTarget(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false))
  }

  return (
    <DashboardLayout
      title="Users"
      subtitle="Search, filter, and manage user accounts"
      actions={
        <Button className="btn-teal d-flex align-items-center gap-1" onClick={openAddForm}>
          <LuPlus size={16} /> Add user
        </Button>
      }
    >
      <div className="card-surface p-3 mb-3">
        <Row className="g-2 align-items-center">
          <Col md={4}>
            <SearchBar placeholder="Search users…" onSearch={handleSearch} />
          </Col>
          <Col md="auto" className="ms-md-auto">
            <Form.Select value={genderFilter} onChange={(e) => handleGenderChange(e.target.value)}>
              <option value="">All genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <ErrorAlert message={error} onRetry={load} />

      {loading ? (
        <LoadingSpinner label="Loading users…" />
      ) : users.length === 0 ? (
        <div className="empty-state card-surface">No users match your search yet.</div>
      ) : (
        <>
          <UserTable users={users} onEdit={openEditForm} onDelete={setDeleteTarget} />
          <div className="d-flex justify-content-center mt-4">
            <PaginationBar page={page} totalPages={totalPages} onChange={goToPage} />
          </div>
        </>
      )}

      <UserForm
        show={formOpen}
        user={editingUser}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        saving={saving}
      />
      <ConfirmDeleteModal
        show={!!deleteTarget}
        itemLabel={deleteTarget ? `${deleteTarget.firstName} ${deleteTarget.lastName}` : ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  )
}
