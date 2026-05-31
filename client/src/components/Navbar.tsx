import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { toggleTheme } from '../features/theme/themeSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-black font-semibold  dark:text-white'
      : 'dark:text-gray-400 text-gray-800 hover:text-black dark:hover:text-white';
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to={user?.role == 'user' ? '/' : '/admin/subscriptions'} className="text-2xl font-bold dark:text-white">
          SubscriptionApp
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user?.role === 'user' && (
            <Link to="/" className={navLinkClass('/')}>
              Plans
            </Link>
          )}

          {user?.role === 'user' && (
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              Dashboard
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin/subscriptions" className={navLinkClass('/admin/subscriptions')}>
              Admin
            </Link>
          )}
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:text-white cursor-pointer">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Login
              </Link>

              <Link to="/register" className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg transition duration-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">
                <p className="font-semibold text-sm  dark:text-white">{user.name}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer transition duration-300">
                Logout
              </button>
            </>
          )}
        </div>

        <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden">
          {openMenu ? <X className="dark:bg-gray-300" /> : <Menu className="dark:bg-gray-300" />}
        </button>
      </div>

      {openMenu && (
        <div className="md:hidden border-t border-gray-200 px-5 py-5  bg-white dark:bg-gray-300">
          <div className="flex flex-col gap-4 ">
            <Link to="/" onClick={() => setOpenMenu(false)} className="block px-2 py-2 text-black hover:bg-gray-300 dark:hover:bg-gray-700">
              Plans
            </Link>

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setOpenMenu(false)}
                className="block px-2 py-2 text-black hover:bg-gray-300 dark:hover:bg-gray-700">
                Dashboard
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin/subscriptions"
                onClick={() => setOpenMenu(false)}
                className="block px-2 py-2 text-black hover:bg-gray-300 dark:hover:bg-gray-700">
                Admin
              </Link>
            )}

            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpenMenu(false)} className="block px-2 py-2 text-black hover:bg-gray-300 dark:hover:bg-gray-700">
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpenMenu(false)}
                  className="block px-2 py-2 text-black hover:bg-gray-300 dark:hover:bg-gray-700">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div>
                  <p className="font-semibold">{user.name}</p>
                </div>

                <button onClick={handleLogout} className="bg-red-500 text-white p-3 rounded-lg">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
