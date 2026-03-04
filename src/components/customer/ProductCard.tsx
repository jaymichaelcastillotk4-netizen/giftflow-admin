import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, useAppStore } from '@/lib/store';

const ProductCard = ({ product }: { product: Product }) => {
  const { requireAuth, addToCart, addToWishlist, wishlist } = useAppStore();
  const isWishlisted = wishlist.some(p => p.id === product.id);
  const outOfStock = product.stock === 0;

  const colors = [
    'from-primary/10 to-secondary/10',
    'from-accent/20 to-accent/5',
    'from-secondary/15 to-primary/5',
    'from-primary/5 to-accent/15',
  ];
  const bgColor = colors[parseInt(product.id) % colors.length];

  return (
    <div className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className={`aspect-square bg-gradient-to-br ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <span className="text-6xl">🎁</span>
          {product.discount && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">-{product.discount}%</span>
          )}
          {outOfStock && (
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <span className="bg-card text-foreground px-4 py-2 rounded-lg font-medium text-sm">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">₱{product.price.toLocaleString()}</span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through ml-2">₱{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}</span>
            )}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => requireAuth(() => addToWishlist(product))}
              className={`p-2 rounded-lg transition-colors ${isWishlisted ? 'bg-destructive/10 text-destructive' : 'hover:bg-muted text-muted-foreground'}`}
            >
              <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => !outOfStock && requireAuth(() => addToCart(product))}
              disabled={outOfStock}
              className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
