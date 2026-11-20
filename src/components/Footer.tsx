import React from 'react';
import { BRANDING_CONFIG } from '../config/branding';
import { Shield, Mail, ExternalLink, Heart, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { language, t } = useThemeLanguage();

  return (
    <footer className="bg-[#35251D] dark:bg-[#0E0C0A] text-[#FAF5EC] border-t border-[#E7D5BC]/20 dark:border-[#352C22] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-[#FAF5EC]/10">
          
          {/* Col 1-2: Brand Overview */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C65D24] to-[#9D4226] text-[#FAF5EC] flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M2 4h3v2h2V4h3v2h2V4h3v2h2V4h3v4h-1v12H3V8H2V4zm3 6v8h14v-8H5zm5 2h4v6h-4v-6z" />
                </svg>
              </div>
              <div>
                <span className="font-heritage text-lg font-bold tracking-tight text-[#FAF5EC] block">
                  {language === 'mr' ? BRANDING_CONFIG.marathiTitle : BRANDING_CONFIG.websiteName}
                </span>
                <span className="font-devanagari text-xs text-[#E7D5BC]/80">
                  {language === 'mr' ? BRANDING_CONFIG.websiteName : BRANDING_CONFIG.marathiTitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E7D5BC]/80 leading-relaxed max-w-sm mb-4">
              {language === 'mr'
                ? 'महाराष्ट्राची संस्कृती, इतिहास, परंपरा आणि ऐतिहासिक गडकिल्ल्यांचे जतन करणारा अधिकृत डिजिटल वारसा संग्रह व एआय संवाद मंच.'
                : 'Comprehensive digital heritage repository and AI-enabled vernacular portal preserving Maharashtra’s culture, history, traditions, and historical forts.'
              }
            </p>

            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-3 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'mr' ? 'संदर्भ: गॅझेटिअर, सभासद बखर आणि आज्ञापत्र' : 'Grounded in Gazetteers, Sabhasad Bakhar & Ajnyapatra'}</span>
            </div>

            <div className="text-[11px] text-[#E7D5BC]/60 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C65D24]" />
              <span>Contact: {BRANDING_CONFIG.academicInfo.contactEmail}</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-heritage text-xs font-bold tracking-wider uppercase text-[#E7D5BC] mb-4">
              {language === 'mr' ? 'प्रमुख विभाग' : 'Explore Portal'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF5EC]/80">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('forts')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  {t.nav.forts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('chatbot')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  {t.nav.chatbot}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('events')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  {t.nav.events}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Forts */}
          <div>
            <h4 className="font-heritage text-xs font-bold tracking-wider uppercase text-[#E7D5BC] mb-4">
              {language === 'mr' ? 'अजिंक्य किल्ले' : 'Iconic Strongholds'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF5EC]/80">
              <li>
                <button
                  onClick={() => onSelectTab('forts')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  रायगड किल्ला (Raigad)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('forts')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  शिवनेरी किल्ला (Shivneri)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('forts')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  प्रतापगड किल्ला (Pratapgad)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('forts')}
                  className="hover:text-[#C65D24] dark:hover:text-[#E67E22] transition-colors cursor-pointer"
                >
                  सिंहगड किल्ला (Sinhagad)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#E7D5BC]/60 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {BRANDING_CONFIG.websiteName} | Ankita Chougule. {language === 'mr' ? 'सर्व हक्क राखीव.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1">
            <span>{language === 'mr' ? 'महाराष्ट्राच्या अस्मितेसाठी संवर्धित' : 'Crafted with respect for Maharashtra’s Living Heritage'}</span>
            <Heart className="w-3.5 h-3.5 text-[#C65D24] fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};
