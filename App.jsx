import React, { useState, useEffect } from 'react';
import RoutesScreen from './components/RoutesScreen';
import ProfileScreen from './components/ProfileScreen';
import LoginModal from './components/LoginModal';
import { DEFAULT_USER } from './data/mockUserData';
import { Navigation, User, LogIn } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('routes');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('r1');
  const [activeProfile, setActiveProfile] = useState('safety');

  // Load existing session and reward +10 HERoute Points on app access
  useEffect(() => {
    const savedUser = localStorage.getItem('heroute_active_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        const updated = {
          ...parsed,
          loginCount: (parsed.loginCount || 1) + 1,
          points: (parsed.points || 100) + 10
        };
        setCurrentUser(updated);
        localStorage.setItem('heroute_active_user', JSON.stringify(updated));
      } catch (e) {
        console.error('Error parsing session data:', e);
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      name: userData.name,
      email: userData.email,
      loginCount: 1,
      points: 50
    };
    setCurrentUser(newUser);
    localStorage.setItem('heroute_active_user', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('heroute_active_user');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex justify-center items-start">
      <div className="w-full max-w-md min-h-screen bg-sparkle-app relative pb-24 shadow-2xl overflow-x-hidden">
        
        {/* Header Bar with direct Log In handler */}
        <div className="bg-white/90 backdrop-blur-md border-b border-purple-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
          <span className="text-xs font-black text-[#b51253] tracking-wide">HERoute</span>
          
          {currentUser ? (
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-100"
            >
              <User className="w-3.5 h-3.5 text-[#b51253]" />
              <span>{currentUser.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#b51253] to-[#8432a8] px-3 py-1.5 rounded-xl shadow-md shadow-pink-600/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}
        </div>

        {/* Content Views */}
        {activeTab === 'routes' ? (
          <RoutesScreen
            routes={currentUser?.savedRoutes || DEFAULT_USER.savedRoutes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            activeProfile={activeProfile}
            onSelectProfile={setActiveProfile}
            onViewOnMap={() => alert('Map View')}
            onOpenExplain={(route) => alert(`Safety Breakdown: ${route.shortName}`)}
            currentScenario={{
              id: 'sc1',
              origin: { name: 'Connaught Place' },
              destination: { name: 'Mandi House' }
            }}
            onSelectScenario={() => {}}
          />
        ) : (
          <ProfileScreen
            user={currentUser}
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-purple-100/80 px-6 py-2.5 flex items-center justify-around z-40">
          <button
            type="button"
            onClick={() => setActiveTab('routes')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'routes' ? 'text-[#b51253]' : 'text-slate-400'
            }`}
          >
            <Navigation className="w-5 h-5" />
            <span>Routes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === 'profile' ? 'text-[#b51253]' : 'text-slate-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Modal component receiving explicit isOpen state */}
        <LoginModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}