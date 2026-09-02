import React from 'react';
import { X, Sparkles, CheckCircle, BrainCircuit } from 'lucide-react';

export default function AIExplanationModal({
  isOpen,
  onClose,
  route,
  alternativeRoute,
  explanation,
  isLoading
}) {
  if (!isOpen || !route) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 border border-slate-200 text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#8432a8] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Why this route is recommended
            </h3>
            <p className="text-[11px] text-slate-500">
              Data-backed safety reasoning
            </p>
          </div>
        </div>

        {/* Target Route vs Alternative summary pill */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 mb-3 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900">{route.shortName}</span>
            <div className="text-[11px] text-slate-500">
              {route.durationMinutes} min • {route.distanceKm} km
            </div>
          </div>
          <div className="bg-pink-50 border border-pink-200 text-[#e01a6b] px-2.5 py-1 rounded-xl text-center">
            <span className="font-black text-sm leading-none block">{route.score}</span>
            <span className="text-[8px] uppercase font-bold">Score</span>
          </div>
        </div>

        {/* AI Rationale Content */}
        <div className="bg-purple-50/60 rounded-2xl p-3.5 border border-purple-100 mb-3">
          <p className="text-xs text-slate-700 leading-relaxed">
            {isLoading ? (
              <span className="text-slate-400 italic">Analyzing safety factors...</span>
            ) : (
              explanation
            )}
          </p>
        </div>

        {/* Key Indicators */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Verified Factors:
          </span>
          {route.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
