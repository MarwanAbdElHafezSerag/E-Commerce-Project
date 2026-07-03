import { Spinner } from 'react-bootstrap'

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-soft">
      <Spinner animation="border" style={{ color: 'var(--teal)' }} />
      <div className="mt-2" style={{ fontSize: '0.86rem' }}>{label}</div>
    </div>
  )
}
