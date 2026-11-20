import React from 'react';
import { Sparkles, MessageSquare, BookOpen, Cpu, Languages, ArrowRight } from 'lucide-react';

interface ChatbotPreviewSectionProps {
  onOpenChatbot: (promptQuery?: string) => void;
}

export const ChatbotPreviewSection: React.FC<ChatbotPreviewSectionProps> = ({ onOpenChatbot }) => {
  const sampleQueries = [
    {
      marathi: "रायगडावरील हिरकणी बुरुजाचा ऐतिहासिक संदर्भ काय आहे?",
      english: "What is the historical context of Hirkani Bastion at Raigad?",
    },
    {
      marathi: "शिवनेरी किल्ल्यावर जाण्यासाठी पायऱ्यांची रचना आणि वेळ सांगा.",
      english: "Explain the staircase layout and time needed to climb Shivneri.",
    },
    {
      marathi: "मराठा लष्करी जलसंधारण तंत्रज्ञानाची (Water Harvesting) माहिती द्या.",
      english: "Tell me about Maratha military water harvesting techniques on forts.",
    },
    {
      marathi: "सिंहगडाच्या कल्याण दरवाजाचे सामरिक महत्त्व काय होते?",
      english: "What was the strategic importance of Kalyan Darwaja at Sinhagad?",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#E7D5BC]/30 border-b border-[#E7D5BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Research Conceptualization & Capabilities */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-3 font-mono">
              <span>RESEARCH INNOVATION</span>
              <span aria-hidden="true">·</span>
              <span>MAHARASHTRA HERITAGE INFORMATICS</span>
            </div>

            <h2 className="font-heritage text-2xl sm:text-3xl lg:text-4xl font-bold text-[#35251D] tracking-tight text-balance mb-4">
              AI-Powered Marathi Heritage Chatbot
            </h2>

            <p className="text-base text-[#35251D]/85 leading-relaxed mb-6">
              Unlike generic chatbots trained predominantly on Western corpora, our research architecture introduces an indigenous Marathi Natural Language Processing model tailored specifically for Maratha history, Modi script documentation references, military terminology, and oral folklore.
            </p>

            {/* Architectural Highlights Definition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-[#FAF5EC] border border-[#E7D5BC]">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#35251D] mb-1.5">
                  <Languages className="w-4 h-4 text-[#C65D24]" />
                  <span>Bilingual Dialect Parsing</span>
                </div>
                <p className="text-xs text-[#35251D]/75 leading-normal">
                  Processes pure Marathi (शुद्ध मराठी), colloquial Sahyadri dialects, and English inquiries with historical accuracy.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF5EC] border border-[#E7D5BC]">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#35251D] mb-1.5">
                  <BookOpen className="w-4 h-4 text-[#C65D24]" />
                  <span>Grounded Historical Knowledge</span>
                </div>
                <p className="text-xs text-[#35251D]/75 leading-normal">
                  Trained on verified archival records from Bakhars, Sabhasad Bakhar, and ASI archaeological reports.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF5EC] border border-[#E7D5BC]">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#35251D] mb-1.5">
                  <Cpu className="w-4 h-4 text-[#C65D24]" />
                  <span>Next-Gen Gemini Integration</span>
                </div>
                <p className="text-xs text-[#35251D]/75 leading-normal">
                  Engineered to leverage multimodal Gemini models for architectural recognition and Marathi text reasoning.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF5EC] border border-[#E7D5BC]">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#35251D] mb-1.5">
                  <MessageSquare className="w-4 h-4 text-[#C65D24]" />
                  <span>Trekker Safety Assessor</span>
                </div>
                <p className="text-xs text-[#35251D]/75 leading-normal">
                  Provides real-time trail difficulty assessment, monsoon safety warnings, and potable water point guidance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenChatbot()}
                className="px-6 py-3 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Chatbot Research Prototype</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Sample Inquiries Simulation */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7D5BC] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#C65D24] text-white flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <h3 className="font-heritage text-sm font-bold text-[#35251D]">
                      मराठी दुर्ग संवादक (Preview)
                    </h3>
                    <p className="text-[11px] text-[#777A50]">
                      Click any research inquiry to test the model preview
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#E7D5BC]/60 px-2 py-0.5 rounded text-[#35251D]">
                  Demo Prompts
                </span>
              </div>

              <div className="space-y-3">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenChatbot(q.marathi)}
                    className="w-full text-left p-3.5 rounded-lg border border-[#E7D5BC] hover:border-[#C65D24] hover:bg-[#E7D5BC]/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-devanagari text-sm font-medium text-[#35251D] group-hover:text-[#C65D24] transition-colors">
                        "{q.marathi}"
                      </p>
                      <ArrowRight className="w-4 h-4 text-[#777A50] group-hover:text-[#C65D24] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-[11px] text-[#35251D]/60 mt-1 italic">
                      {q.english}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#E7D5BC] flex items-center justify-between text-xs text-[#777A50]">
                <span>Corpus: Historical Bakhars & Sabhasad</span>
                <span>Language: Marathi (मराठी) / EN</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
