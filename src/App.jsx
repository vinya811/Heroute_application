import React, { useState, useMemo } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import DashboardScreen from './components/DashboardScreen';
import RoutesScreen from './components/RoutesScreen';
import MapScreen from './components/MapScreen';
import FactorsScreen from './components/FactorsScreen';
import SOSScreen from './components/SOSScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import AIExplanationModal from './components/AIExplanationModal';
import LoginModal from './components/LoginModal';

import { DEMO_SCENARIOS, SAFETY_POIS, INITIAL_ROUTES } from './data/mockRoutes';
import { PREFERENCE_PROFILES, calculateSafetyScore } from './utils/scoringEngine';
import { explainRouteComparison } from './services/geminiExplainer';

export default function App() {
  // Page Navigation State ('welcome' | 'dashboard' | 'routes' | 'map' | 'factors' | 'sos' | 'profile')
  const [currentPage, setCurrentPage] = useState('welcome');

  // Auth & Profile State
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Route & Scenario State
  const [currentScenario, setCurrentScenario] = useState(DEMO_SCENARIOS[0]);
  const [activeProfile, setActiveProfile] = useState('safety');
  const [customWeights, setCustomWeights] = useState(PREFERENCE_PROFILES.safety.weights);
  const [selectedRouteId, setSelectedRouteId] = useState('route-a');

  // AI Explanation Modal State
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [targetExplainRoute, setTargetExplainRoute] = useState(null);
  const [explanationText, setExplanationText] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  // Compute dynamic safety scores based on active profile weights
  const routesWithScores = useMemo(() => {
    return INITIAL_ROUTES.map((route) => {
      const score = calculateSafetyScore(route.factors, customWeights);
      return {
        ...route,
        score
      };
    });
  }, [customWeights]);

  // Handle Login Submission (+10 points added on login)
  const handleLoginSuccess = (userData) => {
    const newUser = {
      ...userData,
      points: (userData.points || 100) + 10,
      safetyBadges: ['Night Walker', 'Verified Explorer', 'Community Guard'],
      savedRoutes: routesWithScores
    };
    setUser(newUser);
    setIsAuthOpen(false);
    setCurrentPage('profile');
  };

  // Handle Logout Trigger
  const handleLogout = () => {
    setUser(null);
    if (currentPage === 'profile') {
      setCurrentPage('routes');
    }
  };

  // Handle Profile Selection (Safety-Aware, Balanced, Fastest)
  const handleSelectProfile = (profileKey) => {
    setActiveProfile(profileKey);
    const profile = PREFERENCE_PROFILES[profileKey];
    if (profile) {
      setCustomWeights(profile.weights);
    }
  };

  // Handle "Why this route?" AI Explanation trigger
  const handleOpenExplain = async (route) => {
    setTargetExplainRoute(route);
    setIsExplainOpen(true);
    setIsExplaining(true);

    const alternative = routesWithScores.find((r) => r.id !== route.id) || routesWithScores[1];
    try {
      const text = await explainRouteComparison(route, alternative, activeProfile);
      setExplanationText(text);
    } catch (err) {
      setExplanationText(
        `${route.shortName} is prioritized because it offers ${route.factors.lightingData}% verified lighting coverage and immediate access to emergency facilities.`
      );
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ede8f5] flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-[#b51253] selection:text-white">
      {/* Smartphone Container */}
      <div className="relative w-full max-w-[430px] my-0 sm:my-3 shadow-[0_25px_60px_-15px_rgba(100,50,150,0.22)] rounded-none sm:rounded-[40px] border-0 sm:border-[6px] border-white/95 bg-sparkle-app overflow-hidden transition-all">
        
        {/* Active Page Views */}
        {currentPage === 'welcome' && (
          <WelcomeScreen onGetStarted={() => setCurrentPage('routes')} />
        )}

        {currentPage === 'dashboard' && (
          <DashboardScreen
            user={user}
            onNavigateToRouteInput={() => setCurrentPage('routes')}
            onNavigateToProfile={() => setCurrentPage('profile')}
            onOpenSOS={() => setCurrentPage('sos')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentPage === 'routes' && (
          <RoutesScreen
            routes={routesWithScores}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            onViewOnMap={() => setCurrentPage('map')}
            onOpenExplain={handleOpenExplain}
            activeProfile={activeProfile}
            onSelectProfile={handleSelectProfile}
            currentScenario={currentScenario}
            onSelectScenario={(s) => {
              setCurrentScenario(s);
              setSelectedRouteId('route-a');
            }}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
            onNavigateToProfile={() => setCurrentPage('profile')}
          />
        )}

        {currentPage === 'map' && (
          <MapScreen
            routes={routesWithScores}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            pois={SAFETY_POIS}
            scenario={currentScenario}
            onOpenSOS={() => setCurrentPage('sos')}
            onBackToRoutes={() => setCurrentPage('routes')}
          />
        )}

        {currentPage === 'factors' && (
          <FactorsScreen
            routes={routesWithScores}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            weights={customWeights}
          />
        )}

        {currentPage === 'sos' && (
          <SOSScreen
            onBack={() => setCurrentPage('routes')}
            nearestPOI={SAFETY_POIS.find((p) => p.type === 'police')}
          />
        )}

        {currentPage === 'profile' && (
          <ProfileScreen
            user={user}
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* Global Mobile Bottom Navigation Bar */}
        {currentPage !== 'welcome' && currentPage !== 'sos' && (
          <BottomNav
            activeTab={currentPage}
            onSelectTab={(tabId) => setCurrentPage(tabId)}
          />
        )}

        {/* AI Explanation Modal */}
        <AIExplanationModal
          isOpen={isExplainOpen}
          onClose={() => setIsExplainOpen(false)}
          route={targetExplainRoute}
          alternativeRoute={routesWithScores.find((r) => r.id !== targetExplainRoute?.id)}
          explanation={explanationText}
          isLoading={isExplaining}
        />

        {/* Global Login / Sign-Up Modal */}
        <LoginModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}