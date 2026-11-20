import React, { useState } from 'react';
import { BRANDING_CONFIG } from '../config/branding';
import { saveUserProfile } from '../data/userProfile';
import { 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  UserCheck, 
  Compass, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  KeyRound
} from 'lucide-react';

export type UserRole = 'guest' | 'admin' | 'researcher' | 'guide' | 'visitor';

interface LoginPageProps {
  onBackToHome: () => void;
  onLoginSuccess: (role: UserRole) => void;
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onBackToHome, 
  onLoginSuccess,
  initialRole = 'visitor'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole === 'guest' ? 'visitor' : initialRole);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [licenseOrInstitute, setLicenseOrInstitute] = useState('');

  // 5 Role Definitions (Admin, Researcher, Guide, Visitor, and Guest)
  const registeredRoles = [
    {
      id: 'admin' as UserRole,
      title: 'Website Owner / Super Admin',
      marathiTitle: 'मुख्य प्रशासक व संकेतस्थळ चालक',
      icon: ShieldCheck,
      description: 'Manage website content, fort archives, peer-review submissions, verify guide credentials, and inspect system analytics.',
      defaultEmail: 'admin@maharashtraheritage.org',
    },
    {
      id: 'researcher' as UserRole,
      title: 'Student Researcher',
      marathiTitle: 'इतिहास संशोधक व विद्यार्थी',
      icon: GraduationCap,
      description: 'Access primary historical bakhars, submit epigraphic studies and architectural research, and track peer-review status.',
      defaultEmail: 'aditya.shinde@unipune.ac.in',
    },
    {
      id: 'guide' as UserRole,
      title: 'Certified Local Guide',
      marathiTitle: 'प्रमाणित स्थानिक मार्गदर्शक (मावळा)',
      icon: Users,
      description: 'Manage MTDC/ASI guide accreditations, publish tour availability, and respond to trekker booking inquiries.',
      defaultEmail: 'vikram.pawar@raigadguides.in',
    },
    {
      id: 'visitor' as UserRole,
      title: 'Visitor / Trekker',
      marathiTitle: 'दुर्ग पर्यटक व गिर्यारोहक',
      icon: UserCheck,
      description: 'Explore Sahyadri forts, book certified guides, register for heritage events, and maintain a personal trekking journal.',
      defaultEmail: 'rohit.deshmukh@gmail.com',
    },
  ];

  const handleQuickRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const matched = registeredRoles.find(r => r.id === role);
    if (matched) {
      setEmailInput(matched.defaultEmail);
      setPasswordInput('••••••••');
    }
  };

  const handleSubmitAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist user profile to localStorage so dashboards can read it
    const matched = registeredRoles.find(r => r.id === selectedRole);
    const displayName =
      authMode === 'register' && fullNameInput.trim()
        ? fullNameInput.trim()
        : (emailInput.trim().split('@')[0] || matched?.defaultEmail.split('@')[0] || selectedRole);
    saveUserProfile({
      name: displayName,
      email: emailInput.trim() || matched?.defaultEmail || '',
      role: selectedRole,
      licenseOrInstitute: licenseOrInstitute.trim() || undefined,
    });
    onLoginSuccess(selectedRole);
  };

  const handleContinueAsGuest = () => {
    onLoginSuccess('guest');
  };

  return (
    <div className="py-12 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#777A50] hover:text-[#35251D] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Homepage</span>
          </button>

          <button
            onClick={handleContinueAsGuest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
            <span>Continue as Guest (No Login Required)</span>
          </button>
        </div>

        {/* Guest High-Salience Banner */}
        <div className="mb-8 p-4 rounded-xl bg-[#E7D5BC]/40 border border-[#E7D5BC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E7D5BC] text-[#C65D24] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heritage text-sm font-bold text-[#35251D]">
                  Option 5: General Public & Guest Access
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FAF5EC] text-[#777A50] font-bold">
                  Public Option
                </span>
              </div>
              <p className="text-xs text-[#35251D]/80 mt-0.5">
                No registration is required. You can explore all 350+ forts, read history, browse guides and events, and converse with the Marathi AI chatbot without creating an account.
              </p>
            </div>
          </div>

          <button
            onClick={handleContinueAsGuest}
            className="shrink-0 px-4 py-2 rounded-lg bg-[#FAF5EC] hover:bg-[#E7D5BC] border border-[#E7D5BC] text-xs font-bold text-[#C65D24] transition-colors cursor-pointer self-start sm:self-auto"
          >
            Explore as Guest →
          </button>
        </div>

        {/* Main Authentication Box */}
        <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl p-6 sm:p-10 shadow-sm">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C65D24] to-[#9D4226] text-[#FAF5EC] flex items-center justify-center mx-auto mb-3 shadow-sm">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
              Select Your Portal Role
            </h1>
            <p className="text-xs text-[#35251D]/75 mt-1.5">
              Choose one of the four registered roles to access tailored workspaces, or continue as a guest for open public exploration.
            </p>
          </div>

          {/* 4 Registered Role Cards Grid */}
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase text-[#777A50] tracking-wider block mb-3 text-center">
              Choose Role to Access Workspace Dashboard
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registeredRoles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => handleQuickRoleSelect(r.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#C65D24] bg-[#E7D5BC]/30 shadow-xs ring-1 ring-[#C65D24]/30'
                        : 'border-[#E7D5BC] hover:border-[#C65D24]/50 hover:bg-[#E7D5BC]/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C65D24]' : 'text-[#777A50]'}`} />
                        <div>
                          <h4 className="font-heritage text-sm font-bold text-[#35251D]">
                            {r.title}
                          </h4>
                          <span className="font-devanagari text-[11px] text-[#777A50]">
                            {r.marathiTitle}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#C65D24] text-white">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#35251D]/80 leading-relaxed mt-2">
                      {r.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sign In / Register Form Container */}
          <div className="max-w-md mx-auto pt-4 border-t border-[#E7D5BC]">
            
            {/* Mode Switcher (Sign In vs Register) */}
            <div className="flex rounded-lg bg-[#E7D5BC]/30 p-1 border border-[#E7D5BC] mb-5">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-[#C65D24] text-white shadow-xs'
                    : 'text-[#35251D] hover:text-[#C65D24]'
                }`}
              >
                Sign In to {selectedRole.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-[#C65D24] text-white shadow-xs'
                    : 'text-[#35251D] hover:text-[#C65D24]'
                }`}
              >
                Register as {selectedRole.toUpperCase()}
              </button>
            </div>

            <form onSubmit={handleSubmitAuth} className="space-y-4 text-xs">
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    Full Legal Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  placeholder={registeredRoles.find(r => r.id === selectedRole)?.defaultEmail}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                />
              </div>

              {authMode === 'register' && selectedRole === 'guide' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    MTDC / ASI Guide Certification ID:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MTDC-MH-2024-9912"
                    value={licenseOrInstitute}
                    onChange={(e) => setLicenseOrInstitute(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] font-mono focus:outline-none focus:border-[#C65D24]"
                  />
                </div>
              )}

              {authMode === 'register' && selectedRole === 'researcher' && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                    University / Research Institution:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Savitribai Phule Pune University"
                    value={licenseOrInstitute}
                    onChange={(e) => setLicenseOrInstitute(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>{authMode === 'signin' ? `Sign In as ${selectedRole.toUpperCase()}` : `Create ${selectedRole.toUpperCase()} Account`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="text-xs text-[#777A50] hover:text-[#C65D24] underline cursor-pointer"
                >
                  Skip login and continue exploring as Guest
                </button>
              </div>

            </form>

            <div className="mt-6 p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] text-[11px] text-[#35251D]/75 text-center">
              <strong>Simulated Role Workspace:</strong> Selecting a role and clicking Sign In opens that role's complete dashboard. Real cloud authentication (Firebase/Cloud SQL) will connect here in Phase 2.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
