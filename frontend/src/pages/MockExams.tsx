import { useState, useEffect } from 'react';
import { ArrowLeft, Timer, Award, CheckCircle2, XCircle, ChevronRight, RefreshCw, BookOpen } from 'lucide-react';
import { EXAMS } from '../data/exams';
import { getGrammar } from '../data/grammar';
import { LanguageCode, getLanguageInfo } from '../data/courses';
import { getVocab } from '../data/vocab';
import { useTranslation } from 'react-i18next';

interface MockExamsProps {
  onBack: () => void;
  onAwardXP: (xp: number) => void;
  lang: string;
}

export default function MockExams({ onBack, onAwardXP, lang }: MockExamsProps) {
  const { t } = useTranslation();
  const activeLang = lang as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);

  const [selectedLevel, setSelectedLevel] = useState<'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'grammar' | null>(null);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isExamActive, setIsExamActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isExamActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isExamActive) {
      handleFinishExam();
    }
    return () => clearInterval(timer);
  }, [isExamActive, timeLeft]);

  const generateDynamicExams = (level: 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4', activeLang: LanguageCode) => {
    const vocabList = getVocab(activeLang);
    const size = Math.ceil(vocabList.length / 4);
    let levelWords = [];
    if (level === 'hsk1') levelWords = vocabList.slice(0, size);
    else if (level === 'hsk2') levelWords = vocabList.slice(size, size * 2);
    else if (level === 'hsk3') levelWords = vocabList.slice(size * 2, size * 3);
    else levelWords = vocabList.slice(size * 3);

    if (levelWords.length < 5) {
      levelWords = vocabList;
    }

    const allMeanings = vocabList.map(w => w.m).filter(Boolean);
    const allPronunciations = vocabList.map(w => w.p).filter(Boolean);

    return levelWords.map((w, idx) => {
      const isMeaningTest = idx % 2 === 0;
      const qText = isMeaningTest 
        ? `What does "${w.h}" mean in ${langInfo.label}?` 
        : `How do you pronounce "${w.h}"?`;
      
      const correctAns = isMeaningTest ? w.m : w.p;
      const pool = isMeaningTest ? allMeanings : allPronunciations;
      const wrong = pool
        .filter(x => x.toLowerCase() !== correctAns.toLowerCase())
        .sort(() => 0.5 - Math.random());
      
      const fallback = isMeaningTest 
        ? ['hello', 'water', 'goodbye', 'thank you', 'friend', 'student', 'teacher']
        : ['/ah/', '/beh/', '/seh/', '/deh/', '/eh/'];
      
      const distractors = wrong.length >= 3 
        ? wrong.slice(0, 3) 
        : fallback.filter(x => x.toLowerCase() !== correctAns.toLowerCase()).slice(0, 3);
      
      const opts = [correctAns, ...distractors].sort(() => 0.5 - Math.random());

      return {
        q: qText,
        opts,
        a: opts.indexOf(correctAns)
      };
    }).sort(() => 0.5 - Math.random()).slice(0, 15);
  };

  const handleStartExam = (level: 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'grammar') => {
    let questions: any[] = [];
    if (level === 'grammar') {
      const grammarData = getGrammar(activeLang) || [];
      const allTitles = grammarData.map((g: any) => g.title || g.pattern || 'Pattern');
      questions = grammarData
        .filter((g: any) => g.examples && g.examples.length > 0)
        .map((g: any) => {
          const ex = g.examples[Math.floor(Math.random() * g.examples.length)];
          const targetText = typeof ex === 'string' ? ex : ex.cn || ex.target || '';
          
          const wrongTitles = allTitles
            .filter((t: string) => t !== (g.title || g.pattern))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          const opts = [g.title || g.pattern, ...wrongTitles].sort(() => 0.5 - Math.random());
          return {
            q: `What grammar pattern does this sentence demonstrate?\n"${targetText}"`,
            opts,
            a: opts.indexOf(g.title || g.pattern),
          };
        })
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
    } else {
      if (activeLang === 'zh') {
        const pool = EXAMS[level] || [];
        questions = [...pool].sort(() => 0.5 - Math.random()).slice(0, 15);
      } else {
        questions = generateDynamicExams(level, activeLang);
      }
    }

    if (questions.length === 0) {
      // Fallback
      questions = [
        { q: `Translate hello:`, opts: ['hello', 'bye', 'yes', 'no'], a: 0 }
      ];
    }

    setExamQuestions(questions);
    setSelectedLevel(level);
    setCurrentIdx(0);
    setSelectedOption(null);
    setAnswers([]);
    setTimeLeft(level === 'grammar' ? 480 : 600);
    setIsExamActive(true);
    setShowResults(false);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    setAnswers(prev => [...prev, selectedOption]);
    setSelectedOption(null);
    if (currentIdx < examQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinishExam();
    }
  };

  const handleFinishExam = () => {
    setIsExamActive(false);
    setShowResults(true);
    
    let score = 0;
    const finalAnswers = [...answers];
    if (selectedOption !== null && finalAnswers.length < examQuestions.length) {
      finalAnswers.push(selectedOption);
    }
    
    examQuestions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.a) {
        score += 1;
      }
    });

    const total = examQuestions.length;
    const passed = score >= Math.ceil(total * 0.6);
    if (passed) {
      const xpAmount = selectedLevel === 'grammar' ? 35
        : selectedLevel === 'hsk1' ? 20
        : selectedLevel === 'hsk2' ? 30
        : selectedLevel === 'hsk3' ? 40 : 50;
      onAwardXP(xpAmount);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getScoreInfo = () => {
    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.a) correct += 1;
    });
    const total = examQuestions.length || 1;
    const percent = Math.round((correct / total) * 100);
    const passed = correct >= Math.ceil(total * 0.6);
    return { correct, percent, passed };
  };

  const getExamLabel = (lvl: string) => {
    if (lvl === 'grammar') return t('grammar');
    return lvl.toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-left">
      {/* Back Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={isExamActive || showResults ? () => { setSelectedLevel(null); setIsExamActive(false); setShowResults(false); } : onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            {selectedLevel ? t('mock_exam_title', { lvl: getExamLabel(selectedLevel) }) : t('mock_exams')}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {isExamActive
              ? t('exam_active_desc')
              : t('exam_lobby_desc', { lang: langInfo.label })}
          </p>
        </div>
      </div>

      {!selectedLevel && (
        // Exam Selection Grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['hsk1', 'hsk2', 'hsk3', 'hsk4'] as const).map((level) => (
            <div
              key={level}
              onClick={() => handleStartExam(level)}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple-bg text-brand-purple flex items-center justify-center font-black text-lg">
                  {level === 'hsk1' ? '1' : level === 'hsk2' ? '2' : level === 'hsk3' ? '3' : '4'}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-purple bg-brand-purple-bg px-2.5 py-1 rounded-full">
                  {t('exam_questions_count', { count: 15 })}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-md font-extrabold text-slate-800 dark:text-white">
                  {t('exam_card_title', { lvl: getExamLabel(level) })}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1">
                  {t('exam_limit_passed')}
                </p>
              </div>
            </div>
          ))}

          {/* Grammar Test */}
          <div
            onClick={() => handleStartExam('grammar')}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 rounded-3xl p-6 shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-1 rounded-full">
                {t('exam_questions_count', { count: 10 })}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-md font-extrabold text-white">{t('grammar_test_title')}</h3>
              <p className="text-xs text-white/75 font-bold mt-1">{t('grammar_test_desc')}</p>
            </div>
          </div>
        </div>
      )}

      {isExamActive && examQuestions.length > 0 && (
        // Exam Quiz View
        <div className="space-y-6">
          {/* Timer & progress header */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300">
              <Timer className="w-5 h-5 text-brand-blue" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('question_progress_exam', { current: currentIdx + 1, total: examQuestions.length })}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-slate-800 dark:text-white leading-relaxed">
              {examQuestions[currentIdx].q}
            </h2>

            {/* Options grid */}
            <div className="space-y-3">
              {examQuestions[currentIdx].opts.map((opt: string, optIdx: number) => {
                const isSelected = selectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border font-bold text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-blue-bg border-brand-blue text-brand-blue shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Action Button */}
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-3xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              selectedOption === null
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-[0.99] shadow-lg shadow-brand-blue/20'
            }`}
          >
            {currentIdx < examQuestions.length - 1 ? t('next_question_exam') : t('submit_exam')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {showResults && (
        // Results Summary View
        <div className="space-y-6">
          {/* Top summary card */}
          {(() => {
            const info = getScoreInfo();
            return (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  info.passed ? 'bg-brand-green-bg text-brand-green' : 'bg-brand-red-bg text-brand-red'
                }`}>
                  {info.passed ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                    {info.passed ? t('congrats_passed') : t('keep_practicing')}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-1">
                    {t('exam_score', { correct: info.correct, total: examQuestions.length, percent: info.percent })}
                  </p>
                </div>

                {info.passed && (
                  <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider border border-brand-yellow/30">
                    <Award className="w-4 h-4" />
                    {t('xp_awarded_exam', { count: selectedLevel === 'grammar' ? 35 : selectedLevel === 'hsk1' ? 20 : selectedLevel === 'hsk2' ? 30 : selectedLevel === 'hsk3' ? 40 : 50 })}
                  </div>
                )}

                <div className="flex gap-3 w-full pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => handleStartExam(selectedLevel!)}
                    className="flex-1 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-sm hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> {t('retake')}
                  </button>
                  <button
                    onClick={() => { setSelectedLevel(null); setShowResults(false); }}
                    className="flex-1 py-3.5 rounded-2xl bg-brand-blue text-white font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all flex items-center justify-center"
                  >
                    {t('other_exams')}
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Question Review List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              {t('exam_review')}
            </h3>
            {examQuestions.map((q, idx) => {
              const userAns = answers[idx];
              const isCorrect = userAns === q.a;

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-relaxed">
                      {idx + 1}. {q.q}
                    </h4>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isCorrect ? 'bg-brand-green-bg text-brand-green' : 'bg-brand-red-bg text-brand-red'
                    }`}>
                      {isCorrect ? t('correct') : t('incorrect')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold mt-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-left">
                      {t('your_answer')}{' '}
                      <span className={isCorrect ? 'text-brand-green' : 'text-brand-red'}>
                        {userAns !== undefined ? q.opts[userAns] : 'None'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="p-3 rounded-xl bg-brand-green-bg border border-brand-green/10 text-brand-green-dark text-left">
                        {t('correct_answer_label')} <span className="font-extrabold">{q.opts[q.a]}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
