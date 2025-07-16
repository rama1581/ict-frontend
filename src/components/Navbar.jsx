import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
        {/* Bisa ganti ini dengan logo juga */}
        ICT Taruna Bakti
      </div>
      <div className="flex gap-8 text-gray-700 dark:text-gray-300 font-semibold text-lg">
        <Link
          to="/"
          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          Beranda
        </Link>
        <Link
          to="/post"
          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          Post
        </Link>
        <Link
          to="/news"
          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
