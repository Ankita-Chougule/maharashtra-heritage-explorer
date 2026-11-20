import React from 'react';
import { FortItem } from '../data/fortsData';
import { SourcesListSection } from './SourcesListSection';
import { X, MapPin, Mountain, Clock, Utensils, Landmark, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface FortModalProps {
  fort: FortItem | null;
  onClose: () => void;
  onAskAboutFort: (fortName: string) => void;
}

export const FortModal: React.FC<FortModalProps> = ({ fort, onClose, onAskAboutFort }) => {
  if (!fort) return null;
  const { language } = useThemeLanguage();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Image */}
        <div className="relative h-44 sm:h-60 md:h-72 w-full bg-[#35251D] dark:bg-[#12100E] shrink-0">
          <img
            src={fort.image}
            alt={fort.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1713] via-[#35251D]/50 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-[#12100E]/80 hover:bg-[#12100E] text-[#FAF5EC] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-[#E7D5BC] dark:text-[#E7D5BC]/90 uppercase tracking-wider mb-1">
              <span>{fort.category}</span>
              <span aria-hidden="true">·</span>
              <span>{fort.district} District</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C65D24] dark:text-[#E67E22] font-bold">{fort.unescoStatus}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700">
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                <span>{language === 'mr' ? 'ASI दस्तऐवजीकरण' : 'ASI Verified'}</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <h2 className="font-heritage text-xl sm:text-2xl md:text-3xl font-bold text-[#FAF5EC]">
                {language === 'mr' ? fort.marathiName : fort.name}
              </h2>
              <span className="font-devanagari text-base sm:text-lg md:text-xl font-bold text-[#E7D5BC]">
                {language === 'mr' ? fort.name : fort.marathiName}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-[#35251D] dark:text-[#F5EAE0]">
          
          {/* Quick Metrics Definition Strip (Unboxed) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#E7D5BC]/30 dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22] text-xs">
            <div>
              <span className="text-[#777A50] dark:text-[#A3A67D] block text-[11px] font-medium">
                {language === 'mr' ? 'उंची (समुद्रसपाटीपासून)' : 'Elevation'}
              </span>
              <span className="font-bold text-sm text-[#35251D] dark:text-[#F5EAE0] flex items-center gap-1 mt-0.5">
                <Mountain className="w-3.5 h-3.5 text-[#C65D24] dark:text-[#E67E22]" />
                {fort.altitudeMeters} m ({fort.altitudeFeet} ft)
              </span>
            </div>
            <div>
              <span className="text-[#777A50] dark:text-[#A3A67D] block text-[11px] font-medium">
                {language === 'mr' ? 'काठिण्य पातळी' : 'Trek Difficulty'}
              </span>
              <span className="font-bold text-sm text-[#35251D] dark:text-[#F5EAE0] mt-0.5 block">
                {fort.difficulty}
              </span>
            </div>
            <div>
              <span className="text-[#777A50] dark:text-[#A3A67D] block text-[11px] font-medium">
                {language === 'mr' ? 'चढाई वेळ' : 'Trek Duration'}
              </span>
              <span className="font-bold text-sm text-[#35251D] dark:text-[#F5EAE0] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#777A50] dark:text-[#A3A67D]" />
                {fort.trekkingDuration}
              </span>
            </div>
            <div>
              <span className="text-[#777A50] dark:text-[#A3A67D] block text-[11px] font-medium">
                {language === 'mr' ? 'भेट देण्यासाठी योग्य काळ' : 'Best Season'}
              </span>
              <span className="font-bold text-sm text-[#35251D] dark:text-[#F5EAE0] mt-0.5 block truncate">
                {fort.bestSeason}
              </span>
            </div>
          </div>

          {/* Historical Significance */}
          <div>
            <h3 className="font-heritage text-sm font-bold uppercase tracking-wider text-[#777A50] dark:text-[#A3A67D] mb-2 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#C65D24] dark:text-[#E67E22]" />
              {language === 'mr' ? 'ऐतिहासिक महत्त्व व पार्श्वभूमी' : 'Historical Background & Significance'}
            </h3>
            <p className="text-sm leading-relaxed text-[#35251D]/90 dark:text-[#F5EAE0]/90">
              {fort.historicalSignificance}
            </p>
            <p className="text-xs text-[#35251D]/75 dark:text-[#F5EAE0]/75 leading-relaxed mt-2 italic">
              {fort.historySummary}
            </p>
          </div>

          {/* Architectural Style & Era */}
          <div className="p-4 rounded-xl bg-[#FAF5EC] dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22]">
            <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-[#35251D] dark:text-[#F5EAE0] mb-1">
              {language === 'mr' ? 'स्थापत्य व लष्करी बांधकाम शैली' : 'Architectural & Defensive Engineering'}
            </h4>
            <p className="text-xs text-[#35251D]/85 dark:text-[#F5EAE0]/85 leading-relaxed">
              {fort.architecturalStyle} — <em>{fort.establishedEra}</em>
            </p>
          </div>

          {/* Key Attractions Checklist */}
          <div>
            <h3 className="font-heritage text-sm font-bold uppercase tracking-wider text-[#777A50] dark:text-[#A3A67D] mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C65D24] dark:text-[#E67E22]" />
              {language === 'mr' ? 'प्रमुख ऐतिहासिक अवशेष व बुरुज' : 'Key Structures & Bastions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {fort.keyAttractions.map((attr, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#E7D5BC]/20 dark:bg-[#25201A] border border-[#E7D5BC]/60 dark:border-[#352C22]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65D24] dark:bg-[#E67E22] mt-1.5 shrink-0" />
                  <span className="text-[#35251D]/90 dark:text-[#F5EAE0]/90 font-medium">{attr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Cuisine & Visiting Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#25201A]">
              <div className="flex items-center gap-2 text-[#777A50] dark:text-[#A3A67D] font-semibold mb-1">
                <Utensils className="w-3.5 h-3.5 text-[#C65D24] dark:text-[#E67E22]" />
                <span>{language === 'mr' ? 'स्थानिक खाद्यसंस्कृती' : 'Local Gastronomy'}</span>
              </div>
              <p className="text-[#35251D]/80 dark:text-[#F5EAE0]/80">
                {fort.localFoodSpecialty}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#25201A]">
              <div className="flex items-center gap-2 text-[#777A50] dark:text-[#A3A67D] font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C65D24] dark:text-[#E67E22]" />
                <span>{language === 'mr' ? 'भेट वेळा व प्रवेश शुल्क' : 'Visiting Timings & Entry'}</span>
              </div>
              <p className="text-[#35251D]/80 dark:text-[#F5EAE0]/80">
                {fort.visitingHours} · {fort.entryFee}
              </p>
            </div>
          </div>

          {/* Authoritative Sources & References Section */}
          <SourcesListSection categoryId="forts" title={`${fort.name} - ${language === 'mr' ? 'प्रमाणित गॅझेटिअर व संदर्भ बखर' : 'Verified Gazetteers & Bakhars'}`} />

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E7D5BC] dark:border-[#352C22] bg-[#E7D5BC]/30 dark:bg-[#12100E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-devanagari text-[#777A50] dark:text-[#A3A67D] italic">
            "{fort.marathiGreeting}"
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onAskAboutFort(fort.name);
              }}
              className="px-4 py-2.5 rounded-lg bg-[#C65D24] dark:bg-[#E67E22] hover:bg-[#9D4226] dark:hover:bg-[#D35400] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'mr' ? `एआय संवादकाला ${fort.marathiName} विषयी विचारा` : `Ask AI Chatbot about ${fort.name}`}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#E7D5BC] dark:border-[#352C22] hover:bg-[#E7D5BC]/60 dark:hover:bg-[#25201A] text-xs text-[#35251D] dark:text-[#F5EAE0] font-medium transition-colors cursor-pointer text-center"
            >
              {language === 'mr' ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
