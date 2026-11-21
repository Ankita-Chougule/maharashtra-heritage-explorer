import React, { useState } from 'react';
import { BRANDING_CONFIG } from '../config/branding';
import { UserRole } from '../pages/LoginPage';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { 
  Menu, 
  X, 
  Shield, 
  Compass, 
  BookOpen, 
  Calendar, 
  UserCheck, 
  LayoutDashboard, 
  LogOut,
  Sun,
  Moon,
  Languages
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userRole: UserRole;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onSelectTab, 
  userRole, 
  onSignOut 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, theme, toggleTheme, t } = useThemeLanguage();

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return t.nav.adminConsole;
      case 'researcher':
        return t.nav.researcherWorkspace;
      case 'guide':
        return t.nav.guideWorkspace;
      case 'visitor':
        return t.nav.visitorDashboard;
      case 'guest':
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Shield },
    { id: 'forts', label: t.nav.forts, icon: Compass },
    { id: 'services', label: t.nav.services, icon: BookOpen },
    { id: 'events', label: t.nav.events, icon: Calendar },
  ];

  if (userRole !== 'guest') {
    navItems.push({ id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard });
  }

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EC]/95 dark:bg-[#12100E]/95 backdrop-blur-md border-b border-[#E7D5BC]/80 dark:border-[#352C22] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 h-16 sm:h-18">
          
          {/* Zone 1: Brand Wordmark with Heritage Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D24] rounded-lg p-1 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#C65D24] to-[#9D4226] text-[#FAF5EC] flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M2 4h3v2h2V4h3v2h2V4h3v2h2V4h3v4h-1v12H3V8H2V4zm3 6v8h14v-8H5zm5 2h4v6h-4v-6z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heritage text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#35251D] dark:text-[#F5EAE0] group-hover:text-[#C65D24] dark:group-hover:text-[#E67E22] transition-colors truncate max-w-[130px] sm:max-w-xs md:max-w-none">
                {language === 'mr' ? BRANDING_CONFIG.marathiTitle : BRANDING_CONFIG.websiteName}
              </span>
              <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-devanagari font-medium text-[#777A50] dark:text-[#A3A67D] tracking-wide truncate max-w-[130px] sm:max-w-xs md:max-w-none">
                {language === 'mr' ? BRANDING_CONFIG.websiteName : BRANDING_CONFIG.marathiTitle}
              </span>
            </div>
          </button>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#C65D24] dark:text-[#E67E22] font-semibold'
                      : 'text-[#35251D]/80 dark:text-[#F5EAE0]/80 hover:text-[#C65D24] dark:hover:text-[#E67E22]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C65D24] dark:bg-[#E67E22] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Toggles (Language & Theme) + Primary Action */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={t.nav.toggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#1B1713] text-xs font-semibold text-[#35251D] dark:text-[#F5EAE0] hover:border-[#C65D24] dark:hover:border-[#E67E22] transition-colors cursor-pointer shadow-xs"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5 text-[#C65D24] dark:text-[#E67E22]" />
              <span className="font-medium text-[11px] sm:text-xs">
                {language === 'mr' ? 'English' : 'मराठी'}
              </span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              title={t.nav.toggleTheme}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#1B1713] text-[#35251D] dark:text-[#F5EAE0] hover:border-[#C65D24] dark:hover:border-[#E67E22] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="hidden md:inline text-xs font-medium">{t.nav.lightMode}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#777A50]" />
                  <span className="hidden md:inline text-xs font-medium">{t.nav.darkMode}</span>
                </>
              )}
            </button>

            {/* Role Button / Login Button */}
            <div className="hidden sm:flex items-center gap-2">
              {userRole === 'guest' ? (
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    currentTab === 'login'
                      ? 'bg-[#9D4226] text-white'
                      : 'bg-[#C65D24] dark:bg-[#E67E22] hover:bg-[#9D4226] dark:hover:bg-[#D35400] text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t.nav.login}</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      currentTab === 'dashboard'
                        ? 'bg-[#C65D24] dark:bg-[#E67E22] text-white border-[#C65D24] dark:border-[#E67E22]'
                        : 'bg-[#E7D5BC]/40 dark:bg-[#25201A] text-[#35251D] dark:text-[#F5EAE0] border-[#E7D5BC] dark:border-[#352C22] hover:border-[#C65D24]'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#C65D24] dark:text-[#E67E22]" />
                    <span>{getRoleLabel(userRole)}</span>
                  </button>

                  <button
                    onClick={onSignOut}
                    title={t.nav.signOut}
                    className="p-1.5 rounded-lg border border-[#E7D5BC] dark:border-[#352C22] hover:bg-[#E7D5BC]/50 dark:hover:bg-[#25201A] text-[#777A50] dark:text-[#A3A67D] hover:text-[#35251D] dark:hover:text-[#F5EAE0] transition-colors cursor-pointer"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#35251D] dark:text-[#F5EAE0] hover:bg-[#E7D5BC]/60 dark:hover:bg-[#25201A] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-16 sm:top-18 bg-black/50 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-150"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="relative z-40 lg:hidden border-t border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#12100E] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="flex items-center justify-between px-3 pb-1">
            <span className="text-[11px] font-semibold text-[#777A50] dark:text-[#A3A67D] uppercase tracking-wider font-mono">
              Role: {userRole.toUpperCase()}
            </span>
            {userRole !== 'guest' && (
              <button
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#C65D24] dark:text-[#E67E22] font-semibold underline"
              >
                {t.nav.signOut}
              </button>
            )}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#E7D5BC] dark:bg-[#25201A] text-[#C65D24] dark:text-[#E67E22] font-semibold'
                    : 'text-[#35251D] dark:text-[#F5EAE0] hover:bg-[#E7D5BC]/50 dark:hover:bg-[#25201A]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C65D24] dark:text-[#E67E22]' : 'text-[#777A50] dark:text-[#A3A67D]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {userRole === 'guest' && (
            <div className="pt-2 border-t border-[#E7D5BC]/80 dark:border-[#352C22]">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#C65D24] dark:bg-[#E67E22] hover:bg-[#9D4226] dark:hover:bg-[#D35400] rounded-lg shadow-sm cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.nav.login}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
