import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, requireAuth } = useAppStore();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) return (
    <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
      <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your cart is empty</h1>
      <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
      <Link to="/products" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">Browse Products</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-card rounded-xl border p-4 flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🎁</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-display font-semibold text-foreground hover:text-secondary">{item.product.name}</Link>
                <p className="text-primary font-bold mt-1">₱{item.product.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-muted"><Minus className="w-3 h-3" /></button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-muted"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                <span className="font-bold text-foreground">₱{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border p-6 h-fit sticky top-24">
          <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between text-muted-foreground">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₱{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => requireAuth(() => { window.location.href = '/checkout'; })}
            className="w-full mt-4 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
