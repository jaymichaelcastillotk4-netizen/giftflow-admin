import { useState } from 'react';
import { Plus, X, Shield, UserCog } from 'lucide-react';
import { AdminUser, mockAdmins, useAppStore } from '@/lib/store';

const AdminUsersPage = () => {
  const { adminUser } = useAppStore();
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'staff' as AdminUser['role'], password: '' });
  const isSuperAdmin = adminUser?.role === 'super_admin';

  const handleAdd = () => {
    setAdmins([...admins, { id: String(Date.now()), name: form.name, email: form.email, role: form.role }]);
    setShowForm(false);
    setForm({ name: '', email: '', role: 'staff', password: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Users</h1>
        {isSuperAdmin && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            <Plus className="w-4 h-4" /> Add Admin
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm text-foreground">
          <Shield className="w-4 h-4 inline mr-2" /> Only Super Admins can manage admin accounts.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Add Admin User</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as AdminUser['role'] })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground">
                <option value="staff">Staff</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <button onClick={handleAdd} className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors">Add Admin</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {admins.map(a => (
          <div key={a.id} className="admin-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.role === 'super_admin' ? 'bg-accent/20' : 'bg-primary/10'}`}>
              <UserCog className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{a.name}</p>
              <p className="text-sm text-muted-foreground">{a.email}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${a.role === 'super_admin' ? 'bg-accent/20 text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
              {a.role === 'super_admin' ? 'Super Admin' : 'Staff'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
