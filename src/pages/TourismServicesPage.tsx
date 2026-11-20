import React, { useState } from 'react';
import { TOURISM_SERVICES, TourismServiceItem } from '../data/sampleServices';
import { CERTIFIED_GUIDES, LocalGuide } from '../data/guidesData';
import { saveBooking } from '../data/bookingsData';
import { getUserProfile } from '../data/userProfile';
import { UserRole } from './LoginPage';
import { 
  Ticket, 
  Users, 
  Compass, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  X, 
  HeartHandshake, 
  BadgeCheck, 
  Star, 
  MapPin, 
  Languages, 
  Sparkles,
  Calendar,
  UserCheck
} from 'lucide-react';

interface TourismServicesPageProps {
  onBackToHome: () => void;
  onNavigateTab: (tab: string) => void;
  onRequireAuth?: (message: string) => void;
  userRole?: UserRole;
}

export const TourismServicesPage: React.FC<TourismServicesPageProps> = ({ 
  onBackToHome, 
  onNavigateTab,
  onRequireAuth,
  userRole = 'guest'
}) => {
  const [selectedService, setSelectedService] = useState<TourismServiceItem | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activeFilterFort, setActiveFilterFort] = useState<string>('All');

  // Booking Form State — pre-filled from saved user profile
  const [leadTrekkerName, setLeadTrekkerName] = useState(() => getUserProfile()?.name || '');
  const [trekkerPhone, setTrekkerPhone] = useState(() => getUserProfile()?.phone || '');
  const [targetFortDate, setTargetFortDate] = useState('Raigad / Shivneri - Weekend Batch');
  const [groupSize, setGroupSize] = useState('4');
  const [specialNotes, setSpecialNotes] = useState('');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tickets':
        return <Ticket className="w-6 h-6 text-[#C65D24]" />;
      case 'Guides':
        return <Users className="w-6 h-6 text-[#C65D24]" />;
      case 'Treks':
      default:
        return <Compass className="w-6 h-6 text-[#C65D24]" />;
    }
  };

  const handleOpenInquiry = (service: TourismServiceItem) => {
    setSelectedService(service);
    setSelectedGuide(null);
    setTargetFortDate('Raigad / Shivneri - Weekend Batch');
    setInquirySubmitted(false);
    setShowInquiryModal(true);
  };

  const handleBookGuide = (guide: LocalGuide) => {
    setSelectedGuide(guide);
    setSelectedService(null);
    setTargetFortDate(`${guide.fortSpecialties[0] || 'Raigad Fort'} - Weekend Tour`);
    setInquirySubmitted(false);
    setShowInquiryModal(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const guideName = selectedGuide 
      ? selectedGuide.name 
      : (selectedService ? selectedService.title : "Certified Local Guide");
    const fortName = selectedGuide?.fortSpecialties[0] || targetFortDate.split('-')[0].trim() || "Raigad Fort";
    const rate = selectedGuide ? selectedGuide.baseRatePerDay : 1200;

    const newBooking = saveBooking({
      guideId: selectedGuide?.id,
      guideName,
      visitorName: leadTrekkerName.trim() || getUserProfile()?.name || "Visitor",
      visitorPhone: trekkerPhone.trim() || "+91 00000 00000",
      visitorEmail: getUserProfile()?.email || "visitor@example.com",
      fortName,
      tourDate: targetFortDate.trim() || "Upcoming Weekend",
      groupSize: parseInt(groupSize, 10) || 2,
      status: 'Pending',
      meetingPoint: `${fortName} Base Village / Ropeway Office`,
      specialRequirements: specialNotes.trim() || `Trek request submitted for group of ${groupSize}.`,
      amountPaid: `₹${rate}`,
      bookingAmount: rate,
    });

    setCreatedBookingId(newBooking.id);
    setInquirySubmitted(true);
  };

  const filteredGuides = CERTIFIED_GUIDES.filter(g => 
    activeFilterFort === 'All' ? true : g.fortSpecialties.some(f => f.includes(activeFilterFort))
  );

  return (
    <div className="py-12 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quick Public Action Shortcuts */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[#E7D5BC]">
          <div className="flex items-center gap-2 text-xs text-[#777A50]">
            <span className="font-mono uppercase font-bold text-[#35251D]">Public Explorer:</span>
            <span>Free and unrestricted browsing</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('forts')}
              className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
              <span>Explore Forts</span>
            </button>

            <button
              onClick={() => onNavigateTab('events')}
              className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C65D24]" />
              <span>Discover Events</span>
            </button>

            <button
              onClick={() => onNavigateTab('chatbot')}
              className="px-3 py-1.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask the AI Chatbot</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-2 font-mono">
            RESPONSIBLE HERITAGE TRAVEL
          </div>
          <h1 className="font-heritage text-3xl sm:text-5xl font-bold text-[#35251D] tracking-tight">
            Tourism Services & Certified Local Guides
          </h1>
          <p className="mt-3 text-base text-[#35251D]/80 leading-relaxed">
            Browse official fort entry passes, guided eco-trek expeditions, and connect directly with accredited local historians (Mavalas) preserving oral Sahyadri traditions.
          </p>
        </div>

        {/* Services Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TOURISM_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 hover:border-[#C65D24]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E7D5BC]/60 flex items-center justify-center">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="text-xs font-mono uppercase text-[#777A50] bg-[#E7D5BC]/40 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-1">
                  {service.title}
                </h3>
                <p className="font-devanagari text-xs text-[#777A50] font-semibold mb-3">
                  {service.marathiTitle}
                </p>

                <p className="text-xs text-[#35251D]/80 leading-relaxed mb-6">
                  {service.summary}
                </p>

                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase text-[#777A50] tracking-wider block mb-2 font-mono">
                    Key Features
                  </span>
                  <ul className="space-y-2 text-xs text-[#35251D]/90">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#777A50] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#E7D5BC] space-y-4">
                <div>
                  <span className="text-[#777A50] text-[11px] block">Standard Pricing:</span>
                  <span className="text-xs font-bold text-[#35251D]">{service.pricingIndication}</span>
                </div>
                <button
                  onClick={() => handleOpenInquiry(service)}
                  className="w-full py-2.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Inquire Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* SECTION: CERTIFIED LOCAL GUIDES DIRECTORY */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono uppercase font-bold text-[#777A50] mb-1">
                PUBLIC ROSTER
              </div>
              <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
                Browse Available Certified Local Guides (मावळे मार्गदर्शक)
              </h2>
              <p className="text-xs text-[#35251D]/80 mt-1">
                All guides are certified by MTDC or ASI and trained in high-altitude mountain first-aid and authentic Maratha fort history.
              </p>
            </div>

            {/* Filter by Fort */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#777A50]">Filter by Fort:</span>
              <select
                value={activeFilterFort}
                onChange={(e) => setActiveFilterFort(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none"
              >
                <option value="All">All Fortresses</option>
                <option value="Raigad">Raigad Fort</option>
                <option value="Shivneri">Shivneri Fort</option>
                <option value="Pratapgad">Pratapgad Fort</option>
                <option value="Sinhagad">Sinhagad Fort</option>
                <option value="Sindhudurg">Sindhudurg Fort</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map(guide => (
              <div
                key={guide.id}
                className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-5 hover:border-[#C65D24]/60 hover:shadow-md transition-all flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#E7D5BC] text-[#C65D24] font-bold flex items-center justify-center text-sm shadow-xs">
                        {guide.avatarText}
                      </div>
                      <div>
                        <h4 className="font-heritage text-sm font-bold text-[#35251D]">
                          {guide.name}
                        </h4>
                        <span className="font-devanagari text-xs text-[#777A50]">
                          {guide.marathiName}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7D5BC] text-[#35251D]">
                      {guide.verificationStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#C65D24] font-semibold mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{guide.rating}</span>
                    <span className="text-[#777A50] font-normal">({guide.totalTours} tours guided · {guide.experienceYears} yrs exp)</span>
                  </div>

                  <p className="text-xs text-[#35251D]/80 leading-relaxed mb-4">
                    "{guide.bio}"
                  </p>

                  <div className="space-y-1 text-[11px] text-[#35251D]/75 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C65D24] shrink-0" />
                      <span><strong>Forts:</strong> {guide.fortSpecialties.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-3 h-3 text-[#777A50] shrink-0" />
                      <span><strong>Languages:</strong> {guide.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#777A50]">
                      <BadgeCheck className="w-3 h-3 text-[#777A50] shrink-0" />
                      <span>{guide.certificationNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7D5BC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#777A50] block">Daily Rate</span>
                    <span className="font-bold text-[#35251D]">₹{guide.baseRatePerDay} / day</span>
                  </div>

                  <button
                    onClick={() => handleBookGuide(guide)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Request Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Livelihood Banner */}
        <div className="p-8 rounded-2xl bg-[#E7D5BC]/30 border border-[#E7D5BC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#777A50] mb-2 font-mono">
              <HeartHandshake className="w-4 h-4 text-[#C65D24]" />
              <span>Community Impact Framework</span>
            </div>
            <h3 className="font-heritage text-xl font-bold text-[#35251D]">
              Direct Economic Benefit to Foothill Villages
            </h3>
            <p className="text-xs text-[#35251D]/80 mt-2 leading-relaxed">
              Our research model guarantees that 85% of tourist booking contributions directly reach rural families for guided treks, fresh village meals (Pithla Bhakri), and local transport, preventing urban middlemen exploitation.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/60 text-xs font-semibold text-[#35251D] transition-colors whitespace-nowrap cursor-pointer"
          >
            ← Back to Overview
          </button>
        </div>

      </div>

      {/* Inquiry / Guide Booking Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-4 right-4 text-[#777A50] hover:text-[#35251D]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-semibold text-[#C65D24] uppercase tracking-wider mb-1 font-mono">
              {selectedGuide ? "Guide Booking Request" : "Service Request"}
            </div>
            <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-1">
              {selectedGuide ? `Trek Request: ${selectedGuide.name}` : selectedService?.title}
            </h3>
            <p className="text-xs text-[#777A50] mb-4">
              {selectedGuide ? `Specialties: ${selectedGuide.fortSpecialties.join(', ')}` : selectedService?.marathiTitle}
            </p>

            {!inquirySubmitted ? (
              <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
                <p className="text-[#35251D]/85 leading-relaxed">
                  You are reserving with an MTDC/ASI verified local heritage guide. Bookings are confirmed directly by the guide.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#35251D] mb-1">
                      Lead Trekker Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={leadTrekkerName}
                      onChange={(e) => setLeadTrekkerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#35251D] mb-1">
                        Contact Phone / WhatsApp:
                      </label>
                      <input
                        type="text"
                        required
                        value={trekkerPhone}
                        onChange={(e) => setTrekkerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#35251D] mb-1">
                        Group Size:
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        required
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#35251D] mb-1">
                      Target Fort & Tour Date:
                    </label>
                    <input
                      type="text"
                      required
                      value={targetFortDate}
                      onChange={(e) => setTargetFortDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#35251D] mb-1">
                      Special Requirements / Dietary / Medical Notes (Optional):
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Senior citizens in group, early sunrise climb..."
                      className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#E7D5BC] text-xs font-medium text-[#35251D] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heritage text-base font-bold text-[#35251D]">
                  Request Dispatched to Guide
                </h4>
                <p className="text-xs text-[#35251D]/80 max-w-sm mx-auto">
                  Booking Reference: <strong className="font-mono text-[#C65D24]">{createdBookingId}</strong>. Your request has been saved and transmitted to the guide network.
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-3">
                  <button
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#E7D5BC] text-xs font-medium text-[#35251D] cursor-pointer"
                  >
                    Close
                  </button>

                  {/* If user is already signed in, go directly to their dashboard */}
                  {userRole && userRole !== 'guest' ? (
                    <button
                      onClick={() => {
                        setShowInquiryModal(false);
                        onNavigateTab('dashboard');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>View in Dashboard</span>
                    </button>
                  ) : (
                    onRequireAuth && (
                      <button
                        onClick={() => {
                          setShowInquiryModal(false);
                          onRequireAuth("Sign in to your Visitor account to track and manage this booking.");
                        }}
                        className="px-4 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                      >
                        Sign In to Track Booking
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
