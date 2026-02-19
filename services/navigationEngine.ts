
import { BusRoute, Journey, RouteLeg } from '../types';
import { parseBusData } from '../busData';

const BUS_ROUTES = parseBusData();

const calculateFare = (stops: number): number => {
  const base = 10;
  const perStop = 2.5;
  return Math.max(base, Math.round(base + (stops * perStop)));
};

export const findDirectRoute = (from: string, to: string): Journey | null => {
  for (const bus of BUS_ROUTES) {
    const fromIdx = bus.stops.findIndex(s => s.toLowerCase().includes(from.toLowerCase()));
    const toIdx = bus.stops.findIndex(s => s.toLowerCase().includes(to.toLowerCase()));

    if (fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx) {
      const stopsCount = toIdx - fromIdx;
      const fare = calculateFare(stopsCount);
      return {
        totalTime: `${stopsCount * 8} mins`,
        totalFare: fare,
        transfers: 0,
        legs: [
          { type: 'BUS', from: bus.stops[fromIdx], to: bus.stops[toIdx], busName: bus.name, stopsCount, fare }
        ]
      };
    }
  }
  return null;
};

export const findTransferRoute = (from: string, to: string): Journey | null => {
  for (const bus1 of BUS_ROUTES) {
    const fromIdx = bus1.stops.findIndex(s => s.toLowerCase().includes(from.toLowerCase()));
    if (fromIdx === -1) continue;

    for (let i = fromIdx + 1; i < bus1.stops.length; i++) {
      const intermediateStop = bus1.stops[i];
      
      for (const bus2 of BUS_ROUTES) {
        if (bus2.name === bus1.name) continue;
        
        const intermediateIdx = bus2.stops.findIndex(s => s === intermediateStop);
        const toIdx = bus2.stops.findIndex(s => s.toLowerCase().includes(to.toLowerCase()));

        if (intermediateIdx !== -1 && toIdx !== -1 && intermediateIdx < toIdx) {
          const stops1 = i - fromIdx;
          const stops2 = toIdx - intermediateIdx;
          const fare1 = calculateFare(stops1);
          const fare2 = calculateFare(stops2);
          
          return {
            totalTime: `${(stops1 + stops2) * 9} mins`,
            totalFare: fare1 + fare2,
            transfers: 1,
            legs: [
              { type: 'BUS', from: bus1.stops[fromIdx], to: intermediateStop, busName: bus1.name, stopsCount: stops1, fare: fare1 },
              { type: 'BUS', from: intermediateStop, to: bus2.stops[toIdx], busName: bus2.name, stopsCount: stops2, fare: fare2 }
            ]
          };
        }
      }
    }
  }
  return null;
};
