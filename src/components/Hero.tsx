import React, { useState } from 'react';
import { BRANDING_CONFIG } from '../config/branding';
import { Compass, Sparkles, Shield, ChevronRight, Landmark, Calendar, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import heroImagePath from '../assets/images/maharashtra_fort_hero_1793012657295.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onAskAIClick: () => void;
  onDiscoverEventsClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAskAIClick, onDiscoverEventsClick }) => {
  const [imageError, setImageError] = useState(false);
  const { language, t } = useThemeLanguage();

  return (
    <section className="relative overflow-hidden bg-[#35251D] dark:bg-[#0E0C0A] text-[#FAF5EC] transition-colors">
      {/* Background Media Container with Scrim */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={heroImagePath}
            alt="Historical hill fortress in the Western Ghats of Maharashtra"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#35251D] via-[#4A3528] to-[#251A14] flex items-center justify-center">
            <Landmark className="w-24 h-24 text-[#C65D24]/30" />
          </div>
        )}
        
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/95 via-[#1E1914]/85 to-[#2A231C]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-black/40" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          
          {/* Heritage Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E7D5BC] mb-4 font-mono">
            <span>{language === 'mr' ? 'महाराष्ट्र शासन गॅझेटिअर व ASI प्रमाणित वारसा संग्रह' : 'OFFICIAL MAHARASHTRA CULTURE & HERITAGE REPOSITORY'}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-700">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{language === 'mr' ? 'प्रमाणित दस्तऐवजीकरण' : 'Primary Source Verified'}</span>
            </span>
          </div>

          {/* Marathi Sub-Heading */}
          <p className="font-devanagari text-base sm:text-xl font-medium text-[#E7D5BC]/90 mb-2">
            {language === 'mr' 
              ? 'सह्याद्रीच्या अजिंक्य गडकोटांचा ऐतिहासिक ठेवा आणि डिजिटल संवर्धन'
              : 'Preserving the Historic Strongholds of the Sahyadris with Living Digital Intelligence'
            }
          </p>

          {/* Main Display Headline */}
          <h1 className="font-heritage text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF5EC] leading-[1.2] sm:leading-[1.15] text-balance mb-4 sm:mb-6">
            {language === 'mr'
              ? 'महाराष्ट्राचा दुर्ग वारसा आणि अस्सल ऐतिहासिक ज्ञानपीठ'
              : 'Preserving Maharashtra’s Fortresses with AI-Driven Vernacular Intelligence'
            }
          </h1>

          {/* Short Project Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#E7D5BC]/90 leading-relaxed font-normal mb-6 sm:mb-8 max-w-2xl">
            {language === 'mr'
              ? '१७व्या शतकातील मराठा लष्करी स्थापत्यकला, जलव्यवस्थापन (देवटाके) आणि गॅझेटिअर-प्रमाणित नोंदी यांचे अत्याधुनिक डिजिटल संवर्धन. अस्सल बखरींवर आधारित मराठी एआय संवादकासह गडकोटांचा समृद्ध इतिहास अनुभवा.'
              : 'A pioneering research framework bridging 17th-century Maratha military architecture with next-generation conversational AI in Marathi. Grounded strictly in authenticated Gazetteers, Sabhasad Bakhar, and ASI records.'
            }
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="px-5 py-3 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#C65D24]/20 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{t.common.explore}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {onDiscoverEventsClick && (
              <button
                onClick={onDiscoverEventsClick}
                className="px-5 py-3 rounded-lg bg-[#FAF5EC]/15 hover:bg-[#FAF5EC]/25 text-[#FAF5EC] border border-[#E7D5BC]/30 font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E7D5BC]" />
                <span>{language === 'mr' ? 'मोहिमा व उपक्रम' : 'Discover Events'}</span>
              </button>
            )}

            <button
              onClick={onAskAIClick}
              className="px-5 py-3 rounded-lg bg-[#FAF5EC]/15 hover:bg-[#FAF5EC]/25 text-[#FAF5EC] border border-[#E7D5BC]/30 font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65D24]" />
              <span>{language === 'mr' ? 'एआय संवादकाशी बोला' : 'Ask AI Chatbot'}</span>
            </button>
          </div>

          {/* Curatorial Note */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#E7D5BC]/75">
            <Shield className="w-4 h-4 text-[#777A50] shrink-0" />
            <span>
              {language === 'mr' 
                ? '३५०+ गडकोट, जलसंधारण तंत्रज्ञान आणि ऐतिहासिक लष्करी स्थापत्याचे अभ्यासपूर्ण संकलन.' 
                : 'Documenting 350+ Western Ghats fortresses, water architecture, and Maratha defensive engineering.'
              }
            </span>
          </div>

        </div>
      </div>

      {/* Institutional KPI Strip (Below Hero Split) */}
      <div className="relative z-10 border-t border-[#E7D5BC]/20 bg-[#12100E]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#E7D5BC]/15">
            
            <div className="px-3 pt-3 md:pt-0">
              <div className="font-heritage text-2xl lg:text-3xl font-bold text-[#FAF5EC] tabular-nums">
                350+
              </div>
              <div className="text-xs text-[#E7D5BC]/80 mt-1 font-medium">
                {language === 'mr' ? 'नोंदवलेले ऐतिहासिक किल्ले' : 'Historical Forts Mapped'}
              </div>
            </div>

            <div className="px-3 pt-3 md:pt-0">
              <div className="font-heritage text-2xl lg:text-3xl font-bold text-[#FAF5EC] tabular-nums">
                12
              </div>
              <div className="text-xs text-[#E7D5BC]/80 mt-1 font-medium">
                {language === 'mr' ? 'युनेस्को प्रस्तावित किल्ले' : 'UNESCO Tentative Nominees'}
              </div>
            </div>

            <div className="px-3 pt-3 md:pt-0">
              <div className="font-heritage text-2xl lg:text-3xl font-bold text-[#FAF5EC] tabular-nums">
                100%
              </div>
              <div className="text-xs text-[#E7D5BC]/80 mt-1 font-medium">
                {language === 'mr' ? 'अस्सल मराठी भाषिक संवाद' : 'Vernacular Marathi NLP'}
              </div>
            </div>

            <div className="px-3 pt-3 md:pt-0">
              <div className="font-heritage text-2xl lg:text-3xl font-bold text-[#FAF5EC] tabular-nums">
                Zero-Waste
              </div>
              <div className="text-xs text-[#E7D5BC]/80 mt-1 font-medium">
                {language === 'mr' ? 'पर्यावरणस्नेही दुर्गभ्रमण नियमावली' : 'Eco-Trekking Standards'}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
