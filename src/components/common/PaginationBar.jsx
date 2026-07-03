import { Pagination } from 'react-bootstrap'

export default function PaginationBar({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const windowSize = 2
  const start = Math.max(1, page - windowSize)
  const end = Math.min(totalPages, page + windowSize)

  for (let p = start; p <= end; p++) {
    pages.push(p)
  }

  return (
    <Pagination className="mb-0">
      <Pagination.First disabled={page === 1} onClick={() => onChange(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => onChange(page - 1)} />
      {start > 1 && <Pagination.Ellipsis disabled />}
      {pages.map((p) => (
        <Pagination.Item key={p} active={p === page} onClick={() => onChange(p)}>
          {p}
        </Pagination.Item>
      ))}
      {end < totalPages && <Pagination.Ellipsis disabled />}
      <Pagination.Next disabled={page === totalPages} onClick={() => onChange(page + 1)} />
      <Pagination.Last disabled={page === totalPages} onClick={() => onChange(totalPages)} />
    </Pagination>
  )
}
