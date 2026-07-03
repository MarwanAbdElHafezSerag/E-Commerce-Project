import { LuMenu } from 'react-icons/lu'

export default function Topbar({ title, subtitle, onToggleSidebar, actions }) {
  return (
    <header className="app-topbar">
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-md-none"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <LuMenu size={18} />
        </button>
        <div>
          <h1 className="mb-0" style={{ fontSize: '1.3rem' }}>
            {title}
          </h1>
          {subtitle && <div className="text-soft" style={{ fontSize: '0.86rem' }}>{subtitle}</div>}
        </div>
      </div>
      {actions && <div className="d-flex align-items-center gap-2">{actions}</div>}
    </header>
  )
}
