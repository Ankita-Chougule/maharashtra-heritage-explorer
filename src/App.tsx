/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { FORTS_DATA, FortItem } from './data/fortsData';
import { HeritageEvent } from './data/sampleEvents';
import { TourismServiceItem } from './data/sampleServices';
import { BRANDING_CONFIG } from './config/branding';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import { clearUserProfile } from './data/userProfile';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FortModal } from './components/FortModal';
import { AuthModalPrompt } from './components/AuthModalPrompt';

import { HomePage } from './pages/HomePage';
import { ExploreFortsPage } from './pages/ExploreFortsPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { TourismServicesPage } from './pages/TourismServicesPage';
import { EventsPage } from './pages/EventsPage';
import { LoginPage, UserRole } from './pages/LoginPage';

// Role-based Dashboards
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { ResearcherDashboard } from './components/dashboards/ResearcherDashboard';
import { GuideDashboard } from './components/dashboards/GuideDashboard';
import { VisitorDashboard } from './components/dashboards/VisitorDashboard';

export default function App() {
  const { language, t } = useThemeLanguage();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mhe_user_role');
      if (saved && ['admin', 'researcher', 'guide', 'visitor', 'guest'].includes(saved)) {
        return saved as UserRole;
      }
    }
    return 'guest';
  });
  const [selectedFort, setSelectedFort] = useState<FortItem | null>(null);
  const [chatbotQuery, setChatbotQuery] = useState<string | undefined>(undefined);

  // Non-blocking Auth prompt for guests
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [authPromptMessage, setAuthPromptMessage] = useState<string | undefined>(undefined);

  // Sync document title with centralized configuration
  useEffect(() => {
    document.title = BRANDING_CONFIG.websiteName;
  }, []);

  // Scroll to top on navigation tab change
  const handleSelectTab = (tab: string, query?: string) => {
    setCurrentTab(tab);
    if (query) {
      setChatbotQuery(query);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutFort = (fortName: string) => {
    const marathiInquiry = `${fortName} या किल्ल्याचा ऐतिहासिक इतिहास आणि स्थापत्य वैशिष्ट्ये सांगा.`;
    handleSelectTab('chatbot', marathiInquiry);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mhe_user_role', role);
    }
    if (role === 'guest') {
      handleSelectTab('home');
    } else {
      handleSelectTab('dashboard');
    }
  };

  const handleSignOut = () => {
    setUserRole('guest');
    if (typeof window !== 'undefined') {
      localStorage.setItem('mhe_user_role', 'guest');
      clearUserProfile();
    }
    handleSelectTab('home');
  };

  const handleTriggerAuthPrompt = (message?: string) => {
    setAuthPromptMessage(message);
    setAuthPromptOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EC] dark:bg-[#12100E] text-[#35251D] dark:text-[#F5EAE0] transition-colors duration-200 overflow-x-hidden">
      {/* 1. Universal Top Navigation Bar */}
      <Navbar 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
        userRole={userRole}
        onSignOut={handleSignOut}
      />

      {/* 2. Main Page Content Viewport */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* PUBLIC OPEN PAGES */}
        {currentTab === 'home' && (
          <HomePage
            forts={FORTS_DATA}
            onSelectFort={setSelectedFort}
            onNavigateTab={handleSelectTab}
            onSelectService={() => handleSelectTab('services')}
            onSelectEvent={() => handleSelectTab('events')}
          />
        )}

        {currentTab === 'forts' && (
          <ExploreFortsPage
            forts={FORTS_DATA}
            onSelectFort={setSelectedFort}
          />
        )}

        {currentTab === 'chatbot' && (
          <ChatbotPage initialQuery={chatbotQuery} />
        )}

        {currentTab === 'services' && (
          <TourismServicesPage 
            onBackToHome={() => handleSelectTab('home')} 
            onNavigateTab={handleSelectTab}
            onRequireAuth={handleTriggerAuthPrompt}
            userRole={userRole}
          />
        )}

        {currentTab === 'events' && (
          <EventsPage onBackToHome={() => handleSelectTab('home')} />
        )}

        {/* 5-ROLE LOGIN / REGISTER PORTAL */}
        {currentTab === 'login' && (
          <LoginPage 
            onBackToHome={() => handleSelectTab('home')} 
            onLoginSuccess={handleLoginSuccess}
            initialRole={userRole}
          />
        )}

        {/* ROLE-BASED DASHBOARDS */}
        {currentTab === 'dashboard' && (
          <>
            {userRole === 'admin' && (
              <AdminDashboard 
                forts={FORTS_DATA} 
                onSelectFort={setSelectedFort} 
                onSignOut={handleSignOut} 
                onNavigateHome={() => handleSelectTab('home')}
              />
            )}

            {userRole === 'researcher' && (
              <ResearcherDashboard 
                forts={FORTS_DATA} 
                onSelectFort={setSelectedFort} 
                onSignOut={handleSignOut} 
                onNavigateHome={() => handleSelectTab('home')}
              />
            )}

            {userRole === 'guide' && (
              <GuideDashboard 
                onSignOut={handleSignOut} 
                onNavigateHome={() => handleSelectTab('home')}
              />
            )}

            {userRole === 'visitor' && (
              <VisitorDashboard 
                forts={FORTS_DATA} 
                onSelectFort={setSelectedFort} 
                onNavigateTab={handleSelectTab}
                onSignOut={handleSignOut} 
              />
            )}

            {userRole === 'guest' && (
              <LoginPage 
                onBackToHome={() => handleSelectTab('home')} 
                onLoginSuccess={handleLoginSuccess}
              />
            )}
          </>
        )}
      </main>

      {/* 3. Universal Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* 4. Global Interactive Fort Detail Modal */}
      <FortModal
        fort={selectedFort}
        onClose={() => setSelectedFort(null)}
        onAskAboutFort={handleAskAboutFort}
      />

      {/* 5. Non-blocking Auth Prompt for Guests */}
      <AuthModalPrompt
        isOpen={authPromptOpen}
        onClose={() => setAuthPromptOpen(false)}
        onNavigateToLogin={() => handleSelectTab('login')}
        actionMessage={authPromptMessage}
      />

      {/* 6. Creative Persistent Floating AI Chatbot Action Button (FAB) - Right side middle */}
      {currentTab !== 'chatbot' && (
        <button
          onClick={() => handleSelectTab('chatbot')}
          className="fixed top-1/2 -translate-y-1/2 right-0 z-40 group flex flex-col items-center text-white cursor-pointer transition-all duration-300 hover:-translate-x-1 hover:scale-[1.04] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C65D24]/40"
          title={language === 'mr' ? 'एआय चॅटबॉट उघडा' : 'Open AI Chatbot'}
          aria-label="Open AI Heritage Chatbot"
        >
          {/* Ambient Multi-Layer Radial Glow */}
          <div className="absolute -inset-1 rounded-l-full bg-gradient-to-r from-[#C65D24] via-[#E67E22] to-[#B5501B] opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse pointer-events-none" />

          {/* Ripple Pulse Wave */}
          <span className="absolute -inset-1 rounded-l-full border border-amber-400/40 animate-ping opacity-35 pointer-events-none" />

          {/* Main Creative Horizontal Capsule Surface */}
          <div className="relative flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-l-full bg-gradient-to-r from-[#C65D24] via-[#B85320] to-[#9D4226] shadow-2xl shadow-[#C65D24]/50 border-2 border-r-0 border-amber-200/40 overflow-hidden">
            {/* Dynamic Diagonal Shimmer Sheen on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            {/* Creative Icon Orb with Live Status */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner group-hover:rotate-6 transition-transform duration-300">
              <Bot className="w-5 h-5 text-amber-100 group-hover:scale-110 transition-transform" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              {/* Live pulsing dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white/60"></span>
              </span>
            </div>

            {/* Horizontal Text & Badges */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-heritage font-bold text-xs sm:text-sm tracking-wide text-white drop-shadow-sm whitespace-nowrap">
                  {language === 'mr' ? 'एआय संवादक' : 'AI Chatbot'}
                </span>
                <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-amber-400/30 text-amber-100 border border-amber-300/40">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-amber-100/90 font-medium leading-tight whitespace-nowrap">
                {language === 'mr' ? 'दुर्ग मार्गदर्शक' : 'Fort & Heritage Guide'}
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
