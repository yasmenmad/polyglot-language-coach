import { Flame, Sparkles, MessageSquare, Award, Gamepad2, Bot, Target, Coffee, BatteryLow, BookOpen, Mic, PenLine } from 'lucide-react';
import { getUnits } from '../data/units';
import { getVocab } from '../data/vocab';
import { LanguageCode, getLanguageInfo } from '../data/courses';
import { useTranslation } from 'react-i18next';
import Flag from '../components/Flag';

interface HomeProps {
  user: any;
  completedLessons?: number[];
  onSelectLesson?: (lesson: any) => void;
  onNavigate: (page: string) => void;
  onUpdateUser: (user: any) => void;
  lang?: string;
}

const MOOD_OPTIONS = [
  {
    id: 'focused',
    icon: Target,
    labelKey: 'focused',
    label: 'Focused',
    color: '#4fb8e8',
    bg: '#d6f0fb',
    darkBg: 'rgba(79,184,232,0.15)',
  },
  {
    id: 'relaxed',
    icon: Coffee,
    labelKey: 'relaxed',
    label: 'Relaxed',
    color: '#58cc02',
    bg: '#e0f7cc',
    darkBg: 'rgba(88,204,2,0.15)',
  },
  {
    id: 'tired',
    icon: BatteryLow,
    labelKey: 'tired',
    label: 'Tired',
    color: '#ff9600',
    bg: '#fff3de',
    darkBg: 'rgba(255,150,0,0.15)',
  },
];

const QUICK_ACTIONS = [
  { id: 'chat', icon: Bot, labelKey: 'ai_teacher', label: 'AI Teacher', color: '#4fb8e8', bg: '#d6f0fb' },
  { id: 'games', icon: Gamepad2, labelKey: 'quick_games', label: 'Games', color: '#ffc800', bg: '#fff8dd' },
  { id: 'daily-talk', icon: MessageSquare, labelKey: 'daily_talk', label: 'Daily Talk', color: '#58cc02', bg: '#e0f7cc' },
  { id: 'speak-lab', icon: Mic, labelKey: 'speak-lab', label: 'Speak Lab', color: '#8b5cf6', bg: '#f0e8ff' },
  { id: 'writing-coach', icon: PenLine, labelKey: 'writing-coach', label: 'Writing', color: '#ff9600', bg: '#fff3de' },
  { id: 'stories', icon: BookOpen, labelKey: 'stories', label: 'Stories', color: '#ff86d0', bg: '#ffe8f5' },
];

