import React from 'react';
import { 
  LogOut, 
  Award, 
  Clock, 
  Navigation, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import BrandTitle from './BrandTitle';

export default function ProfileScreen({ user, onLogout, onOpenRouteDetail, onOpenAuth }) {
  // Unauthenticated View
  if (!user) {
    return (
      <div className="min-h-screen bg-sparkle-app text-slate-800 p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-4 text-[#b51253] shadow-sm">
          <UserCheck className="w-10 h-10" />
        </div>
        <BrandTitle size="text-2xl" />
        <h2 className="text-base font-bold text-slate-900 mt-2">Sign in to save your history</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium leading-relaxed">
          Access your past safety-verified routes, track HERoute points, and earn safety achievements.
        </p>

        <button
          type="button"
          onClick={onOpenAuth}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#b51253] to-[#8432a8] text-white font-bold text-xs shadow-lg shadow-pink-600/20 hover:brightness-105 active:scale-[0.99] transition-all"
        >
          Sign In or Register
        </button>
      </div>
    );
  }

  // Calculate dynamic rank level based on HERoute Points
  const userPoints = user.points || 0;
  const rankTitle =
    userPoints >= 500
      ? 'Route Guardian'
      : userPoints >= 250
      ? 'Safety Champion'
      : 'Apprentice Scout';

  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 pb-28 max-w-md mx-auto">
      {/* Top Bar Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 px-5 py-3.5 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <BrandTitle size="text-lg" />
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </header>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100/50 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-center gap-4">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">{user.name}</h2>
                <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-[#8432a8] px-2 py-0.5 rounded-md">
                  {rankTitle}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{user.email}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Member since {user.memberSince || '2026'}</p>
            </div>
          </div>

          {/* Points Banner */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-2xl border border-pink-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#b51253]">
                <Sparkles className="w-4 h-4" />
                <span>HERoute Points</span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1 leading-none">{userPoints}</p>
              <p className="text-[10px] text-slate-500 mt-1">
                +10 pts per app launch ({user.loginCount || 1} logins)
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Routes Saved</span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1 leading-none">
                {user.savedRoutes?.length || 0}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Verified safe paths taken</p>
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Safety Badges
            </span>
            <span className="text-[11px] font-bold text-purple-700">
              {user.badges?.length || 0} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {user.badges?.map((badge) => (
              <div
                key={badge.id}
                className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-2.5 text-center flex flex-col items-center justify-between"
              >
                <span className="text-2xl mb-1">{badge.icon}</span>
                <span className="text-[10px] font-bold text-slate-900 line-clamp-1">{badge.title}</span>
                <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">{badge.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Previously Taken Routes Log */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#b51253]" />
              Previously Taken Routes ({user.savedRoutes?.length || 0})
            </span>
          </div>

          {user.savedRoutes && user.savedRoutes.length > 0 ? (
            user.savedRoutes.map((route) => (
              <div
                key={route.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenRouteDetail && onOpenRouteDetail(route)}
                onKeyDown={(e) => e.key === 'Enter' && onOpenRouteDetail && onOpenRouteDetail(route)}
                className="bg-white rounded-3xl p-4 border border-purple-100/70 hover:border-purple-300 shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#b51253]" />
                      <span className="text-xs font-black text-slate-900 line-clamp-1">
                        {route.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {route.shortName}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-xl text-center flex-shrink-0">
                    <span className="text-xs font-black">{route.score}</span>
                    <span className="text-[9px] block font-bold uppercase">Safety</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-[#b51253]" />
                      {route.durationMinutes}m
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Navigation className="w-3.5 h-3.5 text-slate-400" />
                      {route.distanceKm}km
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{route.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 text-slate-400 text-xs font-medium">
              No saved routes yet. Navigate routes to store them in your history!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}