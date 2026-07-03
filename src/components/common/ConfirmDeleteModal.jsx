import { Modal, Button, Spinner } from 'react-bootstrap'

export default function ConfirmDeleteModal({ show, itemLabel, onCancel, onConfirm, deleting }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '1.1rem' }}>Delete {itemLabel || 'item'}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This action can't be undone. Are you sure you want to delete{' '}
        <strong>{itemLabel}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel} disabled={deleting}>
          Cancel
        </Button>
        <Button
          style={{ background: 'var(--coral)', borderColor: 'var(--coral)' }}
          onClick={onConfirm}
          disabled={deleting}
        >
          {deleting ? <Spinner animation="border" size="sm" /> : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
