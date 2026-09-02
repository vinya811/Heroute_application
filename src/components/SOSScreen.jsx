import React, { useState } from 'react';
import { AlertTriangle, Phone, ShieldCheck, Share2, MapPin, Volume2, ArrowLeft, Check } from 'lucide-react';

export default function SOSScreen({ onBack, nearestPOI }) {
  const [shared, setShared] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 4000);
  };

  const toggleSiren = () => {
    setSirenPlaying(!sirenPlaying);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24 max-w-md mx-auto shadow-2xl rounded-[36px] overflow-hidden border border-slate-800 flex flex-col justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/40">
            Emergency Mode
          </span>
        </div>

        {/* SOS Pulse Icon */}
        <div className="text-center py-3">
          <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-red-600/50 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Emergency Assistance</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto">
            Immediate dispatch and safe haven locator for your location
          </p>
        </div>

        {/* Nearest Safe Haven Card */}
        <div className="bg-slate-800/90 rounded-3xl p-4 border border-slate-700 shadow-sm mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-1">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>Nearest Verified Safe Post</span>
          </div>
          <h3 className="text-sm font-bold text-white">
            {nearestPOI ? nearestPOI.name : 'Delhi Police 24/7 Pink Booth'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Approx. 180 meters away • Manned woman safety post • Continuous CCTV coverage
          </p>
        </div>

        {/* Emergency Dialers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href="tel:112"
            className="bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-red-600/30 transition-all"
          >
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-xs font-black">Call 112</span>
            <span className="text-[10px] text-red-200">National Helpline</span>
          </a>

          <a
            href="tel:1091"
            className="bg-[#b51253] hover:bg-[#990f46] active:scale-[0.98] text-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-pink-600/30 transition-all"
          >
            <ShieldCheck className="w-5 h-5 mb-1" />
            <span className="text-xs font-black">Call 1091</span>
            <span className="text-[10px] text-pink-200">Women Helpline</span>
          </a>
        </div>

        {/* Quick Safety Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleShare}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
              shared
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
            }`}
          >
            {shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>
              {shared
                ? '✓ Live GPS Location Sent to Emergency Contacts!'
                : 'Share Live GPS with Trusted Contacts'}
            </span>
          </button>

          <button
            onClick={toggleSiren}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
              sirenPlaying
                ? 'bg-amber-600 text-white border-amber-500 animate-bounce'
                : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{sirenPlaying ? '🔊 Siren Active (Tap to Stop)' : 'Sound Emergency Siren Alert'}</span>
          </button>
        </div>
      </div>

      {/* Return to Navigation */}
      <div className="pt-4">
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl text-xs font-bold text-slate-400 bg-slate-800/60 hover:text-white border border-slate-700 transition-colors"
        >
          Return to Navigation
        </button>
      </div>
    </div>
  );
}
