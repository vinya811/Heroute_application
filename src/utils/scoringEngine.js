/**
 * HERoute Safety-Awareness Scoring Engine
 * Directly implements the multi-factor weighted formula from Slide 8 of HERoute
 *
 * Overall Score = Σ (Factor Score × Weight)
 */

export const DEFAULT_WEIGHTS = {
  // PPT Standard Weights
  publicFacilities: 0.25,      // 25%
  emergencyServices: 0.20,     // 20%
  pedestrianInfra: 0.20,       // 20%
  transportAccessibility: 0.15,// 15%
  lightingData: 0.10,          // 10%
  travelTime: 0.10             // 10%
};

export const PREFERENCE_PROFILES = {
  safety: {
    name: 'Safety-Aware',
    description: 'Prioritizes well-lit, populated roads with emergency access over speed',
    weights: {
      publicFacilities: 0.25,
      emergencyServices: 0.20,
      pedestrianInfra: 0.20,
      transportAccessibility: 0.15,
      lightingData: 0.10,
      travelTime: 0.10
    }
  },
  balanced: {
    name: 'Balanced',
    description: 'Finds an optimal trade-off between travel speed and infrastructure coverage',
    weights: {
      publicFacilities: 0.20,
      emergencyServices: 0.15,
      pedestrianInfra: 0.15,
      transportAccessibility: 0.15,
      lightingData: 0.15,
      travelTime: 0.20
    }
  },
  fastest: {
    name: 'Fastest Route',
    description: 'Minimizes travel time above all else, conventional navigation style',
    weights: {
      publicFacilities: 0.10,
      emergencyServices: 0.05,
      pedestrianInfra: 0.10,
      transportAccessibility: 0.10,
      lightingData: 0.05,
      travelTime: 0.60
    }
  }
};

/**
 * Calculates total safety score (0-100) based on raw factor scores and active weights.
 */
export function calculateSafetyScore(factors, customWeights = null) {
  const weights = customWeights || DEFAULT_WEIGHTS;

  const rawScore =
    (factors.publicFacilities || 0) * weights.publicFacilities +
    (factors.emergencyServices || 0) * weights.emergencyServices +
    (factors.pedestrianInfra || 0) * weights.pedestrianInfra +
    (factors.transportAccessibility || 0) * weights.transportAccessibility +
    (factors.lightingData || 0) * weights.lightingData +
    (factors.travelTimeScore || 0) * weights.travelTime;

  return Math.round(Math.min(100, Math.max(0, rawScore)));
}

/**
 * Evaluates safety tier and theme badge
 */
export function getScoreBadge(score) {
  if (score >= 80) {
    return {
      label: 'High Safety-Awareness',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      gradient: 'from-emerald-500 to-teal-400'
    };
  }
  if (score >= 65) {
    return {
      label: 'Moderate Safety-Awareness',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-500/10',
      glow: 'shadow-[0_0_15px_rgba(0,229,255,0.3)]',
      gradient: 'from-cyan-500 to-blue-500'
    };
  }
  return {
    label: 'Caution / Limited Infrastructure',
    color: 'text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-500/10',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    gradient: 'from-rose-500 to-red-600'
  };
}
