import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, ChevronRight } from 'lucide-react';

export default function LoginView({ onSwitchView, onLoginSuccess, heroImagePath }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all credentials.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate login verification after brief network delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      const displayName = email.split('@')[0].split('.')[0];
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      onLoginSuccess({
        email: email,
        fullName: capitalizedName || 'User Account',
        isLoggedIn: true,
        phone: '+1 (555) 321-7890',
      });
    }, 1200);
  };

  // Pre-fill demo account for easy evaluator login
  const handleQuickDemo = () => {
    setEmail('sarah.connor@example.com');
    setPassword('customer123');
  };

  return (
    <div  className="min-h-screen  bg-[#050505] flex flex-col lg:flex-row text-white font-sans overflow-hidden">
      
      {/* Left Branding Panel (Bold Typography Signature) */}
      <div  className="relative flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#0A0A0A] to-[#050505] border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden min-h-[480px] lg:min-h-screen">
        
        {/* Subtle background image trace for premium depth */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-luminosity">
          <img
            src={heroImagePath}
            alt="FixIt Service Expert background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#050505]/85"></div>
        </div>

        <div className="z-10">
          {/* Logo & Small Brand */}
          <div className="flex items-center gap-2 mb-12 sm:mb-16">
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#050505] stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display">Fixit</span>
          </div>

          {/* Epic Bold Heading */}
          <h1 
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-[85px] sm:text-[110px] xl:text-[140px] font-black leading-[0.85] tracking-tighter uppercase font-display"
          >
            Fix<br/>
            <span className="text-orange-500">It.</span>
          </h1>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-md font-light leading-relaxed"
          >
            Connect with elite service providers. Reliable, verified hands for every urgent residential or commercial repair.
          </p>
        </div>

        {/* Dynamic Badges & Categories */}
        <div className="z-10 flex flex-col gap-6 mt-12">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-700 overflow-hidden flex items-center justify-center text-xs font-bold text-white">AM</div>
              <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-600 overflow-hidden flex items-center justify-center text-xs font-bold text-white">SC</div>
              <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-800 overflow-hidden flex items-center justify-center text-xs font-bold text-white">JD</div>
            </div>
            <p className="text-sm text-zinc-500">
              <span className="text-white font-bold">12,400+</span> Pros dispatched today
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold">
            <span>Plumbing</span>
            <span className="text-zinc-700">•</span>
            <span>Electrical</span>
            <span className="text-zinc-700">•</span>
            <span>HVAC</span>
            <span className="text-zinc-700">•</span>
            <span>Appliance Repair</span>
            <span className="text-zinc-700">•</span>
            <span>Automotive</span>
          </div>
        </div>

        {/* Huge Ambient Watermark */}
        <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none select-none hidden lg:block">
          <span className="text-[320px] font-black leading-none translate-y-1/4 translate-x-12 font-display">USER</span>
        </div>
      </div>

      {/* Right Form Panel (Stark & High Contrast) */}
      <div id="login-form-panel" className="w-full overflow-hidden lg:w-[460px] bg-[#050505] p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative">
        <div className="w-full max-w-sm mx-auto space-y-8">
          
          {/* View Tab Selector Header */}
          <div className="mb-8">
            <div className="flex gap-6 mb-3">
              <button className="text-3xl font-black text-white tracking-tight uppercase font-display cursor-default">
                Login
              </button>
              <button 
                id="btn-switch-to-register"
                onClick={onSwitchView}
                className="text-3xl font-black text-zinc-700 hover:text-zinc-500 tracking-tight uppercase font-display transition-colors"
              >
                Register
              </button>
            </div>
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
          </div>

          {error && (
            <div 
              data-aos="fade-in"
              id="login-error-alert"
              className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300 flex items-start gap-2.5"
            >
              <span className="font-bold uppercase tracking-wider">Error:</span> {error}
            </div>
          )}

          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="login-email" className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-600">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all duration-200"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-600">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-4 pl-12 pr-10 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  id="btn-toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-600 hover:text-zinc-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="chk-remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-orange-500 focus:ring-0 focus:ring-offset-0 focus:outline-none accent-orange-500"
                />
                <span className="text-xs text-zinc-500 font-medium">Stay signed in on this device</span>
              </label>
            </div>

            {/* Action Submit Button */}
            <button
              id="btn-login-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
