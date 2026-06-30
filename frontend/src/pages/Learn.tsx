import { getUnits } from '../data/units';
import { getLanguageInfo } from '../data/courses';
import type { LanguageCode } from '../data/courses';
import { Sparkles, Award, Star, Zap, Lock, Gamepad2, Mic, BookOpen, GraduationCap, AlignLeft, BookMarked, Hand, Hash, Users, Utensils, Plane, ShoppingBag, Trophy, HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Flag from '../components/Flag';

interface LearnProps {
  user: any;
  completedLessons: number[];
  onSelectLesson: (lesson: any) => void;
  onNavigate: (page: string) => void;
  onUpdateUser: (updatedUser: any) => void;
  lang: string;
}

// Unit color themes
const UNIT_THEMES = [
  { from: '#4fb8e8', to: '#2b9fd4', shadow: 'rgba(79,184,232,0.3)', accent: '#d6f0fb', text: '#1a6a9a' },
  { from: '#58cc02', to: '#3d9900', shadow: 'rgba(88,204,2,0.3)', accent: '#e0f7cc', text: '#2e6600' },
  { from: '#ff9600', to: '#e07800', shadow: 'rgba(255,150,0,0.3)', accent: '#fff3de', text: '#9a5800' },
  { from: '#8b5cf6', to: '#6d3dd4', shadow: 'rgba(139,92,246,0.3)', accent: '#f0e8ff', text: '#4d2a9a' },
  { from: '#ff86d0', to: '#e060b0', shadow: 'rgba(255,134,208,0.3)', accent: '#ffe8f5', text: '#9a3070' },
  { from: '#2bb8a4', to: '#1d9a8a', shadow: 'rgba(43,184,164,0.3)', accent: '#d8f5f0', text: '#186a5e' },
  { from: '#ffc800', to: '#e0a800', shadow: 'rgba(255,200,0,0.3)', accent: '#fff8dd', text: '#7a5800' },
  { from: '#ff4b4b', to: '#cc2a2a', shadow: 'rgba(255,75,75,0.3)', accent: '#ffe5e5', text: '#8a1a1a' },
];

const UNIT_ICONS: Record<number, any> = {
  1: Hand,
  2: Hash,
  3: Users,
  4: Utensils,
  5: Plane,
  6: ShoppingBag,
  7: Trophy,
  8: HeartPulse,
};

export default function Learn({ user, completedLessons, onSelectLesson, onNavigate, lang }: LearnProps) {
  const { t } = useTranslation();
  const activeLang = lang as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const UNITS = getUnits(activeLang);

  const totalLessons = UNITS.reduce((acc, u) => acc + u.lessons.length, 0);
  const doneCount = UNITS.reduce(
    (acc, u) => acc + u.lessons.filter(l => completedLessons.includes(l.id)).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

  return (
    <div style={{ width: '100%', maxWidth: 780, margin: '0 auto', padding: '24px 20px 64px' }}>

      {/* ── HERO HEADER (PREMIUM NEON GLASSMORPHIC DESIGN) ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.45)',
        borderRadius: 28, padding: '32px 36px', marginBottom: 28,
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative glows */}
        <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: -20, bottom: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.5)',
            borderRadius: 99, padding: '6px 16px', fontSize: 11, fontWeight: 900,
            color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            <Sparkles size={12} className="animate-pulse" /> <Flag code={activeLang} size={14} className="mr-1" /> {langInfo.label} {t('path', 'Path')}
          </span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.5px' }}>
          {t('welcome', 'Your Learning Journey')}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
          {doneCount}/{totalLessons} {t('lessons_complete', 'lessons complete')} · {t('keep_going', 'Keep going!')}
        </p>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 99, height: 14, overflow: 'hidden', padding: 1 }}>
          <div style={{
            height: '100%', width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
            borderRadius: 99, transition: 'width 0.5s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 800 }}>{t('level', 'Level')} {user?.level || 1}</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 800 }}>{user?.xp || 0} {t('xp', 'XP ·')} {progressPercent}%</span>
        </div>
      </div>

      {/* ── UNIT + LESSON PATH ── */}
      <div style={{ position: 'relative' }}>
        {/* Vertical connector line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 3, background: 'linear-gradient(180deg, #4fb8e8, #58cc02, #8b5cf6, #ff9600)',
          transform: 'translateX(-50%)', borderRadius: 99, opacity: 0.15, pointerEvents: 'none'
        }} />

        {UNITS.map((unit, uIdx) => {
          const theme = UNIT_THEMES[uIdx % UNIT_THEMES.length];
          const unitDone = unit.lessons.filter(l => completedLessons.includes(l.id)).length;
          const unitTotal = unit.lessons.length;

          return (
            <div key={unit.id} style={{ marginBottom: 40, position: 'relative', zIndex: 1 }}>

              {/* Unit Banner */}
              <div style={{
                background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                borderRadius: 24, padding: '20px 24px', marginBottom: 24,
                boxShadow: `0 8px 28px ${theme.shadow}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(255,255,255,0.2)', borderRadius: 8,
                    padding: '3px 10px', fontSize: 10, fontWeight: 900,
                    color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8
                  }}>
                    {t('unit', 'Unit')} {unit.id} · {unitDone}/{unitTotal}
                  </div>
                  <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
                    {t(unit.title)}
                  </h2>
                </div>
                <div style={{
                  width: 56, height: 56, borderRadius: 18,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0
                }}>
                  {(() => {
                    const IconComp = UNIT_ICONS[unit.id];
                    return IconComp ? <IconComp size={32} color="#fff" strokeWidth={2} /> : unit.emoji;
                  })()}
                </div>
              </div>

              {/* Lesson Bubbles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                {unit.lessons.map((lesson, idx) => {
                  const isDone = completedLessons.includes(lesson.id);

                  // Alternating offsets: left, center, right, center...
                  const offsets = [-80, 0, 80, 0];
                  const offsetX = offsets[idx % offsets.length];

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                        transform: `translateX(${offsetX}px)`,
                        transition: 'transform 0.15s ease',
                        outline: 'none',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = `translateX(${offsetX}px) scale(1.06)`)}
                      onMouseLeave={e => (e.currentTarget.style.transform = `translateX(${offsetX}px) scale(1)`)}
                    >
                      {/* Bubble */}
                      <div style={{
                        width: 76, height: 76, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isDone
                          ? `linear-gradient(135deg, ${theme.from}, ${theme.to})`
                          : 'var(--card, #fff)',
                        border: isDone
                          ? `4px solid ${theme.to}`
                          : '4px solid var(--card-border, #e2e8f0)',
                        borderBottom: isDone ? `8px solid ${theme.to}` : '8px solid var(--card-border, #e2e8f0)',
                        boxShadow: isDone
                          ? `0 8px 20px ${theme.shadow}`
                          : '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}>
                        {isDone
                          ? <Award size={30} color="#fff" strokeWidth={2.5} />
                          : <Star size={28} color={theme.from} strokeWidth={2} style={{ fill: `${theme.from}22` }} />
                        }
                      </div>

                      {/* Label */}
                      <div style={{
                        background: isDone ? theme.accent : 'var(--card, #fff)',
                        border: `2px solid ${isDone ? theme.from + '44' : 'var(--card-border, #e2e8f0)'}`,
                        borderRadius: 14, padding: '6px 14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        maxWidth: 150, textAlign: 'center'
                      }}>
                        <span style={{
                          fontSize: 12, fontWeight: 800,
                          color: isDone ? theme.text : 'var(--text, #1e293b)'
                        }}>
                          {t(lesson.title)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── QUICK LINKS ── */}
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))', gap: 12 }}>
        {[
          { id: 'games', label: 'Games', icon: Gamepad2, color: '#ffc800', bg: '#fff8dd' },
          { id: 'speak-lab', label: 'Speak Lab', icon: Mic, color: '#8b5cf6', bg: '#f0e8ff' },
          { id: 'stories', label: 'Stories', icon: BookMarked, color: '#ff86d0', bg: '#ffe8f5' },
          { id: 'characters', label: 'Char Lab', icon: Zap, color: '#4fb8e8', bg: '#d6f0fb' },
          { id: 'grammar', label: 'Grammar', icon: AlignLeft, color: '#58cc02', bg: '#e0f7cc' },
          { id: 'exams', label: 'Exams', icon: GraduationCap, color: '#ff9600', bg: '#fff3de' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                backgroundColor: 'var(--card, #fff)',
                border: '2px solid var(--card-border, #e2e8f0)',
                borderRadius: 20, padding: '16px 10px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 10px 24px ${item.color}25`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--card-border, #e2e8f0)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                backgroundColor: item.bg, color: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">
                {t(item.id, item.label)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
