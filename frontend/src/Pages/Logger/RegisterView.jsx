import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowLeft, ShieldCheck, Check } from 'lucide-react';

export default function RegisterView({ onSwitchView, onRegisterSuccess, heroImagePath }) {
  // Account Information (Matching Schema: name, email, phone, password)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
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

    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({
        email: email,
        fullName: fullName,
        isLoggedIn: true,
        phone: phone,
      });
    }, 1200);
  };

  return (
    <div id="register-viewport" className="min-h-screen bg-[#050505] flex flex-col lg:flex-row text-white font-sans overflow-hidden">
      
      {/* Side visual panel (identical styling to login to keep visual consistency) */}
      <div id="register-hero-panel" className="relative lg:w-1/3 flex flex-col justify-between p-8 sm:p-12 bg-gradient-to-br from-[#0A0A0A] to-[#050505] border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden min-h-[360px] lg:min-h-screen">
        
        {/* Subtle background image trace for premium depth */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-luminosity">
          <img
            src={heroImagePath}
            alt="FixIt Service Expert background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#050505]/90"></div>
        </div>

        <div className="z-10">
          {/* Logo & Small Brand */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#050505] stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display">Fixit</span>
          </div>

          {/* Epic Bold Heading */}
          <h1 className="text-[55px] sm:text-[75px] font-black leading-[0.85] tracking-tighter uppercase font-display">
            Join<br/>
            <span className="text-orange-500">FixIt.</span>
          </h1>

          <div className="space-y-4 mt-8 max-w-sm">
            <h3 className="text-sm font-black uppercase tracking-widest font-mono text-zinc-400">Security Gateways:</h3>
            <div className="space-y-4 text-zinc-400 text-xs">
              <div className="flex gap-3">
                <div className="mt-0.5 p-1 bg-orange-500/10 text-orange-500 rounded">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <p className="text-zinc-200 font-bold">Encrypted Credentials</p>
                  <p className="text-zinc-500 mt-0.5">Your personal password and email are protected with industry standards.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 p-1 bg-orange-500/10 text-orange-500 rounded">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <p className="text-zinc-200 font-bold">Fast-Track Verification</p>
                  <p className="text-zinc-500 mt-0.5">Get immediate verification upon submitting registration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 mt-8">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold">
            Database Schema Verified.
          </p>
        </div>

        {/* Huge Ambient Watermark */}
        <div className="absolute bottom-0 right-0 opacity-[0.015] pointer-events-none select-none hidden lg:block">
          <span className="text-[220px] font-black leading-none translate-y-1/4 translate-x-12 font-display">USER</span>
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div id="register-form-panel" className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative overflow-y-auto bg-[#050505]">
        
        <div className="max-w-md w-full mx-auto space-y-6 relative z-10">
          
          {/* Mobile brand and layout headers */}
          <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
            <button
              id="btn-register-back-login"
              onClick={onSwitchView}
              className="group flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-wider font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Login</span>
            </button>
            <span className="text-xs text-zinc-500 font-bold font-mono uppercase">
              REGISTER GATEWAY
            </span>
          </div>

          {error && (
            <div id="register-error-alert" className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300">
              <span className="font-bold uppercase tracking-wider">Alert:</span> {error}
            </div>
          )}

          <div className="space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white uppercase font-display">Create Account</h2>
              <p className="text-xs text-zinc-500 mt-1">
                Fill in your credentials according to the database structure.
              </p>
            </div>

            <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                  <input
                    id="reg-fullname"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all"
                    placeholder="e.g. Sarah Connor"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all"
                    placeholder="sarah.connor@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-black font-mono">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-750 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="btn-register-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black py-4 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Prompt footer */}
          <div className="text-center pt-4">
            <span className="text-xs text-zinc-500">
              Already have an account?{' '}
              <button
                id="btn-register-goto-login"
                onClick={onSwitchView}
                className="text-orange-500 hover:text-orange-400 font-bold transition-colors focus:outline-none"
              >
                Sign In instead
              </button>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
