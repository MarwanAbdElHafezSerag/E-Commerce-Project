import { Form, Row, Col } from 'react-bootstrap'

const SORT_OPTIONS = [
  { value: '', label: 'Default order' },
  { value: 'title-asc', label: 'Title (A–Z)' },
  { value: 'title-desc', label: 'Title (Z–A)' },
  { value: 'price-asc', label: 'Price (low to high)' },
  { value: 'price-desc', label: 'Price (high to low)' },
  { value: 'rating-desc', label: 'Rating (high to low)' }
]

export default function ProductFilters({ categories, category, onCategoryChange, sort, onSortChange }) {
  return (
    <Row className="g-2">
      <Col xs={6} md="auto">
        <Form.Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug || c} value={c.slug || c}>
              {c.name || c}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={6} md="auto">
        <Form.Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  )
}
