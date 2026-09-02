/**
 * Pre-seeded route data and safety points of interest for HERoute demo.
 * Centered around a lively metropolitan university corridor.
 */

export const DEMO_SCENARIOS = [
  {
    id: 'campus-to-metro',
    title: 'University North Campus → Metro Station',
    timeContext: 'Evening (9:30 PM)',
    mode: 'Walking',
    origin: { name: 'Faculty of Arts / College Gate 3', lat: 28.6892, lng: 77.2085 },
    destination: { name: 'Vishwa Vidyalaya Metro Gate 2', lat: 28.6980, lng: 77.2160 },
    defaultPreference: 'safety'
  },
  {
    id: 'library-to-hostel',
    title: 'Central Library → Women\'s Hostel Complex',
    timeContext: 'Late Night (11:00 PM)',
    mode: 'Walking',
    origin: { name: 'Central University Library', lat: 28.6870, lng: 77.2110 },
    destination: { name: 'Sarojini Naidu Girls Hostel', lat: 28.6940, lng: 77.2020 },
    defaultPreference: 'safety'
  }
];

export const SAFETY_POIS = [
  {
    id: 'p1',
    type: 'police',
    name: 'Delhi Police 24/7 Pink Booth',
    lat: 28.6925,
    lng: 77.2118,
    details: 'Manned woman-safety desk, emergency beacon, 24/7 active CCTV surveillance',
    routeAssociations: ['route-a', 'route-c']
  },
  {
    id: 'p2',
    type: 'police',
    name: 'Maurice Nagar Police Station',
    lat: 28.6958,
    lng: 77.2135,
    details: 'Active PCR patrol dispatch post, emergency helpline connection',
    routeAssociations: ['route-a']
  },
  {
    id: 'h1',
    type: 'hospital',
    name: 'WUS University Health Care Centre',
    lat: 28.6912,
    lng: 77.2098,
    details: '24/7 Emergency triage, illuminated security guard post, active pharmacy',
    routeAssociations: ['route-a']
  },
  {
    id: 'h2',
    type: 'hospital',
    name: 'St. Stephen\'s Healthcare Clinic',
    lat: 28.6970,
    lng: 77.2155,
    details: '24-hour illuminated emergency desk',
    routeAssociations: ['route-a', 'route-c']
  },
  {
    id: 's1',
    type: 'safe_haven',
    name: 'All-Night 24/7 Apollo Pharmacy',
    lat: 28.6938,
    lng: 77.2125,
    details: 'Verified Safe-Haven partner: High footfall, CCTV, brightly lit storefront',
    routeAssociations: ['route-a']
  },
  {
    id: 's2',
    type: 'safe_haven',
    name: 'Campus Cafe & 24hr QuickMart',
    lat: 28.6905,
    lng: 77.2130,
    details: 'Verified Safe-Haven: Open till 1:00 AM, security on premises',
    routeAssociations: ['route-c']
  },
  {
    id: 'l1',
    type: 'lighting',
    name: 'LED High-Mast Smart Streetlights',
    lat: 28.6930,
    lng: 77.2120,
    details: 'Continuous high-lux municipal LED coverage with pedestrian pavement',
    routeAssociations: ['route-a']
  }
];

export const INITIAL_ROUTES = [
  {
    id: 'route-a',
    name: 'Route A — Main Boulevard & Metro Corridor',
    shortName: 'Route A',
    subtitle: 'Recommended Safety-Aware Route',
    tag: 'Recommended',
    tagColor: 'heroute-pink',
    durationMinutes: 27,
    distanceKm: 2.1,
    factors: {
      publicFacilities: 90,     // 25% weight
      emergencyServices: 88,    // 20% weight
      pedestrianInfra: 85,      // 20% weight
      transportAccessibility: 82, // 15% weight
      lightingData: 95,         // 10% weight
      travelTimeScore: 70       // 10% weight (takes 6 min longer)
    },
    color: '#00e5ff',           // Vibrant Cyan
    coordinates: [
      [28.6892, 77.2085],
      [28.6898, 77.2098],
      [28.6912, 77.2110],
      [28.6925, 77.2118],
      [28.6938, 77.2125],
      [28.6958, 77.2135],
      [28.6972, 77.2148],
      [28.6980, 77.2160]
    ],
    summary: 'Follows the brightly lit Chhatra Marg avenue past the Police Pink Booth, 24/7 clinic, and continuous CCTV coverage.',
    highlights: [
      '95% continuous smart streetlighting',
      'Passes directly by 24/7 Police Pink Booth',
      'Dedicated elevated pedestrian footpath',
      'High footfall commercial corridor'
    ],
    tradeoff: 'Takes ~6 mins longer than shortcut alley'
  },
  {
    id: 'route-b',
    name: 'Route B — Ridge Back-Lane Shortcut',
    shortName: 'Route B',
    subtitle: 'Fastest Travel Time',
    tag: 'Fastest',
    tagColor: 'amber-400',
    durationMinutes: 21,
    distanceKm: 1.5,
    factors: {
      publicFacilities: 35,
      emergencyServices: 25,
      pedestrianInfra: 40,
      transportAccessibility: 45,
      lightingData: 20,
      travelTimeScore: 98 // Very fast
    },
    color: '#f43f5e', // Rose / Caution Red
    coordinates: [
      [28.6892, 77.2085],
      [28.6908, 77.2090],
      [28.6930, 77.2100],
      [28.6955, 77.2120],
      [28.6970, 77.2142],
      [28.6980, 77.2160]
    ],
    summary: 'Cuts through narrow rear alleyways and the boundary of the forested ridge park. Minimal lighting and isolated stretches.',
    highlights: [
      'Saves 6 minutes of walking time',
      'Few road intersections'
    ],
    tradeoff: 'Dark stretches, no emergency outposts, zero active night shops'
  },
  {
    id: 'route-c',
    name: 'Route C — Student Union Market Promenade',
    shortName: 'Route C',
    subtitle: 'Balanced Alternative',
    tag: 'Balanced',
    tagColor: 'heroute-purple',
    durationMinutes: 25,
    distanceKm: 1.8,
    factors: {
      publicFacilities: 80,
      emergencyServices: 65,
      pedestrianInfra: 75,
      transportAccessibility: 85,
      lightingData: 78,
      travelTimeScore: 82
    },
    color: '#a855f7', // Purple
    coordinates: [
      [28.6892, 77.2085],
      [28.6895, 77.2105],
      [28.6905, 77.2130],
      [28.6935, 77.2145],
      [28.6960, 77.2152],
      [28.6980, 77.2160]
    ],
    summary: 'Winds through the University Student Union market and bus terminal. Moderately lit with active evening commerce.',
    highlights: [
      'Frequent e-rickshaw & bus connectivity',
      'Open cafes & kiosks till 10 PM',
      'Balanced trade-off between time & visibility'
    ],
    tradeoff: 'Crowded at transit crossing, moderate emergency coverage'
  }
];
