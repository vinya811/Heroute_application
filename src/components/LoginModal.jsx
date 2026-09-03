import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import BrandTitle from './BrandTitle';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) return;

    const userData = {
      name: name || email.split('@')[0],
      email: email
    };

    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)' }}
    >
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-purple-100 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl overflow-hidden bg-purple-50 p-1 border border-purple-100 shadow-sm flex items-center justify-center">
            <img src="/heroute-logo.png" alt="HERoute Logo" className="w-full h-full object-contain" />
          </div>
          <BrandTitle size="text-xl" />
          <p className="text-xs text-slate-500 font-medium mt-1">
            {isSignUp ? 'Join the community for safer navigation' : 'Welcome back! Sign in to view saved routes'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-xl transition-all ${
              !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-xl transition-all ${
              isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#b51253] focus:bg-white transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#b51253] focus:bg-white transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#b51253] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 mt-2 rounded-2xl bg-gradient-to-r from-[#b51253] to-[#8432a8] text-white font-bold text-xs shadow-md shadow-pink-600/20 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50/60 rounded-xl py-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Earn 10 HERoute Points per visit</span>
        </div>
      </div>
    </div>
  );
}