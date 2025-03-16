import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthState';

export default function Header() {
  const { state, dispatch } = useAuth();
  const { isAuthenticated, userType } = state;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === 'seeker') {
        navigate('/seeker');
      } else if (userType === 'provider') {
        navigate('/provider');
      }
    }
  }, [isAuthenticated, userType, navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-600 bg-black/90 backdrop-blur-lg shadow-md shadow-orange-600/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-orange-500 animate-pulse hover:animate-spin" />
          <NavLink
            to={isAuthenticated ? (userType === 'seeker' ? '/seeker' : '/provider') : '/'}
            className="text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 hover:scale-105 transform"
          >
            PG Made Eazy
          </NavLink>
        </div>

        {/* Links for unauthenticated users */}
        {!isAuthenticated && (
          <div className="flex-grow hidden md:flex justify-center gap-6">
            <NavLink
              to="/"
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
            >
              Home Page
            </NavLink>
            <NavLink
              to="/how-it-works" // Ensure the path matches your routing setup
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
            >
              How it Works
            </NavLink>
            <NavLink
              to="/contact" // Ensure the path matches your routing setup
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
            >
              Contact
            </NavLink>
          </div>
        )}

        {/* Dashboard Header for authenticated users */}
        {isAuthenticated && (
          <div className="flex-grow flex justify-center">
            <span className="text-lg font-semibold text-white">
              {userType === 'seeker' ? 'Seeker Dashboard' : 'Provider Dashboard'}
            </span>
          </div>
        )}

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-300 hover:text-orange-500 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-orange-600/20 md:hidden">
            <nav className="flex flex-col space-y-2 p-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-300 hover:text-orange-500 px-4 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/sign-in"
                    className="text-gray-300 hover:text-orange-500 px-4 py-2 transition-colors"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/get-started"
                    className="text-gray-300 hover:text-orange-500 px-4 py-2 transition-colors"
                    onClick={toggleMenu}
                  >
                    Get Started
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/sign-in"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/get-started"
                className="rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-md bg-orange-500 text-black hover:bg-orange-600 hover:scale-105 transform active:scale-95"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
