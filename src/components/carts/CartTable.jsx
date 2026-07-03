import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu'

export default function CartTable({ carts, onEdit, onDelete }) {
  return (
    <div className="card-surface p-0 overflow-hidden">
      <Table responsive hover className="data-table mb-0">
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>User ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Discounted total</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>#{cart.id}</td>
              <td>{cart.userId}</td>
              <td>{cart.totalProducts} products · {cart.totalQuantity} qty</td>
              <td>${cart.total?.toFixed ? cart.total.toFixed(2) : cart.total}</td>
              <td>${cart.discountedTotal?.toFixed ? cart.discountedTotal.toFixed(2) : cart.discountedTotal}</td>
              <td>
                <div className="d-flex justify-content-end gap-2">
                  <Button as={Link} to={`/carts/${cart.id}`} size="sm" variant="outline-teal" title="View">
                    <LuEye size={14} />
                  </Button>
                  <Button size="sm" variant="outline-teal" onClick={() => onEdit(cart)} title="Edit">
                    <LuPencil size={14} />
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onDelete(cart)} title="Delete">
                    <LuTrash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
