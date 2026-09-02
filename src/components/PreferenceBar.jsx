import React, { useState } from 'react';
import { Shield, Zap, Scale, Sparkles, Clock, Footprints, Moon, Sun, ArrowRight } from 'lucide-react';
import { PREFERENCE_PROFILES } from '../utils/scoringEngine';

export default function PreferenceBar({
  activeProfile,
  onSelectProfile,
  onApplyNaturalLanguage,
  isAnalyzingNLP,
  nlpFeedback
}) {
  const [naturalText, setNaturalText] = useState('');

  const quickPrompts = [
    "“I'll take 5 extra minutes for better infrastructure.”",
    "“Traveling late at night, prioritize streetlights & police posts.”",
    "“Need the fastest route, I am running late.”"
  ];

  const handleSubmitNLP = (e) => {
    e.preventDefault();
    if (naturalText.trim()) {
      onApplyNaturalLanguage(naturalText);
    }
  };

  return (
    <div className="bg-heroute-card border border-heroute-border rounded-2xl p-4 lg:p-5 shadow-xl space-y-4">
      {/* Top Preference Toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation Priority</span>
          <p className="text-xs text-slate-500">Slide 6 & 10: Personalized route preference weighting</p>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1 bg-heroute-bg rounded-xl border border-heroute-border">
          {/* Safety-Aware */}
          <button
            onClick={() => onSelectProfile('safety')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeProfile === 'safety'
                ? 'bg-gradient-to-r from-heroute-pink to-purple-600 text-white shadow-neon-pink'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-heroute-cyan" />
            <span>Safety-Aware</span>
          </button>

          {/* Balanced */}
          <button
            onClick={() => onSelectProfile('balanced')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeProfile === 'balanced'
                ? 'bg-heroute-purple text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Balanced</span>
          </button>

          {/* Fastest */}
          <button
            onClick={() => onSelectProfile('fastest')}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeProfile === 'fastest'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fastest</span>
          </button>
        </div>
      </div>

      {/* AI Natural Language Preference Input (Slide 9 - Role 1) */}
      <div className="pt-2 border-t border-heroute-border/60">
        <form onSubmit={handleSubmitNLP} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Sparkles className="w-4 h-4 text-heroute-cyan absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder="Tell AI: 'I don\'t mind walking 5 mins longer for lit streets & open shops...'"
              className="w-full bg-heroute-bg border border-heroute-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-heroute-cyan focus:ring-1 focus:ring-heroute-cyan transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzingNLP || !naturalText.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-heroute-card hover:bg-heroute-cardHover border border-heroute-cyan/40 text-heroute-cyan hover:shadow-neon-cyan active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isAnalyzingNLP ? 'Analyzing...' : 'Apply Preference'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        {/* NLP interpretation feedback */}
        {nlpFeedback && (
          <div className="mt-2 text-xs text-heroute-cyan bg-heroute-cyan/10 border border-heroute-cyan/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Sparkles className="w-3 h-3 flex-shrink-0" />
            <span>{nlpFeedback}</span>
          </div>
        )}

        {/* Quick prompt pills */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 items-center">
          <span className="text-[10px] uppercase font-bold text-slate-500">Try:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const cleaned = prompt.replace(/[“”]/g, '');
                setNaturalText(cleaned);
                onApplyNaturalLanguage(cleaned);
              }}
              className="text-[11px] text-slate-400 hover:text-heroute-cyan bg-heroute-bg px-2 py-0.5 rounded-md border border-heroute-border hover:border-heroute-cyan/40 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
