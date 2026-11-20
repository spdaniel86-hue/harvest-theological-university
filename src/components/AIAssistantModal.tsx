import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  Compass, 
  PhoneCall, 
  MessageSquare,
  ChevronDown,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "What faculties and programmes are offered?",
  "How do I apply for admission?",
  "Tell me about Chancellor Archbishop Prof. King Azor",
  "What degree levels are awarded (Cert to PhD)?",
  "Where is the university campus located?",
  "What are the international accreditations?",
  "What are the admission requirements?"
];

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `### Welcome to Harvester's Theological University (HATHUN)!\n\n*"WE ARE A SURE GUIDE TO YOUR DREAM"*\n\nI am your **HATHUN Automated AI Academic Advisor**. I can answer all questions regarding our **9 Academic Faculties**, admission requirements, degree progression (**Certificate to PhD**), governing leadership, international accreditations, and campus life at Ambam, Cameroon.\n\nHow may I assist your academic journey today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Thank you for contacting Harvester's Theological University. For direct assistance, you may also reach our registry on WhatsApp at +237 672 929 067.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      // Fallback response
      const fallbackMsg: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        sender: 'assistant',
        text: `### Admissions & Academic Support\n\n**Harvester's Theological University (HATHUN)** offers world-class education from **Certificate to PhD** across **9 Academic Faculties** (Theology, Law, Public Administration, Business, Agriculture, Medical Science, Arts, Political Science, Communication).\n\n- **Admissions Open**: Submit your online application via the **Admissions Section**.\n- **Direct Registry Line / WhatsApp**: **+237 672 929 067**\n- **Campus**: Ambam-yat, Ambam, South Region, Cameroon.\n- **Academic Documents**: Download official prospectuses, calendars, and handbooks in our **Document Centre**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        text: `Chat reset. How can I assist you with your inquiries about **Harvester's Theological University**?`,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render basic markdown formatting cleanly
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-heading font-bold text-sm sm:text-base text-[#d4af37] pt-1 pb-0.5 border-b border-slate-800">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-heading font-extrabold text-base text-white pt-1">
                {line.replace('## ', '')}
              </h3>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const content = line.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-[#d4af37] font-bold mt-0.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-[#d4af37]">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-[#060e1d] text-sky-300 px-1 py-0.5 rounded font-mono text-[11px]">$1</code>');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#08152e] border border-[#1b3d75] sm:rounded-2xl w-full sm:max-w-2xl h-[92vh] sm:h-[82vh] max-h-[750px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0a1c3e] via-[#0d2754] to-[#08152e] border-b border-[#1b3d75] p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#060e1d] border border-[#d4af37]/80 flex items-center justify-center text-[#d4af37] shadow">
                <HathunLogo variant="seal" size="sm" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#08152e]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-bold text-sm sm:text-base text-white tracking-wide">
                  HATHUN AI Academic Assistant
                </h3>
                <span className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  24/7 Guide
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Official automated guidance for admissions, faculties & leadership
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition cursor-pointer"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
              title="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Institutional Action Bar */}
        <div className="bg-[#060f22] border-b border-slate-800 px-3 sm:px-4 py-2 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium">
            <Sparkles className="w-3 h-3 text-[#d4af37]" /> Quick Links:
          </span>
          <button
            onClick={() => {
              onClose();
              onNavigateSection('admissions');
            }}
            className="flex-shrink-0 px-2.5 py-1 rounded bg-[#0b2149] hover:bg-[#12316a] text-white border border-[#1b3d75] transition flex items-center gap-1 cursor-pointer font-semibold"
          >
            <FileText className="w-3 h-3 text-[#d4af37]" /> Apply for Admission
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateSection('documents');
            }}
            className="flex-shrink-0 px-2.5 py-1 rounded bg-[#0b2149] hover:bg-[#12316a] text-white border border-[#1b3d75] transition flex items-center gap-1 cursor-pointer font-semibold"
          >
            <BookOpen className="w-3 h-3 text-sky-400" /> Documents & Forms
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateSection('faculties');
            }}
            className="flex-shrink-0 px-2.5 py-1 rounded bg-[#0b2149] hover:bg-[#12316a] text-white border border-[#1b3d75] transition flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Compass className="w-3 h-3 text-emerald-400" /> 9 Faculties
          </button>

          <a
            href="https://wa.me/237672929067?text=Hello%20HATHUN%20Admissions%20Registry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-2.5 py-1 rounded bg-[#0f3422] hover:bg-[#174d32] text-emerald-300 border border-emerald-700/60 transition flex items-center gap-1 font-semibold"
          >
            <PhoneCall className="w-3 h-3" /> WhatsApp Registry
          </a>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#050d1e]/80">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#0a1e42] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-3.5 sm:p-4 shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-[#173a74] to-[#122e5c] text-white border border-[#2d5aa3]'
                      : 'bg-[#0b1b38] text-slate-200 border border-[#1d3d72]'
                  }`}
                >
                  {isUser ? (
                    <p className="text-xs sm:text-sm font-medium">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isUser ? 'text-sky-300 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-[#0a1e42] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#0b1b38] border border-[#1d3d72] rounded-xl px-4 py-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-300 ml-1">Consulting HATHUN Academic Knowledge Base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Shelf */}
        <div className="bg-[#071328] border-t border-slate-800 p-2.5 sm:p-3 overflow-x-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1.5 px-1">
            Suggested Inquiries:
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="flex-shrink-0 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white bg-[#0b1c3a] hover:bg-[#133060] border border-slate-700/80 rounded-full transition cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-[#08152e] border-t border-[#1b3d75] p-3 sm:p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about admissions, faculties, degrees, Chancellor, brochure..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1 bg-[#050e1f] border border-slate-700 focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition shadow-inner"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#c59b27] text-[#060e1d] font-bold rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-heading uppercase tracking-wider">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
