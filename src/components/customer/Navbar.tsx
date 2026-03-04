import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, Package } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, cart, wishlist, logout, setShowAuthModal } = useAppStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-primary">Anything Inside</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/products" className={`nav-link ${isActive('/products') ? 'nav-link-active' : ''}`}>Products</Link>
            <Link to="/wishlist" className={`nav-link ${isActive('/wishlist') ? 'nav-link-active' : ''}`}>Wishlist</Link>
            <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'nav-link-active' : ''}`}>Cart</Link>
            {user && <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'nav-link-active' : ''}`}>My Orders</Link>}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Heart className="w-5 h-5 text-muted-foreground" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <button onClick={logout} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="hidden md:flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                <User className="w-4 h-4" /> Login
              </button>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t animate-fade-in">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in space-y-1">
            <Link to="/" className="block nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/products" className="block nav-link" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link to="/wishlist" className="block nav-link" onClick={() => setMobileOpen(false)}>Wishlist</Link>
            <Link to="/cart" className="block nav-link" onClick={() => setMobileOpen(false)}>Cart</Link>
            {user && <Link to="/orders" className="block nav-link" onClick={() => setMobileOpen(false)}>My Orders</Link>}
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block nav-link w-full text-left">Logout</button>
            ) : (
              <button onClick={() => { setShowAuthModal(true); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Login / Register</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
