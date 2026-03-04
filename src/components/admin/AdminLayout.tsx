import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, CreditCard, Users, UserCog, LogOut, Menu, X, Package2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useState, useEffect } from 'react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: Tag, label: 'Categories' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/users', icon: UserCog, label: 'Admin Users' },
];

const AdminLayout = () => {
  const { adminUser, adminLogout } = useAppStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!adminUser) navigate('/admin');
  }, [adminUser, navigate]);

  if (!adminUser) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <Package2 className="w-7 h-7 text-sidebar-primary" />
              <span className="font-display text-lg font-bold text-sidebar-foreground">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-sidebar-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" /> {label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="text-sm text-sidebar-foreground/70 mb-2">
              <p className="font-medium text-sidebar-foreground">{adminUser.name}</p>
              <p className="text-xs capitalize">{adminUser.role.replace('_', ' ')}</p>
            </div>
            <button onClick={() => { adminLogout(); navigate('/admin'); }} className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b px-4 h-14 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-display font-semibold text-foreground">Anything Inside Admin</h2>
        </header>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
