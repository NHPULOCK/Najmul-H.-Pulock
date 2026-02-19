
import React, { useState, useEffect, useCallback } from 'react';
import { Journey, RouteLeg, Language, TRANSLATIONS } from './types';
import { findDirectRoute, findTransferRoute } from './services/navigationEngine';
import { geminiService } from './services/geminiService';
import BusMap from './components/BusMap';
import { 
  MapPin, Search, Navigation, Bus, Footprints, Clock, ArrowRight, 
  Info, AlertTriangle, Layers, Globe, DollarSign, MessageSquare, ArrowUpDown, Crosshair
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

  const T = TRANSLATIONS[lang];

  useEffect(() => {
    handleLocateMe(false); // Silent check on load
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
        (err) => {
          console.warn("GPS Access Denied", err);
          setIsLocating(false);
          if (force) alert("Could not access GPS. Please enter location manually.");
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
    // If 'from' is current location, we use a placeholder for search or the nearest stop logic
    // For this prototype, we'll try to find the best route from the text entered
    const searchFrom = (from === "Current Location" || from === "বর্তমান অবস্থান") ? "Farmgate" : from; // Fallback to nearest major hub if current location
    
    if (!searchFrom || !to) return;
    setLoading(true);
    setAiAnalysis(null);

    let result = findDirectRoute(searchFrom, to);
    if (!result) {
      result = findTransferRoute(searchFrom, to);
    }

    if (result) {
      // Create complete door-to-door experience
      const initialWalk: RouteLeg = { 
        type: 'WALK', 
        from: from, 
        to: result.legs[0].from, 
        distance: '650m', 
        time: '8 mins' 
      };
      const finalWalk: RouteLeg = { 
        type: 'WALK', 
        from: result.legs[result.legs.length - 1].to, 
        to: to, 
        distance: '300m', 
        time: '4 mins' 
      };
      
      const fullJourney: Journey = {
        ...result,
        legs: [initialWalk, ...result.legs, finalWalk]
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
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <div className="w-full lg:w-[480px] bg-white shadow-2xl z-10 flex flex-col h-[60vh] lg:h-full overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-indigo-700 text-white shadow-lg shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <Bus className="text-indigo-700" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none">{T.title}</h1>
                <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest mt-1">{T.subtitle}</p>
              </div>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-indigo-400/30"
            >
              <Globe size={14} /> {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>
          
          <div className="relative space-y-2">
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 text-indigo-300 group-focus-within:text-white transition-colors" size={18} />
              <input 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder={T.fromPlaceholder} 
                className="w-full bg-indigo-600/50 border border-indigo-500/50 placeholder-indigo-200 text-white rounded-2xl py-3.5 pl-10 pr-12 focus:ring-2 focus:ring-white outline-none transition-all font-medium"
              />
              <button 
                onClick={() => handleLocateMe()}
                className={`absolute right-3 top-2.5 p-1.5 rounded-lg hover:bg-indigo-500 transition-colors ${isLocating ? 'animate-pulse text-orange-400' : 'text-indigo-200'}`}
                title="Use Current Location"
              >
                <Crosshair size={20} />
              </button>
            </div>

            {/* Swap Button Floating */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
              <button 
                onClick={handleSwap}
                className="bg-white text-indigo-700 p-2 rounded-full shadow-lg border border-indigo-100 hover:scale-110 active:rotate-180 transition-all duration-300"
              >
                <ArrowUpDown size={16} />
              </button>
            </div>

            <div className="relative group">
              <Search className="absolute left-3 top-3.5 text-indigo-300 group-focus-within:text-white transition-colors" size={18} />
              <input 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={T.toPlaceholder} 
                className="w-full bg-indigo-600/50 border border-indigo-500/50 placeholder-indigo-200 text-white rounded-2xl py-3.5 pl-10 pr-4 focus:ring-2 focus:ring-white outline-none transition-all font-medium"
              />
            </div>

            {/* Popular Stop Quick Picks */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1 pb-2">
              {POPULAR_STOPS.map(stop => (
                <button 
                  key={stop}
                  onClick={() => setTo(stop)}
                  className="shrink-0 bg-indigo-800/40 hover:bg-indigo-500/60 border border-indigo-400/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  {stop}
                </button>
              ))}
            </div>

            <button 
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-wider mt-2"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : T.findRoute}
            </button>
          </div>
        </div>

        {/* Scrollable Directions Area */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar bg-slate-50/50">
          {!journey && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center py-10 opacity-60">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                <Navigation size={48} className="text-indigo-200" />
              </div>
              <p className="text-lg font-bold text-slate-500 max-w-[250px] leading-tight">Enter your manual locations or use GPS to start navigating Dhaka.</p>
              <p className="text-xs font-medium text-slate-400 mt-2 italic">Tip: You can swap from/to anytime.</p>
            </div>
          )}

          {journey && (
            <div className="space-y-6 pb-20">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <Clock className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{T.est}</p>
                    <p className="font-bold text-slate-800">{journey.totalTime}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{T.totalFare}</p>
                    <p className="font-bold text-slate-800">৳{journey.totalFare}</p>
                  </div>
                </div>
              </div>

              {/* Step by Step Navigation */}
              <div className="relative pl-2">
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-200 rounded-full" />
                <div className="space-y-10">
                  {journey.legs.map((leg, i) => (
                    <div key={i} className="flex gap-6 relative group">
                      <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${
                        leg.type === 'BUS' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        {leg.type === 'BUS' ? <Bus size={24} /> : <Footprints size={24} />}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                            {T.step} {i+1}: {leg.type === 'BUS' ? T.take : T.walk}
                          </p>
                          {leg.fare && <span className="text-xs font-bold text-slate-400">৳{leg.fare}</span>}
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 mt-1">
                          {leg.from} <ArrowRight size={16} className="text-slate-300" /> {leg.to}
                        </h3>
                        {leg.type === 'BUS' ? (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-black uppercase">{leg.busName}</span>
                            <span className="text-xs font-bold text-slate-500">{leg.stopsCount} {T.stops}</span>
                          </div>
                        ) : (
                          <p className="text-sm font-bold text-slate-500 mt-1 italic">{T.walk} {leg.distance} (~{leg.time})</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemini AI Powered Insights */}
              {aiAnalysis && (
                <div className="bg-indigo-900 text-white p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Info size={100} />
                  </div>
                  <div className="flex items-center gap-2 mb-6 border-b border-indigo-500/30 pb-4">
                    <div className="bg-indigo-500 p-1.5 rounded-lg"><MessageSquare size={16} /></div>
                    <h4 className="font-black uppercase text-xs tracking-[0.2em]">{T.aiInsights}</h4>
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <div>
                      <h5 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-3">{T.landmarks}</h5>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.landmarks.map((l: string, idx: number) => (
                          <span key={idx} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/20 transition-all cursor-default">{l}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/20 p-4 rounded-2xl border border-indigo-500/20">
                      <h5 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertTriangle size={14} /> {T.trafficWatch}
                      </h5>
                      <p className="text-sm text-indigo-100 font-medium leading-relaxed italic">"{aiAnalysis.trafficAdvice}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{T.lastMile}</span>
                      <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">{aiAnalysis.lastMileMode}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative">
        <BusMap journey={journey} userLocation={userLocation} />
        
        {/* Map Control Buttons */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
          <button 
            onClick={() => handleLocateMe()}
            className="p-4 bg-white rounded-2xl shadow-2xl text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all border border-slate-100"
            title="Locate Me"
          >
            <Navigation size={28} />
          </button>
          
          <div className="p-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-100 hidden md:block w-48">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${userLocation ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`} />
                <span className="text-[11px] font-extrabold text-slate-600">{userLocation ? 'GPS Online' : 'Manual Entry'}</span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-6 h-1.5 bg-orange-500 rounded-full" />
                <span className="text-[11px] font-extrabold text-slate-600">Bus Path</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-1.5 bg-emerald-500 rounded-full border-t-2 border-dashed border-emerald-300" />
                <span className="text-[11px] font-extrabold text-slate-600">Walking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
