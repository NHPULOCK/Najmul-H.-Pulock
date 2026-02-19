
import { BusRoute, StopCoordinate } from './types';

export const RAW_BUS_DATA = `Bus Name,Route Description,Total Stops,Stop 1 (BN-EN),Stop 2 (BN-EN),Stop 3 (BN-EN),Stop 4 (BN-EN),Stop 5 (BN-EN),Stop 6 (BN-EN),Stop 7 (BN-EN),Stop 8 (BN-EN),Stop 9 (BN-EN),Stop 10 (BN-EN),Stop 11 (BN-EN),Stop 12 (BN-EN),Stop 13 (BN-EN),Stop 14 (BN-EN),Stop 15 (BN-EN),Stop 16 (BN-EN),Stop 17 (BN-EN),Stop 18 (BN-EN),Stop 19 (BN-EN),Stop 20 (BN-EN)
Achim Paribahan,Gabtoli to Demra,20,গাবতলী (Gabtoli),টেকনিক্যাল (Technical),মিরপুর ১ (Mirpur 1),মিরপুর ১০ (Mirpur 10),কালসী (Kalshi),ইসিবি চত্বর (ECB Square),কুড়িল (Kuril),যমুনা ফিউচার পার্ক (JFP),বসুন্ধরা (Bashundhara),নতুন বাজার (Notun Bazar),বাড্ডা (Badda),রামপুরা (Rampura),বনশ্রী (Banasree),স্টাফ কোয়ার্টার (Staff Quarter),,,,
Active Paribahan,Shia Masjid to Abdullahpur,18,শিয়া মসজিদ (Shia Masjid),শ্যামলী (Shyamoli),মিরপুর ১ (Mirpur 1),মিরপুর ১০ (Mirpur 10),কালসী (Kalshi),ইসিবি চত্বর (ECB Square),কুড়িল (Kuril),খিলক্ষেত (Khilkhet),বিমানবন্দর (Airport),উত্তরা (Uttara),আব্দুল্লাহপুর (Abdullahpur),,,,,,
Agradut,Savar to Notun Bazar,17,সাভার (Savar),হেমায়েতপুর (Hemayetpur),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আগারগাঁও (Agargaon),বিজয় সরণি (Bijoy Sarani),মহাখালী (Mohakhali),গুলশান ১ (Gulshan 1),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),,,,,,
Airport Bangabandhu Avenue,Fulbaria to Abdullahpur,19,ফুলবাড়িয়া (Fulbaria),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),বনানী (Banani),কুড়িল (Kuril),খিলক্ষেত (Khilkhet),বিমানবন্দর (Airport),উত্তরা (Uttara),আব্দুল্লাহপুর (Abdullahpur),,,,,,,
Azmeri Glory,Sadarghat to Gazipur,20,সদরঘাট (Sadarghat),গুলিস্তান (Gulistan),পল্টন (Paltan),মগবাজার (Moghbazar),মহাখালী (Mohakhali),বনানী (Banani),বিমানবন্দর (Airport),উত্তরা (Uttara),টঙ্গী (Tongi),গাজীপুর চৌরাস্তা (Gazipur Chourasta),,,,,,,,
Ajmi,Dhamrai to Motijheel,18,ধামরাই (Dhamrai),সাভার (Savar),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),মতিঝিল (Motijheel),,,,,,,
Akash,Kanchpur to Abdullahpur,17,কাঁচপুর (Kanchpur),যাত্রাবাড়ী (Jatrabari),মুগদা (Mugda),খিলগাঁও (Khilgaon),রামপুরা (Rampura),বাড্ডা (Badda),কুড়িল (Kuril),বিমানবন্দর (Airport),আব্দুল্লাহপুর (Abdullahpur),,,,,,
Akik,Ansar Camp to Sayedabad,15,আনসার ক্যাম্প (Ansar Camp),মিরপুর ১ (Mirpur 1),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),সায়েদabad (Sayedabad),,,,,,
Al Makka,Gabtoli to Sadarghat,16,গাবতলী (Gabtoli),টেকনিক্যাল (Technical),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),নিউ মার্কেট (New Market),আজিমপুর (Azimpur),সদরঘাট (Sadarghat),,,,,,
Al Madina Plus One,Narayanganj to Gabtoli,19,নারায়ণগঞ্জ (Narayanganj),চাষাড়া (Chashara),সাইনবোর্ড (Signboard),যাত্রাবাড়ী (Jatrabari),গুলিস্তান (Gulistan),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),শ্যামলী (Shyamoli),গাবতলী (Gabtoli),,,,,,,
Alif (Route 1),Mirpur 1 to Banani,15,মিরপুর ১ (Mirpur 1),মিরপুর ১০ (Mirpur 10),আগারগাঁও (Agargaon),বিজয় সরণি (Bijoy Sarani),জাহাঙ্গীর গেট (Jahangir Gate),মহাখালী (Mohakhali),বনানী (Banani),,,,,,
Anabil Super,Signboard to Gazipur,20,সাইনবোর্ড (Signboard),যাত্রাবাড়ী (Jatrabari),রামপুরা (Rampura),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),কুড়িল (Kuril),বিমানবন্দর (Airport),উত্তরা (Uttara),টঙ্গী (Tongi),গাজীপুর (Gazipur),,,,,,,,
Anik,Azimpur to Tongi,17,আজিমপুর (Azimpur),নিউ মার্কেট (New Market),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),কুড়িল (Kuril),বিমানবন্দর (Airport),টঙ্গী (Tongi),,,,,,
Bahon,Mirpur to Sadarghat,16,মিরপুর (Mirpur),কালশী (Kalshi),কুড়িল (Kuril),বাড্ডা (Badda),রামপুরা (Rampura),মালিবাগ (Malibagh),পল্টন (Paltan),সদরঘাট (Sadarghat),,,,,,
Balaka,Sadarghat to Gazipur,19,সদরঘাট (Sadarghat),গুলিস্তান (Gulistan),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),বনানী (Banani),বিমানবন্দর (Airport),আব্দুল্লাহপুর (Abdullahpur),টঙ্গী (Tongi),গাজীপুর (Gazipur),,,,,,,
Basumati,Gabtoli to Gazipur,18,গাবতলী (Gabtoli),মিরপুর ১০ (Mirpur 10),কালশী (Kalshi),কুড়িল (Kuril),বিমানবন্দর (Airport),উত্তরা (Uttara),টঙ্গী (Tongi),বোর্ড বাজার (Board Bazar),গাজীপুর (Gazipur),,,,,,,
Bikash,Azimpur to Gazipur,20,আজিমপুর (Azimpur),সায়েন্স ল্যাব (Science Lab),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),বনানী (Banani),বিমানবন্দর (Airport),উত্তরা (Uttara),টঙ্গী (Tongi),গাজীপুর (Gazipur),,,,,,,,
Bikolpo,Mirpur 12 to Motijheel,15,মিরপুর ১২ (Mirpur 12),মিরপুর ১০ (Mirpur 10),কাজীপাড়া (Kazipara),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),প্রেসক্লাব (Press Club),মতিঝিল (Motijheel),,,,,,
Borak,Khilgaon to Gabtoli,14,খিলগাঁও (Khilgaon),মালিবাগ (Malibagh),মগবাজার (Moghbazar),কাওরান বাজার (Karwan Bazar),ফার্মগেট (Farmgate),আসাদ গেট (Asad Gate),শ্যামলী (Shyamoli),গাবতলী (Gabtoli),,,,,,
BRTC (AC),Motijheel to Uttara,12,মতিঝিল (Motijheel),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),বনানী (Banani),বিমানবন্দর (Airport),উত্তরা (Uttara),,,,,,
City Link,Chittagong Road to Gulistan,13,চট্টগ্রাম রোড (Chittagong Road),সাইনবোর্ড (Signboard),যাত্রাবাড়ী (Jatrabari),সায়েদাবাদ (Sayedabad),গুলিস্তান (Gulistan),,,,,,
Desh Bangla,Gabtoli to Jatrabari,15,গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),যাত্রাবাড়ী (Jatrabari),,,,,,
Dewan,Azimpur to Gazipur,20,আজিমপুর (Azimpur),নিউ মার্কেট (New Market),শাহবাগ (Shahbagh),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),বনানী (Banani),কুড়িল (Kuril),বিমানবন্দর (Airport),টঙ্গী (Tongi),গাজীপুর (Gazipur),,,,,,,,
Deep (Dipon),Gabtoli to Motijheel,12,গাবতলী (Gabtoli),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),প্রেসক্লাব (Press Club),মতিঝিল (Motijheel),,,,,,
Duronto,Mirpur to Motijheel,14,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),আগারগাঁও (Agargaon),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),পল্টন (Paltan),মতিঝিল (Motijheel),,,,,,
Elite (ETC),Savar to Motijheel,16,সাভার (Savar),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),মতিঝিল (Motijheel),,,,,,
Falgun,Azimpur to Banani,13,আজিমপুর (Azimpur),নিউ মার্কেট (New Market),সায়েন্স ল্যাব (Science Lab),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),বনানী (Banani),,,,,,
Green Dhaka,Mirpur to Nadda,14,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),কালশী (Kalshi),কুড়িল (Kuril),যমুনা ফিউচার পার্ক (JFP),বসুন্ধরা (Bashundhara),নদ্দা (Nadda),,,,,,
Himachol,Mirpur to Gulshan,15,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),আগারগাঁও (Agargaon),মহাখালী (Mohakhali),গুলশান ১ (Gulshan 1),গুলশান ২ (Gulshan 2),,,,,,
Labbaik,Savar to Motijheel,17,সাভার (Savar),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),মতিঝিল (Motijheel),,,,,,
Midline,Mohammadpur to Notun Bazar,16,মোহাম্মদপুর (Mohammadpur),ধানমন্ডি (Dhanmondi),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),মগবাজার (Moghbazar),রামপুরা (Rampura),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),,,,,,
Mirpur Link,Mirpur to Motijheel,15,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),কাজীপাড়া (Kazipara),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),প্রেসক্লাব (Press Club),মতিঝিল (Motijheel),,,,,,
Moitri,Mohammadpur to Sayedabad,14,মোহাম্মদপুর (Mohammadpur),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),যাত্রাবাড়ী (Jatrabari),সায়েদাবাদ (Sayedabad),,,,,,
Nilachal,Gazipur to Sadarghat,20,গাজীপুর (Gazipur),টঙ্গী (Tongi),আব্দুল্লাহপুর (Abdullahpur),বিমানবন্দর (Airport),বনানী (Banani),মহাখালী (Mohakhali),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),সদরঘাট (Sadarghat),,,,,,,,
Nur-E-Makka,Mirpur to Gulistan,14,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),কাজীপাড়া (Kazipara),শেওড়াপাড়া (Shewrapara),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),,,,,,
Projapoti,Mohammadpur to Abdullahpur,18,মোহাম্মদপুর (Mohammadpur),শ্যামলী (Shyamoli),মিরপুর ১ (Mirpur 1),মিরপুর ১০ (Mirpur 10),কালশী (Kalshi),কুড়িল (Kuril),বিমানবন্দর (Airport),আব্দুল্লাহপুর (Abdullahpur),,,,,,,
Raida,Postogola to Diabari,19,পোস্তগোলা (Postogola),যাত্রাবাড়ী (Jatrabari),রামপুরা (Rampura),বাড্ডা (Badda),কুড়িল (Kuril),বিমানবন্দর (Airport),উত্তরা (Uttara),দিয়াবাড়ি (Diabari),,,,,,,
Rajanigandha,Basila to Notun Bazar,16,বসিলা (Basila),মোহাম্মদপুর (Mohammadpur),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),মহাখালী (Mohakhali),গুলশান ১ (Gulshan 1),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),,,,,,
Safety,Mirpur to Sayedabad,15,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),আগারগাঁও (Agargaon),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),সায়েদাবাদ (Sayedabad),,,,,,
Shikor,Mirpur to Jatrabari,16,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),যাত্রাবাড়ী (Jatrabari),,,,,,
Somoy,Gabtoli to Chittagong Road,18,গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),যাত্রাবাড়ী (Jatrabari),চট্টগ্রাম রোড (Chittagong Road),,,,,,,
Suprobhat,Sadarghat to Gazipur,20,সদরঘাট (Sadarghat),গুলিস্তান (Gulistan),রামপুরা (Rampura),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),কুড়িল (Kuril),বিমানবন্দর (Airport),উত্তরা (Uttara),টঙ্গী (Tongi),গাজীপুর (Gazipur),,,,,,,,
Thikana,Savar to Sayedabad,17,সাভার (Savar),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),সায়েদাবাদ (Sayedabad),,,,,,
Trans Silva,Mohammadpur to Sayedabad,15,মোহাম্মদপুর (Mohammadpur),ধানমন্ডি (Dhanmondi),সায়েন্স ল্যাব (Science Lab),শাহবাগ (Shahbagh),গুলিস্তান (Gulistan),যাত্রাবাড়ী (Jatrabari),সায়েদাবাদ (Sayedabad),,,,,,
Turag,Jatrabari to Tongi,18,যাত্রাবাড়ী (Jatrabari),মুগদা (Mugda),খিলগাঁও (Khilgaon),রামপুরা (Rampura),বাড্ডা (Badda),কুড়িল (Kuril),বিমানবন্দর (Airport),টঙ্গী (Tongi),,,,,,,
Victor Classic,Sadarghat to Abdullahpur,19,সদরঘাট (Sadarghat),গুলিস্তান (Gulistan),রামপুরা (Rampura),বাড্ডা (Badda),নতুন বাজার (Notun Bazar),কুড়িল (Kuril),বিমানবন্দর (Airport),উত্তরা (Uttara),আব্দুল্লাহপুর (Abdullahpur),,,,,,,
Welcome,Savar to Motijheel,16,সাভার (Savar),গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),মতিঝিল (Motijheel),,,,,,
Skylark,Mirpur to Motijheel,14,মিরপুর (Mirpur),মিরপুর ১০ (Mirpur 10),কাজীপাড়া (Kazipara),ফার্মগেট (Farmgate),শাহবাগ (Shahbagh),মতিঝিল (Motijheel),,,,,,
Bhuiyan,Narayanganj to Motijheel,12,নারায়ণগঞ্জ (Narayanganj),চাষাড়া (Chashara),সাইনবোর্ড (Signboard),যাত্রাবাড়ী (Jatrabari),মতিঝিল (Motijheel),,,,,,
6 Number,Gabtoli to Sadarghat,15,গাবতলী (Gabtoli),শ্যামলী (Shyamoli),আসাদ গেট (Asad Gate),সায়েন্স ল্যাব (Science Lab),আজিমপুর (Azimpur),সদরঘাট (Sadarghat),,,,,,`;

