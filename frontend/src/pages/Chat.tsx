import { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowLeft, Send, Volume2, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { LanguageCode, LANG_LOCALE, getLanguageInfo } from '../data/courses';
import { useTranslation } from 'react-i18next';

interface ChatProps {
  onBack: () => void;
  lang?: string;
  user?: any;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const WELCOME_MESSAGES: Record<LanguageCode, string> = {
  zh: '你好！我是你的中文老师。你想聊些什么？ (Hello! I am your Chinese teacher. What would you like to talk about?)',
  es: '¡Hola! Soy tu profesora de español. ¿De qué te gustaría hablar hoy? (Hello! I am your Spanish teacher. What would you like to talk about today?)',
  fr: 'Bonjour ! Je suis votre professeur de français. De quoi aimeriez-vous parler aujourd\'hui ? (Hello! I am your French teacher. What would you like to talk about today?)',
  de: 'Hallo! Ich bin deine Deutschlehrerin. Worüber möchtest du heute sprechen? (Hello! I am your German teacher. What would you like to talk about today?)',
  ja: 'こんにちは！私はあなたの日本語の先生です。今日何について話したいですか？ (Hello! I am your Japanese teacher. What would you like to talk about today?)',
  ko: '안녕하세요! 저는 당신의 한국어 선생님입니다. 오늘 어떤 이야기를 나누고 싶으세요? (Hello! I am your Korean teacher. What would you like to talk about today?)',
  it: 'Ciao! Sono la tua insegnante di italiano. Di cosa ti piacerebbe parlare oggi? (Hello! I am your Italian teacher. What would you like to talk about today?)',
  en: 'Hello! I am your English teacher. What would you like to talk about today?',
  ar: 'أهلاً! أنا معلمتك للغة العربية. عن ماذا تحب أن نتحدث اليوم؟ (Hello! I am your Arabic teacher. What would you like to talk about today?)',
};

const QUICK_PROMPTS_BY_LANG: Record<LanguageCode, string[]> = {
  zh: [
    "你好！ (Say Hello)",
    "Introduce yourself in Chinese",
    "Give me an HSK 1 vocabulary tip",
    "How do I say 'Happy Birthday'?"
  ],
  es: [
    "¡Hola! (Say Hello)",
    "Introduce yourself in Spanish",
    "Give me a Spanish grammar tip",
    "How do I say 'Happy Birthday' in Spanish?"
  ],
  fr: [
    "Bonjour ! (Say Hello)",
    "Introduce yourself in French",
    "Give me a French pronunciation tip",
    "How do I say 'Happy Birthday' in French?"
  ],
  de: [
    "Hallo! (Say Hello)",
    "Introduce yourself in German",
    "Give me a German vocabulary tip",
    "How do I say 'Happy Birthday' in German?"
  ],
  ja: [
    "こんにちは！ (Say Hello)",
    "Introduce yourself in Japanese",
    "Give me a Japanese Kanji tip",
    "How do I say 'Happy Birthday' in Japanese?"
  ],
  ko: [
    "안녕하세요! (Say Hello)",
    "Introduce yourself in Korean",
    "Give me a Korean Hangul tip",
    "How do I say 'Happy Birthday' in Korean?"
  ],
  it: [
    "Ciao! (Say Hello)",
    "Introduce yourself in Italian",
    "Give me an Italian grammar tip",
    "How do I say 'Happy Birthday' in Italian?"
  ],
  en: [
    "Hello! (Say Hello)",
    "Introduce yourself in English",
    "Give me an English grammar tip",
    "How do I say 'Happy Birthday' in English?"
  ],
  ar: [
    "أهلاً! (Say Hello)",
    "Introduce yourself in Arabic",
    "Give me an Arabic script tip",
    "How do I say 'Happy Birthday' in Arabic?"
  ],
};

export default function Chat({ onBack, lang, user }: ChatProps) {
  const { t } = useTranslation();
  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const langLocale = LANG_LOCALE[activeLang] || 'zh-CN';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeVoiceMsgIdx, setActiveVoiceMsgIdx] = useState<number | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      { sender: 'bot', text: WELCOME_MESSAGES[activeLang] || WELCOME_MESSAGES.zh }
    ]);
  }, [activeLang]);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const res = (await api.sendMessage(userText, activeLang)) as any;
      setMessages(prev => [...prev, { sender: 'bot', text: res.reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'bot', text: `Bonjour! I am your AI ${langInfo.label} teacher. Let's study together.` }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string, index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.split('(')[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = langLocale;
      utterance.rate = 0.85;
      
      utterance.onstart = () => {
        setActiveVoiceMsgIdx(index);
      };
      
      utterance.onend = () => {
        setActiveVoiceMsgIdx(null);
      };
      
      utterance.onerror = () => {
        setActiveVoiceMsgIdx(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const quickPrompts = QUICK_PROMPTS_BY_LANG[activeLang] || QUICK_PROMPTS_BY_LANG.zh;

  return (
    <div className="w-full max-w-[850px] px-6 py-8 h-[90svh] flex flex-col justify-between space-y-4 text-left ml-0 bg-slate-950 rounded-[2.5rem] border border-slate-900 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-900 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          {t('dashboard', 'Dashboard')}
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/10">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white">{t('ai', 'AI')} {langInfo.label} {t('teacher', 'Teacher')}</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('interactive_emma_chat', 'Interactive Emma Chat')}</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-slate-950/40 p-6 rounded-3xl space-y-6 border border-slate-900 backdrop-blur-md relative z-10 shadow-inner max-h-[58svh]">
        {messages.map((m, idx) => {
          const isBot = m.sender === 'bot';
          const isAudioPlaying = activeVoiceMsgIdx === idx;
          return (
            <div
              key={idx}
              className={`flex items-end gap-3.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-850 flex items-center justify-center text-white text-xs font-bold shrink-0 relative shadow-md">
                  👩‍🏫
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />
                </div>
              )}
              
              <div className={`p-4 rounded-3xl max-w-sm text-sm font-medium relative group text-left border shadow-lg transition-all ${
                isBot
                  ? 'bg-slate-900/95 border-slate-850 text-slate-200 rounded-bl-sm'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 border-sky-455 text-white rounded-br-sm'
              }`}>
                <p className={isBot ? 'font-cn font-semibold leading-relaxed' : 'leading-relaxed font-semibold'}>{m.text}</p>
                
                {isBot && (
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => speakText(m.text, idx)}
                      className={`p-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        isAudioPlaying 
                          ? 'bg-sky-500 text-white scale-105' 
                          : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title={t('speak_phrase', 'Speak Phrase')}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-bounce' : ''}`} />
                      <span className="text-[9px] font-black uppercase tracking-wider">{t('listen', 'Listen')}</span>
                    </button>
                    
                    {/* Animated sound wave bars when speaking */}
                    {isAudioPlaying && (
                      <div className="flex items-center gap-0.5 px-2">
                        <span className="w-0.5 h-3.5 bg-sky-450 rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-5 bg-sky-400 rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-2.5 bg-sky-450 rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {!isBot && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 relative shadow-md border border-sky-400/20">
                  {user?.username?.slice(0, 2).toUpperCase() || 'ME'}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start items-center gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 border border-slate-850 flex items-center justify-center text-white text-xs font-bold shrink-0 animate-pulse">
              👩‍🏫
            </div>
            <div className="bg-slate-900/95 border border-slate-850 p-4 rounded-3xl rounded-bl-sm flex items-center gap-1.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Suggestions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 justify-start relative z-10">
          {quickPrompts.map(p => (
            <button
              key={p}
              onClick={() => {
                setInput(p.split('(')[0].trim());
              }}
              className="text-xs font-bold py-2.5 px-4 border border-slate-800 rounded-2xl bg-slate-900/60 text-slate-350 hover:text-white hover:border-sky-500 hover:bg-slate-900 transition-all flex items-center gap-1.5"
            >
              <Sparkles size={12} className="text-sky-400" />
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2 relative z-10 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask a question or practice typing ${langInfo.label}...`}
          className="flex-1 px-5 py-4 border border-slate-850 bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-100 font-bold"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl disabled:opacity-40 transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-sky-500/10"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}
