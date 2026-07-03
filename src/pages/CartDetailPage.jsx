import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import CartDetails from '../components/carts/CartDetails.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import * as cartsApi from '../api/cartsApi.js'

export default function CartDetailPage() {
  const { id } = useParams()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    cartsApi
      .getCart(id)
      .then(setCart)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [id])

  return (
    <DashboardLayout title={`Cart #${id}`} subtitle="Cart detail">
      <Link to="/carts" className="d-inline-flex align-items-center gap-1 text-soft text-decoration-none mb-3">
        <LuArrowLeft size={16} /> Back to carts
      </Link>

      {loading ? (
        <LoadingSpinner label="Loading cart…" />
      ) : error || !cart ? (
        <ErrorAlert message={error || 'Cart not found.'} onRetry={load} />
      ) : (
        <CartDetails cart={cart} />
      )}
    </DashboardLayout>
  )
}
