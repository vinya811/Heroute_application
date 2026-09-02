import React from 'react';
import { Shield, AlertTriangle, Sparkles, MapPin, Smartphone, Monitor } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockRoutes';

export default function Navbar({
  currentScenario,
  onSelectScenario,
  onOpenSOS,
  onOpenAPIKeyModal,
  hasApiKey,
  isMobileDeviceView,
  onToggleViewMode
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-heroute-border/80 bg-heroute-bg/95 backdrop-blur-md px-3 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Brand Logo with Official PPT Icon */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-heroute-pink/40 shadow-neon-pink flex-shrink-0 bg-heroute-card">
          <img
            src="/heroute-logo.png"
            alt="HERoute Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-black tracking-tight text-white flex items-center">
              HE<span className="text-heroute-pink">Route</span>
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-heroute-pink/20 text-heroute-pink border border-heroute-pink/40 rounded-full">
              Mobile App
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <span className="italic text-heroute-cyan">“Beyond the fastest route.”</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-500 hidden sm:inline">Team TechSphere</span>
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Device View Frame Toggle (for judging demo on desktop) */}
        <button
          onClick={onToggleViewMode}
          title="Toggle Mobile Device Frame"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-heroute-card border border-heroute-border text-slate-300 hover:text-white hover:border-heroute-cyan/40 transition-all"
        >
          {isMobileDeviceView ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-heroute-cyan" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-heroute-pink" />
              <span>Mobile Mockup</span>
            </>
          )}
        </button>

        {/* Scenario Selector */}
        <div className="flex items-center gap-1.5 bg-heroute-card border border-heroute-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-heroute-cyan" />
          <select
            value={currentScenario.id}
            onChange={(e) => {
              const selected = DEMO_SCENARIOS.find((s) => s.id === e.target.value);
              if (selected) onSelectScenario(selected);
            }}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer max-w-[130px] sm:max-w-none text-ellipsis"
          >
            {DEMO_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id} className="bg-heroute-card text-white">
                {scenario.title} ({scenario.timeContext})
              </option>
            ))}
          </select>
        </div>

        {/* Gemini AI Trigger */}
        <button
          onClick={onOpenAPIKeyModal}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            hasApiKey
              ? 'bg-heroute-cyan/10 border-heroute-cyan/40 text-heroute-cyan'
              : 'bg-heroute-card border-heroute-border text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3 h-3 text-heroute-cyan" />
          <span className="hidden sm:inline">{hasApiKey ? 'AI Active' : 'Gemini AI'}</span>
        </button>

        {/* SOS Emergency Trigger */}
        <button
          onClick={onOpenSOS}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-heroute-pink text-white shadow-lg shadow-red-600/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
          <span>SOS</span>
        </button>
      </div>
    </header>
  );
}
