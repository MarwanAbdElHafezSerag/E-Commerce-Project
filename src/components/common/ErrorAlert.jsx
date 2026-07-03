import { Alert } from 'react-bootstrap'

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null
  return (
    <Alert variant="danger" className="d-flex align-items-center justify-content-between">
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Try again
        </button>
      )}
    </Alert>
  )
}
