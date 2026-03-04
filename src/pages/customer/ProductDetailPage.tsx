import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Package } from 'lucide-react';
import { mockProducts, mockCategories, useAppStore } from '@/lib/store';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const { requireAuth, addToCart, addToWishlist, wishlist } = useAppStore();

  if (!product) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-display font-bold text-foreground">Product not found</h1>
      <Link to="/products" className="text-secondary hover:underline mt-4 inline-block">Back to products</Link>
    </div>
  );

  const category = mockCategories.find(c => c.id === product.category);
  const isWishlisted = wishlist.some(p => p.id === product.id);
  const outOfStock = product.stock === 0;
  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center relative">
          <span className="text-[120px]">🎁</span>
          {product.discount && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-full">-{product.discount}% OFF</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {category && <span className="text-sm font-medium text-secondary mb-2">{category.name}</span>}
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">{product.name}</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">₱{product.price.toLocaleString()}</span>
            {product.discount && (
              <span className="text-lg text-muted-foreground line-through ml-3">₱{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-muted-foreground" />
            {outOfStock ? (
              <span className="text-destructive font-medium">Out of Stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-warning font-medium">Only {product.stock} left!</span>
            ) : (
              <span className="text-success font-medium">In Stock ({product.stock} available)</span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => !outOfStock && requireAuth(() => addToCart(product))}
              disabled={outOfStock}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={() => requireAuth(() => addToWishlist(product))}
              className={`px-4 py-3 rounded-lg border font-semibold transition-colors ${isWishlisted ? 'bg-destructive/10 text-destructive border-destructive/20' : 'text-foreground hover:bg-muted'}`}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-card rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-4xl">🎁</span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{p.name}</h3>
                <p className="text-primary font-bold mt-1">₱{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
