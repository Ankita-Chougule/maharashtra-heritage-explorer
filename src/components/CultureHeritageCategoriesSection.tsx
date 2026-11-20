import React from 'react';
import { HERITAGE_CATEGORIES, HeritageCategory } from '../data/heritageData';
import { 
  Shield, 
  BookOpen, 
  Calendar, 
  Music, 
  Utensils, 
  Scissors, 
  Languages, 
  FileText, 
  Feather, 
  Compass, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CultureHeritageCategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenChatbot: (query?: string) => void;
}

export const CultureHeritageCategoriesSection: React.FC<CultureHeritageCategoriesSectionProps> = ({
  onSelectCategory,
  onOpenChatbot
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-[#C65D24]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#C65D24]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#C65D24]" />;
      case 'Music': return <Music className="w-5 h-5 text-[#C65D24]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#C65D24]" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#C65D24]" />;
      case 'Languages': return <Languages className="w-5 h-5 text-[#C65D24]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#C65D24]" />;
      case 'Feather': return <Feather className="w-5 h-5 text-[#C65D24]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#C65D24]" />;
      default: return <Sparkles className="w-5 h-5 text-[#C65D24]" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-[#FAF5EC] border-b border-[#E7D5BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7D5BC]/50 text-[#777A50] text-xs font-semibold tracking-wider uppercase mb-3 font-mono">
            <span>MAHARASHTRA HERITAGE PLATFORM</span>
            <span>·</span>
            <span>10 PILLARS OF CULTURE</span>
          </div>
          <h2 className="font-heritage text-2xl sm:text-4xl md:text-5xl font-bold text-[#35251D] tracking-tight mb-3 sm:mb-4">
            Explore Maharashtra's Culture & Heritage
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#35251D]/80 leading-relaxed font-devanagari">
            महाराष्ट्र ही संतांची, शूरवीरांची, लोककलांची आणि समृद्ध संस्कृतीची जन्मभूमी आहे. किल्ले, उत्सव, खाद्यसंस्कृती, लोककला आणि प्राचीन साहित्यापर्यंतच्या सर्व वारसा घटकांचा मागोवा घ्या.
          </p>
        </div>

        {/* Categories Grid (10 pillars) - Mobile (1 col), Tablet (2 cols), Desktop (3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {HERITAGE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-[#FAF5EC] border border-[#E7D5BC] hover:border-[#C65D24] rounded-2xl p-6 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E7D5BC]/40 border border-[#E7D5BC] flex items-center justify-center group-hover:bg-[#C65D24] group-hover:text-white transition-all">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#E7D5BC]/60 text-[#35251D] font-semibold">
                    {cat.itemCount}+ Records
                  </span>
                </div>

                <h3 className="font-heritage text-lg sm:text-xl font-bold text-[#35251D] group-hover:text-[#C65D24] transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="font-devanagari text-xs text-[#777A50] font-medium mb-3">
                  {cat.marathiTitle}
                </p>

                <p className="text-xs sm:text-sm text-[#35251D]/80 leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Highlight Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.highlightItems.slice(0, 3).map((item, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#E7D5BC]/30 text-[#35251D] font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7D5BC] flex items-center justify-between text-xs font-semibold text-[#C65D24]">
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for AI Integration across all 10 categories */}
        <div className="mt-16 bg-gradient-to-r from-[#35251D] to-[#251913] text-[#FAF5EC] rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E7D5BC]">
              <Sparkles className="w-4 h-4 text-[#C65D24]" />
              <span>Ask AI Heritage Assistant</span>
            </div>
            <h3 className="font-heritage text-2xl sm:text-3xl font-bold tracking-tight">
              Have questions about Maharashtra's traditions, dialects, or history?
            </h3>
            <p className="text-sm text-[#FAF5EC]/80 leading-relaxed">
              Our bilingual Marathi & English AI Heritage Assistant is trained on authenticated historical records, Bakhars, Gazetteers, and regional cultural lore. Ask in Marathi, English, Ahirani, Malvani, or Varhadi.
            </p>
          </div>

          <button
            onClick={() => onOpenChatbot("महाराष्ट्राच्या संस्कृती, इतिहास आणि परंपरांबद्दल सांगा.")}
            className="px-6 py-3.5 rounded-xl bg-[#C65D24] hover:bg-[#9D4226] text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask the AI Chatbot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
