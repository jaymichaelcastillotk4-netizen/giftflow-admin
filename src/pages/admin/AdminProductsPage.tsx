import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { mockProducts, mockCategories, Product } from '@/lib/store';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({ name: '', description: '', price: 0, category: '1', stock: 0, discount: 0 });

  const openNew = () => { setForm({ name: '', description: '', price: 0, category: '1', stock: 0, discount: 0 }); setEditing(null); setShowForm(true); };
  const openEdit = (p: Product) => { setForm(p); setEditing(p); setShowForm(true); };
  const handleSave = () => {
    if (editing) {
      setProducts(products.map(p => p.id === editing.id ? { ...p, ...form } as Product : p));
    } else {
      setProducts([...products, { ...form, id: String(Date.now()), image: '' } as Product]);
    }
    setShowForm(false);
  };
  const handleDelete = (id: string) => setProducts(products.filter(p => p.id !== id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Price (₱)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Stock</label>
                  <input type="number" min={0} value={form.stock} onChange={e => setForm({ ...form, stock: Math.max(0, Number(e.target.value)) })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Discount (%)</label>
                  <input type="number" min={0} max={100} value={form.discount || 0} onChange={e => setForm({ ...form, discount: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Product Image</label>
                <input type="file" accept="image/*" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground" />
              </div>
              <button onClick={handleSave} className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                {editing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Product</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Category</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Price</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Stock</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const cat = mockCategories.find(c => c.id === p.category);
              return (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">🎁</div>
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        {p.discount ? <span className="text-xs text-accent-foreground">{p.discount}% off</span> : null}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{cat?.name}</td>
                  <td className="py-3 px-2 text-right font-medium text-foreground">₱{p.price.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`font-medium ${p.stock === 0 ? 'text-destructive' : p.stock <= 5 ? 'text-accent-foreground' : 'text-foreground'}`}>{p.stock}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
