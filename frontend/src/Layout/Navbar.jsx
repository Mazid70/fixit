import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router';
import { Shield, Menu, X, User, ChevronDown } from 'lucide-react';
import { AuthContext } from '../AuthProvider/AuthProvider';

export default function Navbar({
  onNavigateToLogin,
  onNavigateToRegister,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [showDropdown, setShowDropdown] = useState(false); // user photo dropdown
  const { user,logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'nav-link-home', label: 'Home', to: '/' },
    { id: 'nav-link-explore', label: 'Explore', to: '/explore' },
    { id: 'nav-link-stats', label: 'Performance', to: '/stats' },
    ...(!user
      ? [{ id: 'nav-link-partner', label: 'Become a Partner', to: '/register' }]
      : []),
  ];

  const linkClass = ({ isActive }, mobile) =>
    mobile
      ? `block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
          isActive
            ? 'bg-orange-500/10 text-orange-500 font-bold border-l-2 border-orange-500'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
        }`
      : `relative text-xs tracking-wider uppercase font-mono py-1.5 transition-all duration-300 group cursor-pointer ${
          isActive
            ? 'text-orange-500 font-bold'
            : 'text-[#c3c6d7] hover:text-white'
        }`;

  const NavItem = ({ id, to, children, mobile = false }) => (
    <NavLink
      id={id}
      to={to}
      onClick={() => setIsOpen(false)}
      className={state => linkClass(state, mobile)}
    >
      <span>{children}</span>
      {!mobile && (
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
      )}
    </NavLink>
  );

 

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/85 backdrop-blur-xl border-b border-zinc-900/80 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <NavLink
            id="nav-logo"
            to="/"
            className="flex items-center gap-2 focus:outline-none group"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
              <Shield className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display text-orange-500">
              FixIt
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <NavItem key={item.id} id={item.id} to={item.to}>
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-user-photo"
                onClick={() => setShowDropdown(prev => !prev)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.fullName || 'User'}
                    className="w-9 h-9 rounded-full object-cover border-2 border-zinc-800 group-hover:border-orange-500 transition-colors duration-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border-2 border-zinc-800 group-hover:border-orange-500 flex items-center justify-center transition-colors duration-300">
                    <User className="w-4 h-4 text-orange-500" />
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#141414] border border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-sm font-medium text-[#dae2fd] truncate">
                      {user.fullName || 'Account'}
                    </p>
                    {user.email && (
                      <p className="text-xs text-zinc-500 truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <NavLink
                    id="nav-dropdown-profile"
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-orange-500 transition-colors"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    id="nav-dropdown-dashboard"
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-orange-500 transition-colors"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    id="nav-dropdown-logout"
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-orange-500 transition-colors border-t border-zinc-800"
                  >
                    log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to={'/login'}
                className="text-[#dae2fd] font-medium hover:text-orange-500 transition-colors duration-300 active:scale-95 px-4 py-2 text-sm"
              >
                Sign In
              </NavLink>
              <button
                id="nav-btn-get-started"
                onClick={onNavigateToRegister}
                className="bg-orange-500 text-black px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 active:scale-95 duration-200 shadow-[0_0_20px_rgba(249,115,22,0.3)] text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger menu button */}
        <div className="md:hidden flex items-center">
          <button
            id="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#dae2fd] hover:text-orange-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-t border-zinc-900 px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navItems.map(item => (
              <NavItem key={item.id} id={item.id} to={item.to} mobile>
                {item.label}
              </NavItem>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.username || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <User className="w-4 h-4 text-orange-500" />
                    </div>
                  )}
                  <span className="text-sm text-[#dae2fd]">
                    {user.username || 'Account'}
                  </span>
                </div>
                <NavItem id="nav-mobile-profile" to="/profile" mobile>
                  My Profile
                </NavItem>
                <NavItem id="nav-mobile-dashboard" to="/dashboard" mobile>
                  Dashboard
                </NavItem>
                <button
                  id="nav-mobile-logout"
                  onClick={handleLogout}
                  className="w-full text-center border border-zinc-800 text-zinc-400 py-3 rounded-xl text-sm font-bold hover:bg-zinc-900 transition-colors"
                >
                  Disconnect Securely
                </button>
              </div>
            ) : (
              <>
                <button
                  id="nav-mobile-signin"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateToLogin();
                  }}
                  className="w-full text-center border border-zinc-800 text-[#dae2fd] py-3 rounded-xl text-sm font-bold hover:bg-zinc-900 transition-colors"
                >
                  Sign In
                </button>
                <button
                  id="nav-mobile-register"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateToRegister();
                  }}
                  className="w-full text-center bg-orange-500 text-black py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
