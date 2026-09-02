import React from 'react';
import { Building2, ShieldAlert, Footprints, Bus, Sun, Clock, Info } from 'lucide-react';
import { DEFAULT_WEIGHTS } from '../utils/scoringEngine';

export default function FactorBreakdown({ route, weights = DEFAULT_WEIGHTS }) {
  if (!route) return null;

  const factorsConfig = [
    {
      key: 'publicFacilities',
      label: 'Public Facilities',
      weight: weights.publicFacilities,
      icon: Building2,
      score: route.factors.publicFacilities,
      color: 'bg-gradient-to-r from-heroute-pink to-pink-500',
      description: 'Open commercial shops, pharmacies, cafes & high active footfall'
    },
    {
      key: 'emergencyServices',
      label: 'Emergency Services',
      weight: weights.emergencyServices,
      icon: ShieldAlert,
      score: route.factors.emergencyServices,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      description: 'Proximity to 24/7 Police Pink Booths, PCR vans, and clinics'
    },
    {
      key: 'pedestrianInfra',
      label: 'Pedestrian Infrastructure',
      weight: weights.pedestrianInfra,
      icon: Footprints,
      score: route.factors.pedestrianInfra,
      color: 'bg-gradient-to-r from-heroute-pink to-rose-400',
      description: 'Dedicated sidewalks, pedestrian crossings, obstacle-free pavements'
    },
    {
      key: 'transportAccessibility',
      label: 'Transport Accessibility',
      weight: weights.transportAccessibility,
      icon: Bus,
      score: route.factors.transportAccessibility,
      color: 'bg-gradient-to-r from-indigo-500 to-heroute-cyan',
      description: 'Metro stations, frequent bus stands, active e-rickshaw stands'
    },
    {
      key: 'lightingData',
      label: 'Lighting Data',
      weight: weights.lightingData,
      icon: Sun,
      score: route.factors.lightingData,
      color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      description: 'Continuous municipal LED lux levels & functional streetlamps'
    },
    {
      key: 'travelTimeScore',
      label: 'Travel Time Score',
      weight: weights.travelTime,
      icon: Clock,
      score: route.factors.travelTimeScore,
      color: 'bg-gradient-to-r from-heroute-cyan to-teal-400',
      description: 'Travel efficiency and route directness'
    }
  ];

  return (
    <div className="bg-heroute-card border border-heroute-border rounded-2xl p-4 lg:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-heroute-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Slide 8: Safety-Awareness Factor Breakdown
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 bg-heroute-bg px-2 py-0.5 rounded border border-heroute-border">
              {route.shortName}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Formula: <code className="text-heroute-pink font-mono">Overall Score = Σ(Factor Score × Weight)</code>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-heroute-bg px-3 py-1.5 rounded-xl border border-heroute-border text-xs">
          <span className="text-slate-400">Total Score:</span>
          <span className="font-extrabold text-heroute-cyan text-base">{route.score}</span>
          <span className="text-slate-500">/ 100</span>
        </div>
      </div>

      {/* Factor Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {factorsConfig.map((factor) => {
          const Icon = factor.icon;
          const weightedContrib = ((factor.score * factor.weight)).toFixed(1);
          const weightPercent = Math.round(factor.weight * 100);

          return (
            <div
              key={factor.key}
              className="bg-heroute-bg/60 rounded-xl p-3 border border-heroute-border/50 hover:border-heroute-border transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-heroute-card border border-heroute-border text-slate-300">
                    <Icon className="w-3.5 h-3.5 text-heroute-cyan" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {factor.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({weightPercent}% wt)
                  </span>
                  <span className="font-bold text-white">
                    {factor.score}<span className="text-slate-500 text-[10px]">/100</span>
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-heroute-card h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${factor.color}`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                <span className="truncate max-w-[200px]">{factor.description}</span>
                <span className="text-heroute-pink font-semibold">+{weightedContrib} pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice Footer (Slide 3 & 15) */}
      <div className="bg-heroute-bg/80 border border-heroute-border/70 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-heroute-cyan flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Important System Policy:</strong> HERoute does <span className="text-heroute-pink font-semibold">NOT</span> claim to predict whether an individual will be safe — it serves as a data-based environmental awareness tool to support informed route decisions.
        </p>
      </div>
    </div>
  );
}
