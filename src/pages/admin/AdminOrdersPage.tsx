import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { mockOrders, Order } from '@/lib/store';

const statusOptions = ['pending_payment', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
const statusLabels: Record<string, { label: string; class: string }> = {
  pending_payment: { label: 'Pending Payment', class: 'badge-pending' },
  processing: { label: 'Processing', class: 'badge-info' },
  shipped: { label: 'Shipped', class: 'badge-info' },
  delivered: { label: 'Delivered', class: 'badge-success' },
  cancelled: { label: 'Cancelled', class: 'badge-danger' },
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [viewing, setViewing] = useState<Order | null>(null);

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-foreground">Orders</h1>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setViewing(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-fade-in max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Order {viewing.id}</h3>
              <button onClick={() => setViewing(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Customer:</span> <span className="text-foreground font-medium">{viewing.customerName}</span></div>
              <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{viewing.date}</span></div>
              <div><span className="text-muted-foreground">Payment:</span> <span className={viewing.paymentStatus === 'verified' ? 'badge-success' : 'badge-pending'}>{viewing.paymentStatus}</span></div>
              <div className="border-t pt-3">
                {viewing.items.map(item => (
                  <div key={item.product.id} className="flex justify-between py-1">
                    <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium text-foreground">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span><span>₱{viewing.total.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Update Status</label>
                <select value={viewing.status} onChange={e => { const s = e.target.value as Order['status']; updateStatus(viewing.id, s); setViewing({ ...viewing, status: s }); }} className="w-full px-4 py-2.5 mt-1 rounded-lg border bg-background text-foreground">
                  {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s].label}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Order ID</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Payment</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Total</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="py-3 px-2 font-medium text-foreground">{o.id}</td>
                <td className="py-3 px-2 text-foreground">{o.customerName}</td>
                <td className="py-3 px-2 text-muted-foreground">{o.date}</td>
                <td className="py-3 px-2"><span className={o.paymentStatus === 'verified' ? 'badge-success' : 'badge-pending'}>{o.paymentStatus}</span></td>
                <td className="py-3 px-2"><span className={statusLabels[o.status].class}>{statusLabels[o.status].label}</span></td>
                <td className="py-3 px-2 text-right font-medium text-foreground">₱{o.total.toLocaleString()}</td>
                <td className="py-3 px-2 text-right">
                  <button onClick={() => setViewing(o)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
