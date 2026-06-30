import { useState, useEffect } from 'react';
import { api, getToken, removeToken } from './services/api';
import Auth from './pages/Auth';
import Learn from './pages/Learn';
import Lesson from './pages/Lesson';
import WritingCoach from './pages/WritingCoach';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Trophies from './pages/Trophies';
import Stories from './pages/Stories';
import CharactersLab from './pages/CharactersLab';
import GrammarGuide from './pages/GrammarGuide';
import DailyTalk from './pages/DailyTalk';
import MockExams from './pages/MockExams';
import Games from './pages/Games';
import SpeakLab from './pages/SpeakLab';
import VoiceTeacher from './pages/VoiceTeacher';
import SavedWords from './pages/SavedWords';
import Culture from './pages/Culture';
import Home from './pages/Home';
import WatchSpeak from './pages/WatchSpeak';
import StudyRooms from './pages/StudyRooms';
import ClassroomDashboard from './pages/ClassroomDashboard';
import CourseBuilder from './pages/CourseBuilder';
import NewsReader from './pages/NewsReader';
import NotificationSettings from './pages/NotificationSettings';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Tournament from './pages/Tournament';
import AdminDashboard from './pages/AdminDashboard';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { getActiveLanguage, setActiveLanguage, SUPPORTED_LANGUAGES, LanguageCode } from './data/courses';
import Flag from './components/Flag';

// Lucide icons
import {
  Home as HomeIcon,
  BookOpen,
  MessageCircle,
  Gamepad2,
  MoreHorizontal,
  Zap,
  Sparkles,
  BarChart2,
  Award,
  BookMarked,
  Mic,
  Bot,
  Bookmark,
  Globe,
  PenLine,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  GraduationCap,
  AlignLeft,
  X,
  Languages,
  Target,
  Coffee,
  BatteryLow,
  Tv,
  Users,
  Newspaper,
  Bell,
  Trophy,
  ShieldCheck,
} from 'lucide-react';

// Nav items configuration
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon, group: 'main' },
  { id: 'learn', label: 'Learn', icon: BookOpen, group: 'main' },
  { id: 'characters', label: 'Characters Lab', icon: Zap, group: 'learn' },
  { id: 'grammar', label: 'Grammar', icon: AlignLeft, group: 'learn' },
  { id: 'daily-talk', label: 'Daily Talk', icon: MessageCircle, group: 'learn' },
  { id: 'exams', label: 'Exams', icon: GraduationCap, group: 'learn' },
  { id: 'tournament', label: 'Tournament', icon: Trophy, group: 'learn' },
  { id: 'games', label: 'Games', icon: Gamepad2, group: 'practice' },
  { id: 'speak-lab', label: 'Speak Lab', icon: Mic, group: 'practice' },
  { id: 'watch-speak', label: 'Watch & Speak', icon: Tv, group: 'practice' },
  { id: 'study-rooms', label: 'Study Rooms', icon: Users, group: 'practice' },
  { id: 'voice-teacher', label: 'AI Emma', icon: Bot, group: 'practice' },
  { id: 'writing-coach', label: 'Writing Coach', icon: PenLine, group: 'practice' },
  { id: 'chat', label: 'AI Chat', icon: MessageCircle, group: 'practice' },
  { id: 'saved-words', label: 'Saved Words', icon: Bookmark, group: 'tools' },
  { id: 'classroom', label: 'Classroom Mode', icon: GraduationCap, group: 'tools' },
  { id: 'course-builder', label: 'User Courses', icon: BookMarked, group: 'tools' },
  { id: 'news-reader', label: 'News Reader', icon: Newspaper, group: 'tools' },
  { id: 'stories', label: 'Stories', icon: BookMarked, group: 'tools' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, group: 'tools' },
  { id: 'trophies', label: 'Trophies', icon: Award, group: 'tools' },
  { id: 'culture', label: 'Culture', icon: Globe, group: 'tools' },
];

