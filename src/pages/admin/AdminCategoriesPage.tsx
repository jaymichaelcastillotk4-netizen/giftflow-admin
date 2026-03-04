import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Category, mockCategories } from '@/lib/store';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const openNew = () => { setForm({ name: '', description: '' }); setEditing(null); setShowForm(true); };
  const openEdit = (c: Category) => { setForm({ name: c.name, description: c.description }); setEditing(c); setShowForm(true); };
  const handleSave = () => {
    if (editing) {
      setCategories(categories.map(c => c.id === editing.id ? { ...c, ...form } : c));
    } else {
      setCategories([...categories, { id: String(Date.now()), ...form }]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Categories</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button onClick={handleSave} className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                {editing ? 'Update' : 'Add'} Category
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="admin-card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
