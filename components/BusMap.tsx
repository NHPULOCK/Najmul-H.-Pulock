
import React, { useEffect, useRef } from 'react';
// Fix: Import Leaflet to resolve 'L' namespace and name errors
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Journey } from '../types';
import { getStopCoords } from '../busData';

interface BusMapProps {
  journey: Journey | null;
  userLocation: [number, number] | null;
}

const BusMap: React.FC<BusMapProps> = ({ journey, userLocation }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialPos: [number, number] = userLocation || [23.8103, 90.4125];
    mapRef.current = L.map(containerRef.current).setView(initialPos, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();
    const points: L.LatLngExpression[] = [];

    if (userLocation) {
      const userMarker = L.circleMarker(userLocation, {
        radius: 8,
        fillColor: "#3b82f6",
        color: "#fff",
        weight: 2,
        fillOpacity: 0.8
      }).addTo(markersRef.current).bindPopup("Your Location");
      points.push(userLocation);
    }

    if (journey) {
      journey.legs.forEach((leg, idx) => {
        const start = getStopCoords(leg.from);
        const end = getStopCoords(leg.to);

        L.marker(start).addTo(markersRef.current!).bindPopup(`Start: ${leg.from}`);
        L.marker(end).addTo(markersRef.current!).bindPopup(`End: ${leg.to}`);
        
        const color = leg.type === 'BUS' ? '#ef4444' : '#10b981';
        const poly = L.polyline([start, end], { color, weight: 5, dashArray: leg.type === 'WALK' ? '10, 10' : '' })
          .addTo(markersRef.current!)
          .bindPopup(`${leg.type === 'BUS' ? leg.busName : 'Walk'}`);

        points.push(start, end);
      });

      if (points.length > 1) {
        const bounds = L.latLngBounds(points);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [journey, userLocation]);

  return <div ref={containerRef} className="h-full w-full rounded-xl overflow-hidden shadow-inner border border-slate-200" />;
};

export default BusMap;
