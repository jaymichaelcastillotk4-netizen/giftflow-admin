import { DollarSign, ShoppingCart, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockOrders, mockProducts, mockCustomers } from '@/lib/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const dailyData = [
  { day: 'Mon', sales: 4200 }, { day: 'Tue', sales: 3800 }, { day: 'Wed', sales: 5100 },
  { day: 'Thu', sales: 4700 }, { day: 'Fri', sales: 6200 }, { day: 'Sat', sales: 7800 }, { day: 'Sun', sales: 5400 },
];

const monthlyData = [
  { month: 'Jan', sales: 32000 }, { month: 'Feb', sales: 41000 }, { month: 'Mar', sales: 38000 },
];

const AdminDashboard = () => {
  const totalSales = mockOrders.reduce((s, o) => s + o.total, 0);
  const lowStock = mockProducts.filter(p => p.stock <= 5);

  const stats = [
    { label: 'Total Sales', value: `₱${totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-success/10 text-success' },
    { label: 'Total Orders', value: mockOrders.length, icon: ShoppingCart, color: 'bg-secondary/10 text-secondary' },
    { label: 'Customers', value: mockCustomers.length, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Low Stock Items', value: lowStock.length, icon: AlertTriangle, color: 'bg-accent/20 text-accent-foreground' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="admin-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Daily Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(205, 78%, 21%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="admin-card">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="hsl(44, 100%, 51%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {mockOrders.slice(0, 5).map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <span className="font-medium text-foreground text-sm">{o.id}</span>
                  <span className="text-muted-foreground text-xs ml-2">{o.customerName}</span>
                </div>
                <span className="text-sm font-medium text-foreground">₱{o.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-card">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent" /> Low Stock Alerts
          </h3>
          {lowStock.length === 0 ? (
            <p className="text-muted-foreground text-sm">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-foreground">{p.name}</span>
                  <span className={`text-sm font-bold ${p.stock === 0 ? 'text-destructive' : 'text-accent-foreground'}`}>{p.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