export const parseBusData = (): BusRoute[] => {
  const lines = RAW_BUS_DATA.trim().split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1);

  return data.map(line => {
    const parts = line.split(',');
    const name = parts[0];
    const description = parts[1];
    const totalStops = parseInt(parts[2]);
    const rawStops = parts.slice(3).filter(s => s && s.trim() !== '');
    
    // Extract English name from "গাবতলী (Gabtoli)"
    const stops = rawStops.map(s => {
      const match = s.match(/\(([^)]+)\)/);
      return match ? match[1].trim() : s.trim();
    });

    return { name, description, totalStops, stops, rawStops };
  });
};

// Simulated Dhaka Stop Coordinates (Approximations for demo)
export const STOP_COORDINATES: Record<string, [number, number]> = {
  "Gabtoli": [23.7845, 90.3392],
  "Technical": [23.7840, 90.3470],
  "Mirpur 1": [23.7949, 90.3524],
  "Mirpur 10": [23.8069, 90.3687],
  "Kalshi": [23.8180, 90.3800],
  "ECB Square": [23.8220, 90.3950],
  "Kuril": [23.8193, 90.4208],
  "JFP": [23.8135, 90.4228],
  "Bashundhara": [23.8191, 90.4300],
  "Notun Bazar": [23.7979, 90.4235],
  "Badda": [23.7850, 90.4250],
  "Rampura": [23.7668, 90.4255],
  "Shahbagh": [23.7380, 90.3950],
  "Farmgate": [23.7561, 90.3891],
  "Motijheel": [23.7330, 90.4170],
  "Uttara": [23.8759, 90.3795],
  "Abdullahpur": [23.8900, 90.4000],
  "Gulistan": [23.7250, 90.4100],
  "Sadarghat": [23.7050, 90.4100],
  "Mohakhali": [23.7777, 90.4000],
  "Airport": [23.8433, 90.3977],
  "Khilkhet": [23.8300, 90.4150],
  "Dhanmondi": [23.7461, 90.3742],
  "Science Lab": [23.7380, 90.3800],
  "New Market": [23.7330, 90.3850],
  "Azimpur": [23.7280, 90.3850],
  "Savara": [23.8583, 90.2667],
  "Banani": [23.7940, 90.4040],
  "Tongi": [23.9000, 90.4000],
  "Gazipur": [23.9900, 90.4200],
  "Jatrabari": [23.7100, 90.4350],
  "Sayedabad": [23.7150, 90.4300],
  "Mohammadpur": [23.7650, 90.3580],
  "Shyamoli": [23.7710, 90.3660],
  "Asad Gate": [23.7590, 90.3760],
  "Bijoy Sarani": [23.7650, 90.3900],
  "Agargaon": [23.7780, 90.3780],
  "Gulshan 1": [23.7800, 90.4150],
  "Gulshan 2": [23.7940, 90.4150]
};

export const getStopCoords = (stopName: string): [number, number] => {
  // Normalize stop name to handle both BN-EN and plain English
  const normalized = stopName.includes('(') ? stopName.match(/\(([^)]+)\)/)?.[1].trim() || stopName : stopName;
  return STOP_COORDINATES[normalized] || [23.7104, 90.4074]; // Default to center Dhaka if not found
};
