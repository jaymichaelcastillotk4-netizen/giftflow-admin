import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { mockOrders, useAppStore } from '@/lib/store';

const statusLabels: Record<string, { label: string; class: string }> = {
  pending_payment: { label: 'Pending Payment', class: 'badge-pending' },
  processing: { label: 'Processing', class: 'badge-info' },
  shipped: { label: 'Shipped', class: 'badge-info' },
  delivered: { label: 'Delivered', class: 'badge-success' },
  cancelled: { label: 'Cancelled', class: 'badge-danger' },
};

const OrdersPage = () => {
  const { user } = useAppStore();
  const orders = mockOrders.filter(o => o.customerId === user?.id);

  if (!user) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-muted-foreground">Please log in to view your orders.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">No orders yet</h2>
          <Link to="/products" className="text-secondary hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const status = statusLabels[order.status];
            return (
              <div key={order.id} className="bg-card rounded-xl border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="font-display font-semibold text-foreground">{order.id}</span>
                    <span className="text-sm text-muted-foreground ml-3">{order.date}</span>
                  </div>
                  <span className={status.class}>{status.label}</span>
                </div>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                      <span className="text-foreground">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-3 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>₱{order.total.toLocaleString()}</span>
                </div>
                {/* Status tracker */}
                <div className="mt-4 flex items-center gap-1">
                  {['pending_payment', 'processing', 'shipped', 'delivered'].map((s, i) => {
                    const steps = ['pending_payment', 'processing', 'shipped', 'delivered'];
                    const currentIdx = steps.indexOf(order.status);
                    const active = i <= currentIdx;
                    return (
                      <div key={s} className="flex-1 flex items-center">
                        <div className={`w-3 h-3 rounded-full ${active ? 'bg-success' : 'bg-muted'}`} />
                        {i < 3 && <div className={`flex-1 h-0.5 ${active && i < currentIdx ? 'bg-success' : 'bg-muted'}`} />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Pending</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
