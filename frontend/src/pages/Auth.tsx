import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User as UserIcon, Github, Chrome, Play } from 'lucide-react';
import { api } from '../services/api';

interface AuthProps {
  onAuthSuccess: (user: any) => void;
  onBack: () => void;
  onGuestMode: () => void;
  initialIsLogin?: boolean;
}

export default function Auth({ onAuthSuccess, onBack, onGuestMode, initialIsLogin = true }: AuthProps) {
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {


      if (isLogin) {
        const data = await api.login(username, password);
        const me = await api.getMe();
        onAuthSuccess(me);
      } else {
        await api.register(username, password, email || undefined);
        const data = await api.login(username, password);
        const me = await api.getMe();
        onAuthSuccess(me);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans p-6 overflow-hidden relative">
      
      {/* Fun Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#1cb0f6]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#58cc02]/10 blur-[100px] pointer-events-none" />

      {/* Top Nav */}
      <div className="absolute top-0 left-0 w-full p-6 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all shadow-[0_4px_0_#e5e7eb] active:translate-y-[4px] active:shadow-none"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up mt-12">
        
        <div className="text-center mb-8">
          <img src="/mascot.png" alt={t('polyglot_mascot', 'Polyglot Mascot')} className="w-24 h-24 mx-auto object-contain drop-shadow-md mb-6 animate-bounce" style={{ animationDuration: '3s' }} />
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {isLogin ? 'Log in' : 'Create your profile'}
          </h1>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 placeholder-slate-400 font-bold focus:outline-none focus:border-[#1cb0f6] focus:bg-white transition-all"
                  placeholder={t('email_address', 'Email address')}
                />
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 placeholder-slate-400 font-bold focus:outline-none focus:border-[#1cb0f6] focus:bg-white transition-all"
                placeholder={isLogin ? 'Email or username' : 'Username'}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 placeholder-slate-400 font-bold focus:outline-none focus:border-[#1cb0f6] focus:bg-white transition-all"
                placeholder={t('password', 'Password')}
              />
            </div>

            {error && (
              <div className="p-3 mt-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-500 text-sm font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1cb0f6] hover:bg-[#1899d6] text-white font-black text-lg py-4 mt-6 rounded-2xl shadow-[0_4px_0_#1899d6] hover:shadow-[0_2px_0_#1899d6] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[4px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : isLogin ? (
                'Log In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
            <span className="text-slate-400 font-black uppercase text-xs tracking-widest">{t('or', 'Or')}</span>
            <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-base py-3.5 rounded-2xl shadow-[0_3px_0_#e5e7eb] hover:shadow-[0_1px_0_#e5e7eb] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[3px] uppercase tracking-wide flex items-center justify-center gap-3">
              <Chrome className="w-5 h-5 text-blue-500" /> {t('continue_with_google', 'Continue with Google')}
            </button>
            <button 
              onClick={onGuestMode}
              className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-base py-3.5 rounded-2xl shadow-[0_3px_0_#e5e7eb] hover:shadow-[0_1px_0_#e5e7eb] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[3px] uppercase tracking-wide flex items-center justify-center gap-3"
            >
              <UserIcon className="w-5 h-5 text-slate-400" /> {t('try_as_guest', 'Try as Guest')}
            </button>
          </div>

        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1cb0f6] uppercase tracking-wider hover:text-[#1899d6] transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
