/**
 * HERoute User Profile & Gamified Safety Points Engine
 */

const INITIAL_PROFILE = {
  name: 'Vinya Sharma',
  email: 'vinya.s@university.edu',
  role: 'Verified Student Traveler',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  safetyPoints: 380,
  tier: 'Gold Safe Explorer',
  appVisits: 14,
  streakDays: 6,
  routesTaken: [
    {
      id: 'rt-101',
      title: 'Central Library → Girls Hostel',
      date: 'Yesterday, 9:30 PM',
      routeChosen: 'Route A (Main Boulevard)',
      score: 86,
      duration: '27 mins',
      pointsEarned: 35,
      mode: 'Walking',
      infrastructureTag: '95% Lit • Police Booth'
    },
    {
      id: 'rt-102',
      title: 'Metro Station Gate 2 → Campus Gate 3',
      date: '31 Aug 2026, 8:15 PM',
      routeChosen: 'Route A (Chhatra Marg)',
      score: 88,
      duration: '22 mins',
      pointsEarned: 40,
      mode: 'Walking',
      infrastructureTag: 'Dedicated Sidewalk'
    },
    {
      id: 'rt-103',
      title: 'Science Complex → Metro Station',
      date: '29 Aug 2026, 7:45 PM',
      routeChosen: 'Route C (Student Union Ring)',
      score: 79,
      duration: '25 mins',
      pointsEarned: 25,
      mode: 'Walking',
      infrastructureTag: 'Active Evening Market'
    }
  ],
  trustedContacts: [
    { id: 'c1', name: 'Mom (Family Circle)', phone: '+91 98765 43210', isDefaultSOS: true },
    { id: 'c2', name: 'Campus Women Security', phone: '011-27667777', isDefaultSOS: true }
  ]
};

const STORAGE_KEY = 'heroute_user_profile';
const AUTH_KEY = 'heroute_auth_status';

export function getUserProfile() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  return INITIAL_PROFILE;
}

export function saveUserProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getAuthStatus() {
  const status = localStorage.getItem(AUTH_KEY);
  return status ? JSON.parse(status) : true; // Default logged in for smooth demo
}

export function setAuthStatus(isLoggedIn) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(isLoggedIn));
}

export function awardSafetyPoints(pointsToAdd, reason = 'Safe travel journey completed') {
  const profile = getUserProfile();
  const updatedPoints = (profile.safetyPoints || 0) + pointsToAdd;
  const updated = {
    ...profile,
    safetyPoints: updatedPoints,
    appVisits: (profile.appVisits || 0) + 1
  };
  saveUserProfile(updated);
  return updated;
}
