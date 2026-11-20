import React, { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus, TourBooking } from '../../data/bookingsData';
import { getUserProfile } from '../../data/userProfile';
import { 
  Users, 
  BadgeCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  FileCheck, 
  Send, 
  Compass, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface GuideDashboardProps {
  onSignOut: () => void;
  onNavigateHome?: () => void;
}

export const GuideDashboard: React.FC<GuideDashboardProps> = ({ onSignOut, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'availability'>('bookings');
  
  // Guide profile state — loaded from localStorage
  const [guideProfile, setGuideProfile] = useState(() => {
    const p = getUserProfile();
    return {
      name: p?.name || "Guide",
      marathiName: "",
      licenseId: p?.licenseOrInstitute || "MTDC-MH-PENDING",
      certificationBody: "Maharashtra Tourism Development Corporation (MTDC)",
      accreditationLevel: "Certified Guide",
      specialtyForts: "Raigad Fort, Rajgad Fort, Torna Fort",
      languages: "Marathi, Hindi, English",
      baseDailyRate: 1200,
      maxGroupSize: 15,
      bio: "Experienced local guide specializing in Sahyadri heritage and fort history."
    };
  });

  const [bookingRequests, setBookingRequests] = useState<TourBooking[]>(() => getBookings());

  useEffect(() => {
    const handleSync = () => {
      setBookingRequests(getBookings());
    };
    window.addEventListener('mhe_bookings_updated', handleSync);
    return () => window.removeEventListener('mhe_bookings_updated', handleSync);
  }, []);

  const [notice, setNotice] = useState<string | null>(null);

  const handleUpdateBookingStatus = (id: string, newStatus: 'Confirmed' | 'Declined') => {
    updateBookingStatus(id, newStatus);
    setBookingRequests(getBookings());
    setNotice(`Booking request ${id} updated to ${newStatus}. Notification dispatched.`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Guide certification details and profile successfully submitted for administrative review.");
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="py-10 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E7D5BC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#C65D24] mb-1">
              <BadgeCheck className="w-4 h-4" />
              <span>CERTIFIED LOCAL GUIDE WORKSPACE</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#777A50]">MTDC ACCREDITED HISTORIAN</span>
            </div>
            <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
              {guideProfile.name}
            </h1>
            <p className="text-xs text-[#35251D]/75 mt-1">
              License #{guideProfile.licenseId} · {guideProfile.accreditationLevel} · Base Region: Sahyadri Foothills
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-md bg-[#E7D5BC]/60 border border-[#E7D5BC] text-[#35251D] font-medium">
              Status: Verified Active
            </span>
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
                <span>Browse Public Site</span>
              </button>
            )}
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
            >
              Sign Out to Guest
            </button>
          </div>
        </div>

        {/* Global Notification */}
        {notice && (
          <div className="mb-6 p-3 rounded-lg bg-[#E7D5BC]/80 border border-[#C65D24]/40 flex items-center gap-2 text-xs text-[#35251D]">
            <CheckCircle2 className="w-4 h-4 text-[#C65D24] shrink-0" />
            <span>{notice}</span>
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
            <Calendar className="w-3.5 h-3.5" />
            <span>Tour Bookings & Inquiries ({bookingRequests.filter(b => b.status === 'Pending').length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Manage Profile & Certification Details</span>
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'availability'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tour Availability & Rates</span>
          </button>
        </div>

        {/* 1. BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">CONFIRMED UPCOMING</span>
                <div className="font-heritage text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
                  {bookingRequests.filter(b => b.status === 'Confirmed').length} Tours
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">ACTION NEEDED</span>
                <div className="font-heritage text-2xl font-bold text-[#C65D24] mt-1 tabular-nums">
                  {bookingRequests.filter(b => b.status === 'Pending').length} Pending
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">ESTIMATED EARNINGS</span>
                <div className="font-heritage text-2xl font-bold text-[#35251D] mt-1 tabular-nums">
                  ₹{bookingRequests.filter(b => b.status === 'Confirmed').reduce((a, b) => a + b.bookingAmount, 0)}
                </div>
              </div>
            </div>

            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D] mb-4">
                Incoming Visitor Trek Requests & Heritage Tours
              </h3>

              <div className="space-y-4">
                {bookingRequests.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7D5BC]/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#C65D24]">{booking.id}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#35251D]">{booking.fortName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#777A50]">{booking.tourDate}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold self-start sm:self-auto ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : booking.status === 'Declined'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-[#E7D5BC] text-[#C65D24]'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Lead Trekker:</span>
                        <span className="font-semibold text-[#35251D]">{booking.visitorName}</span>
                        <span className="text-[11px] text-[#777A50] block">{booking.visitorPhone}</span>
                      </div>
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Group Size:</span>
                        <span className="font-semibold text-[#35251D]">{booking.groupSize} Persons</span>
                      </div>
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Direct Remuneration:</span>
                        <span className="font-semibold text-emerald-800">₹{booking.bookingAmount}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#35251D]/80 bg-[#E7D5BC]/20 p-2.5 rounded-lg border border-[#E7D5BC]/60">
                      <strong>Visitor Note:</strong> {booking.specialRequirements}
                    </p>

                    {booking.status === 'Pending' && (
                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdateBookingStatus(booking.id, 'Declined')}
                          className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/40 text-xs text-[#35251D]"
                        >
                          Decline Request
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(booking.id, 'Confirmed')}
                          className="px-4 py-1.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold"
                        >
                          Confirm Tour Slot
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFILE & CERTIFICATION TAB */}
        {activeTab === 'profile' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 sm:p-8 max-w-3xl">
            <div className="mb-6">
              <h3 className="font-heritage text-xl font-bold text-[#35251D]">
                Guide Profile & MTDC Certification Details
              </h3>
              <p className="text-xs text-[#777A50] mt-1">
                Maintain your credentials, licensed fort specialties, and verification badges visible on the public explorer.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Full Legal Name:
                  </label>
                  <input
                    type="text"
                    value={guideProfile.name}
                    onChange={(e) => setGuideProfile({ ...guideProfile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Marathi Name (मराठी नाव):
                  </label>
                  <input
                    type="text"
                    value={guideProfile.marathiName}
                    onChange={(e) => setGuideProfile({ ...guideProfile, marathiName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    MTDC / ASI License Number:
                  </label>
                  <input
                    type="text"
                    value={guideProfile.licenseId}
                    onChange={(e) => setGuideProfile({ ...guideProfile, licenseId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Accrediting Body:
                  </label>
                  <input
                    type="text"
                    value={guideProfile.certificationBody}
                    onChange={(e) => setGuideProfile({ ...guideProfile, certificationBody: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Primary Fort Specialties:
                </label>
                <input
                  type="text"
                  value={guideProfile.specialtyForts}
                  onChange={(e) => setGuideProfile({ ...guideProfile, specialtyForts: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Languages Spoken:
                </label>
                <input
                  type="text"
                  value={guideProfile.languages}
                  onChange={(e) => setGuideProfile({ ...guideProfile, languages: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Guide Biography & Historical Expertise:
                </label>
                <textarea
                  rows={3}
                  value={guideProfile.bio}
                  onChange={(e) => setGuideProfile({ ...guideProfile, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer"
                >
                  Save & Request Verification Update
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. AVAILABILITY & RATES TAB */}
        {activeTab === 'availability' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 sm:p-8 max-w-2xl">
            <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-2">
              Tour Availability & Daily Rates
            </h3>
            <p className="text-xs text-[#777A50] mb-6">
              Set your active days, standard guided walk rates, and group thresholds.
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-[#35251D] block">Daily Guided Tour Rate</span>
                  <span className="text-[11px] text-[#777A50]">Standard group session up to 10 persons</span>
                </div>
                <div className="text-right">
                  <span className="font-heritage text-lg font-bold text-[#C65D24]">₹{guideProfile.baseDailyRate}</span>
                  <span className="text-[10px] text-[#777A50] block">per session</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-[#35251D] block">Maximum Group Capacity</span>
                  <span className="text-[11px] text-[#777A50]">To ensure personal historical engagement and safety</span>
                </div>
                <span className="font-bold text-sm text-[#35251D]">{guideProfile.maxGroupSize} Hikers</span>
              </div>

              <div className="p-4 rounded-xl bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-[#35251D] block">Today's Dispatch Status</span>
                  <span className="text-[11px] text-[#777A50]">Available for immediate fort base walk requests</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Available Today
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
