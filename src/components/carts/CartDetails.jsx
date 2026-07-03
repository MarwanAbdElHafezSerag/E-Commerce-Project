import { Table, Badge } from 'react-bootstrap'

export default function CartDetails({ cart }) {
  return (
    <div className="card-surface p-4">
      <div className="d-flex flex-wrap gap-4 mb-4">
        <div>
          <div className="stat-label">Cart ID</div>
          <div className="stat-value" style={{ fontSize: '1.4rem' }}>#{cart.id}</div>
        </div>
        <div>
          <div className="stat-label">User ID</div>
          <div className="stat-value" style={{ fontSize: '1.4rem' }}>{cart.userId}</div>
        </div>
        <div>
          <div className="stat-label">Total items</div>
          <div className="stat-value" style={{ fontSize: '1.4rem' }}>{cart.totalQuantity}</div>
        </div>
        <div>
          <div className="stat-label">Total</div>
          <div className="stat-value" style={{ fontSize: '1.4rem' }}>${cart.total}</div>
        </div>
        <div>
          <div className="stat-label">Discounted total</div>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--teal-dark)' }}>
            ${cart.discountedTotal}
          </div>
        </div>
      </div>

      <Table responsive hover className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Line total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products?.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail}
                      alt=""
                      width={36}
                      height={36}
                      style={{ borderRadius: 6, objectFit: 'cover' }}
                    />
                  )}
                  <span>{p.title}</span>
                </div>
              </td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                {p.discountPercentage ? (
                  <Badge bg="warning" text="dark">-{p.discountPercentage}%</Badge>
                ) : (
                  '—'
                )}
              </td>
              <td>${p.discountedTotal ?? p.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