// Bottom tab items (mobile)
const BOTTOM_TABS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'chat', label: 'AI', icon: Bot },
  { id: '_more', label: 'More', icon: MoreHorizontal },
];

const ADMIN_NAV_ITEM = { id: 'admin', label: 'Admin Panel', icon: ShieldCheck, group: 'main' };

// Language display codes (no emoji - clean text)
const LANG_CODE_DISPLAY: Record<string, string> = {
  zh: 'ZH', es: 'ES', fr: 'FR', de: 'DE',
  ja: 'JA', ko: 'KO', it: 'IT', en: 'EN', ar: 'AR',
};

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const userNavItems = NAV_ITEMS;
  const [guestMode, setGuestMode] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [isAdminView, setIsAdminView] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('hx_completed_lessons');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('hx_theme') === 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(() => localStorage.getItem('hx_show_rightbar') !== 'false');
  const [learningLanguage, setLearningLanguage] = useState(getActiveLanguage());

  const toggleRightSidebar = () => {
    const next = !showRightSidebar;
    setShowRightSidebar(next);
    localStorage.setItem('hx_show_rightbar', String(next));
  };
  // Interface language = the language the UI is displayed in (user's mother tongue or preference)
  const [interfaceLanguage, setInterfaceLanguage] = useState<string>(() => {
    return localStorage.getItem('hx_interface_lang') || 'en';
  });
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [showInterfaceDropdown, setShowInterfaceDropdown] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [initialIsLogin, setInitialIsLogin] = useState(true);

  const handleLanguageChange = (lang: string) => {
    setActiveLanguage(lang as any);
    setLearningLanguage(lang as LanguageCode);
    localStorage.setItem('hx_language', lang);
    setCurrentPage('home');
  };

  const handleInterfaceLanguageChange = (lang: string) => {
    setInterfaceLanguage(lang);
    localStorage.setItem('hx_interface_lang', lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Apply Arabic font when Arabic interface is selected
    if (lang === 'ar') {
      document.documentElement.style.setProperty('--font-arabic', "'Noto Sans Arabic', 'Cairo', sans-serif");
      document.body.classList.add('lang-ar');
    } else {
      document.documentElement.style.removeProperty('--font-arabic');
      document.body.classList.remove('lang-ar');
    }

    // Sync to backend profile if logged in
    if (user && user.id) {
      api.updateProfile({ native_lang: lang })
        .then((updatedUser) => {
          setUser(updatedUser);
        })
        .catch((err) => {
          console.error("Failed to sync native language to profile:", err);
        });
    }
  };

  // Verify auth on mount
  useEffect(() => {
    // Apply RTL for Arabic on initial load
    const activeLang = getActiveLanguage();
    const iface = localStorage.getItem('hx_interface_lang') || 'en';
    i18n.changeLanguage(iface);
    document.documentElement.dir = iface === 'ar' ? 'rtl' : 'ltr';
    // Apply Arabic font on initial load if Arabic interface is active
    if (iface === 'ar') {
      document.documentElement.style.setProperty('--font-arabic', "'Noto Sans Arabic', 'Cairo', sans-serif");
      document.body.classList.add('lang-ar');
    } else {
      document.documentElement.style.removeProperty('--font-arabic');
      document.body.classList.remove('lang-ar');
    }

    const token = getToken();
    if (token) {
      api.getMe()
        .then((userData) => {
          setUser(userData);
          // Load analytics silently in background
          api.getAnalytics().catch((err) => console.error("Analytics load failed:", err));
        })
        .catch(() => { 
          removeToken(); 
          setUser(null);
        })
        .finally(() => setCheckingAuth(false));
    } else {
      setCheckingAuth(false);
    }
  }, []);

  // Theme sync
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('hx_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hx_theme', 'light');
    }
  }, [darkMode]);

  // Sync interface language with user native language
  useEffect(() => {
    if (user?.native_lang) {
      setInterfaceLanguage(user.native_lang);
      localStorage.setItem('hx_interface_lang', user.native_lang);
      i18n.changeLanguage(user.native_lang);
      document.documentElement.dir = user.native_lang === 'ar' ? 'rtl' : 'ltr';
      if (user.native_lang === 'ar') {
        document.documentElement.style.setProperty('--font-arabic', "'Noto Sans Arabic', 'Cairo', sans-serif");
        document.body.classList.add('lang-ar');
      } else {
        document.documentElement.style.removeProperty('--font-arabic');
        document.body.classList.remove('lang-ar');
      }
    }
  }, [user?.native_lang]);

  const handleAuthSuccess = (userData: any) => {
    const curIfaceLang = localStorage.getItem('hx_interface_lang') || 'en';
    
    // Automatically update database user profile if the local interface language differs from the profile native language
    if (userData && userData.id && userData.native_lang !== curIfaceLang) {
      api.updateProfile({ native_lang: curIfaceLang })
        .then((updatedUser) => {
          setUser(updatedUser);
        })
        .catch((err) => {
          console.error("Failed to sync profile native language on auth:", err);
          setUser(userData);
        });
    } else {
      setUser(userData);
    }
    
    setGuestMode(false);
    setCurrentPage('home');
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    setUser({
      username: 'Guest Learner',
      xp: 0, level: 1, streak: 0, shields: 1,
      joined_at: new Date().toISOString(),
      energy_mood: 'focused',
      native_lang: 'en'
    });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setGuestMode(false);
    setCurrentPage('home');
  };

  const handleLessonComplete = async (lessonId: number, xpGained: number) => {
    if (!completedLessons.includes(lessonId)) {
      const nextCompleted = [...completedLessons, lessonId];
      setCompletedLessons(nextCompleted);
      localStorage.setItem('hx_completed_lessons', JSON.stringify(nextCompleted));
    }

    if (user && user.id) {
      try {
        const updatedUser = await api.completeLesson(lessonId, xpGained);
        setUser(updatedUser);
      } catch (err) {}
    } else {
      const nextXP = user.xp + xpGained;
      const nextLevel = Math.max(1, Math.floor(nextXP / 100) + 1);
      setUser({ ...user, xp: nextXP, level: nextLevel, streak: user.streak === 0 ? 1 : user.streak });
    }
    setSelectedLesson(null);
    setCurrentPage('learn');
  };

  const handleAwardXP = (xp: number) => {
    if (user) {
      setUser((prev: any) => {
        const nextXP = (prev?.xp || 0) + xp;
        const nextLevel = Math.max(1, Math.floor(nextXP / 100) + 1);
        return { ...prev, xp: nextXP, level: nextLevel };
      });
    }
  };

  const navigate = (page: string) => {
    setSelectedLesson(null);
    setCurrentPage(page);
    setSidebarOpen(false);
    setMoreOpen(false);
  };

  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #4fb8e8, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(79,184,232,0.35)'
          }}>
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">{t('polyglot', 'Polyglot')}</span>
          <div style={{ width: 32, height: 3, borderRadius: 2, background: 'var(--blue)', opacity: 0.5, animation: 'pulse 1s infinite' }} />
        </div>
      </div>
    );
  }

  if (!user && !guestMode) {
    if (showLanding) {
      return (
        <Landing 
          onGetStarted={() => { setInitialIsLogin(false); setShowLanding(false); }}
          onLogin={() => { setInitialIsLogin(true); setShowLanding(false); }}
          onGuestMode={handleGuestMode}
        />
      );
    }
    return <Auth onAuthSuccess={handleAuthSuccess} onGuestMode={handleGuestMode} initialIsLogin={initialIsLogin} onBack={() => setShowLanding(true)} />;
  }

  // Full-screen Standalone Admin Command Console
  if (user && (user.username === 'admin' || user.role === 'admin') && isAdminView) {
    return <AdminDashboard onBack={() => setIsAdminView(false)} onLogout={handleLogout} />;
  }

  // Render current page content
  const renderPage = () => {
    if (selectedLesson) {
      return (
        <Lesson
          lesson={selectedLesson}
          onBack={() => setSelectedLesson(null)}
          onLessonComplete={handleLessonComplete}
        />
      );
    }
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={navigate} onUpdateUser={setUser} lang={learningLanguage} />;
      case 'learn':
        return <Learn user={user} completedLessons={completedLessons} onSelectLesson={setSelectedLesson} onNavigate={navigate} onUpdateUser={setUser} lang={learningLanguage} />;
      case 'characters':
        return <CharactersLab onBack={() => navigate('learn')} onAwardXP={handleAwardXP} lang={learningLanguage} />;
      case 'grammar':
        return <GrammarGuide onBack={() => navigate('learn')} lang={learningLanguage} />;
      case 'daily-talk':
        return <DailyTalk onBack={() => navigate('learn')} lang={learningLanguage} />;
      case 'profile':
        return <Profile user={user} onBack={() => navigate('home')} onUpdateUser={setUser} onNavigate={navigate} />;
      case 'settings':
        return <NotificationSettings onBack={() => navigate('home')} user={user} onUpdateUser={setUser} />;
      case 'tournament': return <Tournament user={user} lang={learningLanguage} onBack={() => setCurrentPage('learn')} />;
      case 'admin': return <AdminDashboard onBack={() => setCurrentPage('home')} onLogout={handleLogout} />;
      case 'exams':
        return <MockExams onBack={() => navigate('learn')} onAwardXP={handleAwardXP} lang={learningLanguage} />;
      case 'games':
        return <Games onBack={() => navigate('learn')} onAwardXP={handleAwardXP} lang={learningLanguage} />;
      case 'speak-lab':
        return <SpeakLab onBack={() => navigate('learn')} onAwardXP={handleAwardXP} lang={learningLanguage} />;
      case 'watch-speak':
        return <WatchSpeak onBack={() => navigate('learn')} lang={learningLanguage} user={user} />;
      case 'study-rooms':
        return <StudyRooms onBack={() => navigate('learn')} lang={learningLanguage} username={user?.username || 'Guest'} />;
      case 'voice-teacher':
        return <VoiceTeacher onBack={() => navigate('learn')} lang={learningLanguage} user={user} />;
      case 'writing-coach':
        return <WritingCoach onBack={() => navigate('learn')} lang={learningLanguage} />;
      case 'chat':
        return <Chat onBack={() => navigate('learn')} lang={learningLanguage} user={user} />;
      case 'saved-words':
        return <SavedWords onBack={() => navigate('learn')} />;
      case 'classroom':
        return <ClassroomDashboard onBack={() => navigate('learn')} lang={learningLanguage} user={user} onUpdateUser={setUser} />;
      case 'course-builder':
        return <CourseBuilder onBack={() => navigate('learn')} lang={learningLanguage} onAwardXP={handleAwardXP} />;
      case 'news-reader':
        return <NewsReader onBack={() => navigate('learn')} lang={learningLanguage} onAwardXP={handleAwardXP} />;
      case 'stories':
        return <Stories onBack={() => navigate('learn')} onAwardXP={handleAwardXP} lang={learningLanguage} />;
      case 'analytics':
        return <Analytics onBack={() => navigate('learn')} />;
      case 'trophies':
        return <Trophies onBack={() => navigate('learn')} unlockedBadges={['first_step']} />;
      case 'culture':
        return <Culture onBack={() => navigate('learn')} lang={learningLanguage} />;
      default:
        return <Home user={user} onNavigate={navigate} onUpdateUser={setUser} lang={learningLanguage} />;
    }
  };

  const xpPercent = Math.min(100, ((user?.xp || 0) % 100));

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <style>{`
        @media (min-width: 1024px) {
          .right-sidebar {
            width: 250px;
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(226, 232, 240, 0.8);
            position: fixed;
            right: 16px;
            top: 16px;
            bottom: 16px;
            border-radius: 24px;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            z-index: 10;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          }
          .dark .right-sidebar {
            background: rgba(15, 23, 42, 0.45);
            border: 1px solid rgba(30, 41, 59, 0.8);
          }
          .main {
            margin-right: ${showRightSidebar ? '275px' : '0px'} !important;
            transition: margin-right 0.3s ease;
          }
        }
        @media (max-width: 1023px) {
          .right-sidebar {
            display: none;
          }
        }
      `}</style>
      {/* Background illustration */}
      <div className="app-bg" aria-hidden="true" />

      {/* ── DESKTOP SIDEBAR ───────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sb-logo" onClick={() => navigate('home')} style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
          <div className="sb-logo-icon" style={{ background: 'transparent', padding: 0, boxShadow: 'none' }}>
            <img src="/logo.png" alt={t('polyglot_logo', 'Polyglot Logo')} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} />
          </div>
          <div className="sb-logo-text" style={{ marginLeft: '12px' }}>
            <div className="sb-logo-cn" style={{ fontFamily: 'inherit', fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px' }}>{t('polyglot', 'Polyglot')}</div>
            <div className="sb-logo-en" style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.5px', marginTop: '-2px' }}>{t('ai_language_coach', 'AI Language Coach')}</div>
          </div>
        </div>

        {/* User card */}
        {user && (
          <div className="sb-profile cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-xl p-2 -mx-2" onClick={() => navigate('profile')} style={{ borderTop: '1px solid rgba(226,232,240,0.5)', paddingTop: '16px', marginTop: '8px' }}>
            <div className="sb-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {user.avatar && user.avatar.startsWith('data:image/') ? (
                <img src={user.avatar} alt={t('profile', 'Profile')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                (user.username || 'G')[0].toUpperCase()
              )}
            </div>
            <div className="sb-logo-text" style={{ flex: 1, minWidth: 0 }}>
              <div className="sb-user-name">{user.username || t('guest_user', 'Guest')}</div>
              <div className="sb-xp-mini">
                <div className="sb-xp-mini-fill" style={{ width: `${xpPercent}%` }} />
              </div>
              <div className="sb-user-xp">{user.xp || 0} {t('xp_lv', 'XP · Lv')} {user.level || 1}</div>
            </div>
          </div>
        )}


        {/* Nav groups */}
        <nav className="sb-nav">
          <div className="sb-section">{t('main', 'Main')}</div>
          {userNavItems.filter(i => i.group === 'main').map(item => (
            <button
              key={item.id}
              className={`sb-item${currentPage === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <item.icon size={17} />
              <span>{t(item.id, item.label)}</span>
              {currentPage === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}

          <div className="sb-section">{t('learn', 'Learn')}</div>
          {userNavItems.filter(i => i.group === 'learn').map(item => (
            <button
              key={item.id}
              className={`sb-item${currentPage === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <item.icon size={17} />
              <span>{t(item.id, item.label)}</span>
              {currentPage === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}

          <div className="sb-section">{t('practice', 'Practice')}</div>
          {userNavItems.filter(i => i.group === 'practice').map(item => (
            <button
              key={item.id}
              className={`sb-item${currentPage === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <item.icon size={17} />
              <span>{t(item.id, item.label)}</span>
              {currentPage === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}

          <div className="sb-section">{t('tools', 'Tools')}</div>
          {userNavItems.filter(i => i.group === 'tools').map(item => (
            <button
              key={item.id}
              className={`sb-item${currentPage === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <item.icon size={17} />
              <span>{t(item.id, item.label)}</span>
              {currentPage === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
          {(user?.role === 'admin' || user?.username === 'admin') && (
            <button
              className="sb-item"
              onClick={() => setIsAdminView(true)}
              style={{ color: '#f59e0b', marginTop: '12px', borderTop: '1px solid rgba(226,232,240,0.4)', paddingTop: '12px' }}
            >
              <ShieldCheck size={17} />
              <span>{t('admin_console', 'Admin Console')}</span>
            </button>
          )}
        </nav>

        {/* Sidebar footer */}
        <div className="sb-footer">
          <div className="sb-theme-row">
            <span className="sb-theme-label">{t('language_panel', 'Language Panel')}</span>
            <button className={`sb-toggle${showRightSidebar ? ' on' : ''}`} onClick={toggleRightSidebar} />
          </div>
          <div className="sb-theme-row">
            <span className="sb-theme-label">{t('theme_mode', 'Theme Mode')}</span>
            <button className={`sb-toggle${darkMode ? ' on' : ''}`} onClick={() => setDarkMode(!darkMode)} />
          </div>
          <button className="sb-item" onClick={handleLogout} style={{ marginTop: '4px' }}>
            <LogOut size={18} />
            <span>{guestMode ? t('exit_guest', 'Exit Guest') : t('logout', 'Sign Out')}</span>
          </button>
        </div>
      </aside>

      {/* ── DESKTOP RIGHT SIDEBAR (LANGUAGE CONTROL PANEL) ───────────────── */}
      {showRightSidebar && (
      <aside className="right-sidebar">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <Languages size={14} className="text-brand-blue" />
            {t('language_settings', 'Language Settings')}
          </h3>
          
          {/* Learning Language Selection */}
          <div className="space-y-2 mb-6">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {t('learning_language', 'Learning Language')}
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowLearningDropdown(!showLearningDropdown);
                  setShowInterfaceDropdown(false);
                }}
                className="w-full flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-2.5 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800 hover:border-slate-350 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Flag code={learningLanguage} size={15} className="flex-shrink-0" />
                  <span className="text-xs font-black">
                    {SUPPORTED_LANGUAGES.find(l => l.code === learningLanguage)?.label}
                  </span>
                </div>
                <ChevronRight size={12} className={`text-slate-400 transform transition-transform ml-1 ${showLearningDropdown ? 'rotate-90' : ''}`} />
              </button>

              {showLearningDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLearningDropdown(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto py-1">
                    {SUPPORTED_LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          handleLanguageChange(l.code);
                          setShowLearningDropdown(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold transition-colors ${
                          learningLanguage === l.code
                            ? 'bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20'
                            : 'text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        <Flag code={l.code} size={13} />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Interface Language Selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {t('interface_language', 'My Language (Interface)')}
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowInterfaceDropdown(!showInterfaceDropdown);
                  setShowLearningDropdown(false);
                }}
                className="w-full flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-2.5 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800 hover:border-slate-350 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Flag code={interfaceLanguage} size={15} className="flex-shrink-0" />
                  <span className="text-xs font-black">
                    {SUPPORTED_LANGUAGES.find(l => l.code === interfaceLanguage)?.label || interfaceLanguage.toUpperCase()}
                  </span>
                </div>
                <ChevronRight size={12} className={`text-slate-400 transform transition-transform ml-1 ${showInterfaceDropdown ? 'rotate-90' : ''}`} />
              </button>

              {showInterfaceDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowInterfaceDropdown(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto py-1">
                    {SUPPORTED_LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          handleInterfaceLanguageChange(l.code);
                          setShowInterfaceDropdown(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold transition-colors ${
                          interfaceLanguage === l.code
                            ? 'bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20'
                            : 'text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        <Flag code={l.code} size={13} />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User / Auth */}
        <div className="mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-4">
          {user ? (
            <div 
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors active-press"
              onClick={() => navigate('profile')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white dark:border-slate-800 flex-shrink-0">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-slate-800 dark:text-white truncate">{user.username}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.xp} {t('xp', 'XP')}</div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => navigate('home')} className="flex-1 py-2 text-xs font-bold text-brand-blue bg-brand-blue/10 rounded-xl">{t('login_btn', 'Login')}</button>
            </div>
          )}
        </div>

        {/* Reminders / Tips */}
        <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
          <div className="flex items-center gap-2 text-slate-500 mb-1.5">
            <Bell size={13} className="text-brand-blue" />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{t('study_reminder', 'Study Reminder')}</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">
            {t('study_reminder_desc', 'Your notifications are active. Consistent daily study sessions boost long-term retention by over 80%!')}
          </p>
        </div>
      </aside>
      )}

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div className="main">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-5 py-3.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-40">
          <div className="flex items-center gap-2.5 font-black text-slate-800 dark:text-slate-100 text-xl cursor-pointer tracking-tight" onClick={() => navigate('home')}>
            <div style={{ width: 36, height: 36, borderRadius: 10 }}>
              <img src="/logo.png" alt={t('logo', 'Logo')} style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover' }} />
            </div>
            {t('polyglot', 'Polyglot')}
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile custom language selector dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLearningDropdown(!showLearningDropdown);
                  setShowInterfaceDropdown(false);
                }}
                className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-800"
              >
                <Flag code={learningLanguage} size={13} className="mr-1 flex-shrink-0" />
                <span className="text-xs font-black text-slate-750 dark:text-slate-250">
                  {SUPPORTED_LANGUAGES.find(l => l.code === learningLanguage)?.code.toUpperCase()}
                </span>
                <ChevronRight size={8} className={`text-slate-400 transform transition-transform ml-1 ${showLearningDropdown ? 'rotate-90' : ''}`} />
              </button>

              {showLearningDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLearningDropdown(false)} />
                  <div className="absolute right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 w-36 max-h-60 overflow-y-auto py-1">
                    {SUPPORTED_LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          handleLanguageChange(l.code);
                          setShowLearningDropdown(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs font-bold transition-colors ${
                          learningLanguage === l.code
                            ? 'bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20'
                            : 'text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        <Flag code={l.code} size={13} />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <span className="bg-brand-green/10 text-brand-green-dark dark:text-brand-green px-3 py-1 rounded-full font-bold text-xs">{user?.xp || 0} {t('xp', 'XP')}</span>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
              {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="page active">
          {renderPage()}
        </main>
      </div>

      {/* ── MOBILE BOTTOM TABS ────────────────────────────────────── */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          {userNavItems.filter(i => i.group == 'main').slice(0,5).map(tab => {
            if (tab.id === '_more') {
              return (
                <button
                  key="_more"
                  className={`mob-tab${moreOpen ? ' active' : ''}`}
                  onClick={() => setMoreOpen(!moreOpen)}
                >
                  <MoreHorizontal size={22} />
                  <span>{t('more', 'More')}</span>
                </button>
              );
            }
            return (
              <button
                key={tab.id}
                className={`mob-tab${currentPage === tab.id && !moreOpen ? ' active' : ''}`}
                onClick={() => { navigate(tab.id); setMoreOpen(false); }}
              >
                <tab.icon size={22} />
                <span>{t(tab.id, tab.label)}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* More menu popup (mobile) */}
      {moreOpen && (
        <div className="mob-drawer-overlay" onClick={() => setMoreOpen(false)}>
          <div id="mob-drawer" className="open" onClick={e => e.stopPropagation()}>
            <div className="mob-drawer-section-label">{t('more_features', 'More features')}</div>
            <div className="mob-drawer-grid">
              {userNavItems.filter(i => !['home','learn','games','chat'].includes(i.id)).map(item => (
                <button
                  key={item.id}
                  className="mob-drawer-item"
                  onClick={() => { navigate(item.id); setMoreOpen(false); }}
                >
                  <div className="mob-drawer-icon" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>
                    <item.icon size={20} />
                  </div>
                  <span>{t(item.id, item.label.split(' ')[1] || item.label)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
