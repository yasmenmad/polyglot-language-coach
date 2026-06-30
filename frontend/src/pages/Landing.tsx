import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, setActiveLanguage, LanguageCode } from '../data/courses';
import Flag from '../components/Flag';
import { 
  Sparkles, 
  Zap, 
  BrainCircuit, 
  Trophy, 
  MessageCircle, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Globe, 
  Volume2, 
  Mic, 
  Award,
  Video,
  Flame,
  Tv,
  Check
} from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onGetStarted: () => void;
  onGuestMode?: () => void;
}

export default function Landing({ onLogin, onGetStarted, onGuestMode }: LandingProps) {
  const { t } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'speak' | 'ai-chat'>('speak');
  
  // Speak demo states
  const [isListening, setIsListening] = useState(false);
  const [speakScore, setSpeakScore] = useState<number | null>(null);
  const [speakStage, setSpeakStage] = useState<'idle' | 'listening' | 'analyzing' | 'done'>('idle');

  // AI Chat demo states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user', text: string }>>([
    { sender: 'ai', text: "Bonjour! Welcome to Paris. What would you like to order today? ☕" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const startSpeakDemo = () => {
    setSpeakStage('listening');
    setTimeout(() => {
      setSpeakStage('analyzing');
      setTimeout(() => {
        setSpeakScore(98);
        setSpeakStage('done');
      }, 1500);
    }, 2000);
  };

  const resetSpeakDemo = () => {
    setSpeakStage('idle');
    setSpeakScore(null);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setUserInput('');
    setAiTyping(true);

    setTimeout(() => {
      setAiTyping(false);
      let reply = "Perfect! Your French is excellent. I'll get that ready for you immediately. 🥐";
      if (userText.toLowerCase().includes('croissant')) {
        reply = "Excellent choice! Un croissant et un café, c'est délicieux. That will be 4.50€! 🥖";
      } else if (userText.toLowerCase().includes('eau')) {
        reply = "D'accord, une bouteille d'eau minérale pour vous. Anything else?";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1500);
  };

  const selectLanguage = (code: LanguageCode) => {
    setActiveLanguage(code);
    // Save chosen language code in localStorage
    localStorage.setItem('hx_language', code);
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0c1322] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 relative selection:bg-brand-blue/30 overflow-x-hidden">
      
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] rounded-full bg-brand-blue/5 dark:bg-brand-blue/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 -z-10 w-[500px] h-[500px] rounded-full bg-brand-green/5 dark:bg-brand-green/2 blur-[120px] pointer-events-none" />

      {/* --- DUOLINGO STYLE HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-md border-b-2 border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform duration-300">
              <Globe className="text-white animate-spin-slow" size={22} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-outfit">
              {t('polyglot', 'polyglot')}
            </span>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-black text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('features', 'FEATURES')}</a>
            <a href="#why-polyglot" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('methodology', 'METHODOLOGY')}</a>
            <a href="#testimonials" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('testimonials', 'TESTIMONIALS')}</a>
          </nav>

          {/* Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider text-brand-blue hover:bg-brand-blue/5 border-2 border-brand-blue/20 transition-all active:scale-95 duration-150"
            >
              {t('sign_in', 'Sign In')}
            </button>
            <button 
              onClick={onGetStarted}
              className="px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-brand-green border-b-4 border-brand-green-dark hover:brightness-105 active:border-b-0 active:translate-y-[4px] shadow-sm transition-all duration-150"
            >
              {t('get_started', 'Get Started')}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white dark:bg-[#0c1322] border-b border-slate-150 dark:border-slate-800 flex flex-col p-6 gap-6 md:hidden animate-fade-in-down">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-slate-700 dark:text-slate-300">{t('features', 'FEATURES')}</a>
          <a href="#why-polyglot" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-slate-700 dark:text-slate-300">{t('methodology', 'METHODOLOGY')}</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black text-slate-700 dark:text-slate-300">{t('testimonials', 'TESTIMONIALS')}</a>
          <hr className="border-slate-100 dark:border-slate-800" />
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); onLogin(); }}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-brand-blue border-2 border-brand-blue/20 text-center"
            >
              {t('sign_in', 'Sign In')}
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-brand-green border-b-4 border-brand-green-dark text-center"
            >
              {t('get_started', 'Get Started')}
            </button>
            {onGuestMode && (
              <button 
                onClick={() => { setMobileMenuOpen(false); onGuestMode(); }}
                className="w-full py-3 text-sm font-bold text-slate-500 dark:text-slate-400 text-center hover:underline"
              >
                {t('try_as_guest', 'Try as Guest')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-20 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Left: 3D Mascot Illustration */}
        <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
          <div className="relative max-w-[380px] md:max-w-[450px]">
            {/* Mascot Image */}
            <div className="animate-float relative z-10">
              <img 
                src="/mascot.png" 
                alt={t('polyglot_mascot_owl', 'Polyglot Mascot Owl')} 
                className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(88,204,2,0.15)] dark:drop-shadow-[0_16px_32px_rgba(28,176,246,0.1)]"
              />
            </div>
            
            {/* Decorative backgrounds */}
            <div className="absolute top-[40%] left-[-15%] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl shadow-lg z-20 flex items-center gap-3 animate-pulse">
              <div className="bg-brand-green/20 p-2 rounded-xl text-brand-green-dark dark:text-brand-green">
                <Flame size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-slate-900 dark:text-white font-black text-sm leading-tight">{t('5_day_streak', '5-Day Streak')}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{t('keep_it_up', 'Keep it up!')}</div>
              </div>
            </div>

            <div className="absolute bottom-[20%] right-[-10%] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl shadow-lg z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="bg-brand-blue/20 p-2 rounded-xl text-brand-blue">
                <Trophy size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-slate-900 dark:text-white font-black text-sm leading-tight">{t('emerald_league', 'Emerald League')}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{t('rank_3', 'Rank #3')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pitch & CTA */}
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue-dark dark:text-brand-blue font-black text-xs uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>{t('the_new_era_of_language_learning', 'The New Era of Language Learning')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.15] tracking-tight text-slate-850 dark:text-white mb-6 font-outfit">
            {t('the_free_fun_and', 'The free, fun, and')} <br/>
            <span className="text-brand-green">{t('effective', 'effective')}</span> {t('way_to', 'way to')} <br/>
            {t('learn_a_language', 'learn a language!')}
          </h1>

          <p className="text-lg font-bold text-slate-400 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
            {t('learn_with_actual_youtube_video_clips_pr', 'Learn with actual YouTube video clips, practice speaking with advanced voice synthesis, and hold natural roleplay conversations with our smart AI tutor.')}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button 
              onClick={onGetStarted}
              className="flex-1 py-4 bg-brand-green border-b-[5px] border-brand-green-dark hover:brightness-105 active:border-b-0 active:translate-y-[5px] text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-md transition-all duration-100 flex items-center justify-center gap-2"
            >
              {t('get_started', 'Get Started')} <ArrowRight size={18} />
            </button>
            
            <button 
              onClick={onLogin}
              className="flex-1 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 border-b-[5px] dark:border-b-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 active:border-b-2 active:translate-y-[3px] text-brand-blue font-black text-base uppercase tracking-wider rounded-2xl shadow-sm transition-all duration-100"
            >
              {t('i_have_an_account', 'I have an account')}
            </button>
          </div>

          {onGuestMode && (
            <button 
              onClick={onGuestMode}
              className="mt-5 text-sm font-black text-slate-450 dark:text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
            >
              {t('or_try_guest_mode_no_account_required', 'Or Try Guest Mode (No Account Required) →')}
            </button>
          )}
        </div>
      </section>

      {/* --- LANG STRIP (CHOOSE LANGUAGE) --- */}
      <section className="border-y-2 border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#0f172a]/40 py-10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            {t('choose_your_target_language_to_start', 'Choose Your Target Language to Start')}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className="group flex items-center gap-3 bg-white dark:bg-[#0c1322] border-2 border-slate-200 dark:border-slate-800/80 border-b-[4px] dark:border-b-slate-700/80 rounded-2xl p-4 hover:border-brand-blue hover:bg-slate-50 dark:hover:bg-slate-850 hover:-translate-y-[2px] transition-all duration-150 active:translate-y-[2px] active:border-b-2 text-left"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-200">
                  <Flag code={lang.code} size={28} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">{t('learn', 'LEARN')}</div>
                  <div className="font-black text-sm text-slate-750 dark:text-white truncate">{t(lang.label, lang.label)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO SHOWCASE --- */}
      <section id="demo" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit mb-3">
            {t('see_how_it_works', 'See how it works')}
          </h2>
          <p className="text-slate-450 dark:text-slate-400 font-bold">
            {t('interactive_bite_sized_tasks_that_get_yo', 'Interactive, bite-sized tasks that get you speaking and understanding right away.')}
          </p>
        </div>

        <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-slate-150 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 p-2 gap-2">
            <button
              onClick={() => setActiveTab('speak')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'speak' 
                  ? 'bg-white dark:bg-slate-800 text-brand-blue border border-slate-200 dark:border-slate-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Mic size={16} /> {t('speak_lab_demo', 'Speak Lab Demo')}
            </button>
            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'ai-chat' 
                  ? 'bg-white dark:bg-slate-800 text-brand-blue border border-slate-200 dark:border-slate-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MessageCircle size={16} /> {t('ai_chat_demo', 'AI Chat Demo')}
            </button>
          </div>

          {/* Demo Content */}
          <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-between">
            {activeTab === 'speak' ? (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t('speak_this_sentence', 'Speak this sentence')}</span>
                    <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 dark:bg-brand-blue/20 px-2.5 py-1 rounded-full">{t('spanish_beginner', 'Spanish (Beginner)')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
                    <div className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2 font-outfit">
                      {t('buenos_d_as_c_mo_est_s', '"Buenos días, ¿cómo estás?"')}
                    </div>
                    <div className="text-sm font-bold text-slate-400 dark:text-slate-500">
                      {t('meaning_good_morning_how_are_you', 'Meaning: Good morning, how are you?')}
                    </div>

                    {speakStage === 'listening' && (
                      <div className="absolute inset-0 bg-brand-blue/5 backdrop-blur-xxs flex items-center justify-center gap-1 animate-pulse">
                        <div className="w-1.5 h-6 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-1.5 h-10 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-1.5 h-8 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <div className="w-1.5 h-12 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0.45s' }} />
                        <div className="w-1.5 h-6 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                      </div>
                    )}

                    {speakStage === 'analyzing' && (
                      <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-xxs flex flex-col items-center justify-center gap-2">
                        <div className="w-6 h-6 border-3 border-brand-blue border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-black text-brand-blue uppercase tracking-widest">{t('analyzing_accent', 'Analyzing Accent...')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {speakStage === 'idle' && (
                  <div className="flex flex-col items-center gap-3 pt-4">
                    <button 
                      onClick={startSpeakDemo}
                      className="px-8 py-3.5 bg-brand-blue border-b-4 border-brand-blue-dark text-white font-black text-sm uppercase tracking-wider rounded-2xl active:border-b-0 active:translate-y-[4px] shadow-md flex items-center gap-2 hover:brightness-105"
                    >
                      <Mic size={18} /> {t('tap_to_record', 'TAP TO RECORD')}
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold">{t('click_the_button_pretend_to_read_and_wat', 'Click the button, pretend to read, and watch it grade!')}</span>
                  </div>
                )}

                {speakStage === 'listening' && (
                  <div className="text-center pt-4">
                    <span className="text-xs font-black text-red-500 uppercase tracking-widest animate-pulse">{t('recording_speech', 'Recording Speech...')}</span>
                  </div>
                )}

                {speakStage === 'done' && speakScore && (
                  <div className="space-y-4 pt-4 flex flex-col items-center animate-fade-in">
                    <div className="flex items-center gap-4 bg-brand-green-bg dark:bg-brand-green/10 border-2 border-brand-green/20 p-4 rounded-2xl max-w-md">
                      <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-black text-lg shadow-sm">
                        {speakScore}%
                      </div>
                      <div>
                        <div className="text-slate-800 dark:text-white font-black text-sm">{t('perfect_pronunciation', 'Perfect pronunciation!')}</div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('excellent_tone_rhythm_and_clear_vowel_ma', 'Excellent tone rhythm and clear vowel matching.')}</div>
                      </div>
                    </div>

                    <button 
                      onClick={resetSpeakDemo}
                      className="text-xs font-black text-brand-blue hover:underline uppercase tracking-wider"
                    >
                      {t('try_again', 'Try Again')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col h-[320px] justify-between">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs font-bold ${
                        msg.sender === 'user'
                          ? 'bg-brand-blue text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/40 dark:border-slate-700/50'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {aiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input box */}
                <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 mt-3">
                  <input
                    type="text"
                    placeholder={t('type_your_french_reply_e_g_je_voudrais_u', 'Type your French reply... (e.g. \'Je voudrais un croissant\')')}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={aiTyping}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-xs font-bold focus:border-brand-blue text-slate-800 dark:text-white focus:bg-white transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!userInput.trim() || aiTyping}
                    className="bg-brand-blue border-b-3 border-brand-blue-dark text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl active:border-b-0 active:translate-y-[3px] disabled:opacity-50 disabled:translate-y-0 disabled:border-b-3 transition-all"
                  >
                    {t('send', 'Send')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTIONS (ALT ROWS) --- */}
      <section id="features" className="bg-white dark:bg-[#0c1322] border-y-2 border-slate-100 dark:border-slate-800/80 py-24 transition-colors">
        <div className="max-w-5xl mx-auto px-6 space-y-32">

          {/* Feature Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green-dark dark:text-brand-green flex items-center justify-center shadow-sm">
                <Video size={24} />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit">
                {t('watch_speak', 'Watch & Speak')} <br/>{t('with_authentic_clips', 'with Authentic Clips')}
              </h3>
              <p className="text-slate-450 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                {t('learn_vocabulary_from_real_pop_culture_s', 'Learn vocabulary from real pop-culture, shows, and news videos. Hear actual native speakers, and practice speaking')} <strong className="text-brand-blue">{t('10_completely_distinct_practice_sentence', '10 completely distinct practice sentences')}</strong> {t('tailored_to_every_clip', 'tailored to every clip.')}
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-brand-green uppercase tracking-wider">
                <CheckCircle2 size={16} /> {t('10_unique_sentences_per_video', '10 UNIQUE SENTENCES PER VIDEO')}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative group max-w-[420px]">
                <div className="absolute inset-0 bg-brand-green/10 blur-2xl rounded-full group-hover:scale-105 transition-transform" />
                <img 
                  src="/feature_offline.png" 
                  alt={t('watch_and_speak_dashboard', 'Watch and Speak Dashboard')} 
                  className="rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl relative z-10 group-hover:scale-[1.02] transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Feature Row 2 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
              <div className="relative group max-w-[420px]">
                <div className="absolute inset-0 bg-brand-blue/10 blur-2xl rounded-full group-hover:scale-105 transition-transform" />
                <img 
                  src="/feature_ai_chat.png" 
                  alt={t('ai_chat_interface', 'AI Chat Interface')} 
                  className="rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl relative z-10 group-hover:scale-[1.02] transition-all duration-300"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start order-1 md:order-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue-dark dark:text-brand-blue flex items-center justify-center shadow-sm">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit">
                {t('converse_with', 'Converse with')} <br/>{t('adaptive_ai_tutors', 'Adaptive AI Tutors')}
              </h3>
              <p className="text-slate-450 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                {t('hold_realistic_scenario_based_chats_with', 'Hold realistic scenario-based chats with Emma, your personal AI tutor. Practice ordering food, checking into hotels, or simply discussing your hobbies with real-time grammar feedback.')}
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-brand-blue uppercase tracking-wider">
                <CheckCircle2 size={16} /> {t('24_7_interactive_scenarios', '24/7 INTERACTIVE SCENARIOS')}
              </div>
            </div>
          </div>

          {/* Feature Row 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/15 text-brand-purple-dark dark:text-brand-purple flex items-center justify-center shadow-sm">
                <Trophy size={24} />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit">
                {t('compete_in_weekly', 'Compete in Weekly')} <br/>{t('leaderboards', 'Leaderboards')}
              </h3>
              <p className="text-slate-450 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                {t('earn_xp_points_from_lessons_keep_your_st', 'Earn XP points from lessons, keep your streak alive, and climb up the leaderboard ranks. Compete with global students to get promoted to the prestigious Diamond League.')}
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-brand-purple uppercase tracking-wider">
                <CheckCircle2 size={16} /> {t('weekly_competitive_leagues', 'WEEKLY COMPETITIVE LEAGUES')}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative group max-w-[420px]">
                <div className="absolute inset-0 bg-brand-purple/10 blur-2xl rounded-full group-hover:scale-105 transition-transform" />
                <img 
                  src="/feature_tournament.png" 
                  alt={t('tournament_leaderboard', 'Tournament Leaderboard')} 
                  className="rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl relative z-10 group-hover:scale-[1.02] transition-all duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- WHY POLYGLOT? (BENEFITS) --- */}
      <section id="why-polyglot" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit mb-3">
            {t('why_choose_polyglot', 'Why Choose Polyglot?')}
          </h2>
          <p className="text-slate-450 dark:text-slate-400 font-bold">
            {t('we_use_a_science_backed_methodology_to_m', 'We use a science-backed methodology to make language learning sticky, immersive, and fun.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green-dark dark:text-brand-green flex items-center justify-center font-black">
              <Zap size={22} fill="currentColor" />
            </div>
            <h4 className="text-lg font-black text-slate-850 dark:text-white">{t('active_recalling_speech', 'Active Recalling & Speech')}</h4>
            <p className="text-xs font-bold text-slate-450 dark:text-slate-400 leading-relaxed">
              {t('don_t_just_passively_read_listen_to_natu', 'Don\'t just passively read. Listen to natural speeds, write translations, and speak aloud with instant, color-coded phonetic feedback.')}
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue-dark dark:text-brand-blue flex items-center justify-center font-black">
              <Flame size={22} fill="currentColor" />
            </div>
            <h4 className="text-lg font-black text-slate-850 dark:text-white">{t('bite_sized_gamification', 'Bite-Sized Gamification')}</h4>
            <p className="text-xs font-bold text-slate-450 dark:text-slate-400 leading-relaxed">
              {t('lessons_are_split_into_5_minute_modules', 'Lessons are split into 5-minute modules. Stay highly motivated through daily streaks, virtual shield protections, and reward badges.')}
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple-dark dark:text-brand-purple flex items-center justify-center font-black">
              <Globe size={22} />
            </div>
            <h4 className="text-lg font-black text-slate-850 dark:text-white">{t('authentic_context_only', 'Authentic Context Only')}</h4>
            <p className="text-xs font-bold text-slate-450 dark:text-slate-400 leading-relaxed">
              {t('ditch_outdated_vocabulary_learn_with_rea', 'Ditch outdated vocabulary. Learn with real, colloquial expressions taken from actual popular media clips and news.')}
            </p>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="bg-slate-100/50 dark:bg-[#0f172a]/30 border-y-2 border-slate-100 dark:border-slate-800/80 py-24 transition-colors">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white font-outfit mb-3">
              {t('loved_by_students_globally', 'Loved by Students Globally')}
            </h2>
            <p className="text-slate-450 dark:text-slate-400 font-bold">
              {t('hear_from_some_of_our_learners_who_are_a', 'Hear from some of our learners who are already speaking with confidence.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review 1 */}
            <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-brand-yellow">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm font-medium italic text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('learning_from_actual_youtube_videos_is_a', '"Learning from actual YouTube videos is a total game changer. Instead of memorizing boring textbook templates, I get to listen to real pronunciation and practice 10 distinct, natural sentences for each clip! My Spanish comprehension has skyrocketed."')}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-green-dark dark:text-brand-green flex items-center justify-center font-black text-sm">
                  {t('sk', 'SK')}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-850 dark:text-white">{t('sarah_kowalski', 'Sarah Kowalski')}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('learning_spanish', 'Learning Spanish')}</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white dark:bg-[#0c1322] border-2 border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-brand-yellow">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm font-medium italic text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('the_ai_chat_conversations_feel_so_realis', '"The AI Chat conversations feel so realistic, and Emma gives precise explanations when I make mistakes. The 3D Duolingo-like layout is highly polished, motivating, and incredibly fun to navigate. It is simply the best language platform available."')}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center font-black text-sm">
                  {t('mr', 'MR')}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-850 dark:text-white">{t('marcos_r', 'Marcos R.')}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('learning_japanese', 'Learning Japanese')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA BANNERS --- */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8 flex flex-col items-center">
        <div className="w-24 h-24 animate-float">
          <img src="/logo.png" alt={t('polyglot_logo', 'Polyglot Logo')} className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-850 dark:text-white font-outfit">
          {t('start_your_language_journey', 'Start your language journey')} <br/>{t('with', 'with')} <span className="text-brand-blue">{t('polyglot', 'Polyglot')}</span> {t('today', 'today!')}
        </h2>
        
        <p className="text-slate-450 dark:text-slate-400 font-bold max-w-md leading-relaxed">
          {t('unlock_50_handpicked_authentic_video_les', 'Unlock 50+ handpicked authentic video lessons, advanced speech checking, and infinite AI chat sessions. Absolutely free.')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm pt-4">
          <button 
            onClick={onGetStarted}
            className="flex-1 py-4 bg-brand-green border-b-5 border-brand-green-dark hover:brightness-105 active:border-b-0 active:translate-y-[5px] text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-md transition-all duration-100"
          >
            {t('start_learning', 'Start Learning')}
          </button>
          <button 
            onClick={onLogin}
            className="flex-1 py-4 bg-white dark:bg-slate-900 border-2 border-slate-205 dark:border-slate-800 border-b-[5px] dark:border-b-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 active:border-b-2 active:translate-y-[3px] text-brand-blue font-black text-base uppercase tracking-wider rounded-2xl shadow-sm transition-all duration-100"
          >
            {t('sign_in', 'Sign In')}
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t-2 border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#0c1322] py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 dark:text-slate-500 font-bold">
          
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-800 dark:text-white text-sm">{t('polyglot', 'polyglot')}</span>
            <span>{t('2026_polyglot_inc_all_rights_reserved', '© 2026 Polyglot Inc. All rights reserved.')}</span>
          </div>

          <div className="flex gap-6">
            <a href="#features" className="hover:underline">{t('features', 'Features')}</a>
            <a href="#why-polyglot" className="hover:underline">{t('methodology', 'Methodology')}</a>
            <a href="#testimonials" className="hover:underline">{t('testimonials', 'Testimonials')}</a>
            <button onClick={onLogin} className="hover:underline text-left">{t('login', 'Login')}</button>
          </div>
        </div>
      </footer>

      {styleElement}
    </div>
  );
}

const styleElement = (
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spin 12s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
    .animate-fade-in-down {
      animation: fadeInDown 0.25s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .text-slate-850 {
      color: #1e293b;
    }
    .dark .text-slate-850 {
      color: #f1f5f9;
    }
    .font-outfit {
      font-family: 'Outfit', 'Nunito', sans-serif;
    }
    .border-b-5 {
      border-bottom-width: 5px;
    }
    .border-b-3 {
      border-bottom-width: 3px;
    }
    .border-3 {
      border-width: 3px;
    }
    .backdrop-blur-xxs {
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
  `}</style>
);
