import raigadImg from '../assets/images/raigad_fort_ramparts_1793012657930.jpg';
import shivneriImg from '../assets/images/shivneri_fort_gateway_1793012658805.jpg';
import pratapgadImg from '../assets/images/pratapgad_fort_bastion_1793012658993.jpg';
import sinhagadImg from '../assets/images/sinhagad_fort_cliffs_1793012659426.jpg';
import heroImg from '../assets/images/maharashtra_fort_hero_1793012657295.jpg';

export interface FortItem {
  id: string;
  name: string;
  marathiName: string;
  district: string;
  region: string;
  altitudeMeters: number;
  altitudeFeet: number;
  category: 'Hill Fort' | 'Sea Fort' | 'Forest Fort';
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';
  establishedEra: string;
  architecturalStyle: string;
  historicalSignificance: string;
  keyAttractions: string[];
  trekkingDuration: string;
  bestSeason: string;
  unescoStatus: 'UNESCO Tentative List (Maratha Military Landscapes)' | 'State Protected Monument' | 'ASI Protected';
  image: string;
  isFeatured: boolean;
  historySummary: string;
  visitingHours: string;
  entryFee: string;
  localFoodSpecialty: string;
  marathiGreeting: string;
}

export const FORTS_DATA: FortItem[] = [
  {
    id: "raigad",
    name: "Raigad Fort",
    marathiName: "रायगड किल्ला",
    district: "Raigad",
    region: "Konkan / Sahyadri",
    altitudeMeters: 820,
    altitudeFeet: 2700,
    category: "Hill Fort",
    difficulty: "Moderate",
    establishedEra: "Rebuilt & fortified by Chhatrapati Shivaji Maharaj (1674)",
    architecturalStyle: "Maratha Imperial Military & Civic Architecture by Hiroji Indulkar",
    historicalSignificance: "The capital of the Maratha Empire where the Coronation (Rajyabhishek) of Chhatrapati Shivaji Maharaj took place in 1674.",
    keyAttractions: [
      "Maha Darwaja (Grand Gateway with acoustic camouflage)",
      "Rajsabha (Royal Court with acoustic throne area)",
      "Hirkani Buruj (Historic bastion named after milkmaid Hirkani)",
      "Takmak Tok (Precipitous cliff point overlooking the valley)",
      "Samadhi of Chhatrapati Shivaji Maharaj",
      "Jagadishwar Temple and Bazaar Peth"
    ],
    trekkingDuration: "2.5 – 3.5 Hours (or 4-min ropeway)",
    bestSeason: "October to March (Monsoons for lush greenery)",
    unescoStatus: "UNESCO Tentative List (Maratha Military Landscapes)",
    image: raigadImg,
    isFeatured: true,
    historySummary: "Originally called Rairi, Raigad was selected by Shivaji Maharaj due to its impregnable natural defenses, steep basalt scarps on all sides, and central geopolitical location in the Western Ghats. Master architect Hiroji Indulkar crafted the royal courtyards, water harvesting tanks, and royal palace complexes.",
    visitingHours: "06:00 AM – 06:00 PM Daily",
    entryFee: "₹25 (Indian Citizens), ₹300 (Foreign Nationals), Ropeway tickets extra",
    localFoodSpecialty: "Pithla Bhakri with Thecha, Rice Bhakri, and local mountain honey",
    marathiGreeting: "महाराज, राजधानी रायगडावर आपले सहर्ष स्वागत आहे!"
  },
  {
    id: "shivneri",
    name: "Shivneri Fort",
    marathiName: "शिवनेरी किल्ला",
    district: "Pune (Junnar)",
    region: "Western Maharashtra",
    altitudeMeters: 1040,
    altitudeFeet: 3410,
    category: "Hill Fort",
    difficulty: "Easy",
    establishedEra: "Yadava Dynasty roots (Fortified 16th–17th Century)",
    architecturalStyle: "Multi-layered Gate Defense (7 Consecutive Maha-Darwajas)",
    historicalSignificance: "The revered birthplace of Chhatrapati Shivaji Maharaj (19 February 1630). Jijabai spent her pregnancy here praying to Goddess Shivai.",
    keyAttractions: [
      "Seven Grand Sequential Gateways (Maha Darwaja, Pir Darwaja, etc.)",
      "Birthplace Palace Memorial (Shivkunj)",
      "Shivai Devi Ancient Rock-cut Temple",
      "Badami Talav & Amberkhana (Granary)",
      "Kadelot Point (steep northern cliff drop)"
    ],
    trekkingDuration: "1.5 – 2 Hours (well-carved stone steps)",
    bestSeason: "July to February",
    unescoStatus: "UNESCO Tentative List (Maratha Military Landscapes)",
    image: shivneriImg,
    isFeatured: true,
    historySummary: "Standing guarding the ancient trading route of Naneghat, Shivneri has a unique triangle-shaped hill with sheer vertical drops on three sides. It houses ancient Buddhist caves and 7 fortified security gates designed to withstand prolonged artillery sieges.",
    visitingHours: "05:30 AM – 06:30 PM Daily",
    entryFee: "₹20 (ASI Entry)",
    localFoodSpecialty: "Junnar traditional Jowar Bhakri, Shengdana Chutney, and fresh sugarcane juice",
    marathiGreeting: "छत्रपती शिवरायांच्या पावन जन्मभूमीत आपले स्वागत आहे!"
  },
  {
    id: "pratapgad",
    name: "Pratapgad Fort",
    marathiName: "प्रतापगड किल्ला",
    district: "Satara (Mahabaleshwar)",
    region: "Sahyadri / Western Ghats",
    altitudeMeters: 1080,
    altitudeFeet: 3540,
    category: "Hill Fort",
    difficulty: "Moderate",
    establishedEra: "Commissioned by Shivaji Maharaj in 1656; built by Moropant Trimbak Pingle",
    architecturalStyle: "Double Rampart Concentric Hilltop Fortress",
    historicalSignificance: "Site of the historic Battle of Pratapgad (1659) where Shivaji Maharaj defeated Bijapur general Afzal Khan through strategic guile.",
    keyAttractions: [
      "Bhavani Mata Temple with sacred stone brought from Nepal",
      "Afzal Khan Tomb at the base of the fort",
      "Lower and Upper Fort (Bale Killa) defense networks",
      "Equestrian Statue of Chhatrapati Shivaji Maharaj (unveiled in 1957)",
      "Redoubt Bastions overlooking the dense Jawali valley"
    ],
    trekkingDuration: "1.5 Hours from vehicle parking base",
    bestSeason: "September to April",
    unescoStatus: "State Protected Monument",
    image: pratapgadImg,
    isFeatured: true,
    historySummary: "Built to command the trade pass between the Deccan plateau and Konkan through the dense Jawali forest. The fort stands divided into the upper fort perched on the crest and the lower fort on the south-east ridge.",
    visitingHours: "06:00 AM – 06:00 PM Daily",
    entryFee: "Free public access (Parking fee nominal)",
    localFoodSpecialty: "Mahabaleshwar fresh strawberry crush and Maharashtrian Zunka Bhakri",
    marathiGreeting: "ऐतिहासिक पराक्रमाचे साक्षीदार प्रतापगडावर आपले स्वागत आहे!"
  },
  {
    id: "sinhagad",
    name: "Sinhagad Fort",
    marathiName: "सिंहगड किल्ला",
    district: "Pune (Haveli)",
    region: "Sahyadri / Pune Highlands",
    altitudeMeters: 1312,
    altitudeFeet: 4304,
    category: "Hill Fort",
    difficulty: "Moderate",
    establishedEra: "Pre-14th Century (Kaundinya Rishi ashram era; reconstructed 1670)",
    architecturalStyle: "Natural Basalt Cliff Edge Ramparts & Blind Corner Bastions",
    historicalSignificance: "Site of the daring 1670 assault by Subedar Tanaji Malusare, who scaled the sheer Dona Giri cliff using a monitor lizard (Ghorpad). Shivaji Maharaj remarked: 'गड आला, पण सिंह गेला' ('The fort is captured, but the lion is lost').",
    keyAttractions: [
      "Tanaji Malusare Memorial and Samadhi",
      "Kalyan Darwaja (Western Gate facing Kalyan village)",
      "Pune Darwaja (North-facing primary gate)",
      "Devtaki (Perennial sweet natural spring water cisterns)",
      "Lokmanya Tilak Summer Bungalow"
    ],
    trekkingDuration: "2 Hours (or shared vehicles via motorable ghat road)",
    bestSeason: "Year-round (Monsoon fog and winter sunrises are famed)",
    unescoStatus: "State Protected Monument",
    image: sinhagadImg,
    isFeatured: true,
    historySummary: "Standing at a vantage overlooking Pune and Khadakwasla Dam, Sinhagad was historically known as Kondhana. Its sheer basalt escarpments and natural springs made it a self-sufficient stronghold in the Sahyadris.",
    visitingHours: "05:00 AM – 07:00 PM Daily",
    entryFee: "₹50 per private vehicle / ₹20 trekking cess",
    localFoodSpecialty: "Hot Kanda Bhajji, Matka Dahi (curd), Pithla Bhakri, and Gaavran Chicken/Usal",
    marathiGreeting: "सिंहगडाच्या वीरभूमीत आपले स्वागत आहे!"
  },
  {
    id: "rajgad",
    name: "Rajgad Fort",
    marathiName: "राजगड किल्ला",
    district: "Pune (Velhe)",
    region: "Sahyadri",
    altitudeMeters: 1376,
    altitudeFeet: 4514,
    category: "Hill Fort",
    difficulty: "Challenging",
    establishedEra: "Capital of the Maratha Empire for over 26 years before Raigad",
    architecturalStyle: "Tri-Machi Plateau Architecture (Padmavati, Sanjivani, Suvela Machi)",
    historicalSignificance: "The King of Forts (दुर्गांचा राजा). Shivaji Maharaj spent maximum years of his life here planning the foundation of Hindavi Swarajya.",
    keyAttractions: [
      "Suvela Machi (Double-walled needle eye rock formation Nedhe)",
      "Sanjivani Machi (3-tiered fortified defensive wall)",
      "Bale Killa (highest citadel peak with panoramic 360-degree view)",
      "Padmavati Temple and Lake",
      "Chor Darwaja and Alu Darwaja"
    ],
    trekkingDuration: "3.5 – 4.5 Hours from Gunjavane base",
    bestSeason: "October to February",
    unescoStatus: "UNESCO Tentative List (Maratha Military Landscapes)",
    image: heroImg,
    isFeatured: false,
    historySummary: "Rajgad stands on a majestic diamond-shaped plateau with three outstretched defensive machis (wings). It witnessed pivotal treaties, royal births, and military summits during the early consolidation of the Maratha state.",
    visitingHours: "Open access (Day trekking advised)",
    entryFee: "Free",
    localFoodSpecialty: "Rural Maharashtrian Pithla, Kharwas, and freshly roasted corn",
    marathiGreeting: "दुर्गांचा राजा राजगडावर आपले मनःपूर्वक स्वागत!"
  },
  {
    id: "sindhudurg",
    name: "Sindhudurg Fort",
    marathiName: "सिंधुदुर्ग किल्ला",
    district: "Sindhudurg (Malvan)",
    region: "Konkan Coast",
    altitudeMeters: 15,
    altitudeFeet: 50,
    category: "Sea Fort",
    difficulty: "Easy",
    establishedEra: "Commissioned by Shivaji Maharaj in 1664; designed by Hiroji Indulkar",
    architecturalStyle: "Marine Stone Masonry with Molten Lead Foundations",
    historicalSignificance: "Flagship naval bastion of the Maratha Navy, built on Kurte island amidst the Arabian Sea to counter foreign naval threats.",
    keyAttractions: [
      "Shivaji Maharaj Foot and Hand Impressions preserved in stone",
      "Chhatrapati Shivaji Maharaj Temple (only active temple idol showing the king without a beard)",
      "Hidden Dungeons and Concealed Sea Gate",
      "Perennial Freshwater Wells on an island encircled by salt sea"
    ],
    trekkingDuration: "15-min ferry ride from Malvan jetty",
    bestSeason: "October to May (closed during peak monsoon sea swells)",
    unescoStatus: "UNESCO Tentative List (Maratha Military Landscapes)",
    image: raigadImg,
    isFeatured: false,
    historySummary: "Over 70,000 kilograms of molten lead was utilized into the stone bedrock foundations. Its colossal curtain walls are 30 feet high and 12 feet thick, stretching over 3 kilometers across the marine perimeter.",
    visitingHours: "08:00 AM – 05:30 PM Daily (subject to sea weather)",
    entryFee: "₹50 (plus ferry ticket ₹100)",
    localFoodSpecialty: "Malvani Solkadhi, Kombdi Vade, and fresh coastal coconut curries",
    marathiGreeting: "मराठा आरमाराच्या अथांग सागरी वैभव सिंधुदुर्गावर स्वागत आहे!"
  },
  {
    id: "murud_janjira",
    name: "Murud-Janjira Fort",
    marathiName: "मुरुड जंजिरा किल्ला",
    district: "Raigad (Murud)",
    region: "Konkan Coast",
    altitudeMeters: 10,
    altitudeFeet: 33,
    category: "Sea Fort",
    difficulty: "Easy",
    establishedEra: "15th Century (Siddis of Janjira stronghold)",
    architecturalStyle: "Oval Island Bastion with 19 Rounded Watchtowers",
    historicalSignificance: "One of India's most famous unconquered sea forts, resisting repeated attacks by the Portuguese, British, and Dutch fleets.",
    keyAttractions: [
      "Kalal Bangadi Third Largest Cannon in India",
      "Twin Freshwater Reservoirs (Chhabir Talav)",
      "Hidden Submerged Escape Tunnels",
      "Palace ruins of the Siddi Nawabs"
    ],
    trekkingDuration: "20-min sailboat ride from Rajapuri jetty",
    bestSeason: "October to May",
    unescoStatus: "State Protected Monument",
    image: shivneriImg,
    isFeatured: false,
    historySummary: "Built on an oval-shaped rock island 500 meters off Murud coast, Janjira possessed formidable artillery defense with hundreds of heavy European bronze cannons and thick granite curved bastions.",
    visitingHours: "07:00 AM – 06:00 PM Daily",
    entryFee: "₹25 (Boat ride extra)",
    localFoodSpecialty: "Konkani Rice Ukadpendi and Malvani Cashew Nut curries",
    marathiGreeting: "अजिंक्य सागरी जंजिरा किल्ल्यावर आपले स्वागत आहे!"
  },
  {
    id: "harishchandragad",
    name: "Harishchandragad Fort",
    marathiName: "हरिश्चंद्रगड",
    district: "Ahmednagar",
    region: "Malshej Ghat / Sahyadri",
    altitudeMeters: 1422,
    altitudeFeet: 4665,
    category: "Hill Fort",
    difficulty: "Strenuous",
    establishedEra: "6th Century Kalachuri dynasty roots; 11th Century Shaivite caves",
    architecturalStyle: "Rock-cut Hemadpanthi Temple Architecture and Natural Overhangs",
    historicalSignificance: "Ancient mountain retreat and fort famed for the semicircular cliff Konkan Kada that produces atmospheric vertical wind vortexes.",
    keyAttractions: [
      "Konkan Kada (Massive concave cliff wall with 2000ft vertical drop)",
      "Harishchandreshwar Temple (11th-century carved monolithic temple)",
      "Kedareshwar Cave with giant Shiva Lingam surrounded by ice-cold water",
      "Taramati Peak (Maharashtra's 6th highest peak)"
    ],
    trekkingDuration: "4 – 6 Hours via Khireshwar or Pachnai route",
    bestSeason: "September to March",
    unescoStatus: "State Protected Monument",
    image: pratapgadImg,
    isFeatured: false,
    historySummary: "Believed to date back to the Puranic period, Harishchandragad is deeply linked to the Nath Pantha ascetics and contains ancient micro-climate ecosystems and Hemadpanthi stone water cisterns.",
    visitingHours: "Open access (Trek permits may apply in monsoons)",
    entryFee: "Free",
    localFoodSpecialty: "Local village style Bajra Bhakri with wild forest greens (Ranbhaji)",
    marathiGreeting: "गूढ आणि विहंगम हरिश्चंद्रगडावर आपले स्वागत!"
  }
];
