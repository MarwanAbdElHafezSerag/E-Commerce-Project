import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100vh' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p className="text-soft mb-3">This page doesn't exist.</p>
      <Link to="/" className="btn btn-teal">Back to dashboard</Link>
    </div>
  )
}
