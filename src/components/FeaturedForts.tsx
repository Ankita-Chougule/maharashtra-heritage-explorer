import React, { useState } from 'react';
import { FortItem } from '../data/fortsData';
import { Mountain, MapPin, Clock, ArrowRight, Landmark, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface FeaturedFortsProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  onViewAllClick: () => void;
}

export const FeaturedForts: React.FC<FeaturedFortsProps> = ({ forts, onSelectFort, onViewAllClick }) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const { language, t } = useThemeLanguage();

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const featured = forts.filter((f) => f.isFeatured);

  return (
    <section className="py-12 sm:py-20 bg-[#FAF5EC] dark:bg-[#12100E] border-b border-[#E7D5BC] dark:border-[#352C22] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#777A50] dark:text-[#A3A67D] font-mono">
                {language === 'mr' ? 'प्रमाणित ऐतिहासिक दस्तऐवज' : 'CURATED HERITAGE ARCHIVE'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'mr' ? 'ASI व गॅझेटिअर प्रमाणित' : 'ASI & Gazetteer Verified'}</span>
              </span>
            </div>
            <h2 className="font-heritage text-2xl sm:text-4xl font-bold text-[#35251D] dark:text-[#F5EAE0] tracking-tight text-balance">
              {language === 'mr' ? 'प्रमुख ऐतिहासिक दुर्ग व राजधानी' : 'Featured Historical Fortresses'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#35251D]/80 dark:text-[#F5EAE0]/80">
              {language === 'mr' 
                ? 'छत्रपती शिवाजी महाराजांच्या स्वराज्यातील प्रमुख गडकोट, त्यांची अद्वितीय लष्करी स्थापत्यकला, जलव्यवस्थापन आणि ऐतिहासिक वारसा.'
                : 'The foundational bastions of Chhatrapati Shivaji Maharaj’s Swarajya, epitomizing military resilience, ingenious water harvesting, and mountain bastion architecture.'
              }
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C65D24] dark:text-[#E67E22] hover:text-[#9D4226] dark:hover:text-[#D35400] transition-colors group cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>{language === 'mr' ? 'सर्व किल्ले व पायवाटा पहा' : 'Explore all forts & trails'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid - Responsive across Mobile (1 col), Tablet (2 cols), Desktop (4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {featured.map((fort) => {
            const hasError = failedImages[fort.id];

            return (
              <div
                key={fort.id}
                onClick={() => onSelectFort(fort)}
                className="group flex flex-col bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-xl overflow-hidden hover:border-[#C65D24]/60 dark:hover:border-[#E67E22]/60 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Fort Image Slot with 4:3 Aspect Ratio and Graceful Fallback */}
                <div className="relative aspect-[4/3] w-full bg-[#E7D5BC]/50 dark:bg-[#25201A] overflow-hidden">
                  {!hasError ? (
                    <img
                      src={fort.image}
                      alt={`${fort.name} - ${fort.architecturalStyle}`}
                      onError={() => handleImageError(fort.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E7D5BC] dark:bg-[#25201A] flex flex-col items-center justify-center p-4 text-center">
                      <Landmark className="w-10 h-10 text-[#C65D24]/60 mb-2" />
                      <span className="font-heritage text-xs font-semibold text-[#35251D] dark:text-[#F5EAE0]">
                        {language === 'mr' ? fort.marathiName : fort.name}
                      </span>
                    </div>
                  )}

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#35251D]/80 dark:from-[#12100E]/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Stamp on Bottom Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-[#FAF5EC]">
                    <span className="font-devanagari font-semibold text-sm drop-shadow-sm">
                      {fort.marathiName}
                    </span>
                    <span className="text-[11px] font-medium bg-[#35251D]/80 dark:bg-[#12100E]/80 backdrop-blur-xs px-2 py-0.5 rounded text-[#E7D5BC] dark:text-[#F5EAE0]">
                      {fort.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata (Zero-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-[#777A50] dark:text-[#A3A67D] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C65D24] dark:text-[#E67E22]" />
                        <span>{fort.district}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-[#777A50] dark:text-[#A3A67D]" />
                        <span>{fort.altitudeMeters}m</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{fort.difficulty}</span>
                    </div>

                    {/* Fort Title */}
                    <h3 className="font-heritage text-lg font-bold text-[#35251D] dark:text-[#F5EAE0] group-hover:text-[#C65D24] dark:group-hover:text-[#E67E22] transition-colors leading-snug">
                      {language === 'mr' ? fort.marathiName : fort.name}
                    </h3>

                    {/* Brief Significance */}
                    <p className="mt-2 text-xs text-[#35251D]/80 dark:text-[#F5EAE0]/80 line-clamp-2 leading-relaxed">
                      {fort.historicalSignificance}
                    </p>

                    {/* Provenance Citation Badge */}
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#777A50] dark:text-[#A3A67D] font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">
                        {language === 'mr' ? 'संदर्भ: गॅझेटिअर व सभासद बखर' : 'Ref: Gazetteer & Sabhasad Bakhar'}
                      </span>
                    </div>
                  </div>

                  {/* Trek Details & Action */}
                  <div className="mt-4 pt-3 border-t border-[#E7D5BC] dark:border-[#352C22] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#35251D]/70 dark:text-[#F5EAE0]/70">
                      <Clock className="w-3.5 h-3.5 text-[#777A50] dark:text-[#A3A67D]" />
                      <span>{fort.trekkingDuration}</span>
                    </span>
                    <span className="font-semibold text-[#C65D24] dark:text-[#E67E22] group-hover:underline">
                      {language === 'mr' ? 'तपशील पहा →' : 'View Details →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
