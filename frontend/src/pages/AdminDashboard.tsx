import React, { useState, useEffect } from 'react';
import { 
  Users, Video, Activity, Server, Database, TrendingUp, AlertCircle, 
  CheckCircle2, ChevronRight, Settings, Trash2, LogOut, LayoutDashboard, 
  FileText, ShieldAlert, Cpu, Moon, Sun, RefreshCw, Search, Tv, Wrench, 
  Sparkles, Send, Play, Check, X, ChevronDown, BookOpen 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { CLIPS_BY_LANG } from '../data/clips';

// Import ChartJS core and components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'applications' | 'curriculum' | 'ai-config' | 'system'>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // SQLite Inspector state
  const [dbTables, setDbTables] = useState<any[]>([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  // Writings submissions feed state
  const [recentWritings, setRecentWritings] = useState<any[]>([]);
  const [loadingWritings, setLoadingWritings] = useState(false);

  // Curriculum validation state
  const [curriculumLang, setCurriculumLang] = useState<string>('all');
  const [curriculumSearch, setCurriculumSearch] = useState<string>('');
  const [embedChecking, setEmbedChecking] = useState<Record<string, 'loading' | 'success' | 'error'>>({});
  const [embedData, setEmbedData] = useState<Record<string, { title: string; author: string; thumb: string }>>({});

  // AI config state (persisted in LocalStorage)
  const [aiModel, setAiModel] = useState<string>(() => localStorage.getItem('hx_emma_model') || 'llama-3.3-70b-versatile');
  const [aiPrompt, setAiPrompt] = useState<string>(() => localStorage.getItem('hx_emma_system_prompt') || 'You are Emma, a friendly and encouraging language teacher.');
  const [aiTemp, setAiTemp] = useState<number>(() => {
    const stored = localStorage.getItem('hx_emma_temperature');
    return stored ? parseFloat(stored) : 0.7;
  });

  // AI config play area chat log
  const [playgroundMsgs, setPlaygroundMsgs] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! Adjust the prompts above and test how I respond to your inputs live!' }
  ]);
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundLoading, setPlaygroundLoading] = useState(false);

  // Configuration controls (stored in state / localstorage)
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rateLimiting, setRateLimiting] = useState(true);
  const [backupSchedule, setBackupSchedule] = useState('daily');
  const [adminThemeDark, setAdminThemeDark] = useState(() => localStorage.getItem('hx_theme') === 'dark');

  // Toggle Dark Mode
  useEffect(() => {
    if (adminThemeDark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('hx_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hx_theme', 'light');
    }
  }, [adminThemeDark]);

  // Fetch admin stats and user list
  const loadAdminData = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const [statsData, usersData] = await Promise.all([
        api.getAdminStats(),
        api.getAdminUsers()
      ]);
      setStats(statsData);
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || 'Failed to load administrative panel data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Sync specific data for system tab
  useEffect(() => {
    if (activeTab === 'system') {
      fetchTables();
      fetchWritings();
    }
  }, [activeTab]);

  const fetchTables = async () => {
    setLoadingTables(true);
    try {
      const data = await api.getDatabaseTables();
      setDbTables(data);
    } catch (err: any) {
      setError(err.message || 'Failed to inspect sqlite schema tables.');
    } finally {
      setLoadingTables(false);
    }
  };

  const fetchWritings = async () => {
    setLoadingWritings(true);
    try {
      const data = await api.getRecentWritings();
      setRecentWritings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to inspect recent writing submissions.');
    } finally {
      setLoadingWritings(false);
    }
  };

  const handleRoleChange = async (userId: number, currentUsername: string, newRole: string) => {
    setError('');
    setSuccess('');
    if (currentUsername === 'admin') {
      setError('Cannot modify the primary system administrator account.');
      return;
    }
    try {
      await api.updateUserRole(userId, newRole);
      setSuccess(`Updated role for user "${currentUsername}" to "${newRole.toUpperCase()}".`);
      const usersData = await api.getAdminUsers();
      setUsers(usersData);
      const statsData = await api.getAdminStats();
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Failed to modify user role permissions.');
    }
  };

  const handleApplicationAction = async (userId: number, currentUsername: string, action: 'approved' | 'rejected') => {
    setError('');
    setSuccess('');
    try {
      await api.updateUserTeacherStatus(userId, action);
      setSuccess(`Successfully ${action === 'approved' ? 'approved' : 'rejected'} teacher application for "${currentUsername}".`);
      const usersData = await api.getAdminUsers();
      setUsers(usersData);
      const statsData = await api.getAdminStats();
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Failed to update teacher application status.');
    }
  };

  const handleDeleteUser = async (userId: number, currentUsername: string) => {
    setError('');
    setSuccess('');
    if (currentUsername === 'admin') {
      setError('Cannot delete the primary system administrator account.');
      return;
    }
    if (!window.confirm(`WARNING: Are you sure you want to permanently delete user account "${currentUsername}"? This action is irreversible.`)) {
      return;
    }
    try {
      await api.deleteUser(userId);
      setSuccess(`User account "${currentUsername}" has been deleted.`);
      const [statsData, usersData] = await Promise.all([
        api.getAdminStats(),
        api.getAdminUsers()
      ]);
      setStats(statsData);
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || 'Failed to execute account deletion.');
    }
  };

  // Filtered users for search input
  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- oEmbed VALIDATION FUNCTION ---
  const checkEmbedStatus = async (youtubeId: string) => {
    setEmbedChecking(prev => ({ ...prev, [youtubeId]: 'loading' }));
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
      if (!res.ok) throw new Error('Embed validation response code non-200');
      const data = await res.json();
      setEmbedData(prev => ({
        ...prev,
        [youtubeId]: {
          title: data.title || 'YouTube Broadcast Video',
          author: data.author_name || 'Publisher',
          thumb: data.thumbnail_url || `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
        }
      }));
      setEmbedChecking(prev => ({ ...prev, [youtubeId]: 'success' }));
    } catch (err) {
      setEmbedChecking(prev => ({ ...prev, [youtubeId]: 'error' }));
    }
  };

  // AI config actions
  const handleSaveAIConfig = () => {
    setError('');
    setSuccess('');
    try {
      localStorage.setItem('hx_emma_model', aiModel);
      localStorage.setItem('hx_emma_system_prompt', aiPrompt);
      localStorage.setItem('hx_emma_temperature', aiTemp.toString());
      setSuccess('AI Coach Emma configuration successfully saved and loaded.');
    } catch (err: any) {
      setError('Failed to persist configuration to local storage.');
    }
  };

  const handleResetAIConfig = () => {
    const defaultPrompt = 'You are Emma, a friendly and encouraging language teacher. Give short, conversational replies.';
    setAiModel('llama-3.3-70b-versatile');
    setAiPrompt(defaultPrompt);
    setAiTemp(0.7);
    localStorage.removeItem('hx_emma_model');
    localStorage.removeItem('hx_emma_system_prompt');
    localStorage.removeItem('hx_emma_temperature');
    setSuccess('AI config reverted to default presets.');
  };

  const handlePlaygroundSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundInput.trim() || playgroundLoading) return;
    const userText = playgroundInput.trim();
    setPlaygroundMsgs(prev => [...prev, { sender: 'user', text: userText }]);
    setPlaygroundInput('');
    setPlaygroundLoading(true);

    try {
      // Temporarily write variables directly to local storage to match the state in playground
      localStorage.setItem('hx_emma_model', aiModel);
      localStorage.setItem('hx_emma_system_prompt', aiPrompt);
      localStorage.setItem('hx_emma_temperature', aiTemp.toString());

      const res = await api.sendMessage(userText, 'zh') as any;
      setPlaygroundMsgs(prev => [...prev, { sender: 'bot', text: res.reply }]);
    } catch (err: any) {
      setPlaygroundMsgs(prev => [...prev, { sender: 'bot', text: 'Evaluation Error: The sandbox API timed out or returned an invalid token status.' }]);
    } finally {
      setPlaygroundLoading(false);
    }
  };

  // Compile Curriculum Clips List
  const allClips = Object.entries(CLIPS_BY_LANG).flatMap(([langCode, clipList]) => 
    clipList.map(clip => ({ ...clip, lang: langCode }))
  );

  const filteredClips = allClips.filter(c => {
    const matchLang = curriculumLang === 'all' || c.lang === curriculumLang;
    const matchSearch = c.title.toLowerCase().includes(curriculumSearch.toLowerCase()) || 
                        c.youtubeId.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
                        c.topic.toLowerCase().includes(curriculumSearch.toLowerCase());
    return matchLang && matchSearch;
  });

  // --- CHART DATA GENERATION ---
  const signupChartData = {
    labels: stats?.signup_history?.map((h: any) => h.date) || ['06/06', '06/07', '06/08', '06/09', '06/10', '06/11', '06/12'],
    datasets: [
      {
        fill: true,
        label: 'New Registrations',
        data: stats?.signup_history?.map((h: any) => h.count) || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#0284c7', // sky-600
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#0284c7',
        pointHoverRadius: 6
      }
    ]
  };

  const langLabels = stats?.lang_dist ? Object.keys(stats.lang_dist) : ['Chinese', 'Spanish', 'French'];
  const langValues = stats?.lang_dist ? Object.values(stats.lang_dist) : [1, 1, 1];
  const doughnutChartData = {
    labels: langLabels,
    datasets: [
      {
        label: 'Users Spoken Language',
        data: langValues,
        backgroundColor: [
          '#38bdf8', '#3b82f6', '#4f46e5', 
          '#6366f1', '#8b5cf6', '#a855f7', 
          '#ec4899', '#f43f5e', '#10b981'
        ],
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
      }
    ]
  };

  const featureEngagementData = {
    labels: ['Lessons Complete', 'Saved Words', 'SRS Vocab', 'AI Writings', 'Classrooms Active'],
    datasets: [
      {
        label: 'Database Records Count',
        data: stats ? [
          stats.completed_lessons,
          stats.saved_words,
          stats.srs_items,
          stats.writing_submissions,
          stats.classrooms
        ] : [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(99, 102, 241, 0.85)', // indigo-500
        borderRadius: 8,
        hoverBackgroundColor: '#4f46e5'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: adminThemeDark ? '#1e293b' : '#f1f5f9'
        },
        ticks: {
          color: '#94a3b8',
          font: { weight: 'bold' as const, size: 10 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8',
          font: { weight: 'bold' as const, size: 10 }
        }
      }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 overflow-hidden">
      
      {/* ── SIDEBAR NAVIGATION ─────────────────────────────────────────── */}
      <aside className="w-64 bg-slate-900 border-r border-slate-850 text-white flex flex-col justify-between p-6 shrink-0 z-30">
        <div className="space-y-8">
          {/* Logo Heading */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">{t('command_center', 'Command Center')}</h1>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{t('system_admin_portal', 'System Admin Portal')}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {[
              { id: 'dashboard', label: t('overview', 'Overview'), icon: LayoutDashboard },
              { id: 'users', label: t('user_directory', 'User Directory'), icon: Users },
              { id: 'applications', label: t('teacher_requests', 'Teacher Requests'), icon: ShieldAlert },
              { id: 'curriculum', label: t('curriculum_clips', 'Curriculum Clips'), icon: BookOpen },
              { id: 'ai-config', label: 'AI Emma Config', icon: Cpu },
              { id: 'system', label: t('system_db', 'System & DB'), icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/10 scale-[1.02]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          {/* Toggle Theme */}
          <div className="flex items-center justify-between px-3 text-slate-400">
            <span className="text-xs font-bold">{t('theme_mode', 'Theme Mode')}</span>
            <button 
              onClick={() => setAdminThemeDark(!adminThemeDark)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
            >
              {adminThemeDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Switch to Student View */}
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-550 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            <BookOpen size={14} />
            <span>Student View</span>
          </button>

          {/* Sign Out */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-955/20 hover:bg-red-955/40 border border-red-900/30 text-red-400 font-black text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            <LogOut size={14} />
            {t('sign_out', 'Sign Out')}
          </button>
        </div>
      </aside>

      {/* ── MAIN PORTAL CONTENT ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Control Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex items-center justify-between px-8 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base font-black uppercase tracking-wider text-slate-650 dark:text-slate-300">
              {activeTab === 'dashboard' ? t('analytics_overview', 'Analytics Overview') : 
               activeTab === 'users' ? 'User Management' : 
               activeTab === 'applications' ? 'Teacher Applications' :
               activeTab === 'curriculum' ? 'Curriculum Inspector' :
               activeTab === 'ai-config' ? 'Emma AI Configurator' :
               'System Configuration & Inspector'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={loadAdminData}
              disabled={loading}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              title={t('sync_latest_database_data', 'Sync Latest Database Data')}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center font-black text-sm">
                {t('a', 'A')}
              </div>
              <span className="text-xs font-black text-slate-700 dark:text-slate-200">{t('system_administrator', 'System Administrator')}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel Viewport */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* Notification Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-955/10 border border-red-200 dark:border-red-900 text-red-550 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-955/10 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-sm">
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          {/* 1. tab: Analytics Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Database Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title={t("total_registered_users", "Total Registered Users")} 
                  value={stats ? stats.total_users : '...'} 
                  trend={`${stats ? stats.admins : '...'} Admin / ${stats ? stats.teachers : '...'} Teacher`} 
                  icon={Users} 
                  color="blue" 
                />
                <MetricCard 
                  title={t('24h_active_users', '24h Active Users')} 
                  value={stats ? stats.active_24h : '...'} 
                  trend="Active sessions in sqlite" 
                  icon={Activity} 
                  color="green" 
                />
                <MetricCard 
                  title={t('completed_lessons', 'Completed Lessons')} 
                  value={stats ? stats.completed_lessons : '...'} 
                  trend="Total student curriculum sessions" 
                  icon={FileText} 
                  color="purple" 
                />
                <MetricCard 
                  title={t('system_aggregate_xp', 'System Aggregate XP')} 
                  value={stats ? stats.total_xp.toLocaleString() : '...'} 
                  trend="Cumulative XP score metrics" 
                  icon={TrendingUp} 
                  color="slate" 
                />
              </div>

              {/* Data Visualization Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Line Chart: Signup Trend */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm flex flex-col justify-between min-h-[320px]">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-1">{t('user_acquisition_velocity', 'User Acquisition Velocity')}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t('daily_registrations_trend_for_the_last_7', 'Daily registrations trend for the last 7 days')}</p>
                  </div>
                  <div className="h-56 w-full mt-4">
                    <Line data={signupChartData} options={chartOptions} />
                  </div>
                </div>

                {/* Doughnut Chart: Native Language Dist */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-855 shadow-sm flex flex-col justify-between min-h-[320px]">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-1">{t('studied_languages_distribution', 'Studied Languages Distribution')}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t('ratio_based_on_registered_user_profiles', 'Ratio based on registered user profiles')}</p>
                  </div>
                  <div className="h-44 w-full flex items-center justify-center mt-4">
                    <Doughnut 
                      data={doughnutChartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'right',
                            labels: {
                              boxWidth: 8,
                              padding: 10,
                              color: adminThemeDark ? '#94a3b8' : '#64748b',
                              font: { weight: 'bold', size: 9 }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </div>

              </div>

              {/* Bar Chart: Curricular Engagement */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm flex flex-col justify-between min-h-[340px]">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-1">{t('feature_engagement_distribution', 'Feature Engagement Distribution')}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t('cumulative_records_counts_from_backend_d', 'Cumulative records counts from backend database tables')}</p>
                </div>
                <div className="h-60 w-full mt-4">
                  <Bar data={featureEngagementData} options={chartOptions} />
                </div>
              </div>

            </div>
          )}

          {/* 2. tab: User Directory */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                <div>
                  <h2 className="text-lg font-black tracking-tight">{t('active_user_directory', 'Active User Directory')}</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{t('manage_permissions_demote_promote_roles', 'Manage permissions, demote/promote roles, and review progress.')}</p>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_by_username_or_email', 'Search by username or email...')} 
                  className="px-4 py-2 bg-white dark:bg-slate-950 border-2 border-slate-250 dark:border-slate-800 rounded-xl font-bold text-xs w-full sm:w-64 focus:border-sky-500 outline-none transition-all"
                />
              </div>

              {filteredUsers.length === 0 ? (
                <div className="p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                  {t('no_registered_users_matched_your_criteri', 'No registered users matched your criteria.')}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-850 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                        <th className="p-5">{t('user_details', 'User Details')}</th>
                        <th className="p-5">{t('role_access', 'Role/Access')}</th>
                        <th className="p-5">{t('score_statistics', 'Score Statistics')}</th>
                        <th className="p-5">{t('account_age', 'Account Age')}</th>
                        <th className="p-5 text-right">{t('delete_account', 'Delete Account')}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/55 dark:hover:bg-slate-950/30 transition-colors">
                          <td className="p-5">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-800 dark:text-slate-200 font-black">{u.username}</span>
                              {u.username === 'admin' && (
                                <span className="bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[8px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider">{t('system_root', 'System Root')}</span>
                              )}
                            </div>
                            <div className="text-slate-400 text-[10px] mt-0.5">{u.email || 'No email associated'}</div>
                          </td>
                          <td className="p-5">
                            <select
                              disabled={u.username === 'admin'}
                              value={u.role || 'student'}
                              onChange={(e) => handleRoleChange(u.id, u.username, e.target.value)}
                              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-350 focus:outline-none focus:border-sky-500 disabled:opacity-50 transition-all cursor-pointer"
                            >
                              <option value="student">{t('student', 'Student')}</option>
                              <option value="teacher">{t('teacher', 'Teacher')}</option>
                              <option value="admin">{t('administrator', 'Administrator')}</option>
                            </select>
                          </td>
                          <td className="p-5 text-slate-650 dark:text-slate-350 font-medium">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{u.xp.toLocaleString()} {t('xp', 'XP')}</span> {t('level', '· Level')} {u.level}
                          </td>
                          <td className="p-5 text-slate-400">
                            {new Date(u.joined_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-5 text-right">
                            <button 
                              disabled={u.username === 'admin'}
                              onClick={() => handleDeleteUser(u.id, u.username)}
                              className="text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850"
                              title={t('delete_account_permanently', 'Delete Account permanently')}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Teacher Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 text-left">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
                <h2 className="text-lg font-black tracking-tight">{t('pending_teacher_applications', 'Pending Teacher Applications')}</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {t('review_student_requests_to_get_teacher_p', 'Review student requests to get teacher privilege status.')}
                </p>
              </div>

              {users.filter(u => u.teacher_status === 'pending').length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 border border-slate-200 dark:border-slate-850 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                  {t('no_pending_teacher_applications_at_the_m', 'No pending teacher applications at the moment.')}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {users.filter(u => u.teacher_status === 'pending').map((u) => (
                    <div key={u.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-md font-black text-slate-800 dark:text-white leading-tight">{u.username}</h3>
                            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{u.email || 'No email associated'}</span>
                          </div>
                          <span className="bg-amber-100 dark:bg-amber-955/40 text-amber-750 dark:text-amber-400 text-[9px] uppercase px-2 py-0.5 rounded-lg font-extrabold tracking-wider">
                            {t('pending_review', 'Pending Review')}
                          </span>
                        </div>

                        <div className="space-y-2.5 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-350">
                          <div>
                            <span className="text-slate-450 uppercase text-[9px] font-black tracking-wider block mb-0.5">{t('submitted_bio', 'Submitted Bio')}</span>
                            <p className="whitespace-pre-line leading-relaxed font-medium">{u.teacher_bio || 'No bio submitted.'}</p>
                          </div>
                          <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-850">
                            <span className="text-slate-450 uppercase text-[9px] font-black tracking-wider block mb-0.5">{t('qualifications_credentials', 'Qualifications & Credentials')}</span>
                            <p className="whitespace-pre-line leading-relaxed font-medium">{u.teacher_credentials || 'No credentials submitted.'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleApplicationAction(u.id, u.username, 'approved')}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3 px-4 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                        >
                          <Check size={14} strokeWidth={3} />
                          {t('approve_request', 'Approve Request')}
                        </button>
                        <button
                          onClick={() => handleApplicationAction(u.id, u.username, 'rejected')}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-black text-xs py-3 px-4 rounded-xl active:scale-98 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                        >
                          <X size={14} strokeWidth={3} />
                          {t('deny_request', 'Deny Request')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. tab: Curriculum Clips Manager */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Header + Filter controls */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="text-left w-full md:w-auto">
                  <h3 className="text-base font-black tracking-tight">{t('curriculum_clips_validator', 'Curriculum Clips Validator')}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t('audit_clips_database_and_perform_browser', 'Audit clips database and perform browser-side YouTube oEmbed API tests.')}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Select Language */}
                  <select
                    value={curriculumLang}
                    onChange={(e) => setCurriculumLang(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-sky-500 transition-all"
                  >
                    <option value="all">{t('all_languages', 'All Languages')}</option>
                    <option value="zh">{t('chinese_zh', 'Chinese (ZH)')}</option>
                    <option value="es">{t('spanish_es', 'Spanish (ES)')}</option>
                    <option value="fr">{t('french_fr', 'French (FR)')}</option>
                    <option value="de">{t('german_de', 'German (DE)')}</option>
                    <option value="ja">{t('japanese_ja', 'Japanese (JA)')}</option>
                    <option value="ko">{t('korean_ko', 'Korean (KO)')}</option>
                    <option value="it">{t('italian_it', 'Italian (IT)')}</option>
                    <option value="en">{t('english_en', 'English (EN)')}</option>
                    <option value="ar">{t('arabic_ar', 'Arabic (AR)')}</option>
                  </select>

                  {/* Search input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('filter_clips_by_name', 'Filter clips by name...')}
                      value={curriculumSearch}
                      onChange={(e) => setCurriculumSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-55 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs focus:border-sky-500 outline-none transition-all w-full sm:w-56"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Clips Grid */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-850 text-slate-400 text-[10px] font-black uppercase tracking-wider sticky top-0 bg-white dark:bg-slate-900 z-10">
                        <th className="p-4">{t('lang', 'Lang')}</th>
                        <th className="p-4">{t('title_youtube_id', 'Title / YouTube ID')}</th>
                        <th className="p-4">{t('topic_level', 'Topic / Level')}</th>
                        <th className="p-4">{t('phrases_count', 'Phrases Count')}</th>
                        <th className="p-4 text-center">{t('embed_test_badge', 'Embed Test Badge')}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold">
                      {filteredClips.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-16 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                            {t('no_curriculum_clips_matched_your_criteri', 'No curriculum clips matched your criteria.')}
                          </td>
                        </tr>
                      ) : (
                        filteredClips.map((c, i) => {
                          const check = embedChecking[c.youtubeId];
                          const meta = embedData[c.youtubeId];
                          return (
                            <tr key={c.id + '-' + i} className="border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/55 dark:hover:bg-slate-950/30 transition-colors">
                              <td className="p-4">
                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 rounded font-black text-[9px] uppercase">
                                  {c.lang}
                                </span>
                              </td>
                              <td className="p-4 max-w-sm">
                                <div className="text-slate-800 dark:text-slate-200 font-black truncate" title={c.title}>
                                  {c.title}
                                </div>
                                <div className="text-[10px] text-sky-500 font-mono mt-0.5 flex items-center gap-1">
                                  {c.youtubeId}
                                  <a href={`https://youtube.com/watch?v=${c.youtubeId}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-[8px] text-slate-400 ml-1">
                                    {t('external_link', '[External Link]')}
                                  </a>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="capitalize text-slate-600 dark:text-slate-350 font-semibold">{c.topic}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{c.level}</div>
                              </td>
                              <td className="p-4 text-slate-500 text-left pl-8 font-semibold">
                                {c.phrases?.length || 0} {t('items', 'items')}
                              </td>
                              <td className="p-4 flex items-center justify-center">
                                {check === 'success' ? (
                                  <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-2 max-w-xs text-left">
                                    {meta?.thumb && <img src={meta.thumb} alt={t('preview', 'Preview')} className="w-10 h-7 object-cover rounded shadow" />}
                                    <div className="truncate">
                                      <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                                        <CheckCircle2 size={10} /> {t('active_embed', 'Active Embed')}
                                      </div>
                                      <div className="text-[9px] text-slate-500 truncate max-w-[120px]" title={meta?.title}>{meta?.title}</div>
                                    </div>
                                  </div>
                                ) : check === 'error' ? (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-500 rounded-xl text-[10px]">
                                    <AlertCircle size={12} /> {t('embed_error_offline', 'Embed Error / Offline')}
                                    <button onClick={() => checkEmbedStatus(c.youtubeId)} className="text-[8px] underline text-slate-400 font-black ml-1 hover:text-red-500">{t('retry', 'Retry')}</button>
                                  </div>
                                ) : check === 'loading' ? (
                                  <div className="flex items-center gap-2 text-slate-400">
                                    <RefreshCw size={12} className="animate-spin" />
                                    <span className="text-[10px]">{t('calling_youtube', 'Calling YouTube...')}</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => checkEmbedStatus(c.youtubeId)}
                                    className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-sky-955/20 dark:hover:bg-sky-955/40 border border-sky-200 dark:border-sky-900 text-sky-600 dark:text-sky-400 rounded-xl text-[10px] font-black tracking-wide flex items-center gap-1 transition-all"
                                  >
                                    <Play size={8} className="fill-current" />
                                    {t('test_embed_status', 'Test Embed Status')}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 4. tab: AI Emma Prompt Configuration */}
          {activeTab === 'ai-config' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Form Controls (Left column) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black tracking-tight">{t('ai_coach_prompt_editor', 'AI Coach Prompt Editor')}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t('control_the_underlying_groq_parameters_f', 'Control the underlying Groq parameters for Emma\'s system prompt instructions.')}</p>
                </div>

                <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {/* Model Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">{t('model_selection', 'Model Selection')}</label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-sky-500 transition-all cursor-pointer"
                    >
                      <option value="llama-3.3-70b-versatile">{t('llama_3_3_70b_versatile_standard_recomme', 'llama-3.3-70b-versatile (Standard - recommended)')}</option>
                      <option value="llama-3.1-8b-instant">{t('llama_3_1_8b_instant_fast_response', 'llama-3.1-8b-instant (Fast response)')}</option>
                      <option value="mixtral-8x7b-32768">{t('mixtral_8x7b_32768_alternate_high_contex', 'mixtral-8x7b-32768 (Alternate high context)')}</option>
                      <option value="gemma2-9b-it">{t('gemma2_9b_it_google_gemma_2', 'gemma2-9b-it (Google Gemma 2)')}</option>
                    </select>
                  </div>

                  {/* System Prompt Instructions */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">{t('system_instructions', 'System Instructions')}</label>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">{t('appended_on_backend', 'Appended on Backend')}</span>
                    </div>
                    <textarea
                      rows={5}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={t('write_system_prompt_instructions_for_the', 'Write system prompt instructions for the AI Coach here...')}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-sky-500 transition-all font-sans leading-relaxed"
                    />
                  </div>

                  {/* Temperature slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">{t('temperature', 'Temperature')}</label>
                      <span className="text-xs font-black text-sky-500">{aiTemp.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={aiTemp}
                      onChange={(e) => setAiTemp(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                      <span>{t('strict_precise_0_1', 'Strict / Precise (0.1)')}</span>
                      <span>{t('creative_conversational_1_0', 'Creative / Conversational (1.0)')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={handleSaveAIConfig}
                      className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/10 transition-all"
                    >
                      <Check size={14} />
                      {t('save_configuration', 'Save Configuration')}
                    </button>
                    <button
                      onClick={handleResetAIConfig}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      {t('reset_presets', 'Reset presets')}
                    </button>
                  </div>

                </div>
              </div>

              {/* Sandbox Playground (Right column) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm flex flex-col justify-between min-h-[460px]">
                <div>
                  <h4 className="font-black text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {t('live_prompt_sandbox', 'Live Prompt Sandbox')}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t('test_emma_response_logs_instantly', 'Test Emma response logs instantly')}</p>
                </div>

                {/* Messages feed */}
                <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 my-4 space-y-3 max-h-[300px]">
                  {playgroundMsgs.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-xl max-w-[85%] text-[11px] font-semibold leading-relaxed ${
                        m.sender === 'user' 
                          ? 'bg-sky-500 text-white text-right' 
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 text-left'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {playgroundLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Send input */}
                <form onSubmit={handlePlaygroundSend} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('type_sandbox_message', 'Type sandbox message...')}
                    value={playgroundInput}
                    onChange={(e) => setPlaygroundInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl font-bold text-xs focus:outline-none focus:border-sky-500 transition-all text-slate-850 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!playgroundInput.trim() || playgroundLoading}
                    className="p-2.5 bg-sky-500 hover:bg-sky-655 text-white rounded-xl disabled:opacity-40 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* 5. tab: System Settings & Database Inspector */}
          {activeTab === 'system' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Infrastructure Stats widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* DB status */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 rounded-xl flex items-center justify-center">
                      <Database size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{t('database_engine', 'Database Engine')}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('active_connection', 'Active connection')}</p>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 font-bold text-slate-550">
                    <div className="flex justify-between">
                      <span>{t('database_type', 'Database Type')}</span>
                      <span className="text-slate-850 dark:text-slate-200">{stats ? stats.database_size : 'SQLite3'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('query_latency', 'Query Latency')}</span>
                      <span className="text-emerald-500">{t('1_2_ms', '~1.2 ms')}</span>
                    </div>
                  </div>
                </div>

                {/* Python runtime */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-955/20 text-blue-600 rounded-xl flex items-center justify-center">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{t('python_runtime', 'Python Runtime')}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('active_env', 'Active Env')}</p>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 font-bold text-slate-555">
                    <div className="flex justify-between">
                      <span>{t('version', 'Version')}</span>
                      <span className="text-slate-850 dark:text-slate-200">{stats ? stats.python_version : 'Python 3'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('host_os', 'Host OS')}</span>
                      <span className="text-slate-800 dark:text-slate-200">{t('windows_server', 'Windows Server')}</span>
                    </div>
                  </div>
                </div>

                {/* API cluster */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-955/20 text-purple-600 rounded-xl flex items-center justify-center">
                      <Server size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{t('api_services', 'API Services')}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('fastapi_cluster', 'FastAPI cluster')}</p>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 font-bold text-slate-555">
                    <div className="flex justify-between">
                      <span>{t('status', 'Status')}</span>
                      <span className="text-emerald-500">{stats ? stats.uptime : 'Stable'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('framework', 'Framework')}</span>
                      <span className="text-slate-800 dark:text-slate-200">{t('uvicorn_fastapi', 'Uvicorn / FastAPI')}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Administrative Configurations Control */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-855 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black tracking-tight">{t('system_controls_feature_flags', 'System Controls & Feature Flags')}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t('control_global_system_settings_settings', 'Control global system settings. Settings are active immediately.')}</p>
                </div>
                
                <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  
                  {/* maintenance mode */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-black text-sm flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <ShieldAlert size={16} className="text-amber-500" />
                        {t('maintenance_mode', 'Maintenance Mode')}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{t('redirect_all_student_client_traffic_to_a', 'Redirect all student client traffic to a system upgrade screen.')}</p>
                    </div>
                    <button 
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`w-12 h-6 rounded-full p-1 transition-all ${maintenanceMode ? 'bg-amber-500 flex justify-end' : 'bg-slate-200 dark:bg-slate-800 flex justify-start'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  {/* rate limiting */}
                  <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-805">
                    <div>
                      <div className="font-black text-sm text-slate-800 dark:text-slate-200">{t('api_rate_limiting', 'API Rate Limiting')}</div>
                      <p className="text-xs text-slate-400 mt-0.5">{t('enforce_a_limit_of_100_requests_per_minu', 'Enforce a limit of 100 requests per minute per user key to protect Groq AI quotas.')}</p>
                    </div>
                    <button 
                      onClick={() => setRateLimiting(!rateLimiting)}
                      className={`w-12 h-6 rounded-full p-1 transition-all ${rateLimiting ? 'bg-sky-500 flex justify-end' : 'bg-slate-200 dark:bg-slate-800 flex justify-start'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  {/* backup schedule */}
                  <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-black text-sm text-slate-800 dark:text-slate-200">{t('database_auto_backup_schedule', 'Database Auto-Backup Schedule')}</div>
                      <p className="text-xs text-slate-400 mt-0.5">{t('determine_frequency_for_cloning_sqlite_d', 'Determine frequency for cloning sqlite database states to backup repository.')}</p>
                    </div>
                    <select
                      value={backupSchedule}
                      onChange={(e) => setBackupSchedule(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-350 focus:outline-none focus:border-sky-500 transition-all cursor-pointer"
                    >
                      <option value="hourly">{t('hourly_clones', 'Hourly Clones')}</option>
                      <option value="daily">{t('daily_cron_00_00_utc', 'Daily Cron (00:00 UTC)')}</option>
                      <option value="weekly">{t('weekly_cron_sunday', 'Weekly Cron (Sunday)')}</option>
                      <option value="disabled">{t('disabled', 'Disabled')}</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* LIVE SQLite Database Schema & Row Inspector */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h3 className="text-base font-black tracking-tight">{t('live_sqlite_table_column_inspector', 'Live SQLite Table & Column Inspector')}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t('direct_system_master_inspect_of_database', 'Direct system master inspect of database schemas and record counts.')}</p>
                  </div>
                  <button 
                    onClick={fetchTables} 
                    disabled={loadingTables}
                    className="p-2 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 text-xs font-bold"
                  >
                    <RefreshCw size={12} className={loadingTables ? 'animate-spin' : ''} />
                    {t('inspect_db_schema', 'Inspect DB Schema')}
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  {loadingTables ? (
                    <div className="p-10 text-center text-xs font-bold text-slate-400 flex flex-col items-center gap-2">
                      <RefreshCw size={20} className="animate-spin text-sky-500" />
                      {t('loading_sqlite_table_information', 'Loading SQLite Table Information...')}
                    </div>
                  ) : dbTables.length === 0 ? (
                    <div className="p-10 text-center text-xs font-bold text-slate-400">
                      {t('no_tables_inspected_click_refresh_button', 'No tables inspected. Click refresh button.')}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dbTables.map((table) => {
                        const isExpanded = expandedTable === table.name;
                        return (
                          <div key={table.name} className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-slate-50/50 dark:bg-slate-950/10">
                            {/* Header row click toggles details */}
                            <button
                              onClick={() => setExpandedTable(isExpanded ? null : table.name)}
                              className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-slate-850/50 transition-colors text-left"
                            >
                              <div className="flex items-center gap-2">
                                <Database size={15} className="text-sky-500" />
                                <span className="font-black text-sm font-mono text-slate-800 dark:text-slate-100">{table.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 bg-sky-50 dark:bg-sky-955/20 border border-sky-200 dark:border-sky-900 text-sky-600 dark:text-sky-400 rounded-xl text-[10px] font-black tracking-wide">
                                  {table.rows} {t('rows', 'rows')}
                                </span>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-250 ${isExpanded ? 'rotate-180' : ''}`} />
                              </div>
                            </button>

                            {/* Table schema body */}
                            {isExpanded && (
                              <div className="border-t border-slate-150 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 text-xs animate-in fade-in duration-200">
                                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">{t('column_schemas', 'Column Schemas')}</h5>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left font-mono">
                                    <thead>
                                      <tr className="text-slate-450 border-b border-slate-100 dark:border-slate-800 text-[10px]">
                                        <th className="pb-2 font-black">{t('cid', 'CID')}</th>
                                        <th className="pb-2 font-black">{t('column_name', 'COLUMN NAME')}</th>
                                        <th className="pb-2 font-black">{t('type', 'TYPE')}</th>
                                        <th className="pb-2 font-black">{t('not_null', 'NOT NULL')}</th>
                                        <th className="pb-2 font-black">{t('primary_key', 'PRIMARY KEY')}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {table.columns.map((col: any) => (
                                        <tr key={col.name} className="text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-950/40">
                                          <td className="py-1.5 font-bold">{col.cid}</td>
                                          <td className="py-1.5 font-black text-slate-800 dark:text-slate-200">{col.name}</td>
                                          <td className="py-1.5 font-bold text-sky-600 dark:text-sky-400">{col.type}</td>
                                          <td className="py-1.5">{col.notnull ? 'TRUE' : 'FALSE'}</td>
                                          <td className="py-1.5 font-black text-amber-500">{col.pk ? 'YES' : 'NO'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* LIVE Writings Submissions Audit Feed */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h3 className="text-base font-black tracking-tight">{t('live_writing_submissions_auditor', 'Live Writing Submissions Auditor')}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t('audit_recent_student_compositions_and_ai', 'Audit recent student compositions and AI Groq-evaluator scoring results.')}</p>
                  </div>
                  <button 
                    onClick={fetchWritings} 
                    disabled={loadingWritings}
                    className="p-2 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 text-xs font-bold"
                  >
                    <RefreshCw size={12} className={loadingWritings ? 'animate-spin' : ''} />
                    {t('audit_log_feed', 'Audit Log Feed')}
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  {loadingWritings ? (
                    <div className="p-10 text-center text-xs font-bold text-slate-400 flex flex-col items-center gap-2">
                      <RefreshCw size={20} className="animate-spin text-sky-500" />
                      {t('loading_writing_logs', 'Loading Writing Logs...')}
                    </div>
                  ) : recentWritings.length === 0 ? (
                    <div className="p-10 text-center text-xs font-bold text-slate-400">
                      {t('no_writing_submissions_found_in_audit_fe', 'No writing submissions found in audit feed.')}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {recentWritings.map((sub) => (
                        <div key={sub.id} className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm bg-slate-50/30 dark:bg-slate-950/5 flex flex-col md:flex-row gap-4 justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-xs text-slate-800 dark:text-slate-250">@{sub.username}</span>
                              <span className="text-[10px] text-slate-400">{sub.submitted_at}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 mb-1">{t('original_composition', 'Original Composition')}</h5>
                                <p className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 p-3 rounded-xl font-cn leading-relaxed font-bold text-slate-750 dark:text-slate-100">{sub.original_text}</p>
                              </div>
                              <div>
                                <h5 className="text-[9px] font-black uppercase text-slate-400 mb-1">{t('corrected_text_ai_coach_emma', 'Corrected Text (AI Coach Emma)')}</h5>
                                <p className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 p-3 rounded-xl font-cn leading-relaxed font-bold text-slate-750 dark:text-slate-100">{sub.corrected_text || 'No corrections recommended.'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-[9px] font-black uppercase text-slate-400 mb-1">{t('groq_assessment_feedback', 'Groq Assessment Feedback')}</h5>
                              <p className="text-slate-600 dark:text-slate-350 text-xs italic font-medium">"{sub.feedback}"</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 gap-3 w-full md:w-auto">
                            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 min-w-[90px] shadow-sm">
                              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{sub.score}</span>
                              <span className="text-[9px] font-black uppercase text-slate-400 mt-0.5">{t('overall_score', 'Overall Score')}</span>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-200/50 dark:border-emerald-900/40 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                              <Check size={10} /> {t('audited', 'Audited')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-955/20 dark:border-emerald-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-955/20 dark:border-purple-900',
    slate: 'bg-slate-50 border-slate-200 text-slate-650 dark:bg-slate-850/50 dark:border-slate-800',
  };

  const textColors: Record<string, string> = {
    blue: 'text-blue-500',
    green: 'text-emerald-500',
    purple: 'text-purple-500',
    slate: 'text-slate-500',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-855 shadow-sm flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-slate-400 font-bold text-xs mb-1">{title}</p>
        <h3 className="text-3xl font-black">{value}</h3>
      </div>
      <div className={`text-[10px] font-black uppercase tracking-wider ${textColors[color]}`}>
        {trend}
      </div>
    </div>
  );
}
