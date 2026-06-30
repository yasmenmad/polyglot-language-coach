import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { 
  ArrowLeft, Edit3, Award, RefreshCw, Send, FileText, 
  ChevronRight, GraduationCap, Sparkles, Eye, BookOpen 
} from 'lucide-react';
import { LanguageCode, getLanguageInfo } from '../data/courses';

interface WritingCoachProps {
  onBack: () => void;
  lang?: string;
}

const PLACEHOLDERS: Record<LanguageCode, string> = {
  zh: 'Type or paste your Chinese text here (e.g. 我想去中国学习语言...)',
  es: 'Type or paste your Spanish sentences here (e.g. Quiero aprender español...)',
  fr: 'Type or paste your French sentences here (e.g. Je veux apprendre le français...)',
  de: 'Type or paste your German sentences here (e.g. Ich möchte Deutsch lernen...)',
  ja: 'Type or paste your Japanese sentences here (e.g. 日本語を勉強したいです...)',
  ko: 'Type or paste your Korean sentences here (e.g. 한국어를 배우고 싶어요...)',
  it: 'Type or paste your Italian sentences here (e.g. Voglio imparare l\'italiano...)',
  en: 'Type or paste your English sentences here (e.g. I want to learn English...)',
  ar: 'Type or paste your Arabic sentences here (e.g. أريد أن أتعلم اللغة العربية...)',
};

// Custom word-by-word LCS diff algorithm
function computeDiff(original: string, corrected: string) {
  if (!original) return [{ type: 'addition' as const, text: corrected }];
  if (!corrected) return [{ type: 'deletion' as const, text: original }];

  const origWords = original.split(/(\s+)/);
  const corrWords = corrected.split(/(\s+)/);
  
  const m = origWords.length;
  const n = corrWords.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origWords[i - 1] === corrWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  let i = m;
  let j = n;
  const diff: { type: 'common' | 'addition' | 'deletion'; text: string }[] = [];
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origWords[i - 1] === corrWords[j - 1]) {
      diff.unshift({ type: 'common', text: origWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'addition', text: corrWords[j - 1] });
      j--;
    } else {
      diff.unshift({ type: 'deletion', text: origWords[i - 1] });
      i--;
    }
  }
  
  return diff;
}

