import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Truck, Shield, Star } from 'lucide-react';
import ProductCard from '@/components/customer/ProductCard';
import { mockProducts, mockCategories } from '@/lib/store';
import heroImage from '@/assets/hero-gifts.jpg';

const HomePage = () => {
  const featured = mockProducts.filter(p => p.stock > 0).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-primary-foreground z-10">
            <span className="inline-block bg-accent text-accent-foreground text-sm font-bold px-4 py-1.5 rounded-full mb-6">✨ New Collection Available</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
              The Perfect Gift for <span className="text-accent">Every Moment</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Discover curated gifts that speak from the heart. From birthdays to holidays, find something special for everyone.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:brightness-110 transition-all">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all">
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <img src={heroImage} alt="Gift boxes" className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Gift, title: 'Curated Gifts', desc: 'Hand-picked for every occasion' },
            { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
            { icon: Shield, title: 'Secure Payment', desc: 'Safe and easy GCash checkout' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl border p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {mockCategories.map(cat => (
            <Link key={cat.id} to="/products" className="px-6 py-3 bg-card border rounded-full font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground">Featured Gifts</h2>
          <Link to="/products" className="text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-accent fill-accent" />)}
          </div>
          <blockquote className="text-xl font-display text-foreground max-w-2xl mx-auto mb-4">
            "Anything Inside made finding the perfect birthday gift so easy. The quality was amazing and delivery was fast!"
          </blockquote>
          <p className="text-muted-foreground">— Maria S., Happy Customer</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
