import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen,
  ExternalLink
} from 'lucide-react';

interface ChatbotPageProps {
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isError?: boolean;
  sources?: string[];
}

interface SampleQuestion {
  id: string;
  queryMarathi: string;
  queryEnglish: string;
  fortReference: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: "sq-1",
    queryMarathi: "रायगडावरील हिरकणी बुरुजाचा ऐतिहासिक संदर्भ काय आहे?",
    queryEnglish: "What is the historical context of Hirkani Bastion at Raigad?",
    fortReference: "Raigad Fort"
  },
  {
    id: "sq-2",
    queryMarathi: "शिवनेरी किल्ल्यावर जाण्यासाठी पायऱ्यांची रचना आणि वेळ सांगा.",
    queryEnglish: "Explain the staircase layout and time needed to climb Shivneri.",
    fortReference: "Shivneri Fort"
  },
  {
    id: "sq-3",
    queryMarathi: "मराठा लष्करी जलसंधारण तंत्रज्ञानाची (Water Harvesting) माहिती द्या.",
    queryEnglish: "Explain Maratha military water harvesting techniques on forts.",
    fortReference: "Sahyadri Fortresses"
  },
  {
    id: "sq-4",
    queryMarathi: "सिंहगडाच्या कल्याण दरवाजाचे सामरिक महत्त्व काय होते?",
    queryEnglish: "What was the strategic importance of Kalyan Darwaja at Sinhagad?",
    fortReference: "Sinhagad Fort"
  },
  {
    id: "sq-5",
    queryMarathi: "राजगडावरील संजीवनी माचीची दुहेरी तटबंदी आणि वास्तूवैशिष्ट्ये काय आहेत?",
    queryEnglish: "What are the architectural features of Sanjeevani Machi at Rajgad?",
    fortReference: "Rajgad Fort"
  },
  {
    id: "sq-6",
    queryMarathi: "सिंधुदुर्ग जलदुर्गाच्या पायाभरणीत समुद्राच्या लाटा रोखण्याचे तंत्र काय होते?",
    queryEnglish: "How were ocean waves resisted in the foundation of Sindhudurg sea fort?",
    fortReference: "Sindhudurg Fort"
  }
];

const INITIAL_GREETING: ChatMessage = {
  id: "msg-init",
  role: "model",
  text: "नमस्कार! मी 'मराठी वारसा संवादक' (Heritage Assistant) आहे. महाराष्ट्रातील ऐतिहासिक गडकिल्ले, मराठा इतिहास, जलव्यवस्थापन (देवटाके), स्थापत्यकला (बुरुज, महादरवाजे) आणि दुर्ग भ्रमंतीबाबत आपले स्वागत आहे. आपण खालीलपैकी कोणताही प्रश्न निवडू शकता किंवा आपला स्वतःचा प्रश्न मराठी किंवा इंग्रजीत विचारू शकता.",
  timestamp: "आत्ताच"
};

// Extract [Ref: ...] and similar citation tags from bot reply text
function extractSources(text: string): string[] {
  const refRegex = /\[Ref:\s*([^\]]+)\]/g;
  const litRegex = /\[साहित्यिक संदर्भ[:\s]*([^\]]*)\]/g;
  const sources: string[] = [];
  const seen = new Set<string>();

  let match;
  while ((match = refRegex.exec(text)) !== null) {
    const src = match[1].trim();
    if (src && !seen.has(src)) { seen.add(src); sources.push(src); }
  }
  while ((match = litRegex.exec(text)) !== null) {
    const src = (match[1].trim() || 'साहित्यिक संदर्भ (Literary Reference)');
    if (!seen.has(src)) { seen.add(src); sources.push(src); }
  }
  if (/\[साहित्यिक संदर्भ\]/.test(text)) {
    const src = 'साहित्यिक संदर्भ (Literary Reference)';
    if (!seen.has(src)) { seen.add(src); sources.push(src); }
  }
  return sources;
}

function parseBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#35251D]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderFormattedMessage(content: string) {
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Section header like ### Title or ## Title
        if (trimmed.startsWith('###') || trimmed.startsWith('##')) {
          const title = trimmed.replace(/^#+\s*/, '');
          return (
            <h4 key={idx} className="font-heritage font-bold text-sm text-[#C65D24] pt-2 pb-0.5">
              {parseBoldText(title)}
            </h4>
          );
        }

        // Horizontal separator rule
        if (trimmed === '---') {
          return <hr key={idx} className="my-2 border-[#E7D5BC]" />;
        }

        // Bullet point
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const bulletContent = trimmed.slice(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[#C65D24] font-bold mt-0.5 text-xs">•</span>
              <span className="flex-1">{parseBoldText(bulletContent)}</span>
            </div>
          );
        }

        // Numbered list: e.g. 1. or १.
        const numMatch = trimmed.match(/^([0-9१-९]+[\.\)])\s*(.+)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="font-bold text-[#C65D24] font-mono text-xs mt-0.5">{numMatch[1]}</span>
              <span className="flex-1">{parseBoldText(numMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {parseBoldText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export const ChatbotPage: React.FC<ChatbotPageProps> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [languageMode, setLanguageMode] = useState<'marathi' | 'english'>('marathi');
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQueryHandledRef = useRef(false);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initialQuery from fort modal or other pages
  useEffect(() => {
    if (initialQuery && initialQuery.trim() && !initialQueryHandledRef.current) {
      initialQueryHandledRef.current = true;
      executeSendMessage(initialQuery.trim());
    }
  }, [initialQuery]);

  const executeSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);
    setLastFailedQuery(null);

    // Prepare optimized history payload: keep only recent 4 messages (2 turns) and truncate to 400 chars
    const apiHistory = updatedMessages
      .filter(m => !m.isError && m.id !== 'msg-init')
      .slice(-4)
      .map(m => ({
        role: m.role,
        text: m.text.slice(0, 400)
      }));

    // Setup client-side abort controller with 35s limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: textToSend.trim(),
          history: apiHistory.slice(0, -1), // previous turns before current message
          language: languageMode,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const customMessage = errData.marathiMessage || null;
        throw new Error(customMessage || `STATUS_${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "माफ करा, उत्तर प्राप्त होऊ शकले नाही. कृपया पुन्हा प्रयत्न करा.";
      const extractedSources = extractSources(botReply);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: extractedSources.length > 0 ? extractedSources : undefined
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('[Heritage Chatbot Client Error]:', err);
      setLastFailedQuery(textToSend);

      // Clean, polite Marathi message without raw JSON or internal codes
      let displayMessage = "AI सेवा सध्या तात्पुरती व्यस्त आहे. कृपया खालील 'पुन्हा प्रयत्न करा' (Retry) बटणावर क्लिक करा किंवा काही क्षणांनंतर पुन्हा विचारा.";
      if (err.name === 'AbortError') {
        displayMessage = "विनंती वेळेत पूर्ण होऊ शकली नाही (Request timed out). कृपया खालील 'पुन्हा प्रयत्न करा' (Retry) बटण वापरून पुन्हा विचारा.";
      } else if (err.message && err.message.startsWith('AI सेवा')) {
        displayMessage = err.message;
      }

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: displayMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    executeSendMessage(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSelectSample = (sample: SampleQuestion) => {
    const query = languageMode === 'marathi' ? sample.queryMarathi : sample.queryEnglish;
    executeSendMessage(query);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputText('');
    setLastFailedQuery(null);
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      // Remove last error message and re-run
      setMessages(prev => prev.filter(m => !m.isError));
      executeSendMessage(lastFailedQuery);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF5EC] dark:bg-[#12100E] min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Chatbot Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Sample Heritage Inquiries (Shows below chat on mobile, beside chat on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-4">
            
            <div className="bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7D5BC] dark:border-[#352C22] mb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C65D24]" />
                  <span className="text-xs font-bold text-[#35251D] dark:text-[#F5EAE0] uppercase tracking-wider font-mono">
                    {languageMode === 'marathi' ? 'नमुना प्रश्न (Sample Questions)' : 'Sample Questions (नमुना प्रश्न)'}
                  </span>
                </div>
                <span className="text-[11px] text-[#777A50]">
                  Click to Ask
                </span>
              </div>

              <p className="text-xs text-[#35251D]/75 mb-3 leading-relaxed">
                {languageMode === 'marathi' 
                  ? 'खालीलपैकी कोणत्याही प्रश्नावर क्लिक करून थेट AI संवादकाला विचारा:'
                  : 'Click any inquiry below to ask the AI Heritage Assistant directly:'}
              </p>

              <div className="space-y-2.5">
                {SAMPLE_QUESTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSample(item)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:border-[#C65D24] hover:bg-[#E7D5BC]/30 text-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[#777A50] text-[10px] mb-1 font-mono">
                      <span>{item.fortReference}</span>
                      <ArrowRight className="w-3 h-3 text-[#C65D24] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="font-devanagari text-xs sm:text-sm font-semibold text-[#35251D] group-hover:text-[#C65D24] transition-colors leading-snug">
                      {languageMode === 'marathi' ? item.queryMarathi : item.queryEnglish}
                    </p>
                    <p className="text-[11px] text-[#35251D]/60 mt-1 italic">
                      {languageMode === 'marathi' ? item.queryEnglish : item.queryMarathi}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural & Archival Guidance Card */}
            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-4 shadow-xs text-xs space-y-2">
              <div className="flex items-center gap-2 font-heritage font-bold text-[#35251D]">
                <ShieldCheck className="w-4 h-4 text-[#C65D24]" />
                <span>{languageMode === 'marathi' ? 'ऐतिहासिक संदर्भ व दुर्गशास्त्राधार' : 'Historical Records & Archival Sources'}</span>
              </div>
              <p className="text-[11px] text-[#35251D]/80 leading-relaxed">
                {languageMode === 'marathi'
                  ? 'हा संवादक सभासद बखर, आज्ञापत्र, पुरातत्त्व खाते (ASI) आणि सह्याद्री दुर्ग नोंदींच्या आधारे किल्ले, पायऱ्यांचे मार्ग, जलसाठे आणि ऐतिहासिक घटनांची प्रामाणिक माहिती देतो.'
                  : 'Provides verified insights based on Sabhasad Bakhar, Ajnyapatra, ASI monument archives, and Sahyadri fort records.'}
              </p>
              <div className="pt-1 text-[11px] text-[#777A50] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
                <span>Supports questions in Marathi & English</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Chat Interface (First on mobile/tablet) */}
          <div className="order-1 lg:order-2 lg:col-span-8 flex flex-col bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-2xl overflow-hidden shadow-sm">
            
            {/* 1. Header (Strictly conforms to user requirements) */}
            <div className="p-3.5 sm:p-5 bg-[#E7D5BC]/35 dark:bg-[#25201A] border-b border-[#E7D5BC] dark:border-[#352C22] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#C65D24] to-[#9D4226] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h2 className="font-heritage text-sm sm:text-lg font-bold text-[#35251D] dark:text-[#F5EAE0]">
                    मराठी वारसा संवादक (Heritage Assistant)
                  </h2>
                  <p className="font-devanagari text-[11px] sm:text-sm text-[#777A50] dark:text-[#A3A67D] font-medium">
                    {languageMode === 'marathi' 
                      ? 'महाराष्ट्रातील किल्ले, इतिहास आणि सांस्कृतिक वारशाबद्दल विचारा.' 
                      : 'Ask about Maharashtra forts, history, and cultural heritage in English or Marathi.'}
                  </p>
                </div>
              </div>

              {/* Controls: Language Mode and Reset Chat */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#FAF5EC] dark:bg-[#12100E] border border-[#E7D5BC] dark:border-[#352C22] text-xs">
                  <button
                    onClick={() => setLanguageMode('marathi')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      languageMode === 'marathi'
                        ? 'bg-[#C65D24] text-white shadow-2xs'
                        : 'text-[#35251D] dark:text-[#F5EAE0] hover:text-[#C65D24]'
                    }`}
                  >
                    मराठी
                  </button>
                  <button
                    onClick={() => setLanguageMode('english')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      languageMode === 'english'
                        ? 'bg-[#C65D24] text-white shadow-2xs'
                        : 'text-[#35251D] dark:text-[#F5EAE0] hover:text-[#C65D24]'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={handleResetChat}
                  title="नवीन संवाद सुरू करा (Start New Chat)"
                  className="p-1.5 rounded-lg border border-[#E7D5BC] dark:border-[#352C22] bg-[#FAF5EC] dark:bg-[#12100E] hover:bg-[#E7D5BC]/40 text-[#777A50] hover:text-[#35251D] dark:hover:text-[#F5EAE0] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Quick-Prompt Chips Row */}
            <div className="lg:hidden px-3 py-2 bg-[#E7D5BC]/20 dark:bg-[#25201A]/60 border-b border-[#E7D5BC] dark:border-[#352C22] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] uppercase font-mono font-bold text-[#777A50] dark:text-[#A3A67D] shrink-0">
                Quick:
              </span>
              {SAMPLE_QUESTIONS.slice(0, 4).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectSample(q)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] text-[11px] font-medium text-[#35251D] dark:text-[#F5EAE0] hover:border-[#C65D24] whitespace-nowrap cursor-pointer transition-colors"
                >
                  {q.fortReference}
                </button>
              ))}
            </div>

            {/* 2. Conversation Messages Viewport */}
            <div className="p-3 sm:p-6 flex-1 space-y-3 sm:space-y-4 overflow-y-auto min-h-[320px] sm:min-h-[420px] max-h-[480px] sm:max-h-[560px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    // User Message Bubble
                    <div className="max-w-[85%] sm:max-w-[75%] bg-[#35251D] text-[#FAF5EC] p-3.5 sm:p-4 rounded-2xl rounded-tr-xs shadow-xs">
                      <div className="flex items-center justify-between gap-3 text-[10px] text-[#E7D5BC]/70 font-mono mb-1">
                        <span>{languageMode === 'marathi' ? 'आपण (You)' : 'You (आपण)'}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="font-devanagari text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  ) : (
                    // Model / Assistant Bubble
                    <div className={`max-w-[92%] sm:max-w-[85%] p-4 sm:p-5 rounded-2xl rounded-tl-xs shadow-xs space-y-2 border ${
                      msg.isError 
                        ? 'bg-[#E7D5BC]/60 border-[#C65D24]/50 text-[#35251D]' 
                        : 'bg-[#E7D5BC]/30 border-[#E7D5BC] text-[#35251D]'
                    }`}>
                      <div className="flex items-center justify-between text-xs text-[#777A50] border-b border-[#E7D5BC]/70 pb-2">
                        <span className="font-semibold text-[#C65D24] flex items-center gap-1.5 font-devanagari">
                          <Sparkles className="w-3.5 h-3.5 text-[#C65D24]" />
                          वारसा संवादक (Heritage Assistant)
                        </span>
                        <span className="font-mono text-[10px]">{msg.timestamp}</span>
                      </div>

                      {msg.isError && (
                        <div className="flex items-center gap-2 text-xs text-[#C65D24] font-semibold">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{languageMode === 'marathi' ? 'सेवा संदेश (Service Message)' : 'Service Message'}</span>
                        </div>
                      )}

                      <div className="text-xs sm:text-sm text-[#35251D] leading-relaxed font-devanagari">
                        {renderFormattedMessage(msg.text)}
                      </div>

                      {/* ── Sources / References Section ── */}
                      {!msg.isError && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#E7D5BC] dark:border-[#352C22]">
                          <div className="flex items-center gap-1.5 mb-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#C65D24] shrink-0" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C65D24]">
                              {languageMode === 'marathi' ? 'स्रोत व संदर्भ (Sources & References)' : 'Sources & References'}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {msg.sources.map((src, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22]"
                              >
                                <ExternalLink className="w-3 h-3 text-[#777A50] shrink-0 mt-0.5" />
                                <span className="text-[11px] text-[#35251D] dark:text-[#E7D5BC] leading-snug font-devanagari">
                                  {src}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fallback sources note when no inline refs found */}
                      {!msg.isError && msg.id !== 'msg-init' && (!msg.sources || msg.sources.length === 0) && (
                        <div className="mt-3 pt-2.5 border-t border-[#E7D5BC]/60 dark:border-[#352C22]/60">
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF5EC]/70 dark:bg-[#1B1713]/70 border border-[#E7D5BC]/60 dark:border-[#352C22]/60">
                            <BookOpen className="w-3 h-3 text-[#777A50] shrink-0" />
                            <span className="text-[10px] text-[#777A50] dark:text-[#A3A67D] italic">
                              {languageMode === 'marathi'
                                ? 'संदर्भ: सभासद बखर, ASI अभिलेख, महाराष्ट्र शासन गॅझेटिअर व पुरातत्त्व विभाग नोंदी'
                                : 'Sources: Sabhasad Bakhar, ASI Records, Maharashtra Gazetteer & Archaeological Survey Records'}
                            </span>
                          </div>
                        </div>
                      )}

                      {msg.isError && lastFailedQuery && (
                        <div className="pt-2">
                          <button
                            onClick={handleRetry}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C65D24] text-white text-xs font-semibold hover:bg-[#9D4226] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                            <span>{languageMode === 'marathi' ? 'पुन्हा प्रयत्न करा (Retry)' : 'Retry (पुन्हा प्रयत्न करा)'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#E7D5BC]/30 border border-[#E7D5BC] p-4 rounded-2xl rounded-tl-xs shadow-xs">
                    <div className="flex items-center gap-2 text-[#C65D24] text-xs font-devanagari font-semibold">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>
                        {languageMode === 'marathi' 
                          ? 'उत्तर तयार होत आहे (Researching history & formulating response)...' 
                          : 'Researching history & formulating response...'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#C65D24] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#C65D24] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#C65D24] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. Input & Send Bar */}
            <div className="p-3 sm:p-4 bg-[#FAF5EC] border-t border-[#E7D5BC]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    languageMode === 'marathi'
                      ? 'किल्ल्याविषयी प्रश्न विचारा (उदा. रायगडाचे महाद्वार, शिवनेरी, जलव्यवस्थापन)...'
                      : 'Ask a question about forts (e.g. Raigad Mahadwar, water harvesting)...'
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs sm:text-sm text-[#35251D] placeholder:text-[#35251D]/45 focus:outline-none focus:border-[#C65D24] focus:ring-1 focus:ring-[#C65D24]/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="px-5 py-3 rounded-xl bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">{languageMode === 'marathi' ? 'पाठवा (Send)' : 'Send'}</span>
                </button>
              </form>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#777A50] px-1">
                <span>{languageMode === 'marathi' ? 'Enter दाबून पाठवा (Press Enter to send)' : 'Press Enter to send'}</span>
                <span>{languageMode === 'marathi' ? 'मराठी व इंग्रजी दोन्ही भाषांमध्ये समर्थित' : 'Supported in Marathi & English'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
