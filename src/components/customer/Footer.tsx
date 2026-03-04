import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Package className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Anything Inside</span>
          </div>
          <p className="text-sm text-primary-foreground/70">Your one-stop gift shop for every occasion. We make gifting simple and memorable.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <Link to="/" className="block hover:text-accent transition-colors">Home</Link>
            <Link to="/products" className="block hover:text-accent transition-colors">Products</Link>
            <Link to="/cart" className="block hover:text-accent transition-colors">Cart</Link>
            <Link to="/wishlist" className="block hover:text-accent transition-colors">Wishlist</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <span className="block">Birthday Gifts</span>
            <span className="block">Holiday Gifts</span>
            <span className="block">Romantic Gifts</span>
            <span className="block">Corporate Gifts</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@anythinginside.com</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +63 917 123 4567</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Manila, Philippines</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
        © 2026 Anything Inside Gift Shop. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
