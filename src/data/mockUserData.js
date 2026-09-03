export const DEFAULT_USER = {
  id: 'user_101',
  name: 'Ananya Sharma',
  email: 'ananya@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  loginCount: 14,
  points: 280, // Calculated: visits * 10 + bonus points
  memberSince: 'March 2026',
  badges: [
    { id: 'b1', title: 'Night Owl Navigator', icon: '🌙', desc: 'Used safety routes after 8 PM' },
    { id: 'b2', title: 'Safety Champion', icon: '🛡️', desc: 'Completed 10+ high-safety routes' },
    { id: 'b3', title: 'Route Pioneer', icon: '📍', desc: 'Explored 5 unique neighborhoods' },
  ],
  savedRoutes: [
    {
      id: 'history_1',
      title: 'Connaught Place to Mandi House',
      shortName: 'Well-lit Commercial Avenue',
      score: 92,
      durationMinutes: 18,
      distanceKm: 1.8,
      date: 'Yesterday, 8:30 PM',
      tag: 'Recommended'
    },
    {
      id: 'history_2',
      title: 'Hauz Khas Village to Metro Station',
      shortName: 'Pedestrian Walkway',
      score: 85,
      durationMinutes: 12,
      distanceKm: 0.9,
      date: '2 Sep 2026',
      tag: 'Fastest'
    },
    {
      id: 'history_3',
      title: 'Saket Select Citywalk to Malviya Nagar',
      shortName: 'Main Road via CCTV Corridor',
      score: 89,
      durationMinutes: 22,
      distanceKm: 2.1,
      date: '28 Aug 2026',
      tag: 'Recommended'
    }
  ]
};