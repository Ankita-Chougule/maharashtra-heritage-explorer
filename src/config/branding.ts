/**
 * Centralized Branding and Project Configuration
 * 
 * IMPORTANT FOR FUTURE STEPS:
 * When you provide your final website name, logo, title, and branding assets,
 * update the values in this file. All components, navigation bars, footers,
 * and page headers reference this centralized configuration.
 */

export interface ProjectBranding {
  // Brand Identity
  websiteName: string;
  marathiTitle: string;
  tagline: string;
  marathiTagline: string;
  competitionName: string;
  competitionYear: string;
  competitionCategory: string;
  leadAuthor: string;
  institutionLabel: string;
  
  // Theme Color Tokens (Hex values)
  colors: {
    ivory: string;       // Main background (#FAF5EC)
    sandstone: string;   // Secondary cards and neutral panels (#E7D5BC)
    burntOrange: string; // Primary buttons, active highlights (#C65D24)
    terracotta: string;  // Hover states, selected accents (#9D4226)
    espresso: string;    // Headings, main text, heavy contrast (#35251D)
    olive: string;       // Occasional heritage accents (#777A50)
  };

  // Temporary Logo Settings
  logo: {
    type: 'emblem' | 'image';
    iconSymbol: string; // e.g., 'fortress', 'bastion'
    monogram: string;   // Short 2-letter monogram for fallback emblem
    customImagePath?: string; // Replace with '/assets/logo.png' when ready
  };

  // Contact & Academic Information
  academicInfo: {
    projectScope: string;
    targetDomain: string;
    researchAdvisor: string;
    researchAbstract: string;
    contactEmail: string;
  };
}

export const BRANDING_CONFIG: ProjectBranding = {
  // Temporary website name & titles (easily swappable)
  websiteName: "Maharashtra Heritage Explorer",
  marathiTitle: "महाराष्ट्र वारसा दुर्ग दर्शन",
  tagline: "AI-Powered Marathi Chatbot & Historical Fort Tourism Platform",
  marathiTagline: "सह्याद्रीच्या गड-दुर्गांचा ऐतिहासिक ठेवा आणि एआय-सक्षम मराठी संवाद",
  
  competitionName: "Maharashtra State Heritage & Culture Initiative",
  competitionYear: "2026",
  competitionCategory: "Humanities, Languages, Cultural Heritage & Fine Arts / Computer Science Interdisciplinary",
  leadAuthor: "Ankita Chougule",
  institutionLabel: "University Research & Innovation Cell",

  colors: {
    ivory: "#FAF5EC",
    sandstone: "#E7D5BC",
    burntOrange: "#C65D24",
    terracotta: "#9D4226",
    espresso: "#35251D",
    olive: "#777A50",
  },

  logo: {
    type: "emblem",
    iconSymbol: "fortress",
    monogram: "MH",
    // When final logo image is provided, set customImagePath: "/src/assets/logo.png"
  },

  academicInfo: {
    projectScope: "Maharashtra Heritage Preservation Platform",
    targetDomain: "Cultural Heritage Preservation, Vernacular Natural Language Processing (Marathi NLP), and Sustainable Eco-Tourism for Western Ghats Fortresses",
    researchAdvisor: "Faculty of Humanities & Computing Sciences",
    researchAbstract: "Integrating large language models tailored with authentic Marathi historical terminology, Modi script transliteration records, and tourist management frameworks to preserve Maharashtra's 350+ historical hill forts while empowering rural trekking communities.",
    contactEmail: "contact@maharashtraheritage.org",
  },
};
