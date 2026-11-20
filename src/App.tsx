/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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

      {/* 6. Persistent Floating Chatbot Action Button (FAB) */}
      {currentTab !== 'chatbot' && (
        <button
          onClick={() => handleSelectTab('chatbot')}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#C65D24] to-[#9D4226] hover:from-[#B5501B] hover:to-[#88351B] text-white shadow-xl shadow-[#C65D24]/35 hover:shadow-2xl hover:shadow-[#C65D24]/50 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#FAF5EC]/30 cursor-pointer group"
          title={language === 'mr' ? 'एआय चॅटबॉट उघडा' : 'Open AI Chatbot'}
          aria-label="Open AI Heritage Chatbot"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
            </span>
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-wide">
            {language === 'mr' ? 'एआय चॅटबॉट' : 'AI Chatbot'}
          </span>
        </button>
      )}
    </div>
  );
}
