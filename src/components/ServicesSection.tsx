import React from 'react';
import { TOURISM_SERVICES, TourismServiceItem } from '../data/sampleServices';
import { Ticket, Users, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onViewAllServices: () => void;
  onSelectService: (service: TourismServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onViewAllServices, onSelectService }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tickets':
        return <Ticket className="w-5 h-5 text-[#C65D24]" />;
      case 'Guides':
        return <Users className="w-5 h-5 text-[#C65D24]" />;
      case 'Treks':
      default:
        return <Compass className="w-5 h-5 text-[#C65D24]" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-[#FAF5EC] border-b border-[#E7D5BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-2 font-mono">
              SUSTAINABLE HERITAGE TOURISM
            </div>
            <h2 className="font-heritage text-2xl sm:text-3xl lg:text-4xl font-bold text-[#35251D] tracking-tight text-balance">
              Tourism Services & Local Community Empowerment
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#35251D]/80">
              Integrating digital convenience with authentic rural livelihood: official entry passes, certified local historian guides, and guided eco-trekking expeditions.
            </p>
          </div>

          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C65D24] hover:text-[#9D4226] transition-colors group cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore all services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOURISM_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 hover:border-[#C65D24]/60 hover:shadow-md transition-all duration-300"
            >
              {/* Category Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#E7D5BC]/60 flex items-center justify-center">
                  {getCategoryIcon(srv.category)}
                </div>
                <span className="text-xs font-mono uppercase text-[#777A50]">
                  {srv.category}
                </span>
              </div>

              {/* Title & Marathi Title */}
              <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-1">
                {srv.title}
              </h3>
              <p className="font-devanagari text-xs font-medium text-[#777A50] mb-3">
                {srv.marathiTitle}
              </p>

              {/* Summary */}
              <p className="text-xs text-[#35251D]/80 leading-relaxed mb-5">
                {srv.summary}
              </p>

              {/* Feature Checklist */}
              <ul className="space-y-2 mb-6 flex-1 text-xs text-[#35251D]/90">
                {srv.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#777A50] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing & Inquiry Action */}
              <div className="pt-4 border-t border-[#E7D5BC] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#777A50] block text-[11px]">Pricing Guide</span>
                  <span className="font-semibold text-[#35251D]">{srv.pricingIndication.split('(')[0]}</span>
                </div>

                <button
                  onClick={() => onSelectService(srv)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
