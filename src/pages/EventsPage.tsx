import React, { useState } from 'react';
import { SAMPLE_HERITAGE_EVENTS, HeritageEvent } from '../data/sampleEvents';
import { Calendar, MapPin, Clock, Users, AlertCircle, X, CheckCircle2 } from 'lucide-react';

interface EventsPageProps {
  onBackToHome: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeEvent, setActiveEvent] = useState<HeritageEvent | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const categories = ['All', 'Commemoration', 'Eco-Trek', 'Academic Seminar', 'Photography Workshop'];

  const filteredEvents = SAMPLE_HERITAGE_EVENTS.filter((evt) =>
    selectedCategory === 'All' ? true : evt.category === selectedCategory
  );

  const handleOpenEvent = (evt: HeritageEvent) => {
    setActiveEvent(evt);
    setIsRegistered(false);
  };

  return (
    <div className="py-12 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Demonstration Banner */}
        <div className="mb-8 p-4 rounded-xl bg-[#E7D5BC]/50 border border-[#E7D5BC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#35251D]">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#C65D24] shrink-0" />
            <span>
              <strong>Heritage Events & Workshops:</strong> Browse upcoming heritage walks, conservation seminars, and cultural programs across Maharashtra.
            </span>
          </div>
          <span className="shrink-0 font-mono text-[11px] bg-[#FAF5EC] px-2.5 py-1 rounded border border-[#E7D5BC] text-[#777A50]">
            SCHEDULED CALENDAR
          </span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-2 font-mono">
            HERITAGE PARTICIPATION
          </div>
          <h1 className="font-heritage text-3xl sm:text-5xl font-bold text-[#35251D] tracking-tight">
            Heritage Events & Academic Seminars
          </h1>
          <p className="mt-3 text-base text-[#35251D]/80 leading-relaxed">
            Participate in on-site fort walks, architectural masonry workshops, and community conservation campaigns throughout Maharashtra.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E7D5BC]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C65D24] text-white shadow-xs'
                  : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:border-[#C65D24]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => handleOpenEvent(evt)}
              className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 hover:border-[#C65D24]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-3">
                  <span className="font-mono uppercase font-semibold">{evt.category}</span>
                  <span className="bg-[#E7D5BC]/50 px-2 py-0.5 rounded text-[11px] text-[#C65D24] font-semibold">
                    Sample Schedule
                  </span>
                </div>

                <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-1 hover:text-[#C65D24] transition-colors">
                  {evt.title}
                </h3>
                <p className="font-devanagari text-xs text-[#777A50] font-semibold mb-3">
                  {evt.marathiTitle}
                </p>

                <p className="text-xs text-[#35251D]/80 leading-relaxed mb-5">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7D5BC] space-y-2 text-xs text-[#35251D]/85">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C65D24]" />
                    <span>{evt.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#777A50]" />
                    <span>{evt.time}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#777A50]">
                  <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-[#C65D24]" />
                    <span>{evt.fortLocation}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{evt.capacity}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Event Details & Demonstration Registration Modal */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 text-[#777A50] hover:text-[#35251D]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-semibold text-[#C65D24] uppercase tracking-wider mb-1 font-mono">
              Event Details (Demonstration)
            </div>
            <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-1">
              {activeEvent.title}
            </h3>
            <p className="font-devanagari text-xs text-[#777A50] mb-4">
              {activeEvent.marathiTitle}
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] space-y-1.5">
                <div><strong>Location:</strong> {activeEvent.fortLocation}</div>
                <div><strong>Date & Timing:</strong> {activeEvent.date} · {activeEvent.time}</div>
                <div><strong>Organizer:</strong> {activeEvent.organizer}</div>
                <div><strong>Cohort Capacity:</strong> {activeEvent.capacity}</div>
              </div>

              <p className="text-[#35251D]/85 leading-relaxed">
                {activeEvent.description}
              </p>

              {!isRegistered ? (
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveEvent(null)}
                    className="px-4 py-2 rounded-lg border border-[#E7D5BC] text-xs font-medium text-[#35251D]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsRegistered(true)}
                    className="px-4 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold"
                  >
                    Register Demonstration Seat
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#E7D5BC]/50 border border-[#C65D24]/40 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C65D24] shrink-0" />
                  <span className="text-[11px] font-medium text-[#35251D]">
                    Sample seat reserved. Confirmation details and pass details will be sent to your registered contact.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
