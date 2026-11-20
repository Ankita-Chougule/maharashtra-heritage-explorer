export type Language = 'en' | 'mr';
export type ThemeMode = 'light' | 'dark';

export interface Translations {
  nav: {
    home: string;
    forts: string;
    chatbot: string;
    services: string;
    events: string;
    dashboard: string;
    login: string;
    signOut: string;
    adminConsole: string;
    researcherWorkspace: string;
    guideWorkspace: string;
    visitorDashboard: string;
    toggleLanguage: string;
    toggleTheme: string;
    lightMode: string;
    darkMode: string;
  };
  provenance: {
    verifiedBadge: string;
    sourceGazetteer: string;
    aiGroundingNotice: string;
    authenticRecord: string;
    viewCitations: string;
  };
  common: {
    explore: string;
    learnMore: string;
    askAi: string;
    altitude: string;
    difficulty: string;
    district: string;
    region: string;
    unesco: string;
    searchPlaceholder: string;
    all: string;
    hillFort: string;
    seaFort: string;
    forestFort: string;
    easy: string;
    moderate: string;
    challenging: string;
    strenuous: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      forts: 'Explore Forts & Heritage',
      chatbot: 'AI Chatbot',
      services: 'Tourism & Guides',
      events: 'Events & Treks',
      dashboard: 'Dashboard',
      login: 'Login / Select Role',
      signOut: 'Sign Out',
      adminConsole: 'Admin Console',
      researcherWorkspace: 'Researcher Hub',
      guideWorkspace: 'Guide Workspace',
      visitorDashboard: 'Trekker Dashboard',
      toggleLanguage: 'Change Language to Marathi',
      toggleTheme: 'Toggle Light/Dark Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    provenance: {
      verifiedBadge: 'Verified Archival Record (ASI & Gazetteers)',
      sourceGazetteer: 'Maharashtra District Gazetteers & Sabhasad Bakhar',
      aiGroundingNotice: 'AI answers are strictly grounded in primary historical chronicles, not unverified fiction.',
      authenticRecord: 'Primary Source Verified',
      viewCitations: 'View Scholarly Citations',
    },
    common: {
      explore: 'Explore',
      learnMore: 'Learn More',
      askAi: 'Ask AI about this Fort',
      altitude: 'Altitude',
      difficulty: 'Difficulty',
      district: 'District',
      region: 'Region',
      unesco: 'UNESCO Status',
      searchPlaceholder: 'Search by fort name, district, or era...',
      all: 'All',
      hillFort: 'Hill Fort',
      seaFort: 'Sea Fort',
      forestFort: 'Forest Fort',
      easy: 'Easy',
      moderate: 'Moderate',
      challenging: 'Challenging',
      strenuous: 'Strenuous',
    },
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      forts: 'वारसा व किल्ले',
      chatbot: 'एआय चॅटबॉट',
      services: 'पर्यटन व मार्गदर्शक',
      events: 'उपक्रम व मोहिमा',
      dashboard: 'डॅशबोर्ड',
      login: 'प्रवेश / भूमिका निवडा',
      signOut: 'बाहेर पडा',
      adminConsole: 'प्रशासक कक्ष',
      researcherWorkspace: 'संशोधक दालन',
      guideWorkspace: 'मार्गदर्शक कक्ष',
      visitorDashboard: 'दुर्गभ्रमण दालन',
      toggleLanguage: 'इंग्रजी भाषेत बदला',
      toggleTheme: 'थीम बदला (लाईट/डार्क)',
      lightMode: 'लाईट मोड',
      darkMode: 'डार्क मोड',
    },
    provenance: {
      verifiedBadge: 'प्रमाणित ऐतिहासिक दस्तऐवज (ASI व गॅझेटिअर)',
      sourceGazetteer: 'महाराष्ट्र राज्य जिल्हा गॅझेटिअर आणि सभासद बखर',
      aiGroundingNotice: 'एआय उत्तरे प्राथमिक ऐतिहासिक बखरी आणि गॅझेटिअरवर आधारित आहेत, काल्पनिक साहित्यावर नाही.',
      authenticRecord: 'ऐतिहासिक पुराव्यांनी सिद्ध',
      viewCitations: 'संदर्भ ग्रंथ व पुरावे पहा',
    },
    common: {
      explore: 'किल्ले पहा',
      learnMore: 'अधिक माहिती',
      askAi: 'या किल्ल्याविषयी एआयला विचारा',
      altitude: 'उंची',
      difficulty: 'काठिण्य पातळी',
      district: 'जिल्हा',
      region: 'विभाग',
      unesco: 'युनेस्को नामांकन स्थिती',
      searchPlaceholder: 'किल्ल्याचे नाव, जिल्हा किंवा कालावधी शोधा...',
      all: 'सर्व',
      hillFort: 'गिरीदुर्ग',
      seaFort: 'जलदुर्ग',
      forestFort: 'वनदुर्ग',
      easy: 'सोपे',
      moderate: 'मध्यम',
      challenging: 'कठीण',
      strenuous: 'अति-कठीण',
    },
  },
};
