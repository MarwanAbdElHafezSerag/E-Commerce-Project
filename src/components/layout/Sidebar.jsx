import { NavLink } from 'react-router-dom'
import {
  LuLayoutDashboard,
  LuPackage,
  LuShoppingCart,
  LuUsers,
  LuLogOut
} from 'react-icons/lu'
import { useAuth } from '../../hooks/useAuth'

const links = [
  { to: '/', label: 'Overview', icon: LuLayoutDashboard, end: true },
  { to: '/products', label: 'Products', icon: LuPackage },
  { to: '/carts', label: 'Carts', icon: LuShoppingCart },
  { to: '/users', label: 'Users', icon: LuUsers }
]

export default function Sidebar({ open, onNavigate }) {
  const { logout, user } = useAuth()

  return (
    <aside className={`app-sidebar${open ? ' open' : ''}`}>
      <div className="brand">
        <span className="dot" />
        Shopfront
      </div>

      <nav className="flex-grow-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="d-flex align-items-center gap-2 mb-2 px-1">
          <img
            src={user?.image || 'https://dummyjson.com/icon/user/128'}
            alt={user?.username || 'User'}
            width={32}
            height={32}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ minWidth: 0 }}>
            <div className="text-truncate" style={{ fontSize: '0.86rem', fontWeight: 600 }}>
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username}
            </div>
            <div className="text-truncate" style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.55)' }}>
              {user?.email}
            </div>
          </div>
        </div>
        <button type="button" className="sidebar-link w-100 border-0 bg-transparent" onClick={logout}>
          <LuLogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  )
}
