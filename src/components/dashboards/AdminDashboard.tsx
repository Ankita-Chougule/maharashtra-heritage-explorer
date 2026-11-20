import React, { useState, useEffect } from 'react';
import { FortItem } from '../../data/fortsData';
import { CERTIFIED_GUIDES, LocalGuide } from '../../data/guidesData';
import { SAMPLE_HERITAGE_EVENTS } from '../../data/sampleEvents';
import { BRANDING_CONFIG } from '../../config/branding';
import { getBookings, updateBookingStatus, cancelBooking, TourBooking } from '../../data/bookingsData';
import { getUserProfile } from '../../data/userProfile';
import { 
  ShieldCheck, 
  Landmark, 
  GraduationCap, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Eye, 
  Plus, 
  FileText,
  BadgeCheck,
  Search,
  ExternalLink,
  Compass
} from 'lucide-react';

interface AdminDashboardProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  onSignOut: () => void;
  onNavigateHome?: () => void;
}

interface ResearcherSubmission {
  id: string;
  studentName: string;
  institution: string;
  fortName: string;
  topicTitle: string;
  submittedDate: string;
  status: 'Pending Review' | 'Approved' | 'Revision Requested';
  abstract: string;
  modiScriptSampleUrl?: string;
}

const INITIAL_RESEARCH_SUBMISSIONS: ResearcherSubmission[] = [
  {
    id: "sub-101",
    studentName: "Aditya Shinde",
    institution: "Savitribai Phule Pune University",
    fortName: "Shivneri Fort",
    topicTitle: "Epigraphic Analysis of 17th Century Water Tanks (Devtaki) at Shivneri",
    submittedDate: "24 Oct 2026",
    status: "Pending Review",
    abstract: "A study on basalt masonry rock-cut channels that diverted monsoon rainfall into 7 cascading cisterns, sustaining the garrison during prolonged sieges."
  },
  {
    id: "sub-102",
    studentName: "Pooja Patil",
    institution: "Mumbai University Department of Civics & Politics",
    fortName: "Raigad Fort",
    topicTitle: "Acoustic Engineering of Rajsabha: Spatial Geometry of the Royal Throne",
    submittedDate: "21 Oct 2026",
    status: "Pending Review",
    abstract: "Analyzing how architect Hiroji Indulkar angled stone courtyards so that a whisper at the Nagarkhana entrance reached the Chhatrapati's throne without amplification."
  },
  {
    id: "sub-103",
    studentName: "Manoj Deshmukh",
    institution: "Shivaji University, Kolhapur",
    fortName: "Pratapgad Fort",
    topicTitle: "Dense Forest Redoubts: Defense Strategy in the Jawali Corridor (1656–1659)",
    submittedDate: "18 Oct 2026",
    status: "Approved",
    abstract: "Documenting natural foliage camouflaging and subterranean pathways connecting Pratapgad to the Koyna river basin."
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ forts, onSelectFort, onSignOut, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'forts' | 'submissions' | 'guides' | 'bookings' | 'events'>('overview');
  const [submissions, setSubmissions] = useState<ResearcherSubmission[]>(INITIAL_RESEARCH_SUBMISSIONS);
  const [guides, setGuides] = useState<LocalGuide[]>(CERTIFIED_GUIDES);
  const [bookings, setBookings] = useState<TourBooking[]>(() => getBookings());
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const adminProfile = getUserProfile();

  useEffect(() => {
    const handleSync = () => {
      setBookings(getBookings());
    };
    window.addEventListener('mhe_bookings_updated', handleSync);
    return () => window.removeEventListener('mhe_bookings_updated', handleSync);
  }, []);

  const handleAdminUpdateBookingStatus = (id: string, status: TourBooking['status']) => {
    updateBookingStatus(id, status);
    setBookings(getBookings());
    setStatusMessage(`Booking ${id} status updated to ${status}.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleAdminCancelBooking = (id: string) => {
    cancelBooking(id);
    setBookings(getBookings());
    setStatusMessage(`Booking ${id} removed from system.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleApproveSubmission = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
    setStatusMessage("Submission approved and queued for catalog publication.");
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleRequestRevision = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Revision Requested' } : s));
    setStatusMessage("Revision requested from student researcher with reviewer notes.");
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleToggleGuideVerification = (guideId: string) => {
    setGuides(prev => prev.map(g => {
      if (g.id === guideId) {
        const nextStatus = g.verificationStatus === 'Verified' ? 'Master Guide' : 'Verified';
        return { ...g, verificationStatus: nextStatus };
      }
      return g;
    }));
    setStatusMessage("Guide credential and accreditation status updated.");
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div className="py-10 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E7D5BC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#C65D24] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>SUPER ADMIN CONSOLE</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#777A50]">WEBSITE OWNER & CONTENT GOVERNANCE</span>
            </div>
            <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
              {BRANDING_CONFIG.websiteName} Administration
            </h1>
            <p className="text-xs text-[#35251D]/75 mt-1">
              System governance for 350+ Sahyadri fortresses, verified researcher submissions, guide accreditations, and event registrations.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-md bg-[#E7D5BC]/60 border border-[#E7D5BC] text-[#35251D] font-medium">
              {adminProfile?.name ? `Admin: ${adminProfile.name}` : 'Role: Super Admin'}
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

        {/* Global Alert Notification */}
        {statusMessage && (
          <div className="mb-6 p-3 rounded-lg bg-[#E7D5BC]/80 border border-[#C65D24]/40 flex items-center gap-2 text-xs text-[#35251D] animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-[#C65D24] shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Navigation Tabs for Admin */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E7D5BC] pb-3">
          {[
            { id: 'overview', label: 'Executive Overview', icon: ShieldCheck },
            { id: 'forts', label: `Fort Heritage Content (${forts.length})`, icon: Landmark },
            { id: 'submissions', label: `Researcher Submissions (${submissions.filter(s => s.status === 'Pending Review').length} Pending)`, icon: GraduationCap },
            { id: 'guides', label: `Guide Certifications (${guides.length})`, icon: Users },
            { id: 'bookings', label: `Tour Bookings (${bookings.length})`, icon: Compass },
            { id: 'events', label: `Events & Registrations (${SAMPLE_HERITAGE_EVENTS.length})`, icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C65D24] text-white shadow-xs'
                    : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-2 font-mono">
                  <span>CATALOGED FORTS</span>
                  <Landmark className="w-4 h-4 text-[#C65D24]" />
                </div>
                <div className="font-heritage text-3xl font-bold text-[#35251D] tabular-nums">
                  350+
                </div>
                <div className="text-[11px] text-[#777A50] mt-1">
                  8 detailed digital archives active
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-2 font-mono">
                  <span>REGISTERED USERS</span>
                  <Users className="w-4 h-4 text-[#C65D24]" />
                </div>
                <div className="font-heritage text-3xl font-bold text-[#35251D] tabular-nums">
                  1,248
                </div>
                <div className="text-[11px] text-[#777A50] mt-1">
                  Trekkers, guides & research scholars
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-2 font-mono">
                  <span>RESEARCH SUBMISSIONS</span>
                  <GraduationCap className="w-4 h-4 text-[#C65D24]" />
                </div>
                <div className="font-heritage text-3xl font-bold text-[#35251D] tabular-nums">
                  {submissions.length}
                </div>
                <div className="text-[11px] text-[#C65D24] font-semibold mt-1">
                  {submissions.filter(s => s.status === 'Pending Review').length} awaiting academic peer-review
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777A50] mb-2 font-mono">
                  <span>TOUR BOOKINGS</span>
                  <Calendar className="w-4 h-4 text-[#C65D24]" />
                </div>
                <div className="font-heritage text-3xl font-bold text-[#35251D] tabular-nums">
                  82
                </div>
                <div className="text-[11px] text-[#777A50] mt-1">
                  Direct revenue routed to rural guides
                </div>
              </div>
            </div>

            {/* Quick Actions and Activity Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <h3 className="font-heritage text-base font-bold text-[#35251D] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C65D24]" />
                  Pending Administrative Tasks
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#35251D] block">
                        Review Research: "Epigraphic Analysis of 17th Century Water Tanks"
                      </span>
                      <span className="text-[11px] text-[#777A50]">
                        Submitted by Aditya Shinde (Pune University) for Shivneri Fort
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="text-[#C65D24] font-semibold hover:underline"
                    >
                      Review
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#35251D] block">
                        Verify MTDC Guide Badge: Sunita Deshmukh
                      </span>
                      <span className="text-[11px] text-[#777A50]">
                        License #ASI-PUN-2022-419 · Specialization: Junnar Buddhist Caves
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('guides')}
                      className="text-[#C65D24] font-semibold hover:underline"
                    >
                      Inspect
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#35251D] block">
                        Monsoon Fort Trekking Safety Advisory Update
                      </span>
                      <span className="text-[11px] text-[#777A50]">
                        Automatic safety bulletin for Harishchandragad & Torna trailheads
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#777A50]">Active</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <h3 className="font-heritage text-base font-bold text-[#35251D] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C65D24]" />
                  System & Platform Architecture Note
                </h3>
                <p className="text-xs text-[#35251D]/80 leading-relaxed mb-4">
                  This console provides unified management across content, research verification, guide licensing, and event registrations. All backend database operations are decoupled for easy Firebase / Cloud SQL integration in Phase 2.
                </p>
                <div className="p-3 rounded-lg bg-[#E7D5BC]/40 border border-[#E7D5BC] text-[11px] text-[#35251D] space-y-1">
                  <div><strong>Modular Config:</strong> Website Title & Brand identity managed in <code>branding.ts</code></div>
                  <div><strong>Public Access:</strong> Unauthenticated visitors can browse all forts, events, guides, and chatbot freely.</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. FORTS & HERITAGE CONTENT TAB */}
        {activeTab === 'forts' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                  Fort Information & Heritage Archives
                </h3>
                <p className="text-xs text-[#777A50]">
                  Publish, update, and manage historical fort records, bastions, and architectural blueprints.
                </p>
              </div>
              <button
                onClick={() => {
                  setStatusMessage("Add New Fort Modal is ready for Phase 2 database connection.");
                  setTimeout(() => setStatusMessage(null), 3000);
                }}
                className="px-3 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold flex items-center gap-1.5 self-start cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Fort Record</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-[#35251D]">
                <thead className="bg-[#E7D5BC]/40 border-b border-[#E7D5BC] font-mono text-[11px] uppercase text-[#777A50]">
                  <tr>
                    <th className="p-3">Fort Name</th>
                    <th className="p-3">District & Region</th>
                    <th className="p-3">Altitude</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">UNESCO / Protection</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7D5BC]/60">
                  {forts.map(fort => (
                    <tr key={fort.id} className="hover:bg-[#E7D5BC]/20">
                      <td className="p-3 font-semibold">
                        <div>{fort.name}</div>
                        <div className="font-devanagari text-[11px] text-[#777A50]">{fort.marathiName}</div>
                      </td>
                      <td className="p-3">{fort.district} ({fort.region})</td>
                      <td className="p-3 tabular-nums">{fort.altitudeMeters} m</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#E7D5BC]/50 font-mono">
                          {fort.category}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] max-w-[180px] truncate">{fort.unescoStatus}</td>
                      <td className="p-3">
                        {fort.isFeatured ? (
                          <span className="text-[#C65D24] font-bold">★ Featured</span>
                        ) : (
                          <span className="text-[#777A50]">Standard</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onSelectFort(fort)}
                          className="px-2.5 py-1 rounded bg-[#E7D5BC]/50 hover:bg-[#C65D24] hover:text-white transition-colors text-[11px] font-semibold cursor-pointer mr-1"
                        >
                          View Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. RESEARCHER SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                Student Researcher Submissions
              </h3>
              <p className="text-xs text-[#777A50]">
                Peer-review historical papers, Modi-script transcripts, and architectural drawings submitted by academic scholars.
              </p>
            </div>

            <div className="space-y-4">
              {submissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] hover:border-[#C65D24]/60 transition-all text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#777A50]">{sub.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-[#35251D]">{sub.fortName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#777A50]">{sub.submittedDate}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold font-mono self-start sm:self-auto ${
                      sub.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sub.status === 'Revision Requested'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-[#E7D5BC] text-[#C65D24]'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <h4 className="font-heritage text-base font-bold text-[#35251D] mb-1">
                    {sub.topicTitle}
                  </h4>

                  <p className="text-xs text-[#777A50] mb-2 font-medium">
                    Researcher: {sub.studentName} ({sub.institution})
                  </p>

                  <p className="text-xs text-[#35251D]/80 leading-relaxed mb-4 bg-[#E7D5BC]/20 p-3 rounded-lg border border-[#E7D5BC]/60">
                    "{sub.abstract}"
                  </p>

                  {/* Actions for Submission */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#E7D5BC]/60">
                    {sub.status !== 'Approved' && (
                      <button
                        onClick={() => handleApproveSubmission(sub.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold cursor-pointer"
                      >
                        Approve for Public Catalog
                      </button>
                    )}
                    {sub.status !== 'Revision Requested' && (
                      <button
                        onClick={() => handleRequestRevision(sub.id)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/40 text-xs text-[#35251D] font-medium cursor-pointer"
                      >
                        Request Academic Revision
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. GUIDE CERTIFICATIONS TAB */}
        {activeTab === 'guides' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                Certified Local Guide Profiles & Accreditations
              </h3>
              <p className="text-xs text-[#777A50]">
                Review MTDC and ASI licensing badges, language fluencies, and tour availability for rural guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guides.map(guide => (
                <div
                  key={guide.id}
                  className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#E7D5BC] text-[#C65D24] font-bold flex items-center justify-center">
                          {guide.avatarText}
                        </div>
                        <div>
                          <h4 className="font-heritage text-sm font-bold text-[#35251D]">
                            {guide.name}
                          </h4>
                          <span className="font-devanagari text-[11px] text-[#777A50]">
                            {guide.marathiName}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        guide.verificationStatus === 'Master Guide'
                          ? 'bg-[#C65D24] text-white'
                          : 'bg-[#E7D5BC] text-[#35251D]'
                      }`}>
                        {guide.verificationStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-[#35251D]/80 mb-3">
                      <div><strong>Accreditation:</strong> {guide.certificationBody}</div>
                      <div><strong>License ID:</strong> <span className="font-mono">{guide.certificationNumber}</span></div>
                      <div><strong>Specialty Forts:</strong> {guide.fortSpecialties.join(', ')}</div>
                      <div><strong>Languages:</strong> {guide.languages.join(' · ')}</div>
                    </div>

                    <p className="text-xs text-[#35251D]/75 italic mb-4">
                      "{guide.bio}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7D5BC] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#35251D]">
                      {guide.totalTours} tours guided · ★ {guide.rating}
                    </span>
                    <button
                      onClick={() => handleToggleGuideVerification(guide.id)}
                      className="px-2.5 py-1 rounded bg-[#E7D5BC]/50 hover:bg-[#E7D5BC] text-xs font-semibold text-[#C65D24] cursor-pointer"
                    >
                      Update Accreditation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TOUR BOOKINGS & GUIDE REQUESTS TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                  Tour Bookings & Guide Requests Management
                </h3>
                <p className="text-xs text-[#777A50]">
                  Real-time monitor for all incoming trekker booking requests and guide assignments across Maharashtra forts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                  {bookings.filter(b => b.status === 'Confirmed').length} Confirmed
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800">
                  {bookings.filter(b => b.status === 'Pending').length} Pending
                </span>
              </div>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7D5BC]/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#C65D24]">{booking.id}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-sm text-[#35251D]">{booking.fortName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#777A50]">{booking.tourDate}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold self-start sm:self-auto ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : booking.status === 'Declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Trekker Name:</span>
                        <span className="font-semibold text-[#35251D]">{booking.visitorName}</span>
                        <span className="text-[11px] text-[#777A50] block">{booking.visitorPhone}</span>
                      </div>
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Assigned Guide:</span>
                        <span className="font-semibold text-[#35251D]">{booking.guideName}</span>
                      </div>
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Group Size:</span>
                        <span className="font-semibold text-[#35251D]">{booking.groupSize} Persons</span>
                      </div>
                      <div>
                        <span className="text-[#777A50] block text-[11px]">Remuneration:</span>
                        <span className="font-semibold text-emerald-800">{booking.amountPaid || `₹${booking.bookingAmount}`}</span>
                      </div>
                    </div>

                    {booking.specialRequirements && (
                      <p className="text-xs text-[#35251D]/80 bg-[#E7D5BC]/20 p-2.5 rounded-lg border border-[#E7D5BC]/60">
                        <strong>Requirements:</strong> {booking.specialRequirements}
                      </p>
                    )}

                    <div className="pt-2 flex justify-end gap-2 border-t border-[#E7D5BC]/60">
                      {booking.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleAdminUpdateBookingStatus(booking.id, 'Confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                        >
                          Approve / Confirm
                        </button>
                      )}
                      {booking.status !== 'Declined' && (
                        <button
                          onClick={() => handleAdminUpdateBookingStatus(booking.id, 'Declined')}
                          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                        >
                          Decline
                        </button>
                      )}
                      <button
                        onClick={() => handleAdminCancelBooking(booking.id)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/40 text-xs text-[#35251D] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-xl bg-[#E7D5BC]/20 border border-[#E7D5BC]">
                <p className="text-xs text-[#35251D]/80">No tour bookings or guide requests recorded yet.</p>
              </div>
            )}
          </div>
        )}

        {/* 6. EVENTS & REGISTRATIONS TAB */}
        {activeTab === 'events' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                Heritage Events, Seminars & Trek Registrations
              </h3>
              <p className="text-xs text-[#777A50]">
                Monitor public participation capacity and coordinate on-site heritage symposiums.
              </p>
            </div>

            <div className="space-y-4">
              {SAMPLE_HERITAGE_EVENTS.map(evt => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#777A50] font-mono text-[11px]">
                      <span>{evt.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{evt.date}</span>
                    </div>
                    <h4 className="font-heritage text-sm font-bold text-[#35251D]">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-[#777A50]">
                      Location: {evt.fortLocation} · Capacity: {evt.capacity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="px-2.5 py-1 rounded-md bg-[#E7D5BC]/40 text-[#35251D] font-mono text-[11px]">
                      Active Schedule
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
