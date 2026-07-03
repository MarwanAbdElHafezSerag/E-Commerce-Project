import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LuPackage, LuShoppingCart, LuUsers, LuArrowRight } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import { useAuth } from '../hooks/useAuth.js'
import * as productsApi from '../api/productsApi.js'
import * as cartsApi from '../api/cartsApi.js'
import * as usersApi from '../api/usersApi.js'

export default function DashboardHome() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      productsApi.getProducts({ limit: 5, skip: 0 }),
      cartsApi.getCarts({ limit: 1, skip: 0 }),
      usersApi.getUsers({ limit: 1, skip: 0 })
    ])
      .then(([products, carts, users]) => {
        setStats({
          products: products.total,
          carts: carts.total,
          users: users.total
        })
        setRecentProducts(products.products)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout
      title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ''}`}
      subtitle="Here's a snapshot of your store right now"
    >
      {loading ? (
        <LoadingSpinner label="Loading overview…" />
      ) : (
        <>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <div className="stat-card" style={{ '--accent': 'var(--teal)' }}>
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <div className="stat-label">Products</div>
                    <div className="stat-value">{stats.products}</div>
                  </div>
                  <LuPackage size={22} color="var(--teal)" />
                </div>
                <Link to="/products" className="d-inline-flex align-items-center gap-1 mt-2" style={{ fontSize: '0.84rem' }}>
                  Manage products <LuArrowRight size={14} />
                </Link>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-card" style={{ '--accent': 'var(--amber)' }}>
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <div className="stat-label">Carts</div>
                    <div className="stat-value">{stats.carts}</div>
                  </div>
                  <LuShoppingCart size={22} color="var(--amber)" />
                </div>
                <Link to="/carts" className="d-inline-flex align-items-center gap-1 mt-2" style={{ fontSize: '0.84rem' }}>
                  Manage carts <LuArrowRight size={14} />
                </Link>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-card" style={{ '--accent': '#4a4fd1' }}>
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <div className="stat-label">Users</div>
                    <div className="stat-value">{stats.users}</div>
                  </div>
                  <LuUsers size={22} color="#4a4fd1" />
                </div>
                <Link to="/users" className="d-inline-flex align-items-center gap-1 mt-2" style={{ fontSize: '0.84rem' }}>
                  Manage users <LuArrowRight size={14} />
                </Link>
              </div>
            </Col>
          </Row>

          <div className="card-surface p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 style={{ fontSize: '1.1rem' }} className="mb-0">Recently added products</h2>
              <Link to="/products" style={{ fontSize: '0.86rem' }}>View all</Link>
            </div>
            <Row className="g-3">
              {recentProducts.map((p) => (
                <Col key={p.id} xs={6} md={true}>
                  <Link to={`/products/${p.id}`} className="text-decoration-none text-reset">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-100 rounded mb-2"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                    <div className="text-truncate" style={{ fontSize: '0.86rem', fontWeight: 600 }}>{p.title}</div>
                    <div className="price-tag" style={{ fontSize: '0.9rem' }}>${p.price}</div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
