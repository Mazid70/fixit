import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router';
import { Shield, Menu, X, User } from 'lucide-react';

export default function Navbar({ onNavigateToLogin, onNavigateToRegister, session, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic Scroll to target ID section, with path redirection if not on home page
  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Highly premium scroll spy to track the active home section dynamically
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['login-viewport', 'categories-section', 'how-it-works-section', 'stats-section'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // offset for top navbar
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial invocation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Reusable, highly versatile Dynamic NavLink Component
  const DynamicNavLink = ({ to, targetId, children, id, mobile = false }) => {
    // Determine active state depending on whether it's a page path or scroll section
    const isActive = to 
      ? location.pathname === to 
      : (location.pathname === '/' && targetId && activeSection === targetId);

    const baseClass = mobile
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

    const handleClick = (e) => {
      if (to) {
        setIsOpen(false);
        navigate(to);
      } else if (targetId) {
        e.preventDefault();
        handleScrollTo(targetId);
      }
    };

    if (to) {
      return (
        <NavLink
          id={id}
          to={to}
          onClick={() => setIsOpen(false)}
          className={({ isActive: isLinkActive }) => 
            mobile
              ? `block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isLinkActive 
                    ? 'bg-orange-500/10 text-orange-500 font-bold border-l-2 border-orange-500' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`
              : `relative text-xs tracking-wider uppercase font-mono py-1.5 transition-all duration-300 group cursor-pointer ${
                  isLinkActive 
                    ? 'text-orange-500 font-bold' 
                    : 'text-[#c3c6d7] hover:text-white'
                }`
          }
        >
          <span>{children}</span>
          {!mobile && (
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          )}
        </NavLink>
      );
    }

    return (
      <button id={id} onClick={handleClick} className={baseClass}>
        <span>{children}</span>
        {!mobile && (
          <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-left transition-transform duration-300 ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`} />
        )}
      </button>
    );
  };

  const desktopNavItems = [
    { id: 'nav-link-explore', label: 'Home', targetId: 'categories-section' },
    { id: 'nav-link-how-it-works', label: 'How it Works', targetId: 'how-it-works-section' },
    { id: 'nav-link-pricing', label: 'Performance', targetId: 'stats-section' },
    { id: 'nav-link-partner', label: 'Become a Partner', to: '/register' },
  ];

  const mobileNavItems = [
    { id: 'nav-mobile-explore', label: 'Explore Categories', targetId: 'categories-section' },
    { id: 'nav-mobile-how', label: 'How it Works', targetId: 'how-it-works-section' },
    { id: 'nav-mobile-stats', label: 'Performance & Stats', targetId: 'stats-section' },
    { id: 'nav-mobile-partner', label: 'Become a Partner', to: '/register' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/85 backdrop-blur-xl border-b border-zinc-900/80 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <button 
            id="nav-logo"
            onClick={() => handleScrollTo('login-viewport')}
            className="flex items-center gap-2 focus:outline-none group"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
              <Shield className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display text-orange-500">
              FixIt
            </span>
          </button>

          {/* Dynamic Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {desktopNavItems.map((item) => (
              <DynamicNavLink
                key={item.id}
                id={item.id}
                to={item.to}
                targetId={item.targetId}
              >
                {item.label}
              </DynamicNavLink>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session && session.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>{session.fullName}</span>
              </span>
              <button 
                id="nav-btn-logout"
                onClick={onLogout}
                className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors duration-300"
              >
                Disconnect
              </button>
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
            {mobileNavItems.map((item) => (
              <DynamicNavLink
                key={item.id}
                id={item.id}
                to={item.to}
                targetId={item.targetId}
                mobile
              >
                {item.label}
              </DynamicNavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            {session && session.isLoggedIn ? (
              <div className="space-y-3">
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 px-2">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span>{session.fullName}</span>
                </div>
                <button 
                  id="nav-mobile-logout"
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
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
