import { useState } from 'react';
import { ArrowLeft, Volume2, Lightbulb, BookOpen, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getGrammar } from '../data/grammar';
import { LANG_LOCALE, getLanguageInfo } from '../data/courses';
import type { LanguageCode } from '../data/courses';
import Flag from '../components/Flag';

interface GrammarGuideProps {
  onBack: () => void;
  lang: string;
}

export default function GrammarGuide({ onBack, lang }: GrammarGuideProps) {
  const { t } = useTranslation();
  const activeLang = lang as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const GRAMMAR = getGrammar(activeLang);
  const levels = [...new Set(GRAMMAR.map(g => g.level))];
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_LOCALE[activeLang];
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredGrammar = GRAMMAR.filter(g => {
    if (activeLevel === 'all') return true;
    return g.level === activeLevel;
  });

  const getPartColor = (role: string) => {
    switch (role) {
      case 'S':
        return { text: 'text-brand-blue dark:text-blue-400', bg: 'bg-brand-blue-bg dark:bg-blue-950/30', border: 'border-brand-blue/30' };
      case 'V':
        return { text: 'text-brand-green dark:text-green-400', bg: 'bg-brand-green-bg dark:bg-green-950/30', border: 'border-brand-green/30' };
      case 'O':
        return { text: 'text-brand-orange dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-brand-orange/30' };
      case 'NEG':
        return { text: 'text-brand-red dark:text-red-400', bg: 'bg-brand-red-bg dark:bg-red-950/30', border: 'border-brand-red/30' };
      case 'Q':
        return { text: 'text-brand-purple dark:text-purple-400', bg: 'bg-brand-purple-bg dark:bg-purple-950/30', border: 'border-brand-purple/30' };
      case 'T':
      default:
        return { text: 'text-brand-teal dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-brand-teal/30' };
    }
  };

  const getPartLabel = (role: string) => {
    switch (role) {
      case 'S': return t('subject');
      case 'V': return t('verb');
      case 'O': return t('object');
      case 'NEG': return t('negation');
      case 'Q': return t('question');
      case 'T': return t('time_aspect');
      default: return role;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Flag code={activeLang} size={18} />
            <span>{t('grammar_title', '{{lang}} Grammar', { lang: langInfo.label })}</span>
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {t('grammar_desc')}
          </p>
        </div>
      </div>

      {/* Quick tips banner */}
      <div className="bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 border border-brand-purple/20 rounded-3xl p-5 mb-6 flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-brand-purple-bg text-brand-purple flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 fill-brand-purple/20" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-purple-dark dark:text-brand-purple block mb-1">
            {t('grammar_tips')}
          </span>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {t('grammar_tips_desc')}
          </p>
        </div>
      </div>

      {/* Part Colors Legend */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 mb-6 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 px-1">
          {t('part_colors')}
        </span>
        <div className="flex flex-wrap gap-2">
          {['S', 'V', 'O', 'NEG', 'Q', 'T'].map((role) => {
            const colors = getPartColor(role);
            return (
              <span
                key={role}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {role} = {getPartLabel(role)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Level filter tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-3xl gap-1 border border-slate-200/50 dark:border-slate-800 mb-6">
        {(['all', ...levels] as string[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveLevel(tab);
              setExpandedId(null);
            }}
            className={`flex-1 py-2.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all ${
              activeLevel === tab
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab === 'all' ? t('all') : tab}
          </button>
        ))}
      </div>

      {/* Grammar Cards List */}
      <div className="space-y-4">
        {filteredGrammar.map((g) => {
          const isExpanded = expandedId === g.id;
          const level = g.level;
          return (
            <div
              key={g.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm transition-all"
            >
              {/* Header block clickable to toggle */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : g.id)}
                className="cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h3 className="text-md font-extrabold text-slate-800 dark:text-white hover:text-brand-blue transition-all">
                    {g.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5 block">
                    {level}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              {/* Collapsible content */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  {/* Pattern Rule block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-green/5 border border-brand-green/20 rounded-2xl p-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block mb-1">
                        {t('pattern')}
                      </span>
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">
                        {g.rule}
                      </div>
                    </div>
                    {g.videoUrl && (
                      <button
                        onClick={() => setSelectedVideoUrl(g.videoUrl!)}
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-black hover:bg-red-600 hover:shadow-md active:scale-95 transition-all uppercase tracking-wider"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        {t('watch_video')}
                      </button>
                    )}
                  </div>

                  {/* Explanation/tip */}
                  {g.tip && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {g.tip}
                    </p>
                  )}

                  {/* Examples */}
                  {g.examples && g.examples.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-1">
                        {t('examples')}
                      </span>
                      {g.examples.map((ex: any, exIdx: number) => (
                        <div
                          key={exIdx}
                          onClick={() => speak(ex.target)}
                          className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 hover:shadow-sm cursor-pointer transition-all flex justify-between items-start gap-4"
                        >
                          <div className="space-y-1">
                            {/* Color-coded parts breakdown */}
                            <div className="flex flex-wrap gap-1.5 items-center">
                              {ex.parts ? (
                                ex.parts.map((p: any, pIdx: number) => {
                                  const colors = getPartColor(p.r);
                                  return (
                                    <span
                                      key={pIdx}
                                      className={`px-2 py-0.5 rounded-lg text-sm font-extrabold border font-chinese ${colors.bg} ${colors.text} ${colors.border}`}
                                      title={getPartLabel(p.r)}
                                    >
                                      {p.h}
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-lg font-black text-slate-800 dark:text-white font-chinese">
                                  {ex.target}
                                </span>
                              )}
                            </div>
                            {ex.rom && (
                              <div className="text-xs font-extrabold text-brand-blue">
                                {ex.rom}
                              </div>
                            )}
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              {ex.en}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(ex.target);
                            }}
                            className="w-8 h-8 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue/20 active:scale-90 transition-all flex-shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Modal Player */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                {t('video_explanation')}
              </h3>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 active:scale-95 text-slate-400 hover:text-white transition-all text-xs font-black uppercase tracking-wider border border-slate-800"
              >
                {t('close')}
              </button>
            </div>

            {/* Video Content */}
            <div className="relative pt-[56.25%] w-full bg-black">
              <iframe
                src={selectedVideoUrl}
                title={t('youtube_video_player', 'YouTube video player')}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Footer Info */}
            <div className="p-4 bg-slate-950/40 border-t border-slate-800 flex justify-center">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {t('learning_companion')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
