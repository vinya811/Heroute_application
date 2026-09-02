import React from 'react';
import { Store, ShieldAlert, Footprints, Bus, Lightbulb, Clock, Info } from 'lucide-react';
import { DEFAULT_WEIGHTS } from '../utils/scoringEngine';
import BrandTitle from './BrandTitle';

export default function FactorsScreen({
  routes,
  selectedRouteId,
  onSelectRoute,
  weights = DEFAULT_WEIGHTS
}) {
  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const factors = [
    {
      key: 'publicFacilities',
      name: 'Public Places & Facilities',
      weight: 25,
      score: activeRoute.factors.publicFacilities,
      icon: Store,
      iconBg: 'bg-emerald-50 text-emerald-600',
      barColor: 'bg-emerald-500',
      description: 'Open cafes, verified shops, and populated zones'
    },
    {
      key: 'emergencyServices',
      name: 'Emergency Services',
      weight: 20,
      score: activeRoute.factors.emergencyServices,
      icon: ShieldAlert,
      iconBg: 'bg-blue-50 text-blue-600',
      barColor: 'bg-blue-500',
      description: 'Proximity to 24/7 Police Pink Booths and clinics'
    },
    {
      key: 'pedestrianInfra',
      name: 'Pedestrian Walkways',
      weight: 20,
      score: activeRoute.factors.pedestrianInfra,
      icon: Footprints,
      iconBg: 'bg-pink-50 text-[#b51253]',
      barColor: 'bg-[#b51253]',
      description: 'Dedicated sidewalks and pedestrian-friendly paths'
    },
    {
      key: 'transportAccessibility',
      name: 'Public Transport Access',
      weight: 15,
      score: activeRoute.factors.transportAccessibility,
      icon: Bus,
      iconBg: 'bg-purple-50 text-purple-600',
      barColor: 'bg-purple-500',
      description: 'Metro stations, frequent bus stops, and transit points'
    },
    {
      key: 'lightingData',
      name: 'Street Lighting Coverage',
      weight: 10,
      score: activeRoute.factors.lightingData,
      icon: Lightbulb,
      iconBg: 'bg-amber-50 text-amber-500',
      barColor: 'bg-amber-500',
      description: 'Illuminated streetlamps and nighttime visibility'
    },
    {
      key: 'travelTimeScore',
      name: 'Travel Efficiency',
      weight: 10,
      score: activeRoute.factors.travelTimeScore,
      icon: Clock,
      iconBg: 'bg-indigo-50 text-indigo-600',
      barColor: 'bg-indigo-500',
      description: 'Directness and travel time'
    }
  ];

  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 pb-24 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-purple-100/60 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <BrandTitle size="text-lg" />
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
            Safety Factor Breakdown
          </p>
        </div>
        <span className="text-[10px] font-extrabold text-slate-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 shadow-sm">
          6 Indicators
        </span>
      </header>

      <div className="p-4 space-y-4">
        {/* Route Selector Tabs */}
        <div className="flex gap-2 bg-purple-100/40 p-1.5 rounded-2xl border border-purple-200/50">
          {routes.map((r) => {
            const isSelected = r.id === selectedRouteId;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.shortName} ({r.score})
              </button>
            );
          })}
        </div>

        {/* Selected Route Header Card */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100/60 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Evaluated Path
            </span>
            <h2 className="text-sm font-black text-slate-900">{activeRoute.name}</h2>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {activeRoute.durationMinutes} min • {activeRoute.distanceKm} km
            </p>
          </div>

          <div className="bg-pink-50 border border-pink-200 text-[#b51253] px-3.5 py-2 rounded-2xl text-center">
            <span className="text-2xl font-black leading-none block">{activeRoute.score}</span>
            <span className="text-[9px] uppercase font-bold">Safety</span>
          </div>
        </div>

        {/* Factors List */}
        <div className="space-y-2.5">
          {factors.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.key}
                className="bg-white rounded-3xl p-3.5 border border-purple-100/60 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${f.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{f.name}</h3>
                      <span className="text-[10px] text-slate-500 font-medium">Weight: {f.weight}%</span>
                    </div>
                  </div>

                  <span className="text-sm font-black text-slate-900">
                    {f.score}<span className="text-[10px] font-semibold text-slate-400">/100</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${f.barColor}`}
                    style={{ width: `${f.score}%` }}
                  />
                </div>

                <p className="text-[10px] text-slate-600 mt-1.5 leading-tight font-medium">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Notice */}
        <div className="bg-white/90 rounded-2xl p-3 border border-purple-100/70 flex items-start gap-2 text-[11px] text-slate-600 shadow-sm">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            HERoute provides a data-based awareness tool using environmental indicators to help women make informed route choices.
          </p>
        </div>
      </div>
    </div>
  );
}
