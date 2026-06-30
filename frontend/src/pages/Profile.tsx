import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Shield, Award, Calendar, ChevronRight, Activity, Globe, Download, Zap, BookOpen, Camera, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/courses';
import { api } from '../services/api';

interface ProfileProps {
  user: any;
  onBack: () => void;
  onUpdateUser: (user: any) => void;
  onNavigate?: (page: string) => void;
}

const ActivityHeatmap = () => {
  const weeks = 14;
  const days = 7;
  const data = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 4));

  return (
    <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-1">
          {Array.from({ length: days }).map((_, d) => {
            const val = data[w * days + d];
            const colors = ['bg-slate-200 dark:bg-slate-800', 'bg-sky-200 dark:bg-sky-900', 'bg-sky-400 dark:bg-sky-700', 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]'];
            return (
              <div key={d} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${colors[val]} transition-all duration-300 hover:scale-125 cursor-pointer`} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function Profile({ user, onBack, onUpdateUser, onNavigate }: ProfileProps) {
  const { t } = useTranslation();
  const [avatarStyle, setAvatarStyle] = useState({ skinTone: 'light', outfit: 'default' });

  const unlockedOutfits = ['default'];
  if (user?.level >= 5) unlockedOutfits.push('kimono');
  if (user?.level >= 10) unlockedOutfits.push('hanfu');
  if (user?.level >= 15) unlockedOutfits.push('djellaba');

  const [editUsername, setEditUsername] = useState(user?.username || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editNativeLang, setEditNativeLang] = useState(user?.native_lang || 'en');
  const [editLearningGoal, setEditLearningGoal] = useState(user?.learning_goal || 'general');
  const [editEnergyMood, setEditEnergyMood] = useState(user?.energy_mood || 'focused');
  const [editRole, setEditRole] = useState(user?.role || 'student');
  const [updating, setUpdating] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [teacherBioForm, setTeacherBioForm] = useState(user?.teacher_bio || '');
  const [teacherCredentialsForm, setTeacherCredentialsForm] = useState(user?.teacher_credentials || '');
  const [teacherContact, setTeacherContact] = useState(user?.teacher_contact || '');
  const [teacherCertificate, setTeacherCertificate] = useState<string | null>(user?.teacher_certificate || null);
  const [appStatus, setAppStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [classroomCode, setClassroomCode] = useState(localStorage.getItem('classroom_code') || 'HANYU-2026');

  useEffect(() => {
    if (user) {
      setEditUsername(user.username || '');
      setEditEmail(user.email || '');
      setEditNativeLang(user.native_lang || 'en');
      setEditLearningGoal(user.learning_goal || 'general');
      setEditEnergyMood(user.energy_mood || 'focused');
      setEditRole(user.role || 'student');
      setTeacherBioForm(user.teacher_bio || '');
      setTeacherCredentialsForm(user.teacher_credentials || '');
      setTeacherContact(user.teacher_contact || '');
      setTeacherCertificate(user.teacher_certificate || null);
      if (user.avatar) {
        setAvatarStyle(prev => ({ ...prev, outfit: user.avatar }));
      }
    }
  }, [user]);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert(t('image_too_large', 'Image is too large. Please select an image under 1MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await api.updateProfile({ avatar: base64Data });
        onUpdateUser(res);
      } catch (err: any) {
        alert(t('upload_failed', 'Failed to upload profile picture: ') + err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(t('file_too_large', 'File is too large. Please select a file under 5MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTeacherCertificate(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOutfitChange = async (outfit: string) => {
    setAvatarStyle(prev => ({ ...prev, outfit }));
    try {
      const res = await api.updateProfile({ avatar: outfit });
      onUpdateUser(res);
    } catch (err: any) {
      alert(t('save_avatar_failed', 'Failed to save avatar choice: ') + err.message);
    }
  };

  const handleRoleChange = async (role: string) => {
    setEditRole(role);
    try {
      const res = await api.updateProfile({ role });
      onUpdateUser(res);
    } catch (err: any) {
      alert(t('update_role_failed', 'Failed to update role: ') + err.message);
    }
  };

  const handleTeacherApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setAppStatus(null);
    try {
      const res = await api.updateProfile({
        teacher_bio: teacherBioForm,
        teacher_credentials: teacherCredentialsForm,
        teacher_contact: teacherContact,
        teacher_certificate: teacherCertificate,
      });
      onUpdateUser(res);
      setAppStatus({ type: 'success', message: t('application_submitted', 'Application submitted! An administrator will review your credentials.') });
    } catch (err: any) {
      setAppStatus({ type: 'error', message: err.message || t('application_failed', 'Failed to submit application.') });
    } finally {
      setUpdating(false);
    }
  };

  const saveTeacherDetails = async () => {
    setUpdating(true);
    try {
      const res = await api.updateProfile({ 
        teacher_bio: teacherBioForm,
        teacher_contact: teacherContact,
        teacher_certificate: teacherCertificate,
      });
      onUpdateUser(res);
      localStorage.setItem('classroom_code', classroomCode);
      alert(t('teacher_details_updated', 'Teacher details successfully updated!'));
    } catch (err: any) {
      alert(t('teacher_details_failed', 'Failed to update teacher bio: ') + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setFormStatus(null);
    try {
      const res = await api.updateProfile({
        username: editUsername,
        email: editEmail || undefined,
        native_lang: editNativeLang,
        learning_goal: editLearningGoal,
        energy_mood: editEnergyMood,
        role: editRole,
      });
      onUpdateUser(res);
      setFormStatus({ type: 'success', message: t('profile_updated') });
    } catch (err: any) {
      setFormStatus({ type: 'error', message: err.message || t('profile_update_failed') });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120] font-sans selection:bg-sky-200 overflow-hidden relative">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="relative z-30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-white/5 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all hover:scale-105 active:scale-95">
            <ChevronRight className="w-6 h-6 rotate-180 text-slate-600 dark:text-slate-300" />
          </button>
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 tracking-tight">{t('profile_avatar')}</h1>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('settings')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all hover:scale-105 hover:rotate-90 active:scale-95"
        >
          <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-20 custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          
          {/* Avatar & Hero Section */}
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-sky-900/5 dark:shadow-sky-900/20 border border-white/50 dark:border-white/10 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden group/hero">
            
            {/* Dynamic Level Halo Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
              
              <div className="w-44 h-44 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center shadow-inner border-[6px] border-white dark:border-slate-800 relative z-10 overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
                {user?.avatar && user.avatar.startsWith('data:image/') ? (
                  <img src={user.avatar} alt={t('profile', 'Profile')} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="text-7xl animate-bounce" style={{ animationDuration: '4s' }}>
                    {avatarStyle.outfit === 'kimono' ? '👘' : avatarStyle.outfit === 'hanfu' ? '🎎' : avatarStyle.outfit === 'djellaba' ? '👳' : '🧑'}
                  </div>
                )}
                
                {/* Stunning Upload Overlay */}
                <label className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 z-20">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1 group-hover:animate-bounce">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-sky-100">{t('upload_pic', 'Upload Photo')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              {/* Level Badge */}
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-white dark:border-slate-900 z-30 transform group-hover:scale-110 transition-transform duration-300">
                {user?.level || 1}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left z-10">
              <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-3">
                {user?.username}
                {user?.role === 'admin' && <Crown className="inline-block w-6 h-6 ml-2 text-amber-500 -mt-2" />}
              </h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                  user?.role === 'teacher' 
                    ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-purple-500/25' 
                    : user?.role === 'admin'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25'
                      : 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-sky-500/25'
                }`}>
                  {user?.role === 'teacher' ? t('teacher') : user?.role === 'admin' ? t('admin_role', 'Administrator') : t('student')}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {t('joined', { date: new Date(user?.joined_at || Date.now()).toLocaleDateString() })}
                </span>
              </div>
              
              {/* Premium Stat Cards */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/50 dark:border-white/5 flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/20 flex items-center justify-center text-white">
                    <Zap size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('streak_label')}</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white leading-none mt-1">{t('streak_count', { count: user?.streak || 0 })}</div>
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/50 dark:border-white/5 flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/20 flex items-center justify-center text-white">
                    <Award size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('total_xp')}</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white leading-none mt-1">{user?.xp || 0} {t('xp', 'XP')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Avatar Customizer */}
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/50 dark:border-white/5">
              <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-lg text-sky-500"><Globe className="w-5 h-5" /></div>
                {t('customize_avatar')}
              </h3>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('cultural_outfits')}</label>
                <div className="grid grid-cols-4 gap-4">
                  {['default', 'kimono', 'hanfu', 'djellaba'].map((outfit) => {
                    const isUnlocked = unlockedOutfits.includes(outfit);
                    return (
                      <button 
                        key={outfit}
                        disabled={!isUnlocked}
                        onClick={() => handleOutfitChange(outfit)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all duration-300 relative ${
                          avatarStyle.outfit === outfit 
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 shadow-lg shadow-sky-500/20 transform scale-105' 
                            : isUnlocked 
                              ? 'border-transparent bg-white dark:bg-slate-800 hover:border-sky-300 shadow-sm hover:shadow-md' 
                              : 'border-transparent bg-slate-100 dark:bg-slate-800/50 opacity-50 grayscale cursor-not-allowed'
                        }`}
                      >
                        <div className="text-3xl">{outfit === 'kimono' ? '👘' : outfit === 'hanfu' ? '🎎' : outfit === 'djellaba' ? '👳' : '👕'}</div>
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-4 font-medium flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                  <Shield size={14} className="text-sky-500 shrink-0" />
                  {t('unlock_attire_hint')}
                </p>
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/50 dark:border-white/5">
              <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-lg text-sky-500"><Activity className="w-5 h-5" /></div>
                {t('learning_activity')}
              </h3>
              
              <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-inner">
                <ActivityHeatmap />
                <div className="flex justify-between items-center mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{t('less')}</span>
                  <div className="flex gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-slate-200 dark:bg-slate-800" />
                    <div className="w-3.5 h-3.5 rounded-sm bg-sky-200 dark:bg-sky-900" />
                    <div className="w-3.5 h-3.5 rounded-sm bg-sky-400 dark:bg-sky-700" />
                    <div className="w-3.5 h-3.5 rounded-sm bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                  </div>
                  <span>{t('more', 'More')}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between px-2">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('longest_streak')}</div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white">{t('streak_count', { count: Math.max(user?.streak || 0, 14) })}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('words_mastered')}</div>
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">{Math.floor((user?.xp || 0) / 15)}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Profile Details Edit Card */}
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/50 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-lg text-sky-500"><Settings className="w-5 h-5" /></div>
              {t('edit_profile')}
            </h3>
            
            <form onSubmit={handleDetailsSubmit} className="space-y-8 relative z-10">
              
              {/* Account Role Display */}
              <div className="space-y-3 p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('account_role')}</label>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                    user?.role === 'teacher' 
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30' 
                      : user?.role === 'admin'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                        : 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30'
                  }`}>
                    {user?.role === 'teacher' ? t('teacher') : user?.role === 'admin' ? t('admin_role', 'Administrator') : t('student')}
                  </span>
                  
                  {user?.role === 'teacher' && (
                    <button
                      type="button"
                      onClick={() => handleRoleChange('student')}
                      className="text-xs text-red-500 hover:text-red-600 font-bold underline transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {t('demote_to_student', 'Demote to Student')}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('username')}</label>
                  <input
                    type="text"
                    required
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 ring-sky-500/10 transition-all text-sm shadow-sm"
                    placeholder={t('username')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('email_address')}</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 ring-sky-500/10 transition-all text-sm shadow-sm"
                    placeholder={t('no_email_set')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('native_language')}</label>
                  <select
                    value={editNativeLang}
                    onChange={(e) => setEditNativeLang(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 ring-sky-500/10 transition-all text-sm shadow-sm cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map(l => (
                      <option key={l.code} value={l.code}>{t(l.label.toLowerCase(), l.label)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('learning_goal')}</label>
                  <select
                    value={editLearningGoal}
                    onChange={(e) => setEditLearningGoal(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 ring-sky-500/10 transition-all text-sm shadow-sm cursor-pointer"
                  >
                    <option value="general">{t('general_learning')}</option>
                    <option value="travel">{t('travel_culture')}</option>
                    <option value="business">{t('business_career')}</option>
                    <option value="exams">{t('academic_exams')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('energy_mood')}</label>
                  <select
                    value={editEnergyMood}
                    onChange={(e) => setEditEnergyMood(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 ring-sky-500/10 transition-all text-sm shadow-sm cursor-pointer"
                  >
                    <option value="focused">{t('focused_intense')}</option>
                    <option value="casual">{t('casual_relaxed')}</option>
                    <option value="tired">{t('light_review')}</option>
                  </select>
                </div>
              </div>

              {formStatus && (
                <div className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 border-2 animate-in fade-in slide-in-from-top-2 ${
                  formStatus.type === 'success' 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400'
                }`}>
                  {formStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  {formStatus.message}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-black text-sm py-4 px-8 rounded-2xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {updating ? t('saving') : t('save_profile_details')}
                </button>
              </div>
            </form>
          </div>

          {/* Teacher Settings Portal */}
          {user?.role === 'teacher' && (
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-purple-900/20 border border-purple-500/30 relative overflow-hidden text-white group">
              <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-fuchsia-500/20 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 border-b border-white/10 pb-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-xl"><Shield className="w-6 h-6 text-fuchsia-400" /></div> 
                      {t('educator_bio_classroom')}
                    </h3>
                    <p className="text-purple-200 mt-2 font-medium max-w-lg">{t('educator_desc')}</p>
                  </div>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('classroom')}
                      className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black text-sm uppercase tracking-widest rounded-2xl border border-white/20 shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <BookOpen size={18} />
                      {t('launch_gradebook')}
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-purple-300 uppercase tracking-widest pl-1">{t('classroom_code')}</label>
                      <input
                        type="text"
                        value={classroomCode}
                        onChange={(e) => setClassroomCode(e.target.value)}
                        placeholder={t('e_g_class_101', 'e.g. CLASS-101')}
                        className="w-full bg-black/20 border-2 border-white/10 rounded-2xl px-5 py-4 text-white placeholder-purple-300/50 font-bold focus:outline-none focus:border-fuchsia-400 focus:bg-black/30 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-purple-300 uppercase tracking-widest pl-1">{t('contact_info', 'Public Contact Info')}</label>
                      <input
                        type="text"
                        value={teacherContact}
                        onChange={(e) => setTeacherContact(e.target.value)}
                        placeholder={t('contact_ph', 'Email or WhatsApp (optional)')}
                        className="w-full bg-black/20 border-2 border-white/10 rounded-2xl px-5 py-4 text-white placeholder-purple-300/50 font-bold focus:outline-none focus:border-fuchsia-400 focus:bg-black/30 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-purple-300 uppercase tracking-widest pl-1">{t('official_certificate', 'Official Certificate')}</label>
                      <label className="flex items-center justify-center w-full bg-black/20 border-2 border-dashed border-white/20 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/5 transition-all">
                        <span className="text-sm font-bold text-purple-300">{teacherCertificate ? t('certificate_uploaded', 'Certificate Uploaded ✓') : t('upload_certificate', 'Upload Certificate (PDF/Image)')}</span>
                        <input type="file" accept="image/*,.pdf" onChange={handleCertificateUpload} className="hidden" />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-purple-300 uppercase tracking-widest pl-1">{t('educator_bio')}</label>
                      <textarea
                        rows={1}
                        value={teacherBioForm}
                        onChange={(e) => setTeacherBioForm(e.target.value)}
                        placeholder={t('educator_bio_placeholder')}
                        className="w-full bg-black/20 border-2 border-white/10 rounded-2xl px-5 py-4 text-white placeholder-purple-300/50 font-bold focus:outline-none focus:border-fuchsia-400 focus:bg-black/30 transition-all text-sm resize-none custom-scrollbar"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveTeacherDetails}
                      disabled={updating}
                      className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black text-sm py-4 px-8 rounded-2xl shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:-translate-y-1 transition-all active:translate-y-0 uppercase tracking-widest disabled:opacity-50"
                    >
                      {updating ? t('saving') : t('save_teacher_details')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Application Form Portal */}
          {user?.role !== 'teacher' && user?.role !== 'admin' && (
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/50 dark:border-white/5 relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />
              
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 relative z-10">
                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400"><Shield className="w-5 h-5" /></div>
                  {t('apply_teacher_role', 'Apply for Teacher Role')}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  {t('apply_teacher_desc', 'Submit an application to get educator permissions. An administrator will review your application.')}
                </p>
              </div>

              {user?.teacher_status === 'pending' ? (
                <div className="bg-amber-50 dark:bg-amber-500/10 border-2 border-amber-200 dark:border-amber-500/20 rounded-[1.5rem] p-6 space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-black text-base">
                    <AlertCircle className="w-6 h-6 animate-pulse" />
                    {t('app_pending', 'Application Pending Review')}
                  </div>
                  <p className="text-sm text-amber-700/70 dark:text-amber-400/70 font-semibold">
                    {t('app_pending_desc', 'You submitted an application. Here is what you submitted:')}
                  </p>
                  <div className="space-y-3 bg-white/50 dark:bg-black/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-500/10 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-amber-500 uppercase text-[10px] font-bold tracking-widest block mb-1">{t('educator_bio')}</span> 
                      <div className="font-medium text-sm">{user.teacher_bio || 'None'}</div>
                    </div>
                    <div className="pt-3 border-t border-amber-100 dark:border-amber-500/10">
                      <span className="text-amber-500 uppercase text-[10px] font-bold tracking-widest block mb-1">{t('qualifications', 'Qualifications & Credentials')}</span> 
                      <div className="font-medium text-sm">{user.teacher_credentials || 'None'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTeacherApplicationSubmit} className="space-y-6 relative z-10">
                  {user?.teacher_status === 'rejected' && (
                    <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 rounded-2xl p-5 flex items-center gap-3 text-sm font-bold text-red-600 dark:text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{t('app_rejected', 'Your previous application was rejected. Please update your bio/credentials and re-apply.')}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('contact_info', 'Public Contact Info')}</label>
                      <input
                        type="text"
                        value={teacherContact}
                        onChange={(e) => setTeacherContact(e.target.value)}
                        placeholder={t('contact_ph', 'Email or WhatsApp (optional)')}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-bold focus:outline-none focus:border-purple-500 focus:ring-4 ring-purple-500/10 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('official_certificate', 'Official Certificate')}</label>
                      <label className="flex items-center justify-center w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl px-5 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{teacherCertificate ? t('certificate_uploaded', 'Certificate Uploaded ✓') : t('upload_certificate', 'Upload Certificate (PDF/Image)')}</span>
                        <input type="file" accept="image/*,.pdf" onChange={handleCertificateUpload} className="hidden" />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('educator_bio')}</label>
                      <textarea
                        rows={3}
                        required
                        value={teacherBioForm}
                        onChange={(e) => setTeacherBioForm(e.target.value)}
                        placeholder={t('teacher_bio_ph', "Tell us about your teaching background and language teaching philosophy...")}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-purple-500 focus:ring-4 ring-purple-500/10 transition-all text-sm custom-scrollbar"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t('qualifications', 'Qualifications & Credentials')}</label>
                      <textarea
                        rows={3}
                        required
                        value={teacherCredentialsForm}
                        onChange={(e) => setTeacherCredentialsForm(e.target.value)}
                        placeholder={t('qualifications_ph', "Certificates (TCSOL, TEFL, etc.), teaching experience, degrees, or other credentials...")}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-purple-500 focus:ring-4 ring-purple-500/10 transition-all text-sm custom-scrollbar"
                      />
                    </div>
                  </div>

                  {appStatus && (
                    <div className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 border-2 animate-in fade-in slide-in-from-top-2 ${
                      appStatus.type === 'success' 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400'
                    }`}>
                      {appStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      {appStatus.message}
                    </div>
                  )}

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="submit"
                      disabled={updating}
                      className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white font-black text-sm py-4 px-8 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all active:translate-y-0 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updating ? t('submitting', 'Submitting...') : t('submit_application', 'Submit Application')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Offline Mode Manager - Premium Style */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-slate-700 text-white relative overflow-hidden group">
            <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-sky-500/20 blur-[100px] pointer-events-none rounded-full group-hover:bg-sky-400/20 transition-colors duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-3 flex items-center gap-3">
                  <div className="p-2 bg-sky-500/20 rounded-xl"><Download className="w-6 h-6 text-sky-400" /></div> 
                  {t('offline_full_mode')}
                </h3>
                <p className="text-slate-400 font-medium max-w-md text-left leading-relaxed">
                  {t('offline_desc')}
                </p>
              </div>
              <button className="w-full md:w-auto bg-sky-500 hover:bg-sky-400 text-white font-black text-sm py-5 px-8 rounded-2xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:-translate-y-1 transition-all active:translate-y-0 uppercase tracking-widest flex items-center justify-center gap-3 flex-shrink-0">
                <Download size={20} strokeWidth={3} /> {t('download_hsk1')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
