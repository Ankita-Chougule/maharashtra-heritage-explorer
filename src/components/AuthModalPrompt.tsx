import React from 'react';
import { Lock, X, ArrowRight, UserCheck } from 'lucide-react';

interface AuthModalPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLogin: () => void;
  actionMessage?: string;
}

export const AuthModalPrompt: React.FC<AuthModalPromptProps> = ({
  isOpen,
  onClose,
  onNavigateToLogin,
  actionMessage = "This feature requires an account to store your personal data, bookings, or research submissions.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="relative bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#777A50] hover:text-[#35251D] hover:bg-[#E7D5BC]/40 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-[#E7D5BC] text-[#C65D24] flex items-center justify-center mb-4">
          <Lock className="w-6 h-6" />
        </div>

        <div className="text-xs font-semibold text-[#777A50] uppercase tracking-wider font-mono mb-1">
          GUEST ACCESS NOTICE
        </div>

        <h3 className="font-heritage text-xl font-bold text-[#35251D] mb-2">
          Sign In or Select Your Role
        </h3>

        <p className="text-xs text-[#35251D]/80 leading-relaxed mb-6">
          {actionMessage} Public browsing remains completely free and unrestricted across all forts, events, guides, and the AI chatbot.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              onNavigateToLogin();
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            <span>Select Role / Sign In</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/40 text-xs font-medium text-[#35251D] transition-colors cursor-pointer"
          >
            Continue Browsing as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
