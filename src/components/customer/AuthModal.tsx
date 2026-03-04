import { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, login, register } = useAppStore();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });
  const [error, setError] = useState('');

  if (!showAuthModal) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill all fields'); return; }
    const success = login(form.email, form.password);
    if (!success) setError('Invalid credentials. Try: maria@email.com');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone || !form.address || !form.password) { setError('Please fill all fields'); return; }
    register(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}>
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
          </h3>
          <button onClick={() => setShowAuthModal(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="p-6 space-y-4">
          {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

          {mode === 'register' && (
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          )}
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />

          {mode !== 'forgot' && (
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          )}

          {mode === 'register' && (
            <>
              <input placeholder="Contact Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </>
          )}

          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
            {mode === 'login' ? 'Login' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            {mode === 'login' && (
              <>
                <button type="button" onClick={() => setMode('forgot')} className="hover:text-primary transition-colors block mx-auto">Forgot password?</button>
                <p>Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-primary font-medium hover:underline">Register</button></p>
              </>
            )}
            {mode === 'register' && (
              <p>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-primary font-medium hover:underline">Login</button></p>
            )}
            {mode === 'forgot' && (
              <button type="button" onClick={() => setMode('login')} className="text-primary font-medium hover:underline">Back to Login</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