export default function WritingCoach({ onBack, lang }: WritingCoachProps) {
  const { t } = useTranslation();
  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'write' | 'portfolio'>('write');

  // Sandbox & Practice modes
  const [practiceMode, setPracticeMode] = useState(false);
  const [showCorrection, setShowCorrection] = useState(true);
  const [lastSubmissionText, setLastSubmissionText] = useState('');

  // Load portfolio
  const loadPortfolio = async () => {
    try {
      const data = await api.getWritingPortfolio();
      setPortfolio(data as any[]);
    } catch (e) {
      // Offline fallback
      setPortfolio([
        {
          id: 1,
          original_text: "Quiero ir a España aprender español.",
          corrected_text: "Quiero ir a España para aprender español.",
          feedback: "Great sentence structures. Adding the preposition 'para' links the clause properly.",
          grammar_score: 95,
          vocabulary_score: 90,
          fluency_score: 85,
          overall_score: 90,
          submitted_at: new Date().toISOString()
        }
      ]);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setLastSubmissionText(text);

    try {
      const res = await api.submitWriting(text, activeLang);
      setFeedback(res);
      if (practiceMode) {
        setShowCorrection(false);
      } else {
        setText('');
        setShowCorrection(true);
      }
      loadPortfolio();
    } catch (err: any) {
      alert(err.message || 'AI coach is offline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const placeholder = t('writing_placeholder_' + activeLang, PLACEHOLDERS[activeLang] || PLACEHOLDERS.zh);

  return (
    <div className="w-full max-w-[1000px] px-6 py-8 space-y-6 text-left ml-0">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          {t('dashboard')}
        </button>
        <h2 className="text-xl font-black flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-brand-purple" />
          {t('writing_coach_title', 'AI {{lang}} Writing Coach', { lang: langInfo.label })}
        </h2>
      </div>

      {/* Tabs & Mode Toggles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('write')}
            className={`pb-1 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'write'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t('new_submission')}
          </button>
          <button
            onClick={() => { setActiveTab('portfolio'); loadPortfolio(); }}
            className={`pb-1 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'portfolio'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t('my_portfolio', 'My Portfolio ({{count}})', { count: portfolio.length })}
          </button>
        </div>
        {activeTab === 'write' && (
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <GraduationCap className="w-4.5 h-4.5 text-brand-purple" />
            <div className="text-xxs font-black uppercase text-slate-500 tracking-wider">{t('sandbox_practice')}</div>
            <button
              onClick={() => {
                setPracticeMode(!practiceMode);
                setFeedback(null);
              }}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-all flex items-center ${
                practiceMode ? 'bg-brand-purple justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'
              }`}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-white shadow" />
            </button>
          </div>
        )}
      </div>

      {activeTab === 'write' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Write Panel */}
          <div className="space-y-4">
            <form onSubmit={handleEvaluate} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">
                  {t('compose_in', 'Compose in {{lang}}', { lang: langInfo.label })}
                </h3>
                {practiceMode && (
                  <span className="bg-brand-purple/10 text-brand-purple text-[8px] uppercase tracking-widest px-2 py-0.5 rounded font-black">
                    {t('interactive_sandbox')}
                  </span>
                )}
              </div>
              
              <textarea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 rounded-2xl placeholder-slate-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all resize-none text-slate-800 dark:text-white"
              />

              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-2xl disabled:opacity-40 transition-all active-press"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {t('coach_analyzing')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {practiceMode ? t('check_draft') : t('evaluate_writing')}
                  </>
                )}
              </button>
            </form>

            {practiceMode && feedback && (
              <div className="p-4 bg-amber-50 dark:bg-amber-955/10 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-450 rounded-2xl text-xs font-bold flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black">{t('sandbox_active_title')}</p>
                  <p className="font-semibold text-slate-500 mt-1">{t('sandbox_active_desc')}</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Coach Feedback Panel */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 rounded-3xl min-h-[300px] flex flex-col justify-center">
            {feedback ? (
              <div className="space-y-6">
                
                {/* Score Meters */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: t('grammar_score'), val: feedback.grammar_score, color: 'text-brand-green' },
                    { label: t('vocab_score'), val: feedback.vocabulary_score, color: 'text-brand-blue' },
                    { label: t('fluency_score'), val: feedback.fluency_score, color: 'text-brand-purple' }
                  ].map(meter => (
                    <div key={meter.label} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-105 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase text-slate-400">{meter.label}</span>
                      <p className={`text-xl font-black ${meter.color} mt-1`}>{meter.val}%</p>
                    </div>
                  ))}
                </div>

                {/* Main Score Badge */}
                <div className="flex items-center gap-3 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-2xl justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-brand-purple" />
                    <div className="text-left">
                      <span className="text-xxs font-black text-brand-purple uppercase tracking-wider">{t('overall_score')}</span>
                      <p className="text-lg font-black text-brand-purple-dark">{feedback.overall_score}% {t('accuracy')}</p>
                    </div>
                  </div>
                  {practiceMode && !showCorrection && (
                    <button
                      onClick={() => setShowCorrection(true)}
                      className="px-3 py-1.5 bg-brand-purple text-white rounded-xl text-xxs font-black uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Eye size={12} />
                      {t('reveal_diff', 'Reveal Diff')}
                    </button>
                  )}
                </div>

                {/* Diff Visualizations */}
                {showCorrection ? (
                  <div className="space-y-3 text-left">
                    <div>
                      <span className="text-xxs font-black text-slate-400 uppercase">{t('visual_correction_diff', 'Visual Correction Diff')}</span>
                      <div className="mt-1">
                        {(() => {
                           const parts = computeDiff(
                             lastSubmissionText || feedback.original_text,
                             feedback.corrected_text
                           );
                           return (
                             <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl leading-relaxed text-sm font-medium font-cn text-slate-800 dark:text-slate-100">
                               {parts.map((p, idx) => {
                                 if (p.type === 'addition') {
                                   return (
                                     <ins key={idx} className="bg-emerald-100 dark:bg-emerald-955/45 text-emerald-600 dark:text-emerald-400 no-underline px-1 py-0.5 rounded font-black">
                                       {p.text}
                                     </ins>
                                   );
                                 }
                                 if (p.type === 'deletion') {
                                   return (
                                     <del key={idx} className="bg-red-100 dark:bg-red-955/35 text-red-500 line-through px-1 py-0.5 rounded font-medium opacity-80">
                                       {p.text}
                                     </del>
                                   );
                                 }
                                 return <span key={idx}>{p.text}</span>;
                               })}
                             </div>
                           );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-205 dark:border-slate-800 rounded-2xl space-y-2">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="text-xs font-bold">{t('corrections_hidden', 'Corrections Hidden')}</p>
                    <p className="text-[10px] text-slate-500">{t('sandbox_hidden_desc', 'Practice sandbox mode hides the exact corrections to let you solve the grammatical errors yourself!')}</p>
                  </div>
                )}

                {/* AI Remarks */}
                <div className="text-left bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl space-y-1">
                  <span className="text-xxs font-black text-slate-400 uppercase">{t('instructor_feedback')}</span>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {feedback.feedback}
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <FileText className="w-12 h-12 mx-auto stroke-[1.5] text-slate-300 dark:text-slate-700" />
                <h3 className="font-bold text-slate-500">{t('no_submission_active', 'No Submission Active')}</h3>
                <p className="text-xs max-w-xs mx-auto">{t('compose_submit_hint', 'Compose a {{lang}} paragraph on the left and submit it to see pronunciation, correction notes, and grammar grading.', { lang: langInfo.label })}</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Portfolio History List */
        <div className="space-y-4">
          {portfolio.length > 0 ? (
            portfolio.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-850 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-200 transition-all"
              >
                <div className="text-left space-y-1 max-w-xl">
                  <span className="text-xxs font-semibold text-slate-400">
                    {t('submitted', 'Submitted')} {new Date(item.submitted_at).toLocaleDateString()}
                  </span>
                  <p className="text-base font-black text-slate-800 dark:text-white truncate">
                    {item.original_text}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {t('corrected', 'Corrected')}: {item.corrected_text || t('no_correction_needed', 'No correction needed')}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xxs font-black text-slate-400 uppercase">{t('grade', 'Grade')}</span>
                    <p className="text-lg font-black text-brand-purple">{item.overall_score || 0}%</p>
                  </div>
                  <button
                    onClick={() => {
                      setFeedback(item);
                      setLastSubmissionText(item.original_text);
                      setShowCorrection(true);
                      setActiveTab('write');
                    }}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-400 hover:text-slate-600 transition-all"
                    title={t('view_details', 'View details') || 'View details'}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto stroke-[1.5] text-slate-300 dark:text-slate-700" />
              <h3 className="font-bold text-slate-500">{t('portfolio_empty', 'Portfolio is Empty')}</h3>
              <p className="text-xs">{t('portfolio_empty_desc', 'Submit writing passages to build up your learning history portfolio.')}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
