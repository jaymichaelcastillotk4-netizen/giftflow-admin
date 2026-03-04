import { useState } from 'react';
import { Eye, UserX } from 'lucide-react';
import { mockCustomers, mockOrders, Customer } from '@/lib/store';

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [viewing, setViewing] = useState<Customer | null>(null);

  const toggleActive = (id: string) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const customerOrders = viewing ? mockOrders.filter(o => o.customerId === viewing.id) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-foreground">Customers</h1>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setViewing(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-semibold text-foreground mb-4">{viewing.name}</h3>
            <div className="text-sm space-y-2 mb-4">
              <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{viewing.email}</span></p>
              <p><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{viewing.phone}</span></p>
              <p><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{viewing.address}</span></p>
            </div>
            <h4 className="font-display font-semibold text-foreground mb-2">Order History</h4>
            {customerOrders.length === 0 ? <p className="text-sm text-muted-foreground">No orders yet.</p> : (
              <div className="space-y-2">
                {customerOrders.map(o => (
                  <div key={o.id} className="flex justify-between py-2 border-b text-sm">
                    <span className="text-foreground">{o.id} — {o.date}</span>
                    <span className="font-medium text-foreground">₱{o.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setViewing(null)} className="w-full mt-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/80">Close</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Phone</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="py-3 px-2 font-medium text-foreground">{c.name}</td>
                <td className="py-3 px-2 text-muted-foreground">{c.email}</td>
                <td className="py-3 px-2 text-muted-foreground">{c.phone}</td>
                <td className="py-3 px-2"><span className={c.active ? 'badge-success' : 'badge-danger'}>{c.active ? 'Active' : 'Inactive'}</span></td>
                <td className="py-3 px-2 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => setViewing(c)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => toggleActive(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><UserX className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomersPage;
