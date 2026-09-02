import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Shield, Cross, Sun, ShoppingBag, MapPin, Eye, EyeOff } from 'lucide-react';

// Dynamic map view recenter hook
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Custom HTML DivIcons for dark theme POIs
function createCustomIcon(type) {
  let iconHtml = '';
  if (type === 'police') {
    iconHtml = `<div style="background:#00e5ff; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #00e5ff; border:2px solid #ffffff;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d0f18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>`;
  } else if (type === 'hospital') {
    iconHtml = `<div style="background:#ff2a85; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #ff2a85; border:2px solid #ffffff;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </div>`;
  } else if (type === 'safe_haven') {
    iconHtml = `<div style="background:#a855f7; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px #a855f7; border:2px solid #ffffff;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </div>`;
  } else if (type === 'lighting') {
    iconHtml = `<div style="background:#fbbf24; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px #fbbf24; border:2px solid #ffffff;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d0f18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    </div>`;
  } else if (type === 'origin') {
    iconHtml = `<div style="background:#10b981; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #10b981; border:2px solid #ffffff; font-weight:800; font-size:11px; color:#fff;">A</div>`;
  } else if (type === 'destination') {
    iconHtml = `<div style="background:#e11d48; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #e11d48; border:2px solid #ffffff; font-weight:800; font-size:11px; color:#fff;">B</div>`;
  }

  return L.divIcon({
    html: iconHtml,
    className: 'custom-poi-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
}

export default function MapView({
  routes,
  selectedRouteId,
  onSelectRoute,
  pois,
  scenario
}) {
  const [filterPOIs, setFilterPOIs] = useState({
    police: true,
    hospital: true,
    safe_haven: true,
    lighting: true
  });

  const center = [
    (scenario.origin.lat + scenario.destination.lat) / 2,
    (scenario.origin.lng + scenario.destination.lng) / 2
  ];

  return (
    <div className="relative w-full h-[460px] lg:h-[580px] rounded-2xl overflow-hidden border border-heroute-border shadow-2xl bg-heroute-card">
      {/* Map Filter Badges Overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap gap-1.5 bg-heroute-bg/85 backdrop-blur-md p-1.5 rounded-xl border border-heroute-border">
        <button
          onClick={() => setFilterPOIs(p => ({ ...p, police: !p.police }))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            filterPOIs.police
              ? 'bg-heroute-cyan/20 text-heroute-cyan border border-heroute-cyan/40'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Shield className="w-3 h-3" /> Police
        </button>

        <button
          onClick={() => setFilterPOIs(p => ({ ...p, hospital: !p.hospital }))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            filterPOIs.hospital
              ? 'bg-heroute-pink/20 text-heroute-pink border border-heroute-pink/40'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Cross className="w-3 h-3" /> Clinics
        </button>

        <button
          onClick={() => setFilterPOIs(p => ({ ...p, safe_haven: !p.safe_haven }))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            filterPOIs.safe_haven
              ? 'bg-heroute-purple/20 text-heroute-purple border border-heroute-purple/40'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <ShoppingBag className="w-3 h-3" /> Safe Havens
        </button>

        <button
          onClick={() => setFilterPOIs(p => ({ ...p, lighting: !p.lighting }))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            filterPOIs.lighting
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Sun className="w-3 h-3" /> Lit Zones
        </button>
      </div>

      {/* Interactive Leaflet Map */}
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={center} zoom={15} />

        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Route Polylines */}
        {routes.map(route => {
          const isSelected = route.id === selectedRouteId;
          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: isSelected ? route.color : '#64748b',
                weight: isSelected ? 7 : 4,
                opacity: isSelected ? 0.95 : 0.45,
                lineCap: 'round',
                lineJoin: 'round',
                dashArray: isSelected ? null : '4, 8'
              }}
              eventHandlers={{
                click: () => onSelectRoute(route.id)
              }}
            >
              <Popup>
                <div className="text-xs p-1">
                  <div className="font-bold text-white mb-1">{route.name}</div>
                  <div className="text-slate-300 mb-1">
                    Safety Score: <span className="font-bold text-heroute-pink">{route.score}/100</span>
                  </div>
                  <div className="text-slate-400">
                    Duration: {route.durationMinutes} min • Distance: {route.distanceKm} km
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Origin Marker */}
        <Marker
          position={[scenario.origin.lat, scenario.origin.lng]}
          icon={createCustomIcon('origin')}
        >
          <Popup>
            <div className="text-xs p-1 font-semibold text-emerald-400">
              Start: {scenario.origin.name}
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker
          position={[scenario.destination.lat, scenario.destination.lng]}
          icon={createCustomIcon('destination')}
        >
          <Popup>
            <div className="text-xs p-1 font-semibold text-rose-400">
              Destination: {scenario.destination.name}
            </div>
          </Popup>
        </Marker>

        {/* Safety POI Markers */}
        {pois
          .filter(poi => filterPOIs[poi.type])
          .map(poi => (
            <Marker
              key={poi.id}
              position={[poi.lat, poi.lng]}
              icon={createCustomIcon(poi.type)}
            >
              <Popup>
                <div className="text-xs max-w-[200px]">
                  <div className="font-bold text-white flex items-center gap-1 mb-1">
                    {poi.name}
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    {poi.details}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Bottom Route Polyline Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] pointer-events-none flex items-center justify-between">
        <div className="pointer-events-auto bg-heroute-bg/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-heroute-border text-[11px] text-slate-300 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-heroute-cyan"></span>
            <span>Route A (Safety-Aware)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-rose-500"></span>
            <span>Route B (Fastest)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-heroute-purple"></span>
            <span>Route C (Balanced)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
