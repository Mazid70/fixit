import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Mail, Phone, User, LogOut } from 'lucide-react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';

// Import AOS for stunning animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import our beautiful custom generated technician asset
import heroBanner from '../../assets/image/fixit_hero_banner_1784038837238.jpg';

export default function Logger() {
  const [view, setView] = useState('login');
  
  // Track authenticated user session state matching the schema fields
  const [session, setSession] = useState({
    email: '',
    fullName: '',
    isLoggedIn: false,
    phone: '',
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out-quad',
      once: false,
    });
  }, []);

  // Refresh AOS animations on view changes
  useEffect(() => {
    AOS.refresh();
  }, [view]);

  const handleLoginSuccess = (userSession) => {
    setSession(userSession);
    setView('success');
  };

  const handleRegisterSuccess = (userSession) => {
    setSession(userSession);
    setView('success');
  };

  const handleLogout = () => {
    setSession({
      email: '',
      fullName: '',
      isLoggedIn: false,
      phone: '',
    });
    setView('login');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-orange-500/30 selection:text-orange-400 flex flex-col justify-between">
      
      {/* Dynamic Animated Page Transitions using AOS */}
      <div>
        {view === 'login' && (
          <div key="login-page" data-aos="fade-up">
            <LoginView
              onSwitchView={() => setView('register')}
              onLoginSuccess={handleLoginSuccess}
              heroImagePath={heroBanner}
            />
          </div>
        )}

        {view === 'register' && (
          <div key="register-page" data-aos="fade-up">
            <RegisterView
              onSwitchView={() => setView('login')}
              onRegisterSuccess={handleRegisterSuccess}
              heroImagePath={heroBanner}
            />
          </div>
        )}

        {view === 'success' && (
          <div
            key="success-page"
            data-aos="zoom-in"
            className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden"
          >
            {/* Ambient background blur */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-lg bg-[#0D0D0D] border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-8">
              
              {/* Header Info */}
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20">
                  <CheckCircle2 className="w-7 h-7 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display text-white">
                    Access Granted
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                    Secure Verification Active
                  </p>
                </div>
              </div>

              {/* Profile Card details according to schema */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-900 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="text-xs uppercase tracking-widest font-black text-zinc-500 font-mono">
                    Profile Schema
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider bg-orange-500 text-black">
                    USER ACCOUNT
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Full Name */}
                  <div className="flex items-center justify-between py-1 border-b border-zinc-900/50">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-zinc-600" />
                      Full Name
                    </span>
                    <span className="text-white font-bold">{session.fullName || 'N/A'}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between py-1 border-b border-zinc-900/50">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-zinc-600" />
                      Email Address
                    </span>
                    <span className="text-white font-mono">{session.email || 'N/A'}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-zinc-600" />
                      Phone Number
                    </span>
                    <span className="text-white font-mono">{session.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Status footer with brand signature */}
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Verified Credentials</span>
                </span>
                <span>Node ID: {Math.floor(1000 + Math.random() * 9000)}-OK</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="btn-logout"
                  onClick={handleLogout}
                  className="w-full bg-white text-black font-black py-3.5 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-black stroke-[3]" />
                  <span>Secure Disconnect</span>
                </button>
              </div>

            </div>

            {/* Ambient Watermark */}
            <div className="absolute bottom-8 text-center w-full text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em] pointer-events-none select-none">
              FIXIT SECURITY GATEWAY
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
