import { Link } from 'react-router-dom'
import { LuStar, LuPencil, LuTrash2 } from 'react-icons/lu'
import { categoryColor } from '../../utils/categoryColor'

export default function ProductCard({ product, onEdit, onDelete }) {
  const chip = categoryColor(product.category)

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          className="product-thumb"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </Link>
      <div className="product-body">
        <span
          className="category-chip align-self-start"
          style={{ background: chip.bg, color: chip.fg }}
        >
          {product.category}
        </span>
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <div className="product-title text-truncate">{product.title}</div>
        </Link>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span className="price-tag">${product.price}</span>
          <span className="rating-pill">
            <LuStar size={12} fill="#9a6a10" />
            {product.rating?.toFixed ? product.rating.toFixed(1) : product.rating}
          </span>
        </div>
        {(onEdit || onDelete) && (
          <div className="d-flex gap-2 mt-2">
            {onEdit && (
              <button
                type="button"
                className="btn btn-sm btn-outline-teal flex-fill d-flex align-items-center justify-content-center gap-1"
                onClick={() => onEdit(product)}
              >
                <LuPencil size={14} /> Edit
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger flex-fill d-flex align-items-center justify-content-center gap-1"
                onClick={() => onDelete(product)}
              >
                <LuTrash2 size={14} /> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
