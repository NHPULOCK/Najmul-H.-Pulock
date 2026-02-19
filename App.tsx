
import React, { useState, useEffect } from 'react';
import { Journey, RouteLeg, Language, TRANSLATIONS } from './types';
import { findDirectRoute, findTransferRoute } from './services/navigationEngine';
import { geminiService } from './services/geminiService';
import BusMap from './components/BusMap';
import { 
  MapPin, Search, Navigation, Bus, Footprints, Clock, ArrowRight, 
  Info, AlertTriangle, Layers, Globe, DollarSign, MessageSquare, ArrowUpDown, Crosshair, ChevronUp, ChevronDown
} from 'lucide-react';

const POPULAR_STOPS = ["Farmgate", "Motijheel", "Gabtoli", "Uttara", "Gulistan", "Mirpur 10"];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journey, setJourney] = useState<Journey | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const T = TRANSLATIONS[lang];

  useEffect(() => {
    handleLocateMe(false);
  }, []);

  const handleLocateMe = (force: boolean = true) => {
    if (navigator.geolocation) {
      if (force) setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          if (force) {
            setFrom(lang === 'en' ? "Current Location" : "বর্তমান অবস্থান");
          }
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          if (force) alert("GPS Access Denied.");
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = async () => {
    const searchFrom = (from === "Current Location" || from === "বর্তমান অবস্থান") ? "Farmgate" : from;
    if (!searchFrom || !to) return;
    
    setLoading(true);
    setAiAnalysis(null);
    setIsExpanded(true); // Expand results on mobile

    let result = findDirectRoute(searchFrom, to);
    if (!result) result = findTransferRoute(searchFrom, to);

    if (result) {
      const fullJourney: Journey = {
        ...result,
        legs: [
          { type: 'WALK', from: from, to: result.legs[0].from, distance: '650m', time: '8 mins' },
          ...result.legs,
          { type: 'WALK', from: result.legs[result.legs.length - 1].to, to: to, distance: '300m', time: '4 mins' }
        ]
      };
      setJourney(fullJourney);
      const analysis = await geminiService.analyzeRoute(searchFrom, to);
      setAiAnalysis(analysis);
    } else {
      setJourney(null);
      alert(T.noRoute);
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen w-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* MAP BACKGROUND (Full Screen on Mobile, Right side on Desktop) */}
      <div className="absolute inset-0 lg:left-[420px] z-0">
        <BusMap journey={journey} userLocation={userLocation} />
      </div>

      {/* FLOATING ACTION BUTTONS (Mobile Top/Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-3 lg:hidden">
        <button 
          onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
          className="p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-indigo-700 border border-indigo-100"
        >
          <Globe size={20} />
        </button>
        <button 
          onClick={() => handleLocateMe()}
          className={`p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-indigo-100 ${isLocating ? 'text-orange-500' : 'text-indigo-700'}`}
        >
          <Navigation size={20} />
        </button>
      </div>

      {/* SIDEBAR / BOTTOM SHEET */}
      <div className={`
        absolute z-30 transition-all duration-500 ease-in-out
        bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-2xl
        
        /* Mobile: Bottom Sheet */
        bottom-0 left-0 w-full rounded-t-[2.5rem] lg:rounded-none
        ${isExpanded ? 'h-[90vh]' : 'h-[320px]'}
        
        /* Desktop: Fixed Sidebar */
        lg:top-0 lg:left-0 lg:h-full lg:w-[420px] lg:rounded-none lg:flex lg:flex-col
      `}>
        
        {/* Mobile Drag Handle */}
        <div 
          className="lg:hidden w-full flex justify-center py-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header Section */}
        <div className="px-6 lg:pt-8 pb-4 bg-white shrink-0">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bus className="text-indigo-600" size={28} />
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">{T.title}</h1>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors"
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

          <div className="space-y-3 relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder={T.fromPlaceholder} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none text-base font-medium"
              />
              <button 
                onClick={() => handleLocateMe()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg"
              >
                <Crosshair size={20} />
              </button>
            </div>

            <button 
              onClick={handleSwap}
              className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-12 lg:relative lg:translate-x-0 lg:my-[-12px] lg:mx-auto z-10 bg-white border border-slate-200 p-2 rounded-full shadow-md text-slate-400 hover:text-indigo-600 lg:block hidden"
            >
              <ArrowUpDown size={16} />
            </button>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={T.toPlaceholder} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none text-base font-medium"
              />
            </div>

            <button 
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-300 text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest mt-2"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : T.findRoute}
            </button>
          </div>
        </div>

        {/* Directions Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-12 lg:pb-8 no-scrollbar bg-white">
          {!journey && !loading && (
            <div className="flex flex-col items-center justify-center pt-8 text-center">
              <div className="flex gap-2 overflow-x-auto w-full no-scrollbar pb-6">
                {POPULAR_STOPS.map(stop => (
                  <button 
                    key={stop}
                    onClick={() => { setTo(stop); setIsExpanded(true); }}
                    className="shrink-0 bg-slate-100 hover:bg-indigo-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors"
                  >
                    {stop}
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Plan your trip</p>
            </div>
          )}

          {journey && (
            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Arrive In</p>
                    <p className="text-lg font-black text-indigo-900">{journey.totalTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{T.totalFare}</p>
                  <p className="text-lg font-black text-indigo-900">৳{journey.totalFare}</p>
                </div>
              </div>

              {/* Legs */}
              <div className="relative pl-2 space-y-10 py-4">
                <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100" />
                {journey.legs.map((leg, i) => (
                  <div key={i} className="flex gap-6 relative group">
                    <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                      leg.type === 'BUS' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                      {leg.type === 'BUS' ? <Bus size={22} /> : <Footprints size={22} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{T.step} {i+1}</span>
                        {leg.fare && <span className="text-xs font-bold text-slate-500">৳{leg.fare}</span>}
                      </div>
                      <h4 className="font-bold text-slate-800 text-base leading-tight">
                        {leg.from} <ArrowRight size={14} className="inline mx-1 text-slate-300" /> {leg.to}
                      </h4>
                      {leg.type === 'BUS' ? (
                        <div className="mt-2 inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
                          <span className="text-[11px] font-black text-indigo-600 uppercase">{leg.busName}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-[11px] font-bold text-slate-500">{leg.stopsCount} {T.stops}</span>
                        </div>
                      ) : (
                        <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-tight">{T.walk} {leg.distance} (~{leg.time})</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insights Card */}
              {aiAnalysis && (
                <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl space-y-6">
                  <div className="flex items-center gap-3 opacity-60">
                    <Info size={16} />
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">{T.aiInsights}</h5>
                  </div>
                  
                  <div>
                    <h6 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">{T.landmarks}</h6>
                    <div className="flex flex-wrap gap-2">
                      {aiAnalysis.landmarks.map((l: string, idx: number) => (
                        <span key={idx} className="bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold">{l}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      <AlertTriangle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{T.trafficWatch}</span>
                    </div>
                    <p className="text-sm text-slate-300 italic font-medium">"{aiAnalysis.trafficAdvice}"</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recommended Transfer</span>
                    <span className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-xs font-black">{aiAnalysis.lastMileMode}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
