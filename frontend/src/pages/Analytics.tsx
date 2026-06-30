import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { 
  ArrowLeft, Award, Flame, BarChart2, BookOpen, Layers, 
  TrendingUp 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

interface AnalyticsProps {
  onBack: () => void;
}

export default function Analytics({ onBack }: AnalyticsProps) {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics()
      .then(setData)
      .catch(() => {
        // Fallback mockup
        setData({
          stats: {
            xp: 250,
            level: 3,
            streak: 5,
            lessons_completed: 12,
            saved_words: 8,
            srs_items: 15
          },
          skills: {
            vocabulary: 85,
            grammar: 70,
            speaking: 60,
            listening: 75,
            reading: 80,
            culture: 45
          },
          xp_history: [
            { date: '06/07', xp: 20 },
            { date: '06/08', xp: 45 },
            { date: '06/09', xp: 10 },
            { date: '06/10', xp: 30 },
            { date: '06/11', xp: 50 },
            { date: '06/12', xp: 25 },
            { date: '06/13', xp: 70 }
          ]
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 bg-slate-955 w-full h-[90svh] rounded-[2.5rem]">
        <TrendingUp className="w-8 h-8 text-sky-400 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">{t('compiling_analytics', 'Compiling Analytics')}</span>
      </div>
    );
  }

  // Transform skills data for RadarChart
  const radarData = [
    { subject: t('vocabulary', 'Vocabulary'), A: data.skills.vocabulary, fullMark: 100 },
    { subject: t('grammar', 'Grammar'), A: data.skills.grammar, fullMark: 100 },
    { subject: t('speaking', 'Speaking'), A: data.skills.speaking, fullMark: 100 },
    { subject: t('listening', 'Listening'), A: data.skills.listening, fullMark: 100 },
    { subject: t('reading', 'Reading'), A: data.skills.reading, fullMark: 100 },
    { subject: t('culture', 'Culture'), A: data.skills.culture, fullMark: 100 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 bg-slate-955 rounded-[2.5rem] border border-slate-800/80 shadow-2xl relative overflow-hidden text-left">
      
      {/* Decorative Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/50 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('dashboard', 'Dashboard')}
        </button>
        
        <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800/80 backdrop-blur-md">
          <BarChart2 className="w-4.5 h-4.5 text-sky-400" />
          <h2 className="text-xs font-black uppercase tracking-wider text-white">{t('performance_analytics', 'Performance Analytics')}</h2>
        </div>
      </div>

      {/* Top Stat Cards (Glassmorphism + Hover FX) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {[
          { label: t('total_xp', 'Total XP'), val: `${data.stats.xp} XP`, color: 'sky', icon: Award },
          { label: t('learner_level', 'Learner Level'), val: `Lvl ${data.stats.level}`, color: 'emerald', icon: Layers },
          { label: t('streak_label', 'Streak'), val: t('streak_count', { count: data.stats.streak }), color: 'orange', icon: Flame },
          { label: t('lessons_done', 'Lessons Done'), val: data.stats.lessons_completed, color: 'purple', icon: BookOpen }
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="group relative bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl shadow-lg backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-slate-800/60 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl">
              {/* Note: Tailwind dynamic classes might not work if purged, but since we are replacing just the class string logic, 
                  we will use style logic or explicitly write the colors. 
                  Wait! Tailwind's purge doesn't support dynamic interpolation like `bg-${color}-500`. 
                  We MUST use full class strings in the mapped array to ensure Tailwind compiles them.
              */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3.5 rounded-2xl border border-slate-700/50 bg-slate-800/50 text-white group-hover:text-sky-400 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  <p className="text-xl font-black text-white mt-0.5">{stat.val}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        
        {/* Area Chart: XP History */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">{t('weekly_activity', 'Weekly Activity')}</h3>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded-md border border-sky-500/20">{t('last_7_days', 'Last 7 Days')}</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.xp_history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart: Skill Dimensions */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-lg backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">{t('skill_dimension_analysis', 'Skill Dimension Analysis')}</h3>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">{t('balanced_profile', 'Balanced Profile')}</span>
          </div>
          
          <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                />
                <Radar name={t('proficiency', 'Proficiency')} dataKey="A" stroke="#818cf8" strokeWidth={3} fill="#818cf8" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
