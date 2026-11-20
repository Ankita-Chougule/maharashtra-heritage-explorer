import React, { useState, useEffect } from 'react';
import { FortItem } from '../../data/fortsData';
import { getBookings, cancelBooking, TourBooking } from '../../data/bookingsData';
import { getUserProfile } from '../../data/userProfile';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  Compass, 
  Mountain, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Ticket, 
  Download,
  AlertCircle
} from 'lucide-react';

interface VisitorDashboardProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  onNavigateTab: (tab: string) => void;
  onSignOut: () => void;
}

export const VisitorDashboard: React.FC<VisitorDashboardProps> = ({ 
  forts, 
  onSelectFort, 
  onNavigateTab, 
  onSignOut 
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'events' | 'wishlist' | 'profile'>('bookings');

  // Visitor Profile State — loaded from localStorage (set during login/register)
  const [visitorProfile, setVisitorProfile] = useState(() => {
    const p = getUserProfile();
    return {
      name: p?.name || "Visitor",
      email: p?.email || "",
      phone: p?.phone || "",
      experienceLevel: "Intermediate Sahyadri Hiker",
      preferredRegions: "Pune Highlands, Konkan Ghats",
      emergencyContact: "",
    };
  });

  // Dynamic bookings synced from shared state / localStorage
  const [myBookings, setMyBookings] = useState<TourBooking[]>(() => getBookings());

  useEffect(() => {
    const handleSync = () => {
      setMyBookings(getBookings());
    };
    window.addEventListener('mhe_bookings_updated', handleSync);
    return () => window.removeEventListener('mhe_bookings_updated', handleSync);
  }, []);

  // Registered events
  const [myEvents, setMyEvents] = useState([
    {
      id: "EVT-REG-01",
      eventTitle: "Shiv Jayanti Heritage Trek & Bastion Walk",
      location: "Shivneri Fort, Junnar",
      date: "19 February 2026",
      time: "06:00 AM",
      passCode: "SHIV-2026-TKT-89",
      status: "Registered"
    }
  ]);

  // Wishlist Forts
  const wishlistForts = forts.filter(f => ['raigad', 'rajgad', 'sinhagad'].includes(f.id));

  const [notification, setNotification] = useState<string | null>(null);

  const handleCancelBooking = (id: string) => {
    cancelBooking(id);
    setMyBookings(getBookings());
    setNotification("Booking cancelled. Confirmation notice dispatched to your contact.");
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Trekker profile & emergency preferences updated.");
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="py-10 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E7D5BC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#C65D24] mb-1">
              <UserCheck className="w-4 h-4" />
              <span>VISITOR & TREKKER DASHBOARD</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#777A50]">PERSONAL TRAVEL & TREK JOURNAL</span>
            </div>
            <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
              Namaskar, {visitorProfile.name}
            </h1>
            <p className="text-xs text-[#35251D]/75 mt-1">
              Manage your upcoming guided fort walks, event registrations, and saved trekking routes across Maharashtra.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-md bg-[#E7D5BC]/60 border border-[#E7D5BC] text-[#35251D] font-medium">
              Role: Visitor / Trekker
            </span>
            <button
              onClick={() => onNavigateTab('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
              <span>Browse Public Site</span>
            </button>
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
            >
              Sign Out to Guest
            </button>
          </div>
        </div>

        {/* Global Notification */}
        {notification && (
          <div className="mb-6 p-3 rounded-lg bg-[#E7D5BC]/80 border border-[#C65D24]/40 flex items-center gap-2 text-xs text-[#35251D]">
            <CheckCircle2 className="w-4 h-4 text-[#C65D24] shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E7D5BC] pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>My Tour & Guide Bookings ({myBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>My Event Registrations ({myEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Fort Wishlist ({wishlistForts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Trekker Profile & Safety Contacts</span>
          </button>
        </div>

        {/* 1. MY BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                    Confirmed Fort Treks & Local Guide Bookings
                  </h3>
                  <p className="text-xs text-[#777A50]">
                    Your reserved slots with certified Mavala guides.
                  </p>
                </div>

                <button
                  onClick={() => onNavigateTab('services')}
                  className="px-3.5 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold self-start cursor-pointer flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Book Another Guide</span>
                </button>
              </div>

              {myBookings.length > 0 ? (
                <div className="space-y-4">
                  {myBookings.map(b => (
                    <div
                      key={b.id}
                      className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7D5BC]/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#C65D24]">{b.id}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-sm text-[#35251D]">{b.fortName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#777A50]">{b.tourDate || (b as any).date}</span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold self-start sm:self-auto ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Declined'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-[#777A50] block text-[11px]">Assigned Guide:</span>
                          <span className="font-semibold text-[#35251D]">{b.guideName}</span>
                        </div>
                        <div>
                          <span className="text-[#777A50] block text-[11px]">Meeting Location:</span>
                          <span className="font-semibold text-[#35251D]">{b.meetingPoint}</span>
                        </div>
                        <div>
                          <span className="text-[#777A50] block text-[11px]">Direct Guide Fee:</span>
                          <span className="font-semibold text-emerald-800">{b.amountPaid}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-[#E7D5BC]/60">
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/40 text-xs text-[#35251D] cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-xl bg-[#E7D5BC]/20 border border-[#E7D5BC]">
                  <Compass className="w-10 h-10 text-[#777A50] mx-auto mb-2" />
                  <p className="text-xs text-[#35251D]/80 mb-3">You have no active guide bookings.</p>
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="px-4 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold cursor-pointer"
                  >
                    Browse Certified Guides & Treks
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. MY EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                  My Registered Heritage Walks & Symposiums
                </h3>
                <p className="text-xs text-[#777A50]">
                  Official e-passes for commemorative walks and academic seminars.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('events')}
                className="px-3.5 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold self-start cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Discover More Events</span>
              </button>
            </div>

            <div className="space-y-4">
              {myEvents.map(evt => (
                <div
                  key={evt.id}
                  className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#777A50] font-mono text-[11px]">
                      <span>{evt.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-800 font-bold">{evt.status}</span>
                    </div>
                    <h4 className="font-heritage text-base font-bold text-[#35251D]">
                      {evt.eventTitle}
                    </h4>
                    <p className="text-[11px] text-[#777A50]">
                      {evt.location} · {evt.date} at {evt.time}
                    </p>
                    <div className="font-mono text-[10px] text-[#C65D24] font-bold mt-1">
                      Digital Pass: {evt.passCode}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => {
                        setNotification(`Sample E-Pass downloaded for ${evt.eventTitle}`);
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/50 text-xs font-medium text-[#35251D] flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. WISHLIST FORTS TAB */}
        {activeTab === 'wishlist' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                Saved Fort Wishlist & Trek Plans
              </h3>
              <p className="text-xs text-[#777A50]">
                Quick access to trail maps, difficulty profiles, and water points for your target fortresses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {wishlistForts.map(fort => (
                <div
                  key={fort.id}
                  onClick={() => onSelectFort(fort)}
                  className="p-4 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] hover:border-[#C65D24]/60 transition-all cursor-pointer text-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#777A50] uppercase block mb-1">
                      {fort.category} · {fort.district}
                    </span>
                    <h4 className="font-heritage text-base font-bold text-[#35251D] mb-1">
                      {fort.name}
                    </h4>
                    <span className="font-devanagari text-xs text-[#777A50] block mb-2">
                      {fort.marathiName}
                    </span>
                    <p className="text-[11px] text-[#35251D]/75 line-clamp-2 mb-3">
                      {fort.historicalSignificance}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E7D5BC] flex items-center justify-between text-[11px] text-[#C65D24] font-semibold">
                    <span>{fort.difficulty} · {fort.trekkingDuration}</span>
                    <span>View Card →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 sm:p-8 max-w-2xl">
            <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-2">
              Trekker Profile & Preferences
            </h3>
            <p className="text-xs text-[#777A50] mb-6">
              Manage your personal contact details, mountain experience level, and emergency point of contact.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    value={visitorProfile.name}
                    onChange={(e) => setVisitorProfile({ ...visitorProfile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Mobile Number (SMS Updates):
                  </label>
                  <input
                    type="text"
                    value={visitorProfile.phone}
                    onChange={(e) => setVisitorProfile({ ...visitorProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Trekking Experience & Fitness Level:
                </label>
                <select
                  value={visitorProfile.experienceLevel}
                  onChange={(e) => setVisitorProfile({ ...visitorProfile, experienceLevel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                >
                  <option value="Beginner (Easy Forts & Step Treks)">Beginner (Easy Forts & Step Treks)</option>
                  <option value="Intermediate Sahyadri Hiker">Intermediate Sahyadri Hiker</option>
                  <option value="Advanced Mountain Climber (Technical Pinnacles)">Advanced Mountain Climber (Technical Pinnacles)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Emergency Contact (Name & Phone):
                </label>
                <input
                  type="text"
                  value={visitorProfile.emergencyContact}
                  onChange={(e) => setVisitorProfile({ ...visitorProfile, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer"
                >
                  Save Trekker Preferences
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
