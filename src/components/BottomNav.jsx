import React from 'react';
import { Compass, Map, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'routes', label: 'Routes', icon: Compass },
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'factors', label: 'Safety', icon: ShieldCheck },
    { id: 'sos', label: 'SOS', icon: AlertTriangle, isAlert: true }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-2.5 px-4 shadow-xl max-w-md mx-auto rounded-b-[36px]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isAlert) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all ${
                  isActive
                    ? 'text-red-600 font-bold'
                    : 'text-slate-400 hover:text-red-500'
                }`}
              >
                <div className={`p-1.5 rounded-full transition-transform ${isActive ? 'bg-red-600 text-white shadow-md shadow-red-600/30 scale-105' : 'bg-red-50 text-red-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black">SOS</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all ${
                isActive
                  ? 'text-[#b51253] font-black'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#b51253]' : ''}`} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
