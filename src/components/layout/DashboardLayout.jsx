import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function DashboardLayout({ title, subtitle, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar
          title={title}
          subtitle={subtitle}
          actions={actions}
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
        />
        <main className="app-content">{children}</main>
      </div>
    </div>
  )
}
