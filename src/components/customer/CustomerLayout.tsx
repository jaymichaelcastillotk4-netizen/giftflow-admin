import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';

const CustomerLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <AuthModal />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default CustomerLayout;
