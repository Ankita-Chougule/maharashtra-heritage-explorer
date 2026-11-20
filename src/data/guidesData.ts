export interface LocalGuide {
  id: string;
  name: string;
  marathiName: string;
  avatarText: string;
  certificationNumber: string;
  certificationBody: string;
  experienceYears: number;
  fortSpecialties: string[];
  languages: string[];
  specialtyFocus: string;
  rating: number;
  totalTours: number;
  baseRatePerDay: number;
  verificationStatus: 'Verified' | 'Pending Verification' | 'Master Guide';
  bio: string;
  isAvailableToday: boolean;
}

export const CERTIFIED_GUIDES: LocalGuide[] = [
  {
    id: "gd-01",
    name: "Vikram Pawar (Mavala Heritage Guild)",
    marathiName: "विक्रम पवार",
    avatarText: "VP",
    certificationNumber: "MTDC-MH-2021-884",
    certificationBody: "Maharashtra Tourism Development Corporation (MTDC)",
    experienceYears: 11,
    fortSpecialties: ["Raigad Fort", "Rajgad Fort", "Torna Fort"],
    languages: ["Marathi (Native)", "Hindi", "English"],
    specialtyFocus: "Maratha Military Architecture, 17th Century Battle Strategies & Oral Powadas",
    rating: 4.95,
    totalTours: 340,
    baseRatePerDay: 1200,
    verificationStatus: "Master Guide",
    bio: "Born in Pachad at the base of Raigad, Vikram is a third-generation fort historian whose family served in the local village councils. He conducts immersive audio-visual walks through the Rajsabha court and hidden escape routes.",
    isAvailableToday: true,
  },
  {
    id: "gd-02",
    name: "Sunita Deshmukh",
    marathiName: "सुनिता देशमुख",
    avatarText: "SD",
    certificationNumber: "ASI-PUN-2022-419",
    certificationBody: "Archaeological Survey of India (ASI) Accredited",
    experienceYears: 8,
    fortSpecialties: ["Shivneri Fort", "Harishchandragad", "Chavand"],
    languages: ["Marathi (Native)", "English"],
    specialtyFocus: "Ancient Rock-cut Cisterns (Devtaki), Buddhist Caves of Junnar & Flora of Sahyadri",
    rating: 4.9,
    totalTours: 215,
    baseRatePerDay: 1000,
    verificationStatus: "Verified",
    bio: "M.A. in Ancient Indian Culture & Archaeology. Sunita leads women's trekking groups and family heritage tours across Shivneri's seven gates with deep epigraphic knowledge.",
    isAvailableToday: true,
  },
  {
    id: "gd-03",
    name: "Tanaji Jadhav",
    marathiName: "तानाजी जाधव",
    avatarText: "TJ",
    certificationNumber: "MTDC-SAT-2020-302",
    certificationBody: "Western Ghats Trekking & Mountain Rescue Guild",
    experienceYears: 14,
    fortSpecialties: ["Pratapgad Fort", "Sajjangad", "Vasota Fort"],
    languages: ["Marathi (Native)", "Hindi"],
    specialtyFocus: "Dense Jungle Navigation of Jawali, Monsoon Night Treks & First-Aid Mountain Safety",
    rating: 4.88,
    totalTours: 420,
    baseRatePerDay: 1100,
    verificationStatus: "Master Guide",
    bio: "A certified high-altitude mountaineer and conservation advocate. Tanaji specializes in navigating the thick Jawali forest around Pratapgad and teaching Leave-No-Trace principles.",
    isAvailableToday: false,
  },
  {
    id: "gd-04",
    name: "Rameshwar Kadam",
    marathiName: "रामेश्वर कदम",
    avatarText: "RK",
    certificationNumber: "MTDC-PUN-2023-771",
    certificationBody: "Maharashtra Tourism Development Corporation (MTDC)",
    experienceYears: 6,
    fortSpecialties: ["Sinhagad Fort", "Purandar Fort", "Tikona Fort"],
    languages: ["Marathi (Native)", "Hindi", "English"],
    specialtyFocus: "Kalyan Darwaja Defense Geometry, Tanaji Malusare Assault Trail & Night Stargazing",
    rating: 4.85,
    totalTours: 180,
    baseRatePerDay: 850,
    verificationStatus: "Verified",
    bio: "Youth coordinator for Pune Heritage Studies. Rameshwar conducts youth-focused historical walks and early morning sunrise photography trails along Sinhagad's steep basalt ridges.",
    isAvailableToday: true,
  },
  {
    id: "gd-05",
    name: "Anil Malvankar",
    marathiName: "अनिल मालवणकर",
    avatarText: "AM",
    certificationNumber: "KOK-SEA-2022-114",
    certificationBody: "Sindhudurg District Maritime Heritage Council",
    experienceYears: 9,
    fortSpecialties: ["Sindhudurg Fort", "Murud-Janjira", "Vijaydurg Fort"],
    languages: ["Marathi (Native)", "Malvani", "Hindi", "English"],
    specialtyFocus: "Maratha Naval Architecture, Underwater Reef Ramparts & Cannon Metallurgy",
    rating: 4.92,
    totalTours: 260,
    baseRatePerDay: 1200,
    verificationStatus: "Verified",
    bio: "Lifelong coastal resident and diver who guides travelers through Shivaji Maharaj's coastal naval bastion, explaining how lead foundations were poured into turbulent sea waves.",
    isAvailableToday: true,
  }
];
