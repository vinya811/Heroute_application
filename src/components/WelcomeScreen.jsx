import React from 'react';
import { Store, ShieldAlert, Lightbulb, Bot, ArrowRight } from 'lucide-react';
import BrandTitle from './BrandTitle';

export default function WelcomeScreen({ onGetStarted }) {
  const features = [
    {
      icon: Store,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      title: 'Public places',
      description: 'Shops, cafés and open facilities along the way'
    },
    {
      icon: ShieldAlert,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      title: 'Emergency access',
      description: 'Police posts, clinics and pharmacies nearby'
    },
    {
      icon: Lightbulb,
      iconBg: 'bg-amber-50 text-amber-500 border-amber-100',
      title: 'Lighting & footpaths',
      description: 'Street lighting and pedestrian infrastructure'
    },
    {
      icon: Bot,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      title: 'Explainable score',
      description: 'Every score comes with the reasoning behind it'
    }
  ];

  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Header Card */}
      <div className="pt-4 pb-2 text-center flex flex-col items-center">
        {/* Clean Logo without black corners */}
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg shadow-pink-500/10 mb-4 bg-transparent p-0.5 flex items-center justify-center">
          <img
            src="/heroute-logo.png"
            alt="HERoute"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>

        {/* Casing: HE (black) R (dark pink) oute (black) */}
        <BrandTitle size="text-3xl" />

        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8432a8] mt-2 mb-3">
          BEYOND THE FASTEST ROUTE
        </p>

        <p className="text-xs text-slate-600 leading-relaxed max-w-[320px] px-2 font-medium">
          A safety-aware route advisor for women — compare routes on the context that actually matters, not just minutes saved.
        </p>
      </div>

      {/* Feature Cards List - Solid crisp white for 100% legibility */}
      <div className="space-y-2.5 my-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="bg-white/95 rounded-2xl p-3.5 border border-purple-100/60 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3.5"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${f.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold text-slate-900">{f.title}</h3>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="pb-3 pt-2 text-center space-y-3">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6e2996] via-[#a83279] to-[#b51253] text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-600/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>Get started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-slate-500 font-medium">
          Scores are computed from environmental & safety infrastructure indicators
        </p>
      </div>
    </div>
  );
}
