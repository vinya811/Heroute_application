import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Footprints,
  Clock,
  Shield,
  Sparkles,
  Layers,
  Phone,
  Share2,
  ChevronUp,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import MapView from './MapView';
import { getScoreBadge } from '../utils/scoringEngine';

export default function MobileAppView({
  routes,
  selectedRouteId,
  onSelectRoute,
  onOpenExplain,
  onOpenSOS,
  pois,
  scenario,
  activeProfile,
  onSelectProfile,
  customWeights
}) {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('routes'); // 'routes' | 'factors' | 'sos'

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];
  const badge = getScoreBadge(activeRoute.score);

  return (
    <div className="relative w-full h-[780px] max-h-[92vh] bg-heroute-bg rounded-[36px] overflow-hidden border-[6px] border-[#1e2238] shadow-2xl shadow-black/80 flex flex-col select-none">
      {/* Smartphone Status Bar */}
      <div className="h-7 bg-heroute-bg/95 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-30 border-b border-heroute-border/40">
        <span>9:41 PM</span>
        {/* Dynamic Island / Speaker cutout */}
        <div className="w-20 h-3.5 bg-[#141726] rounded-full mx-auto" />
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>5G</span>
          <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Floating Search & Location Header (Slide 11 Step 2) */}
      <div className="absolute top-9 left-3 right-3 z-20 space-y-2">
        {/* App Title & Quick Profile Pills */}
        <div className="bg-heroute-card/90 backdrop-blur-md p-2.5 rounded-2xl border border-heroute-border shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src="/heroute-logo.png"
                alt="Logo"
                className="w-6 h-6 rounded-lg object-cover shadow-neon-pink"
              />
              <span className="text-xs font-black text-white">HERoute Navigation</span>
            </div>
            <button
              onClick={onOpenSOS}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600 text-white shadow-md shadow-red-600/40 animate-pulse"
            >
              SOS
            </button>
          </div>

          {/* Location Inputs (From College -> To Home) */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 bg-heroute-bg/80 px-2.5 py-1.5 rounded-lg border border-heroute-border/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-slate-400 text-[10px] font-semibold">From:</span>
              <span className="text-slate-100 font-medium truncate text-[11px]">
                {scenario.origin.name}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-heroute-bg/80 px-2.5 py-1.5 rounded-lg border border-heroute-border/60">
              <span className="w-2 h-2 rounded-full bg-heroute-pink flex-shrink-0" />
              <span className="text-slate-400 text-[10px] font-semibold">To:</span>
              <span className="text-slate-100 font-medium truncate text-[11px]">
                {scenario.destination.name}
              </span>
            </div>
          </div>

          {/* Mode & Preference Quick Chips (Slide 11 Step 3) */}
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-heroute-border/40 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-semibold text-slate-300 bg-heroute-bg px-2 py-0.5 rounded-md border border-heroute-border flex items-center gap-1">
              <Footprints className="w-3 h-3 text-heroute-cyan" /> Walking
            </span>
            <span className="text-[10px] font-semibold text-slate-300 bg-heroute-bg px-2 py-0.5 rounded-md border border-heroute-border flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> Evening
            </span>

            {/* Profile switchers */}
            <button
              onClick={() => onSelectProfile('safety')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                activeProfile === 'safety'
                  ? 'bg-heroute-pink text-white border-heroute-pink shadow-neon-pink'
                  : 'bg-heroute-bg text-slate-400 border-heroute-border'
              }`}
            >
              Safety-Aware
            </button>
            <button
              onClick={() => onSelectProfile('fastest')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                activeProfile === 'fastest'
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'bg-heroute-bg text-slate-400 border-heroute-border'
              }`}
            >
              Fastest
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Background */}
      <div className="flex-1 w-full relative">
        <MapView
          routes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={onSelectRoute}
          pois={pois}
          scenario={scenario}
        />
      </div>

      {/* Mobile Sliding Bottom Sheet (Slide 11 Step 4-8) */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-heroute-card/95 backdrop-blur-xl border-t border-heroute-border/80 rounded-t-[28px] shadow-2xl transition-all duration-300 flex flex-col ${
          sheetExpanded ? 'h-[74%]' : 'h-[270px]'
        }`}
      >
        {/* Drag Handle Bar */}
        <button
          onClick={() => setSheetExpanded(!sheetExpanded)}
          className="w-full pt-2 pb-1.5 flex flex-col items-center justify-center cursor-pointer hover:opacity-80"
        >
          <div className="w-12 h-1 bg-slate-600 rounded-full mb-1" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>{sheetExpanded ? 'Minimize Details' : 'Swipe Up for Factor Analysis'}</span>
            {sheetExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </div>
        </button>

        {/* Horizontal Route Alternative Pills (Slide 11 Step 4) */}
        <div className="px-3 pt-1 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {routes.map((r) => {
            const isSelected = r.id === selectedRouteId;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className={`flex-shrink-0 w-[145px] p-2.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-heroute-bg border-heroute-pink shadow-neon-pink'
                    : 'bg-heroute-bg/60 border-heroute-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-white truncate">{r.shortName}</span>
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      r.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {r.score}
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-heroute-cyan" />
                  <span>{r.durationMinutes} min</span>
                  <span className="text-slate-500">•</span>
                  <span>{r.distanceKm} km</span>
                </div>
                <div className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                  {r.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area (Scrollable when expanded) */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {/* Active Route Hero Summary */}
          <div className="bg-heroute-bg/80 border border-heroute-border rounded-xl p-3 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">{activeRoute.name}</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                {activeRoute.summary}
              </p>
            </div>
            <div
              className={`flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl border ${badge.border} ${badge.bg}`}
            >
              <span className="text-base font-black text-white">{activeRoute.score}</span>
              <span className="text-[8px] uppercase font-bold text-slate-400">Score</span>
            </div>
          </div>

          {/* AI Explain Trigger Button (Slide 11 Step 6) */}
          <button
            onClick={() => onOpenExplain(activeRoute)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-heroute-pink/20 to-purple-600/20 hover:from-heroute-pink/30 hover:to-purple-600/30 border border-heroute-pink/40 text-heroute-pink font-bold text-xs flex items-center justify-center gap-2 shadow-neon-pink transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why is {activeRoute.shortName} recommended?</span>
          </button>

          {/* Expanded Factor Breakdown (Visible when sheet is opened) */}
          {sheetExpanded && (
            <div className="pt-2 space-y-2.5 border-t border-heroute-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Slide 8 Factor Breakdown ({activeRoute.shortName})
              </span>
              <div className="space-y-2 text-xs">
                {/* Public Facilities */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                    <span>Public Facilities (25% wt)</span>
                    <span className="font-bold">{activeRoute.factors.publicFacilities}/100</span>
                  </div>
                  <div className="h-1.5 bg-heroute-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-heroute-pink rounded-full"
                      style={{ width: `${activeRoute.factors.publicFacilities}%` }}
                    />
                  </div>
                </div>

                {/* Emergency Services */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                    <span>Emergency Services (20% wt)</span>
                    <span className="font-bold">{activeRoute.factors.emergencyServices}/100</span>
                  </div>
                  <div className="h-1.5 bg-heroute-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-heroute-cyan rounded-full"
                      style={{ width: `${activeRoute.factors.emergencyServices}%` }}
                    />
                  </div>
                </div>

                {/* Pedestrian Infrastructure */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                    <span>Pedestrian Infra (20% wt)</span>
                    <span className="font-bold">{activeRoute.factors.pedestrianInfra}/100</span>
                  </div>
                  <div className="h-1.5 bg-heroute-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-heroute-purple rounded-full"
                      style={{ width: `${activeRoute.factors.pedestrianInfra}%` }}
                    />
                  </div>
                </div>

                {/* Lighting Data */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                    <span>Lighting Data (10% wt)</span>
                    <span className="font-bold">{activeRoute.factors.lightingData}/100</span>
                  </div>
                  <div className="h-1.5 bg-heroute-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${activeRoute.factors.lightingData}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action: Start Navigation */}
          <button
            onClick={() => alert(`Starting Navigation along ${activeRoute.shortName}... Stay safe!`)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-heroute-pink to-heroute-magenta text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-heroute-pink/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 fill-white" />
            <span>Select & Start {activeRoute.shortName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
