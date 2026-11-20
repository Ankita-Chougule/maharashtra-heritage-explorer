import React from 'react';
import { SAMPLE_HERITAGE_EVENTS, HeritageEvent } from '../data/sampleEvents';
import { Calendar, MapPin, Clock, AlertCircle, ArrowRight } from 'lucide-react';

interface EventsSectionProps {
  onViewAllEvents: () => void;
  onSelectEvent: (event: HeritageEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onViewAllEvents, onSelectEvent }) => {
  return (
    <section className="py-12 sm:py-20 bg-[#E7D5BC]/20 border-b border-[#E7D5BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Demonstration Data Banner */}
        <div className="mb-6 sm:mb-8 p-3 rounded-lg bg-[#E7D5BC]/60 border border-[#E7D5BC] flex items-center justify-between gap-3 text-xs text-[#35251D]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C65D24] shrink-0" />
            <span>
              <strong>Cultural Event Calendar:</strong> Explore upcoming heritage walks, conservation workshops, and cultural programs across Maharashtra.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#777A50] whitespace-nowrap">
            PROPOSED CALENDAR
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-2 font-mono">
              CULTURAL EXPERIENCES
            </div>
            <h2 className="font-heritage text-2xl sm:text-3xl lg:text-4xl font-bold text-[#35251D] tracking-tight text-balance">
              Heritage Events & Academic Treks
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#35251D]/80">
              Commemorative fort walks, architectural seminars, and night-sky astrophotography organized by state heritage trusts and student researchers.
            </p>
          </div>

          <button
            onClick={onViewAllEvents}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C65D24] hover:text-[#9D4226] transition-colors group cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>View complete calendar</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_HERITAGE_EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 hover:border-[#C65D24]/60 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Event Category & Date Stamp */}
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-3">
                  <span className="font-mono uppercase font-medium">{event.category}</span>
                  <span className="text-[11px] text-[#C65D24] font-semibold bg-[#E7D5BC]/50 px-2 py-0.5 rounded">
                    Demonstration Event
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-heritage text-xl font-bold text-[#35251D] hover:text-[#C65D24] transition-colors mb-1">
                  {event.title}
                </h3>
                <p className="font-devanagari text-xs text-[#777A50] font-medium mb-3">
                  {event.marathiTitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#35251D]/80 leading-relaxed mb-4">
                  {event.description}
                </p>
              </div>

              {/* Event Metadata (Unboxed, Zero-Pill) */}
              <div className="pt-4 border-t border-[#E7D5BC] flex flex-wrap items-center justify-between gap-y-2 text-xs text-[#35251D]/75">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C65D24]" />
                    <span>{event.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#777A50]" />
                    <span>{event.time.split('–')[0]}</span>
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#777A50]" />
                    <span className="truncate max-w-[140px]">{event.fortLocation.split(',')[0]}</span>
                  </span>
                </div>

                <span className="font-semibold text-[#C65D24]">
                  Details →
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
