
export interface BusRoute {
  name: string;
  description: string;
  totalStops: number;
  stops: string[]; // Standardized English names
  rawStops: string[]; // BN-EN format
}

export interface StopCoordinate {
  name: string;
  lat: number;
  lng: number;
}

export interface RouteLeg {
  type: 'WALK' | 'BUS' | 'RICKSHAW';
  from: string;
  to: string;
  busName?: string;
  distance?: string;
  time?: string;
  stopsCount?: number;
  fare?: number;
}

export interface Journey {
  totalTime: string;
  totalFare: number;
  legs: RouteLeg[];
  transfers: number;
}

export type Language = 'en' | 'bn';

export const TRANSLATIONS = {
  en: {
    title: "Dhaka Patho",
    subtitle: "Bus Route Navigator",
    fromPlaceholder: "From (e.g., Farmgate)",
    toPlaceholder: "To (e.g., Uttara)",
    findRoute: "Find Best Route",
    searching: "Searching...",
    noRoute: "No direct or transfer bus found. Try major stops.",
    step: "Step",
    walk: "Walk",
    take: "Take",
    stops: "stops",
    est: "Est.",
    transfers: "Transfer(s)",
    totalFare: "Total Fare",
    aiInsights: "Dhaka Patho AI Insights",
    landmarks: "Nearby Landmarks",
    trafficWatch: "Traffic Watch",
    lastMile: "Recommended Mode",
    reportIssue: "Report Issue",
    currentLocation: "Current Location",
    destination: "Destination"
  },
  bn: {
    title: "ঢাকা পথ",
    subtitle: "বাস রুট নেভিগেটর",
    fromPlaceholder: "থেকে (যেমন: ফার্মগেট)",
    toPlaceholder: "গন্তব্য (যেমন: উত্তরা)",
    findRoute: "সেরা রুট খুঁজুন",
    searching: "খোঁজা হচ্ছে...",
    noRoute: "কোনো সরাসরি বা ট্রান্সফার বাস পাওয়া যায়নি।",
    step: "ধাপ",
    walk: "হাঁটুন",
    take: "উঠুন",
    stops: "স্টপ",
    est: "আনুমানিক",
    transfers: "পরিবর্তন",
    totalFare: "মোট ভাড়া",
    aiInsights: "ঢাকা পথ এআই ইনসাইট",
    landmarks: "আশেপাশের ল্যান্ডমার্ক",
    trafficWatch: "ট্রাফিক সতর্কতা",
    lastMile: "প্রস্তাবিত বাহন",
    reportIssue: "সমস্যা জানান",
    currentLocation: "বর্তমান অবস্থান",
    destination: "গন্তব্য"
  }
};
