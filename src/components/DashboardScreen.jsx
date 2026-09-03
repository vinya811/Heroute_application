import React from 'react';
import { User, AlertTriangle, MapPin, Navigation, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import BrandTitle from './BrandTitle';

export default function DashboardScreen({
  user = null,
  onNavigateToRouteInput = () => {},
  onNavigateToProfile = () => {},
  onOpenSOS = () => {},
  onOpenAuth = () => {}
}) {
  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 pb-24 max-w-md mx-auto flex flex-col justify-between">
      {/* 1. TOP HEADER WITH PROFILE & SOS BUTTONS */}
      <header className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-purple-100/60 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <BrandTitle size="text-base" />

        <div className="flex items-center gap-2">
          {/* PROFILE OR LOGIN BUTTON */}
          {user ? (
            <button
              onClick={onNavigateToProfile}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-[#b51253] hover:bg-purple-100 border border-purple-200/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              title="View Profile"
            >
              <User className="w-3.5 h-3.5 text-[#b51253]" />
              <span className="max-w-[70px] truncate">{user.name || 'Profile'}</span>
            </button>
          ) : (
            <button
              onClick={onNavigateToProfile || onOpenAuth}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-[#b51253] border border-slate-200/80 active:scale-95 transition-all cursor-pointer"
              title="Profile"
            >
              <User className="w-3.5 h-3.5 text-[#b51253]" />
              <span>Profile</span>
            </button>
          )}

          {/* SOS BUTTON */}
          <button
            onClick={onOpenSOS}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="p-4 space-y-4 flex-1">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#b51253] via-[#a83279] to-[#6e2996] rounded-3xl p-5 text-white shadow-lg shadow-pink-600/20 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-pink-200" />
              Safety-Aware Routing
            </span>
            <h2 className="text-xl font-black mb-1">
              {user ? `Welcome, ${user.name || 'Explorer'}!` : 'Where are you going today?'}
            </h2>
            <p className="text-xs text-pink-100/90 leading-relaxed mb-4">
              Get real-time safety scores, lit-street paths, and verified safe havens.
            </p>

            <button
              onClick={onNavigateToRouteInput}
              type="button"
              className="w-full bg-white text-[#b51253] py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md hover:bg-pink-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4 fill-[#b51253]" />
              <span>Plan Safe Route</span>
            </button>
          </div>
        </div>

        {/* Quick Safety Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-purple-100/80 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/80 text-emerald-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Status</p>
              <p className="text-xs font-black text-slate-800">Protected</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-purple-100/80 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 text-[#b51253] rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Coverage</p>
              <p className="text-xs font-black text-slate-800">Verified POIs</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}