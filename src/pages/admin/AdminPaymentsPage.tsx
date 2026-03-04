import { useState } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { mockOrders, Order } from '@/lib/store';

const AdminPaymentsPage = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updatePayment = (id: string, status: Order['paymentStatus']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, paymentStatus: status, status: status === 'verified' ? 'processing' : o.status } : o));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-foreground">Payment Tracking</h1>

      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Order</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Proof</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="py-3 px-2 font-medium text-foreground">{o.id}</td>
                <td className="py-3 px-2 text-foreground">{o.customerName}</td>
                <td className="py-3 px-2 text-right font-medium text-foreground">₱{o.total.toLocaleString()}</td>
                <td className="py-3 px-2">
                  <span className={o.paymentStatus === 'verified' ? 'badge-success' : o.paymentStatus === 'rejected' ? 'badge-danger' : 'badge-pending'}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Eye className="w-4 h-4" /></button>
                </td>
                <td className="py-3 px-2 text-right">
                  {o.paymentStatus === 'pending' && (
                    <div className="flex justify-end gap-1">
                      <button onClick={() => updatePayment(o.id, 'verified')} className="p-2 rounded-lg hover:bg-success/10 text-success" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                      <button onClick={() => updatePayment(o.id, 'rejected')} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive" title="Reject"><XCircle className="w-4 h-4" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
