import { useEffect, useState, useCallback } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LuPlus } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import ProductCard from '../components/products/ProductCard.jsx'
import ProductFilters from '../components/products/ProductFilters.jsx'
import ProductForm from '../components/products/ProductForm.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import PaginationBar from '../components/common/PaginationBar.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal.jsx'
import { usePagination } from '../hooks/usePagination.js'
import * as productsApi from '../api/productsApi.js'

const PAGE_SIZE = 12

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const pagination = usePagination(PAGE_SIZE)
  const { page, limit, skip, totalPages, setTotal, goToPage, resetToFirstPage } = pagination

  useEffect(() => {
    productsApi
      .getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  const [sortBy, order] = sort ? sort.split('-') : [undefined, undefined]

  const load = useCallback(() => {
    setLoading(true)
    setError('')

    let request
    if (query) {
      request = productsApi.searchProducts({ q: query, limit, skip })
    } else if (category) {
      request = productsApi.getProductsByCategory(category, { limit, skip })
    } else {
      request = productsApi.getProducts({ limit, skip, sortBy, order })
    }

    request
      .then((data) => {
        let list = data.products
        // DummyJSON's category/search endpoints don't support server-side
        // sort params, so apply sort client-side in those cases.
        if ((query || category) && sortBy) {
          list = [...list].sort((a, b) => {
            const av = a[sortBy]
            const bv = b[sortBy]
            if (typeof av === 'string') {
              return order === 'desc' ? bv.localeCompare(av) : av.localeCompare(bv)
            }
            return order === 'desc' ? bv - av : av - bv
          })
        }
        setProducts(list)
        setTotal(data.total)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, limit, skip, sortBy, order])

  useEffect(() => {
    load()
  }, [load])

  const handleSearch = (q) => {
    setQuery(q)
    setCategory('')
    resetToFirstPage()
  }

  const handleCategoryChange = (c) => {
    setCategory(c)
    setQuery('')
    resetToFirstPage()
  }

  const handleSortChange = (s) => {
    setSort(s)
    resetToFirstPage()
  }

  const openAddForm = () => {
    setEditingProduct(null)
    setFormOpen(true)
  }

  const openEditForm = (product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleFormSubmit = (values) => {
    setSaving(true)
    const request = editingProduct
      ? productsApi.updateProduct(editingProduct.id, values)
      : productsApi.addProduct(values)

    request
      .then((result) => {
        if (editingProduct) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...result } : p)))
        } else {
          // DummyJSON's mock "add" doesn't persist, so we prepend the
          // returned object locally to reflect the change in the UI.
          setProducts((prev) => [{ ...result, id: result.id ?? Date.now() }, ...prev])
        }
        setFormOpen(false)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false))
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setDeleting(true)
    productsApi
      .deleteProduct(deleteTarget.id)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
        setDeleteTarget(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false))
  }

  return (
    <DashboardLayout
      title="Products"
      subtitle="Browse, filter, and manage the product catalog"
      actions={
        <Button className="btn-teal d-flex align-items-center gap-1" onClick={openAddForm}>
          <LuPlus size={16} /> Add product
        </Button>
      }
    >
      <div className="card-surface p-3 mb-3">
        <Row className="g-2 align-items-center">
          <Col md={4}>
            <SearchBar placeholder="Search products…" onSearch={handleSearch} />
          </Col>
          <Col md="auto" className="ms-md-auto">
            <ProductFilters
              categories={categories}
              category={category}
              onCategoryChange={handleCategoryChange}
              sort={sort}
              onSortChange={handleSortChange}
            />
          </Col>
        </Row>
      </div>

      <ErrorAlert message={error} onRetry={load} />

      {loading ? (
        <LoadingSpinner label="Loading products…" />
      ) : products.length === 0 ? (
        <div className="empty-state card-surface">No products match your filters yet. Try a different search or category.</div>
      ) : (
        <>
          <Row className="g-3">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard product={product} onEdit={openEditForm} onDelete={setDeleteTarget} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <PaginationBar page={page} totalPages={totalPages} onChange={goToPage} />
          </div>
        </>
      )}

      <ProductForm
        show={formOpen}
        product={editingProduct}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        saving={saving}
      />

      <ConfirmDeleteModal
        show={!!deleteTarget}
        itemLabel={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  )
}
