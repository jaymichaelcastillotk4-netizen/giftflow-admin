import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Upload } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const CheckoutPage = () => {
  const { cart, user, clearCart } = useAppStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'summary' | 'payment' | 'done'>('summary');
  const [proofUploaded, setProofUploaded] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!user) { navigate('/'); return null; }
  if (cart.length === 0 && step !== 'done') { navigate('/cart'); return null; }

  const handleSubmitOrder = () => {
    clearCart();
    setStep('done');
  };

  if (step === 'done') return (
    <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
      <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
      <h1 className="text-3xl font-display font-bold text-foreground mb-2">Order Submitted!</h1>
      <p className="text-muted-foreground mb-2">Your order is pending payment verification.</p>
      <p className="text-sm text-muted-foreground mb-8">We'll process your order once we verify your GCash payment.</p>
      <button onClick={() => navigate('/orders')} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">View My Orders</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {['Order Summary', 'Payment'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i === 0 && step === 'summary' || i === 1 && step === 'payment' ? 'bg-primary text-primary-foreground' : i === 0 && step === 'payment' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>{i + 1}</div>
            <span className="text-sm font-medium text-foreground hidden sm:block">{label}</span>
            {i === 0 && <div className="w-12 h-px bg-border" />}
          </div>
        ))}
      </div>

      {step === 'summary' && (
        <div>
          <div className="bg-card rounded-xl border p-6 mb-6">
            <h3 className="font-display font-semibold mb-4 text-foreground">Order Items</h3>
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                <span className="font-medium text-foreground">₱{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 text-lg font-bold text-foreground">
              <span>Total</span>
              <span>₱{total.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-6 mb-6">
            <h3 className="font-display font-semibold mb-2 text-foreground">Delivery Details</h3>
            <p className="text-muted-foreground text-sm">{user.name} — {user.email}</p>
          </div>
          <button onClick={() => setStep('payment')} className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">
            Proceed to Payment
          </button>
        </div>
      )}

      {step === 'payment' && (
        <div>
          <div className="bg-card rounded-xl border p-6 mb-6 text-center">
            <h3 className="font-display font-semibold mb-4 text-foreground">Pay via GCash</h3>
            <div className="w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl mx-auto flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-xs text-muted-foreground">GCash QR Code</p>
              </div>
            </div>
            <p className="text-lg font-bold text-foreground mb-1">Amount: ₱{total.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Scan the QR code or send to: 0917-123-4567</p>
          </div>

          <div className="bg-card rounded-xl border p-6 mb-6">
            <h3 className="font-display font-semibold mb-4 text-foreground">Upload Proof of Payment</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
              {proofUploaded ? (
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <span className="text-sm text-success font-medium">Payment proof uploaded</span>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload screenshot</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={() => setProofUploaded(true)} />
            </label>
          </div>

          <button
            onClick={handleSubmitOrder}
            disabled={!proofUploaded}
            className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
