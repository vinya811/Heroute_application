import React, { useState, useMemo } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RoutesScreen from './components/RoutesScreen';
import MapScreen from './components/MapScreen';
import FactorsScreen from './components/FactorsScreen';
import SOSScreen from './components/SOSScreen';
import BottomNav from './components/BottomNav';
import AIExplanationModal from './components/AIExplanationModal';

import { DEMO_SCENARIOS, SAFETY_POIS, INITIAL_ROUTES } from './data/mockRoutes';
import { PREFERENCE_PROFILES, calculateSafetyScore } from './utils/scoringEngine';
import { explainRouteComparison } from './services/geminiExplainer';

export default function App() {
  // Page Navigation State ('welcome' | 'routes' | 'map' | 'factors' | 'sos')
  const [currentPage, setCurrentPage] = useState('welcome');

  // Route & Scenario State
  const [currentScenario, setCurrentScenario] = useState(DEMO_SCENARIOS[0]);
  const [activeProfile, setActiveProfile] = useState('safety');
  const [customWeights, setCustomWeights] = useState(PREFERENCE_PROFILES.safety.weights);
  const [selectedRouteId, setSelectedRouteId] = useState('route-a');

  // AI Explanation Modal State (Active ONLY from Routes Screen)
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

  // Handle Profile Selection (Safety-Aware, Balanced, Fastest)
  const handleSelectProfile = (profileKey) => {
    setActiveProfile(profileKey);
    const profile = PREFERENCE_PROFILES[profileKey];
    if (profile) {
      setCustomWeights(profile.weights);
    }
  };

  // Handle "Why this route?" AI Explanation trigger (ONLY from Routes Screen)
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
      {/* Smartphone Container with Sparkle Colors applied inside the app */}
      <div className="relative w-full max-w-[430px] my-0 sm:my-3 shadow-[0_25px_60px_-15px_rgba(100,50,150,0.22)] rounded-none sm:rounded-[40px] border-0 sm:border-[6px] border-white/95 bg-sparkle-app overflow-hidden transition-all">
        {/* Active Page View */}
        {currentPage === 'welcome' && (
          <WelcomeScreen onGetStarted={() => setCurrentPage('routes')} />
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

        {/* Global Mobile Bottom Navigation Bar (Shown on main app pages) */}
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
      </div>
    </div>
  );
}
