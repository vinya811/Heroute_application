import React from 'react';
import { Clock, Navigation2, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getScoreBadge } from '../utils/scoringEngine';

export default function RouteComparison({
  routes,
  selectedRouteId,
  onSelectRoute,
  onOpenExplain
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Route Alternatives
          </h2>
          <p className="text-xs text-slate-500">Compare calculated safety awareness vs travel duration</p>
        </div>
        <span className="text-[11px] font-semibold text-heroute-cyan bg-heroute-cyan/10 px-2 py-0.5 rounded-full border border-heroute-cyan/20">
          3 Routes Computed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {routes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          const badge = getScoreBadge(route.score);

          return (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'glass-panel-glow-pink border-heroute-pink'
                  : 'bg-heroute-card hover:bg-heroute-cardHover border border-heroute-border'
              }`}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5 ${
                        route.tag === 'Recommended'
                          ? 'bg-heroute-pink/20 text-heroute-pink border border-heroute-pink/40'
                          : route.tag === 'Fastest'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-heroute-purple/20 text-heroute-purple border border-heroute-purple/40'
                      }`}
                    >
                      {route.tag}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-heroute-pink transition-colors">
                      {route.shortName}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{route.subtitle}</p>
                  </div>

                  {/* Safety Score Circle Badge (Slide 8 & 11) */}
                  <div
                    className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border ${badge.border} ${badge.bg} ${badge.glow}`}
                  >
                    <span className="text-lg font-black tracking-tight text-white leading-none">
                      {route.score}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">
                      / 100
                    </span>
                  </div>
                </div>

                {/* Duration & Distance Row */}
                <div className="flex items-center gap-3 py-2 border-y border-heroute-border/60 text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-heroute-cyan" />
                    <span className="font-bold text-white">{route.durationMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation2 className="w-3.5 h-3.5 text-heroute-pink" />
                    <span>{route.distanceKm} km</span>
                  </div>
                  <span className="text-[10px] text-slate-500 ml-auto">Walking</span>
                </div>

                {/* Safety Highlights List */}
                <div className="mt-3 space-y-1.5">
                  {route.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-heroute-cyan flex-shrink-0" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                  {route.tradeoff && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 pt-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span className="line-clamp-1">{route.tradeoff}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action: Why this route button */}
              <div className="mt-4 pt-3 border-t border-heroute-border/40">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenExplain(route);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-heroute-cyan bg-heroute-cyan/10 hover:bg-heroute-cyan/20 border border-heroute-cyan/30 transition-all hover:shadow-neon-cyan"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why this route?</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
