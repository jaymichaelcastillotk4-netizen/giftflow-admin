import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'verified' | 'rejected';
  paymentProof?: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'staff';
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Mock Data
export const mockCategories: Category[] = [
  { id: '1', name: 'Birthday', description: 'Birthday gifts and surprises' },
  { id: '2', name: 'Holiday', description: 'Holiday seasonal gifts' },
  { id: '3', name: 'Romantic', description: 'Romantic gifts for loved ones' },
  { id: '4', name: 'Corporate', description: 'Professional corporate gifts' },
  { id: '5', name: 'Thank You', description: 'Appreciation gifts' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Sunset Bloom Bouquet', description: 'A stunning arrangement of warm-toned flowers perfect for any occasion. Includes roses, sunflowers, and seasonal fillers.', price: 1299, image: '', category: '3', stock: 15, discount: 10 },
  { id: '2', name: 'Classic Gift Basket', description: 'Curated selection of premium chocolates, cookies, and treats beautifully arranged in a woven basket.', price: 2499, image: '', category: '1', stock: 8 },
  { id: '3', name: 'Personalized Photo Frame', description: 'Elegant wooden photo frame with custom engraving. Perfect for preserving precious memories.', price: 899, image: '', category: '1', stock: 22 },
  { id: '4', name: 'Luxury Scented Candle Set', description: 'Set of 3 hand-poured soy candles in lavender, vanilla, and ocean breeze scents.', price: 1599, image: '', category: '3', stock: 3 },
  { id: '5', name: 'Holiday Celebration Box', description: 'Festive gift box with assorted holiday treats, ornaments, and a greeting card.', price: 1899, image: '', category: '2', stock: 12 },
  { id: '6', name: 'Corporate Thank You Set', description: 'Professional gift set including premium pen, notebook, and appreciation card.', price: 1199, image: '', category: '4', stock: 0 },
  { id: '7', name: 'Teddy Bear & Chocolates', description: 'Adorable plush teddy bear paired with a box of premium Belgian chocolates.', price: 999, image: '', category: '3', stock: 18 },
  { id: '8', name: 'Gourmet Coffee Bundle', description: 'Selection of artisan coffee beans from around the world with a ceramic mug.', price: 1799, image: '', category: '5', stock: 7 },
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Maria Santos', email: 'maria@email.com', phone: '09171234567', address: '123 Rizal St, Manila', active: true },
  { id: '2', name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '09181234567', address: '456 Mabini Ave, Quezon City', active: true },
  { id: '3', name: 'Ana Reyes', email: 'ana@email.com', phone: '09191234567', address: '789 Bonifacio Blvd, Makati', active: true },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', customerId: '1', customerName: 'Maria Santos', items: [{ product: mockProducts[0], quantity: 1 }, { product: mockProducts[3], quantity: 2 }], total: 4497, status: 'pending_payment', paymentStatus: 'pending', date: '2026-03-03' },
  { id: 'ORD-002', customerId: '2', customerName: 'Juan Dela Cruz', items: [{ product: mockProducts[1], quantity: 1 }], total: 2499, status: 'processing', paymentStatus: 'verified', date: '2026-03-02' },
  { id: 'ORD-003', customerId: '3', customerName: 'Ana Reyes', items: [{ product: mockProducts[6], quantity: 3 }], total: 2997, status: 'delivered', paymentStatus: 'verified', date: '2026-02-28' },
  { id: 'ORD-004', customerId: '1', customerName: 'Maria Santos', items: [{ product: mockProducts[4], quantity: 1 }], total: 1899, status: 'shipped', paymentStatus: 'verified', date: '2026-03-01' },
];

export const mockAdmins: AdminUser[] = [
  { id: '1', name: 'Admin User', email: 'admin@anythinginside.com', role: 'super_admin' },
  { id: '2', name: 'Staff Member', email: 'staff@anythinginside.com', role: 'staff' },
];

// Zustand store
interface AppState {
  user: { id: string; name: string; email: string } | null;
  adminUser: AdminUser | null;
  cart: CartItem[];
  wishlist: Product[];
  showAuthModal: boolean;
  authRedirectAction: (() => void) | null;
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; phone: string; address: string; password: string }) => boolean;
  logout: () => void;
  adminLogin: (email: string, password: string) => AdminUser | null;
  adminLogout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (productId: string) => void;
  setShowAuthModal: (show: boolean, action?: (() => void) | null) => void;
  requireAuth: (action: () => void) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  adminUser: null,
  cart: [],
  wishlist: [],
  showAuthModal: false,
  authRedirectAction: null,

  login: (email, _password) => {
    const customer = mockCustomers.find(c => c.email === email);
    if (customer) {
      set({ user: { id: customer.id, name: customer.name, email: customer.email }, showAuthModal: false });
      const action = get().authRedirectAction;
      if (action) { action(); set({ authRedirectAction: null }); }
      return true;
    }
    return false;
  },

  register: (data) => {
    set({ user: { id: String(Date.now()), name: data.name, email: data.email }, showAuthModal: false });
    const action = get().authRedirectAction;
    if (action) { action(); set({ authRedirectAction: null }); }
    return true;
  },

  logout: () => set({ user: null }),

  adminLogin: (email, _password) => {
    const admin = mockAdmins.find(a => a.email === email);
    if (admin) { set({ adminUser: admin }); return admin; }
    return null;
  },

  adminLogout: () => set({ adminUser: null }),

  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      set({ cart: cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => set({ cart: get().cart.filter(item => item.product.id !== productId) }),

  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) { get().removeFromCart(productId); return; }
    set({ cart: get().cart.map(item => item.product.id === productId ? { ...item, quantity } : item) });
  },

  clearCart: () => set({ cart: [] }),

  addToWishlist: (product) => {
    if (!get().wishlist.find(p => p.id === product.id)) {
      set({ wishlist: [...get().wishlist, product] });
    }
  },

  removeFromWishlist: (productId) => set({ wishlist: get().wishlist.filter(p => p.id !== productId) }),

  moveToCart: (productId) => {
    const product = get().wishlist.find(p => p.id === productId);
    if (product) {
      get().addToCart(product);
      get().removeFromWishlist(productId);
    }
  },

  setShowAuthModal: (show, action = null) => set({ showAuthModal: show, authRedirectAction: action }),

  requireAuth: (action) => {
    if (get().user) { action(); } else { set({ showAuthModal: true, authRedirectAction: action }); }
  },
}));