export default function Home({ user, completedLessons = [], onSelectLesson, onNavigate, onUpdateUser, lang }: HomeProps) {
  const { t } = useTranslation();
  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const UNITS = getUnits(activeLang);
  const vocabList = getVocab(activeLang);

  // Find first incomplete unit and lesson
  let nextUnit = UNITS[0];
  let nextLesson = UNITS[0]?.lessons[0];

  for (const unit of UNITS) {
    const incomplete = unit.lessons.find(l => !completedLessons.includes(l.id));
    if (incomplete) {
      nextUnit = unit;
      nextLesson = incomplete;
      break;
    }
  }

  // Find first word in next lesson
  const firstWordHanzi = nextLesson?.words[0] || '';
  const firstWord = vocabList.find(w => w.h.toLowerCase() === firstWordHanzi.toLowerCase()) || { h: firstWordHanzi, p: '', m: '' };

  const handleContinueLearning = () => {
    if (onSelectLesson && nextLesson) {
      onSelectLesson(nextLesson);
    } else {
      onNavigate('learn');
    }
  };

  const currentLevel = user?.level || 1;
  const currentXP = user?.xp || 0;
  const levelXPStart = (currentLevel - 1) * 100;
  const levelXPEnd = currentLevel * 100;
  const xpInLevel = currentXP - levelXPStart;
  const xpProgressPercent = Math.min(100, Math.max(0, (xpInLevel / 100) * 100));

  const handleMoodChange = (mood: string) => {
    if (user && user.id) {
      import('../services/api').then(({ api }) => {
        api.updateProfile({ energy_mood: mood }).then(onUpdateUser);
      });
    } else {
      onUpdateUser({ ...user, energy_mood: mood });
    }
  };

  const currentMood = user?.energy_mood || 'focused';

  return (
    <div className="w-full px-6 py-8 space-y-7 text-left ml-0" style={{ maxWidth: 820 }}>
      {/* Greeting and premium badge */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t('welcome_back', { username: user?.username || 'Guest' })}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {t('ready_to_learn_lang')}{' '}
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>
              <Flag code={activeLang} size={13} /> {langInfo.label}
            </span>
          </p>
        </div>
        <div className="premium-badge flex items-center gap-1.5 bg-brand-yellow/10 text-brand-yellow-dark dark:text-brand-yellow px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider border border-brand-yellow/30">
          <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
          {t('premium')}
        </div>
      </div>

      {/* Top row: XP card + Mood selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* XP Progress */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-800 dark:text-white">
              {t('my_learning_map')}
            </h2>
            <div className="flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange-dark dark:text-brand-orange px-3 py-1 rounded-full font-bold text-xs">
              <Flame className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
              {t('day_streak', { count: user?.streak || 0 })}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="font-extrabold text-sm text-slate-500 dark:text-slate-400">{t('xp', 'XP')}</span>
            <div className="flex-1 h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-yellow border-2 border-brand-yellow-dark flex items-center justify-center font-black text-white text-sm shadow-[0_2.5px_0_var(--yellow-d)]">
              {currentLevel}
            </div>
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {currentXP} / {levelXPEnd} {t('xp_level', 'XP · Level')} {currentLevel}
          </div>
        </div>

        {/* Mood selector */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
            {t('focus_level')}
          </span>
          <div className="flex gap-2">
            {MOOD_OPTIONS.map(mood => {
              const Icon = mood.icon;
              const isActive = currentMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodChange(mood.id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl font-bold text-xs border transition-all ${
                    isActive
                      ? 'shadow-lg scale-[1.04] border-transparent'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:scale-[1.02]'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${mood.color}22, ${mood.color}44)`,
                    borderColor: mood.color,
                    color: mood.color,
                    boxShadow: `0 6px 20px ${mood.color}33`
                  } : {}}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span>{t(mood.labelKey, mood.label)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Continue Learning + Quick Actions - two column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Continue Learning card */}
        {nextLesson && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
              {t('continue_learning')}
            </h3>
            <div
              onClick={handleContinueLearning}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-all text-center flex flex-col items-center justify-center"
              style={{ minHeight: 160 }}
            >
              <div className="text-5xl font-black text-slate-800 dark:text-white mb-2">
                {firstWord.h}
              </div>
              {firstWord.p && (
                <div className="text-md font-bold text-brand-blue mb-1">
                  {firstWord.p}
                </div>
              )}
              {firstWord.m && (
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t(firstWord.m.toLowerCase(), firstWord.m)}
                </div>
              )}
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 w-full">
                {t(nextLesson.title, nextLesson.title)} · {t('unit', 'Unit')} {nextUnit.id}: {t(nextUnit.title, nextUnit.title)}
              </div>
            </div>
          </div>
        )}

        {/* Games Hub */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
            {t('games_list')}
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate('games')}
              className="flex items-center gap-4 bg-brand-green text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-green/20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-md">{t('vocab_quiz')}</div>
                <div className="text-xs text-white/80 font-bold">{t('vocab_quiz_desc')}</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('games')}
              className="flex items-center gap-4 bg-brand-orange text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-orange/20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-md">{t('matching_game')}</div>
                <div className="text-xs text-white/80 font-bold">{t('matching_game_desc')}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions — full 6-grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
          {t('quick_actions')}
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="flex flex-col items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:shadow-sm hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: action.bg, color: action.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                  {t(action.labelKey, action.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
