import React from 'react';
import { Clock, Navigation, Sparkles, ChevronRight, Repeat, LogIn, LogOut, User } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockRoutes';
import BrandTitle from './BrandTitle';

export default function RoutesScreen({
  routes,
  selectedRouteId,
  onSelectRoute,
  onViewOnMap,
  onOpenExplain,
  activeProfile,
  onSelectProfile,
  currentScenario,
  onSelectScenario,
  // Auth & Profile Props
  user,
  onOpenAuth,
  onLogout
}) {
  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 pb-24 max-w-md mx-auto">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-purple-100/60 px-5 py-3.5 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-white p-0.5">
            <img
              src="/heroute-logo.png"
              alt="HERoute"
              className="w-full h-full object-contain"
            />
          </div>
          <BrandTitle size="text-lg" showSubtitle={true} />
        </div>

        {/* Top Right Corner: Pink Log In button (if logged out) or Red Log Out button (if logged in) */}
        {user ? (
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-full shadow-md shadow-rose-600/20 active:scale-95 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#b51253] to-[#8432a8] hover:brightness-105 px-3 py-1.5 rounded-full shadow-md shadow-pink-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>
        )}
      </header>

      <div className="p-4 space-y-4">
        {/* Spacious Travel Plan Card */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/60 shadow-sm space-y-3">
          {/* Header of Trip Card */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Trip Details
            </span>

            {/* Scenario Switcher dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <Repeat className="w-3.5 h-3.5 text-[#b51253]" />
              <select
                value={currentScenario.id}
                onChange={(e) => {
                  const found = DEMO_SCENARIOS.find((s) => s.id === e.target.value);
                  if (found) onSelectScenario(found);
                }}
                className="bg-purple-50/50 text-slate-900 font-bold text-xs py-1 px-2 rounded-lg border border-purple-200/70 focus:outline-none cursor-pointer"
              >
                {DEMO_SCENARIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline points */}
          <div className="relative pl-6 space-y-3.5">
            {/* Connecting line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-300" />

            {/* Origin Point */}
            <div className="relative">
              <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Starting Point
              </span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {currentScenario.origin.name}
              </p>
            </div>

            {/* Destination Point */}
            <div className="relative">
              <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#b51253] border-2 border-white shadow-sm" />
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Destination
              </span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {currentScenario.destination.name}
              </p>
            </div>
          </div>
        </div>

        {/* Priority Filter Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2 px-1">
            Navigation Priority
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'safety', label: 'Safety-Aware', desc: 'Prioritize lit paths' },
              { id: 'balanced', label: 'Balanced', desc: 'Time & safety' },
              { id: 'fastest', label: 'Fastest', desc: 'Shortest time' }
            ].map((p) => {
              const active = activeProfile === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProfile(p.id)}
                  className={`py-2 px-2 text-center rounded-2xl transition-all ${
                    active
                      ? 'bg-[#b51253] text-white shadow-md shadow-pink-600/20'
                      : 'bg-white text-slate-700 border border-purple-100/80 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className={`text-[9px] mt-0.5 ${active ? 'text-pink-100' : 'text-slate-500'}`}>
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Available Route Cards */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-900">
              Route Alternatives ({routes.length})
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Comparing safety metrics</span>
          </div>

          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            const isHighSafety = route.score >= 80;

            return (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className={`cursor-pointer bg-white rounded-3xl p-4 border transition-all ${
                  isSelected
                    ? 'border-[#b51253] shadow-lg shadow-pink-500/15 ring-1 ring-[#b51253]'
                    : 'border-purple-100/60 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header: Short Name, Tag & Score Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">
                        {route.shortName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          route.tag === 'Recommended'
                            ? 'bg-pink-50 text-[#b51253] border border-pink-200'
                            : route.tag === 'Fastest'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-purple-50 text-purple-600 border border-purple-200'
                        }`}
                      >
                        {route.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-1 font-medium">
                      {route.name}
                    </p>
                  </div>

                  {/* Safety Score Pill */}
                  <div
                    className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl text-center border ${
                      isHighSafety
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}
                  >
                    <span className="text-lg font-black leading-none">
                      {route.score}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-tight">
                      Safety
                    </span>
                  </div>
                </div>

                {/* Duration & Distance Row */}
                <div className="flex items-center gap-4 text-xs text-slate-600 my-3 pt-2.5 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-[#b51253]" />
                    <span>{route.durationMinutes} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Navigation className="w-3.5 h-3.5 text-slate-500" />
                    <span>{route.distanceKm} km</span>
                  </div>
                  <span className="text-slate-500 text-[11px] ml-auto font-medium">Walking</span>
                </div>

                {/* Single Primary Highlight */}
                <p className="text-[11px] text-slate-700 line-clamp-1 mb-3 bg-purple-50/40 p-2 rounded-xl border border-purple-100/50 font-medium">
                  ✓ {route.highlights[0]}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenExplain(route);
                    }}
                    className="py-2.5 px-3 rounded-2xl text-xs font-bold text-[#8432a8] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why this route?</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoute(route.id);
                      onViewOnMap();
                    }}
                    className="py-2.5 px-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#b51253] to-[#8432a8] shadow-md shadow-pink-600/20 hover:brightness-105 transition-all flex items-center justify-center gap-1"
                  >
                    <span>View on Map</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}