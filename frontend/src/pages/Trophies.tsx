import { useTranslation } from 'react-i18next';
import { ArrowLeft, Award, Lock } from 'lucide-react';

interface TrophiesProps {
  onBack: () => void;
  unlockedBadges: string[];
}

export default function Trophies({ onBack, unlockedBadges }: TrophiesProps) {
  const { t } = useTranslation();
  
  const ACHIEVEMENTS = [
    { id: 'first_step', name: t('first_steps_name'), desc: t('first_steps_desc'), icon: '🌱', color: 'bg-emerald-500' },
    { id: 'xp_100', name: t('xp_collector_name'), desc: t('xp_collector_desc'), icon: '⭐️', color: 'bg-amber-500' },
    { id: 'streak_3', name: t('streak_starter_name'), desc: t('streak_starter_desc'), icon: '🔥', color: 'bg-orange-500' },
    { id: 'shield_use', name: t('streak_guard_name'), desc: t('streak_guard_desc'), icon: '🛡', color: 'bg-blue-500' },
    { id: 'writer_1', name: t('word_weaver_name'), desc: t('word_weaver_desc'), icon: '✍️', color: 'bg-purple-500' },
    { id: 'talk_1', name: t('chat_companion_name'), desc: t('chat_companion_desc'), icon: '💬', color: 'bg-sky-500' },
    { id: 'perfect_100', name: t('perfect_score_name'), desc: t('perfect_score_desc'), icon: '💯', color: 'bg-rose-500' },
    { id: 'story_1', name: t('story_explorer_name'), desc: t('story_explorer_desc'), icon: '📖', color: 'bg-yellow-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          {t('dashboard')}
        </button>
        
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-yellow" />
          <h2 className="text-base font-black">{t('achievements_badges')}</h2>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map(badge => {
          const isUnlocked = unlockedBadges.includes(badge.id) || unlockedBadges.includes('all') || unlockedBadges.length > 3; // mockup support
          
          return (
            <div
              key={badge.id}
              className={`bg-white dark:bg-slate-900 border-2 rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-all ${
                isUnlocked
                  ? 'border-slate-100 dark:border-slate-800 shadow-md shadow-slate-100/50 dark:shadow-none hover:scale-105'
                  : 'border-slate-100 dark:border-slate-900 opacity-60'
              }`}
            >
              {/* Badge Icon circle */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner mb-3 relative ${
                isUnlocked ? badge.color : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {isUnlocked ? (
                  <span>{badge.icon}</span>
                ) : (
                  <Lock className="w-6 h-6 text-slate-400 dark:text-slate-600" />
                )}

                {isUnlocked && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-yellow"></span>
                  </span>
                )}
              </div>

              <h3 className="text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                {badge.name}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 mt-1 max-w-[140px] leading-normal">
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
