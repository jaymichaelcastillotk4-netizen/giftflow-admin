import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useAppStore();

  if (wishlist.length === 0) return (
    <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your wishlist is empty</h1>
      <p className="text-muted-foreground mb-6">Save items you love for later</p>
      <Link to="/products" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">Browse Products</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-card rounded-xl border overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <span className="text-6xl">🎁</span>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="font-display font-semibold text-foreground">{product.name}</h3>
              <p className="text-primary font-bold mt-1">₱{product.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => moveToCart(product.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                  <ShoppingCart className="w-4 h-4" /> Move to Cart
                </button>
                <button onClick={() => removeFromWishlist(product.id)} className="p-2 rounded-lg border text-muted-foreground hover:text-destructive hover:border-destructive/20 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
