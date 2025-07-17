import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer /> {/* <-- Panggil Footer di sini */}
    </div>
  );
};

export default Layout;