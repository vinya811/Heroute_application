import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Clock, Navigation, AlertTriangle, ArrowLeft, Shield, MapPin, RotateCcw } from 'lucide-react';
import BrandTitle from './BrandTitle';

// Dynamic map view recenter hook
function RecenterMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Interactive Map Reset Control Button inside Leaflet
function MapResetControl({ center, initialZoom, onResetFilter }) {
  const map = useMap();

  const handleReset = (e) => {
    e.stopPropagation();
    map.flyTo(center, initialZoom, {
      animate: true,
      duration: 0.8
    });
    if (onResetFilter) {
      onResetFilter();
    }
  };

  return (
    <div
      className="absolute top-3 right-3 z-[400]"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleReset}
        title="Reset map to initial view"
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-md text-slate-700 hover:text-[#b51253] text-[11px] font-bold rounded-xl shadow-md border border-slate-200 transition-all hover:bg-slate-50 active:scale-95 group cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#b51253] group-hover:-rotate-45 transition-transform duration-200" />
        <span>Reset View</span>
      </button>
    </div>
  );
}

// Clean HTML DivIcons for POIs
function createIcon(type) {
  let bg = '#3b82f6';
  let text = '📍';
  if (type === 'police') {
    bg = '#0284c7';
    text = '👮‍♀️';
  } else if (type === 'hospital') {
    bg = '#b51253';
    text = '🏥';
  } else if (type === 'safe_haven') {
    bg = '#8432a8';
    text = '🏪';
  } else if (type === 'lighting') {
    bg = '#f59e0b';
    text = '💡';
  } else if (type === 'origin') {
    bg = '#10b981';
    text = 'A';
  } else if (type === 'destination') {
    bg = '#b51253';
    text = 'B';
  }

  const isLetter = type === 'origin' || type === 'destination';

  return L.divIcon({
    html: `<div style="background:${bg}; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #ffffff; box-shadow:0 3px 10px rgba(0,0,0,0.25); font-size:${isLetter ? '12px' : '14px'}; font-weight:800; color:#ffffff;">
      ${text}
    </div>`,
    className: 'custom-map-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
}

export default function MapScreen({
  routes,
  selectedRouteId,
  onSelectRoute,
  pois,
  scenario,
  onOpenSOS,
  onBackToRoutes
}) {
  const [filterType, setFilterType] = useState('all');

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];
  const center = [
    (scenario.origin.lat + scenario.destination.lat) / 2,
    (scenario.origin.lng + scenario.destination.lng) / 2
  ];
  const initialZoom = 15;

  const filteredPOIs = filterType === 'all'
    ? pois
    : pois.filter((p) => p.type === filterType);

  return (
    <div className="min-h-screen bg-sparkle-app text-slate-800 pb-24 max-w-md mx-auto flex flex-col">
      {/* 1. TOP HEADER */}
      <header className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-purple-100/60 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToRoutes}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Back to Route Selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <BrandTitle size="text-base" />
        </div>

        <button
          onClick={onOpenSOS}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SOS</span>
        </button>
      </header>

      {/* 2. ROUTE ALTERNATIVE SELECTOR BAR */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-purple-100/60">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
            Route Alternatives
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Tap to view on map
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {routes.map((r) => {
            const isSelected = r.id === selectedRouteId;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className={`py-2 px-2.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#b51253] text-white border-[#b51253] shadow-md shadow-pink-600/20'
                    : 'bg-white text-slate-700 border-purple-100/80 hover:bg-purple-50/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold truncate">{r.shortName}</span>
                  <span className={`text-[10px] font-black px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'text-[#b51253]'}`}>
                    {r.score}
                  </span>
                </div>
                <div className={`text-[10px] font-medium ${isSelected ? 'text-pink-100' : 'text-slate-500'}`}>
                  {r.durationMinutes} mins
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE MAP SECTION WITH "RESET VIEW" BUTTON */}
      <div className="w-full h-[42vh] relative border-b border-slate-200 bg-slate-100">
        <MapContainer
          center={center}
          zoom={initialZoom}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          boxZoom={true}
          keyboard={true}
          className="w-full h-full"
        >
          <RecenterMap center={center} zoom={initialZoom} />

          {/* Reset View Button in the corner of the map */}
          <MapResetControl
            center={center}
            initialZoom={initialZoom}
            onResetFilter={() => setFilterType('all')}
          />

          {/* Standard OpenStreetMap Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            subdomains={['a', 'b', 'c']}
            maxZoom={19}
          />

          {/* Route Polylines */}
          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                pathOptions={{
                  color: isSelected ? '#b51253' : '#94a3b8',
                  weight: isSelected ? 7 : 3.5,
                  opacity: isSelected ? 0.95 : 0.45,
                  lineCap: 'round',
                  lineJoin: 'round',
                  dashArray: isSelected ? null : '6, 8'
                }}
                eventHandlers={{
                  click: () => onSelectRoute(route.id)
                }}
              >
                <Popup>
                  <div className="text-xs p-1">
                    <strong className="text-slate-900 font-bold">{route.name}</strong>
                    <div className="text-slate-600 mt-1">
                      Safety Score: <strong className="text-[#b51253]">{route.score}/100</strong>
                      <br />
                      Time: {route.durationMinutes} mins ({route.distanceKm} km)
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

          {/* Origin Marker */}
          <Marker
            position={[scenario.origin.lat, scenario.origin.lng]}
            icon={createIcon('origin')}
          >
            <Popup>
              <div className="text-xs font-bold text-emerald-700">
                Start: {scenario.origin.name}
              </div>
            </Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker
            position={[scenario.destination.lat, scenario.destination.lng]}
            icon={createIcon('destination')}
          >
            <Popup>
              <div className="text-xs font-bold text-[#b51253]">
                Destination: {scenario.destination.name}
              </div>
            </Popup>
          </Marker>

          {/* Verified POI Markers */}
          {filteredPOIs.map((poi) => (
            <Marker
              key={poi.id}
              position={[poi.lat, poi.lng]}
              icon={createIcon(poi.type)}
            >
              <Popup>
                <div className="text-xs max-w-[210px] p-0.5">
                  <strong className="text-slate-900 block font-bold mb-0.5">{poi.name}</strong>
                  <p className="text-[11px] text-slate-600 leading-snug">{poi.details}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 4. BOTTOM SECTION */}
      <div className="p-4 space-y-3 bg-white/95 backdrop-blur-md flex-1 flex flex-col justify-between">
        <div>
          {/* POI Place Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-2">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'police', label: '👮‍♀️ Police Booths' },
              { id: 'hospital', label: '🏥 Clinics' },
              { id: 'safe_haven', label: '🏪 Safe Havens' },
              { id: 'lighting', label: '💡 Lit Zones' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setFilterType(chip.id)}
                className={`flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                  filterType === chip.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-purple-50/40 text-slate-700 border-purple-100 hover:bg-purple-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Active Route Summary Card */}
          <div className="bg-purple-50/30 rounded-2xl p-3.5 border border-purple-100/60 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black text-slate-900">{activeRoute.name}</h3>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                {activeRoute.durationMinutes} mins • {activeRoute.distanceKm} km walking
              </p>
            </div>

            <div className="flex-shrink-0 bg-pink-50 border border-pink-200 text-[#b51253] px-3 py-1.5 rounded-xl text-center">
              <span className="text-base font-black leading-none block">{activeRoute.score}</span>
              <span className="text-[9px] uppercase font-bold">Safety</span>
            </div>
          </div>
        </div>

        {/* Start Navigation Action */}
        <button
          onClick={() => alert(`Starting turn-by-turn guidance on ${activeRoute.shortName}... Stay safe!`)}
          className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#b51253] via-[#a83279] to-[#6e2996] shadow-lg shadow-pink-600/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4 fill-white" />
          <span>Start Navigation on {activeRoute.shortName}</span>
        </button>
      </div>
    </div>
  );
}
