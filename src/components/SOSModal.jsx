import React, { useState } from 'react';
import { X, AlertTriangle, Phone, Share2, MapPin, Volume2, ShieldCheck } from 'lucide-react';

export default function SOSModal({ isOpen, onClose, nearestPOI }) {
  const [alertTriggered, setAlertTriggered] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#140b12] border-2 border-red-500/60 rounded-2xl shadow-2xl shadow-red-500/30 p-6 overflow-hidden">
        {/* Pulsing Alert Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-pink-500 to-red-600 animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/50 animate-bounce">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
              Emergency SOS Mode
            </h3>
            <p className="text-xs text-red-300">
              Immediate safety dispatch & proximity assistance
            </p>
          </div>
        </div>

        {/* Nearest Safe Spot Banner */}
        <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-1">
            <MapPin className="w-4 h-4 text-heroute-pink" />
            <span>Nearest Verified Safe Post</span>
          </div>
          <div className="text-sm font-bold text-white">
            {nearestPOI ? nearestPOI.name : 'Delhi Police 24/7 Pink Booth'}
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Approx. 180 meters away • Illuminated security checkpoint • 24/7 woman officer on duty
          </p>
        </div>

        {/* Quick Emergency Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href="tel:112"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/40 transition-all text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call 112 (Emergency)</span>
          </a>

          <a
            href="tel:1091"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-heroute-pink hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-pink-600/40 transition-all text-center"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Call 1091 (Women)</span>
          </a>
        </div>

        {/* Share Live Location Simulation */}
        <button
          onClick={() => {
            setAlertTriggered(true);
            setTimeout(() => setAlertTriggered(false), 3500);
          }}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
            alertTriggered
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
              : 'bg-heroute-card hover:bg-heroute-cardHover border-heroute-border text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>{alertTriggered ? '✓ Live Location Sent to Emergency Circle!' : 'Share Live GPS with Trusted Circle'}</span>
        </button>

        <div className="mt-4 pt-3 border-t border-red-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
          >
            Cancel / Return to Navigation
          </button>
        </div>
      </div>
    </div>
  );
}
