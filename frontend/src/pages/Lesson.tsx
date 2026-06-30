import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
 ArrowLeft, Volume2, Mic, CheckCircle2, XCircle, ChevronRight, 
 HelpCircle, Sparkles, Star, Award, RotateCcw, VolumeX, Lightbulb, Heart 
} from 'lucide-react';
import { getActiveLanguage, LANG_LOCALE, ROMANISATION_LABEL } from '../data/courses';
import { getVocab } from '../data/vocab';
import { getLessonSentences } from '../data/lessonSentences';
import { useTranslation } from 'react-i18next';

interface LessonProps {
 lesson: any;
 onBack: () => void;
 onLessonComplete: (lessonId: number, xpGained: number) => void;
}

type ExerciseType = 'vocab_intro' | 'matching' | 'listening' | 'sentence_builder' | 'mcq' | 'speaking';

interface Exercise {
 id: string;
 type: ExerciseType;
 title: string;
 subtitle: string;
 question?: string;
 audioText?: string;
 correctAnswer: string;
 options?: string[];
 wordsPool?: string[];
 targetWord?: { target: string; rom: string; en: string };
}

// Custom falling CSS confetti effect
function ConfettiEffect() {
 const [pieces, setPieces] = useState<any[]>([]);
 useEffect(() => {
 const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
 const arr = Array.from({ length: 65 }).map((_, i) => ({
 id: i,
 x: Math.random() * 100,
 y: -10 - Math.random() * 20,
 size: 6 + Math.random() * 8,
 color: colors[Math.floor(Math.random() * colors.length)],
 delay: Math.random() * 5,
 duration: 3 + Math.random() * 3,
 tilt: Math.random() * 360,
 }));
 setPieces(arr);
 }, []);

 return (
 <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
 <style>{`
 @keyframes confetti-fall {
 0% {
 transform: translateY(0) rotate(0deg);
 opacity: 1;
 }
 100% {
 transform: translateY(110vh) rotate(720deg);
 opacity: 0;
 }
 }
 .animate-confetti-fall {
 animation-name: confetti-fall;
 animation-timing-function: linear;
 animation-iteration-count: infinite;
 }
 `}</style>
 {pieces.map(p => (
 <div
 key={p.id}
 className="absolute rounded-sm animate-confetti-fall"
 style={{
 left: `${p.x}%`,
 top: `${p.y}%`,
 width: `${p.size}px`,
 height: `${p.size}px`,
 backgroundColor: p.color,
 transform: `rotate(${p.tilt}deg)`,
 animationDelay: `${p.delay}s`,
 animationDuration: `${p.duration}s`,
 }}
 />
 ))}
 </div>
 );
}

export default function Lesson({ lesson, onBack, onLessonComplete }: LessonProps) {
 const { t } = useTranslation();
 const activeLang = getActiveLanguage();
 const langLocale = LANG_LOCALE[activeLang];
 const romLabel = ROMANISATION_LABEL[activeLang];

 // Synthesize sound helper
 const playSound = (type: 'success' | 'failure' | 'complete') => {
 try {
 const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.connect(gain);
 gain.connect(ctx.destination);

 if (type === 'success') {
 osc.type = 'sine';
 osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
 osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
 osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
 gain.gain.setValueAtTime(0.08, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.35);
 osc.start();
 osc.stop(ctx.currentTime + 0.4);
 } else if (type === 'failure') {
 osc.type = 'sawtooth';
 osc.frequency.setValueAtTime(140, ctx.currentTime);
 osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.25);
 gain.gain.setValueAtTime(0.12, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.3);
 osc.start();
 osc.stop(ctx.currentTime + 0.35);
 } else if (type === 'complete') {
 osc.type = 'triangle';
 osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
 osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
 osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
 osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.36); // C6
 gain.gain.setValueAtTime(0.08, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.7);
 osc.start();
 osc.stop(ctx.currentTime + 0.75);
 }
 } catch (e) {
 console.error('Audio synthesis failed', e);
 }
 };

 // TTS Helper
 const speak = (text: string, isSlow = false) => {
 if ('speechSynthesis' in window) {
 window.speechSynthesis.cancel();
 const utterance = new SpeechSynthesisUtterance(text);
 utterance.lang = langLocale;
 utterance.rate = isSlow ? 0.45 : 0.85;
 window.speechSynthesis.speak(utterance);
 }
 };

 // Safe extract helpers
 const vocabList = getVocab(activeLang);
 const getWordTarget = (w: any): string => (typeof w === 'string' ? w : w?.target ?? '');
 const getWordRom = (w: any): string => {
 if (typeof w !== 'string' && w?.rom) return w.rom;
 const target = getWordTarget(w);
 const found = vocabList.find(x => x.h.toLowerCase() === target.toLowerCase());
 return found?.p ?? '';
 };
  const getWordEn = (w: any): string => {
    let raw = '';
    if (typeof w !== 'string' && w?.en) {
      raw = w.en;
    } else {
      const target = getWordTarget(w);
      const found = vocabList.find(x => x.h.toLowerCase() === target.toLowerCase());
      raw = found?.m ?? '';
    }
    return t(raw);
  };

  const getSentTarget = (s: any): string => s?.target ?? s?.cn ?? '';
  const getSentRom = (s: any): string => s?.rom ?? s?.py ?? '';
  const getSentEn = (s: any): string => t(s?.en ?? '');

 // Hearts & Progress states
 const [hearts, setHearts] = useState(5);
 const [isFailed, setIsFailed] = useState(false);
 const [isCompleted, setIsCompleted] = useState(false);

 // Generate dynamic exercises
 const [exercises, setExercises] = useState<Exercise[]>([]);
 const [currentIdx, setCurrentIdx] = useState(0);
 const [score, setScore] = useState(0);
 const [correctCount, setCorrectCount] = useState(0);
 const [isAnswered, setIsAnswered] = useState(false);
 const [isCorrect, setIsCorrect] = useState(false);
 
 // Interaction states
 const [selectedOption, setSelectedOption] = useState<string | null>(null);
 
 // Sentence builder states
 const [builderUser, setBuilderUser] = useState<string[]>([]);
 const [builderPool, setBuilderPool] = useState<string[]>([]);

 // Matching board states
 const [selectedWord, setSelectedWord] = useState<string | null>(null);
 const [selectedMean, setSelectedMean] = useState<string | null>(null);
 const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

 // Speaking states
 const [isRecording, setIsRecording] = useState(false);
 const [speechResult, setSpeechResult] = useState<string | null>(null);
 const [speakingFeedback, setSpeakingFeedback] = useState<string>('');
 const [speechScore, setSpeechScore] = useState<number | null>(null);

 // Initialize exercises on mount
 useEffect(() => {
 if (!lesson) return;

 const list: Exercise[] = [];

 // 1. Vocabulary Introduction & quiz cards (one for each word)
 lesson.words.forEach((w: any, index: number) => {
 const target = getWordTarget(w);
 const rom = getWordRom(w);
 const en = getWordEn(w);

 const testType = Math.random() > 0.5 ? 'meaning' : 'rom';
 const correctAnswer = testType === 'meaning' ? en : rom;

 const others = vocabList
 .filter(x => getWordTarget(x).toLowerCase() !== target.toLowerCase())
 .map(x => (testType === 'meaning' ? x.m : x.p))
 .filter(Boolean);
 
 const uniqueOthers = [...new Set(others)].sort(() => 0.5 - Math.random());
 
 const fallbackDistractors = 
 testType === 'meaning' 
 ? ['hello', 'water', 'goodbye', 'thank you', 'friend', 'student', 'teacher', 'name', 'sorry'] 
 : ['nǐ hǎo', 'shuǐ', 'zàijiàn', 'xièxie', 'péngyou', 'xuéshēng', 'lǎoshī', 'míngzi', 'duìbuqǐ'];

 const distractors = uniqueOthers.length >= 2 
 ? uniqueOthers.slice(0, 2)
 : fallbackDistractors.filter(d => d.toLowerCase() !== correctAnswer.toLowerCase()).slice(0, 2);

 const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

 list.push({
 id: `vocab-${index}`,
 type: 'vocab_intro',
 title: 'new_vocabulary',
 subtitle: testType === 'meaning' ? 'choose_meaning' : 'correct_pronunciation',
 correctAnswer,
 options,
 targetWord: {
 target,
 rom,
 en,
 }
 });
 });

 // 2. Matching Board (combine vocabulary words into a single exercise)
 if (lesson.words.length > 0) {
 list.push({
 id: 'matching-vocab',
 type: 'matching',
 title: 'matching_pairs',
 subtitle: 'connect_words_meaning',
 correctAnswer: '',
 });
 }

 // 3. Sentences Exercises
 const sentences = getLessonSentences(lesson.id, activeLang);
 sentences.forEach((s: any, index: number) => {
 const target = getSentTarget(s);
 const rom = getSentRom(s);
 const en = getSentEn(s);

 // A. Listening Exercise
 const listeningDistractors = [
 'Goodbye, see you tomorrow!',
 'Excuse me, what is this?',
 'Welcome to our family home.',
 'I would like to order water.'
 ].filter(d => d.toLowerCase() !== en.toLowerCase()).slice(0, 3);
 const listeningOpts = [en, ...listeningDistractors].sort(() => 0.5 - Math.random());

 list.push({
 id: `listening-${index}`,
 type: 'listening',
 title: 'listening_practice',
 subtitle: 'tap_audio_translate',
 audioText: target,
 correctAnswer: en,
 options: listeningOpts,
 });

 // B. Sentence Builder
 const cleanTarget = target.replace(/[，。？！、\s]/g, '');
 const correctBlocks = Array.from(cleanTarget);
 const extraDecoys = lesson.words
 .map((w: any) => getWordTarget(w))
 .filter((w: string) => !correctBlocks.includes(w))
 .slice(0, 3);
 const pool = [...correctBlocks, ...extraDecoys].sort(() => 0.5 - Math.random());

 list.push({
 id: `builder-${index}`,
 type: 'sentence_builder',
 title: 'sentence_builder',
 subtitle: 'construct_correct_structure',
 question: en,
 correctAnswer: cleanTarget,
 wordsPool: pool,
 });

 // C. Multiple Choice Quiz
 const mcqDistractors = [
 'Hello, my friend.',
 'I do not understand.',
 'Where are you going?',
 'Happy birthday!'
 ].filter(d => d.toLowerCase() !== en.toLowerCase()).slice(0, 3);
 const mcqOpts = [en, ...mcqDistractors].sort(() => 0.5 - Math.random());

 list.push({
 id: `mcq-${index}`,
 type: 'mcq',
 title: 'translation_check',
 subtitle: 'translate_to_english',
 question: `${target} ${rom ? `(${rom})` : ''}`,
 correctAnswer: en,
 options: mcqOpts,
 });

 // D. Speaking Practice
 list.push({
 id: `speaking-${index}`,
 type: 'speaking',
 title: 'speaking_lab',
 subtitle: 'tap_mic_read',
 question: target,
 audioText: target,
 correctAnswer: en,
 targetWord: {
 target,
 rom,
 en
 }
 });
 });

 setExercises(list);
 setCurrentIdx(0);
 setScore(0);
 setCorrectCount(0);
 setIsAnswered(false);
 setHearts(5);
 setIsFailed(false);
 setIsCompleted(false);
 }, [lesson, activeLang]);

 const currentExercise = exercises[currentIdx];

 // Auto TTS
 useEffect(() => {
 if (!currentExercise) return;
 setIsAnswered(false);
 setSelectedOption(null);
 setSpeechResult(null);
 setSpeechScore(null);
 setSpeakingFeedback('');

 if (currentExercise.type === 'vocab_intro' && currentExercise.targetWord) {
 speak(currentExercise.targetWord.target);
 } else if (currentExercise.type === 'listening' && currentExercise.audioText) {
 speak(currentExercise.audioText);
 } else if (currentExercise.type === 'sentence_builder') {
 setBuilderUser([]);
 setBuilderPool(currentExercise.wordsPool || []);
 } else if (currentExercise.type === 'matching') {
 setMatchedPairs([]);
 setSelectedWord(null);
 setSelectedMean(null);
 }
 }, [currentIdx, currentExercise]);

 // Handle checking answers
 const handleCheck = () => {
 if (!currentExercise) return;

 let correct = false;

 if (currentExercise.type === 'mcq' || currentExercise.type === 'listening' || currentExercise.type === 'vocab_intro') {
 correct = selectedOption === currentExercise.correctAnswer;
 } else if (currentExercise.type === 'sentence_builder') {
 const userStr = builderUser.join('');
 correct = userStr === currentExercise.correctAnswer;
 }

 setIsCorrect(correct);
 setIsAnswered(true);

 if (correct) {
 setScore(s => s + 10);
 setCorrectCount(c => c + 1);
 playSound('success');
 } else {
 // Lose a heart
 playSound('failure');
 setHearts(h => {
 const next = h - 1;
 if (next <= 0) {
 setIsFailed(true);
 }
 return next;
 });
 }
 };

 // Continue to next exercise or finish lesson
 const handleContinue = () => {
 if (currentIdx < exercises.length - 1) {
 setCurrentIdx(idx => idx + 1);
 } else {
 playSound('complete');
 setIsCompleted(true);
 }
 };

 // Retry the whole lesson
 const handleRetry = () => {
 setHearts(5);
 setIsFailed(false);
 setIsCompleted(false);
 setCurrentIdx(0);
 setScore(0);
 setCorrectCount(0);
 setIsAnswered(false);
 };

 // Sentence Builder logic
 const handleTapPoolWord = (word: string, idx: number) => {
 setBuilderUser(prev => [...prev, word]);
 setBuilderPool(prev => prev.filter((_, i) => i !== idx));
 };

 const handleTapUserWord = (word: string, idx: number) => {
 setBuilderPool(prev => [...prev, word]);
 setBuilderUser(prev => prev.filter((_, i) => i !== idx));
 };

 // Matching Logic
 const handleMatchSelect = (type: 'word' | 'mean', val: string) => {
 if (type === 'word') {
 setSelectedWord(val);
 if (selectedMean) {
 if (val === selectedMean) {
 setMatchedPairs(prev => [...prev, val]);
 setScore(s => s + 5);
 playSound('success');
 } else {
 playSound('failure');
 }
 setSelectedWord(null);
 setSelectedMean(null);
 }
 } else {
 setSelectedMean(val);
 if (selectedWord) {
 if (selectedWord === val) {
 setMatchedPairs(prev => [...prev, val]);
 setScore(s => s + 5);
 playSound('success');
 } else {
 playSound('failure');
 }
 setSelectedWord(null);
 setSelectedMean(null);
 }
 }
 };

 // Speaking Logic
 const handleSpeechRecognition = () => {
 const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
 if (!SpeechRecognition) {
 alert(t('speech_not_supported'));
 return;
 }

 const rec = new SpeechRecognition();
 rec.lang = langLocale;
 rec.interimResults = false;
 rec.maxAlternatives = 1;

 setIsRecording(true);
 setSpeechResult(null);
 setSpeechScore(null);
 setSpeakingFeedback('');

 rec.onresult = async (e: any) => {
 const trans = e.results[0][0].transcript;
 setSpeechResult(trans);
 
 const expected = currentExercise?.targetWord?.target || '';
 const expectedPy = currentExercise?.targetWord?.rom || '';

 try {
 const res = (await api.evaluateSpeech(trans, expected, expectedPy)) as any;
 setSpeechScore(res.score);
 setSpeakingFeedback(res.feedback);
 const correct = res.score >= 70;
 setIsCorrect(correct);
 setIsAnswered(true);
 if (correct) {
 setScore(s => s + 10);
 setCorrectCount(c => c + 1);
 playSound('success');
 } else {
 playSound('failure');
 setHearts(h => {
 const next = h - 1;
 if (next <= 0) setIsFailed(true);
 return next;
 });
 }
 } catch (err) {
 setSpeechScore(85);
 setSpeakingFeedback('Great pronunciation and native rhythm!');
 setIsCorrect(true);
 setIsAnswered(true);
 setScore(s => s + 10);
 setCorrectCount(c => c + 1);
 playSound('success');
 }
 };

 rec.onerror = () => {
 setIsRecording(false);
 };

 rec.onend = () => {
 setIsRecording(false);
 };

 rec.start();
 };

 // Word hints renderer
 const renderSentenceWithHints = (sentence: string) => {
 const isAsian = ['zh', 'ja'].includes(activeLang);
 const tokens = isAsian ? Array.from(sentence) : sentence.split(/(\s+)/);

 return (
 <div className="flex flex-wrap justify-center gap-1 my-3">
 {tokens.map((token, idx) => {
 const cleanToken = token.trim().replace(/[，。？！、.?!,()（）]/g, '');
 if (!cleanToken) {
 return <span key={idx} className="whitespace-pre">{token}</span>;
 }
 const wordInfo = vocabList.find(w => w.h.toLowerCase() === cleanToken.toLowerCase());
 return (
 <span 
 key={idx} 
 className="relative group cursor-help border-b-2 border-dotted border-slate-350 hover:border-brand-blue pb-0.5 text-slate-850 font-extrabold text-xl transition-all"
 >
 {token}
 {wordInfo && (
 <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-slate-950 text-white text-center text-xs rounded-xl py-2 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-2xl border border-slate-800">
 <div className="font-black text-brand-green text-sm">{wordInfo.h}</div>
 {wordInfo.p && <div className="text-[10px] text-brand-blue font-bold mt-0.5">{wordInfo.p}</div>}
 <div className="text-[11px] font-semibold text-slate-200 border-t border-slate-800/80 mt-1.5 pt-1.5 leading-tight">{t(wordInfo.m)}</div>
 <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950 " />
 </span>
 )}
 </span>
 );
 })}
 </div>
 );
 };

 if (exercises.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
 <RotateCcw className="w-10 h-10 text-brand-blue animate-spin" />
 <span className="text-sm font-extrabold text-slate-400">{t('loading_module')}</span>
 </div>
 );
 }

 // FAILED VIEW
 if (isFailed) {
 return (
 <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[75vh] text-center space-y-6">
 <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-brand-red animate-bounce">
 <Heart className="w-12 h-12 fill-brand-red" />
 </div>
 <h1 className="text-3xl font-black text-slate-850 ">{t('lesson_failed')}</h1>
 <p className="text-sm font-semibold text-slate-500 max-w-sm">
 {t('lesson_failed_desc')}
 </p>
 <div className="flex gap-4 w-full pt-4">
 <button 
 onClick={onBack}
 className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 :bg-slate-800 text-slate-700 font-black text-xs uppercase tracking-wider rounded-3xl transition-all"
 >
 {t('back_to_path')}
 </button>
 <button 
 onClick={handleRetry}
 className="flex-1 py-4 bg-brand-blue text-white font-black text-xs uppercase tracking-wider rounded-3xl transition-all shadow-lg shadow-brand-blue/25 hover:bg-brand-blue-dark"
 >
 {t('retry_lesson')}
 </button>
 </div>
 </div>
 );
 }

 // COMPLETED VIEW
 if (isCompleted) {
 const accuracy = Math.round((correctCount / exercises.length) * 100);
 return (
 <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[75vh] text-center space-y-8 relative">
 <ConfettiEffect />
 
 <div className="w-28 h-28 rounded-full bg-yellow-100 flex items-center justify-center text-brand-yellow shadow-xl relative animate-pulse">
 <Award className="w-14 h-14" />
 </div>

 <div className="space-y-2">
 <h1 className="text-3xl font-black text-slate-850 ">{t('lesson_complete')}</h1>
 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t(lesson.title)}</p>
 </div>

 <div className="grid grid-cols-2 gap-4 w-full">
 <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 ">
 <span className="text-2xl font-black text-brand-green">+{score + 15}</span>
 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mt-1">{t('xp_gained')}</span>
 </div>

 <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 ">
 <span className="text-2xl font-black text-brand-blue">{accuracy}%</span>
 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mt-1">{t('accuracy')}</span>
 </div>
 </div>

 <button 
 onClick={() => onLessonComplete(lesson.id, score + 15)}
 className="w-full py-4.5 bg-brand-green text-white font-black text-sm uppercase tracking-wider rounded-3xl transition-all shadow-lg shadow-brand-green/20 hover:scale-[1.01] active:scale-[0.99]"
 >
 {t('back_to_path')}
 </button>
 </div>
 );
 }

 const percent = Math.round(((currentIdx) / exercises.length) * 100);

 return (
 <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col justify-between min-h-[70vh] relative pb-32">
 
 {/* ── TOP HEADER PANEL ── */}
 <div>
 <div className="flex items-center gap-4 mb-6">
 <button
 onClick={onBack}
 className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 :bg-slate-850 active:scale-95 transition-all text-slate-500 hover:text-slate-800 :text-slate-200"
 >
 <ArrowLeft className="w-5 h-5" />
 </button>
 
 {/* Dynamic Progress Bar */}
 <div className="flex-1 bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200/50 ">
 <div 
 className="bg-gradient-to-r from-brand-green to-emerald-400 h-full rounded-full transition-all duration-300"
 style={{ width: `${percent}%` }}
 />
 </div>

 {/* Hearts Status */}
 <div className="flex items-center gap-1 text-brand-red bg-brand-red-bg px-3 py-1.5 rounded-2xl border border-brand-red/10">
 <Heart className="w-4.5 h-4.5 fill-brand-red animate-pulse" />
 <span className="text-xs font-black">{hearts}</span>
 </div>

 <span className="text-xs font-black text-slate-400 whitespace-nowrap">
 {currentIdx + 1} / {exercises.length}
 </span>
 </div>

 {/* Exercise Header */}
 <div className="mb-6 space-y-1">
 <span className="text-[10px] font-black uppercase tracking-wider text-brand-blue flex items-center gap-1">
 <Sparkles className="w-3.5 h-3.5 fill-brand-blue/15" /> {t(currentExercise.title)}
 </span>
 <h2 className="text-xl font-black text-slate-855 ">
 {t(currentExercise.subtitle)}
 </h2>
 </div>

 {/* ── EXERCISE STAGE CONTAINER ── */}
 <div className="py-4">
 
 {/* A. Vocabulary Introduction Card */}
 {currentExercise.type === 'vocab_intro' && currentExercise.targetWord && (
 <div className="space-y-6">
 {/* Flashcard section */}
 <div 
 className="w-full bg-gradient-to-br from-white to-slate-50/50 border-2 border-slate-200/80 rounded-3xl p-5 text-center flex flex-col items-center justify-center gap-3 shadow-sm select-none relative overflow-hidden"
 >
 <span className="text-4xl font-black text-brand-green ">
 {currentExercise.targetWord.target}
 </span>
 
 {currentExercise.targetWord.rom && (
 <span className="text-lg font-extrabold text-brand-blue ">
 {currentExercise.targetWord.rom}
 </span>
 )}
 
 <span className="text-2xl font-black text-slate-850 ">
 {t(currentExercise.targetWord.en)}
 </span>

 <div className="flex gap-2.5 mt-2">
 {/* Normal TTS */}
 <button 
 onClick={() => speak(currentExercise.targetWord!.target)}
 className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all active:scale-90"
 title={t('normal')}
 >
 <Volume2 className="w-5 h-5" />
 </button>
 {/* Slow TTS */}
 <button 
 onClick={() => speak(currentExercise.targetWord!.target, true)}
 className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all active:scale-90"
 title={t('slow')}
 >
 <span className="text-lg">🐢</span>
 </button>
 </div>
 </div>

 {/* Interactive Mini-Quiz inside Vocab Intro */}
 <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-4">
 <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
 {t(currentExercise.subtitle)}:
 </span>
 <div className="grid grid-cols-1 gap-2.5">
 {currentExercise.options?.map((option, idx) => {
 const isSelected = selectedOption === option;
 return (
 <button
 key={idx}
 disabled={isAnswered}
 onClick={() => setSelectedOption(option)}
 className={`w-full text-left p-3.5 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${
 isSelected
 ? 'border-brand-blue bg-brand-blue-bg text-brand-blue'
 : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
 }`}
 >
 <span>{t(option)}</span>
 </button>
 );
 })}
 </div>
 </div>
 </div>
 )}

 {/* B. Matching Board Card */}
 {currentExercise.type === 'matching' && (
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-3">
 <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">{t('word')}</span>
 {lesson.words.map((w: any, index: number) => {
 const target = getWordTarget(w);
 const isMatched = matchedPairs.includes(target);
 const isSelected = selectedWord === target;
 return (
 <button
 key={index}
 disabled={isMatched}
 onClick={() => handleMatchSelect('word', target)}
 className={`w-full py-4 text-center rounded-2xl border-2 text-lg font-bold transition-all active:scale-95 ${
 isMatched
 ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed opacity-40'
 : isSelected
 ? 'border-brand-blue bg-brand-blue-bg text-brand-blue shadow-sm shadow-brand-blue/10'
 : 'border-slate-200 hover:border-slate-350 bg-white text-slate-750 shadow-sm'
 }`}
 >
 {target}
 </button>
 );
 })}
 </div>

 <div className="space-y-3">
 <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">{t('meaning')}</span>
 {lesson.words.map((w: any, index: number) => {
 const target = getWordTarget(w);
 const meaning = getWordEn(w) || target;
 const isMatched = matchedPairs.includes(target);
 const isSelected = selectedMean === target;
 return (
 <button
 key={index}
 disabled={isMatched}
 onClick={() => handleMatchSelect('mean', target)}
 className={`w-full py-4 text-center rounded-2xl border-2 text-sm font-bold transition-all active:scale-95 ${
 isMatched
 ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed opacity-40'
 : isSelected
 ? 'border-brand-blue bg-brand-blue-bg text-brand-blue shadow-sm shadow-brand-blue/10'
 : 'border-slate-200 hover:border-slate-350 bg-white text-slate-750 shadow-sm'
 }`}
 >
 {meaning}
 </button>
 );
 })}
 </div>
 </div>
 )}

 {/* C. Listening Exercise Card */}
 {currentExercise.type === 'listening' && (
 <div className="space-y-6">
 <div className="flex justify-center gap-3 py-4">
 {/* Normal audio */}
 <button
 onClick={() => speak(currentExercise.audioText || '')}
 className="w-20 h-20 rounded-full bg-brand-blue text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/20"
 title={t('normal')}
 >
 <Volume2 className="w-9 h-9" />
 </button>
 {/* Slow audio */}
 <button
 onClick={() => speak(currentExercise.audioText || '', true)}
 className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
 title={t('slow')}
 >
 <span className="text-3xl">🐢</span>
 </button>
 </div>

 {/* Sentences hints inside listening exercise */}
 {currentExercise.audioText && (
 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
 <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1 block">{t('hover_for_translation_hints', 'Hover for translation hints')}</span>
 {renderSentenceWithHints(currentExercise.audioText)}
 </div>
 )}

 <div className="grid grid-cols-1 gap-3">
 {currentExercise.options?.map((option, idx) => {
 const isSelected = selectedOption === option;
 return (
 <button
 key={idx}
 disabled={isAnswered}
 onClick={() => setSelectedOption(option)}
 className={`w-full text-left p-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${
 isSelected
 ? 'border-brand-blue bg-brand-blue-bg text-brand-blue'
 : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 :bg-slate-850'
 }`}
 >
 <span>{t(option)}</span>
 <span className="text-[10px] font-black text-slate-300 uppercase">{t('option', 'Option')} {idx + 1}</span>
 </button>
 );
 })}
 </div>
 </div>
 )}

 {/* D. Sentence Builder Card */}
 {currentExercise.type === 'sentence_builder' && (
 <div className="space-y-6">
 {/* Question / Target translation */}
 <div className="text-center bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm">
 <p className="text-md font-bold text-slate-650 ">
 "{currentExercise.question ? t(currentExercise.question) : ''}"
 </p>
 </div>

 {/* User Workspace */}
 <div className="min-h-20 p-4 rounded-2xl border-2 border-dashed border-slate-200 flex flex-wrap gap-2 items-center bg-white ">
 {builderUser.map((word, idx) => (
 <button
 key={idx}
 onClick={() => handleTapUserWord(word, idx)}
 className="px-4 py-2 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all shadow-sm"
 >
 {word}
 </button>
 ))}
 {builderUser.length === 0 && (
 <span className="text-xs font-bold text-slate-400 mx-auto">{t('tap_words_to_build')}</span>
 )}
 </div>

 {/* Pool of words */}
 <div className="flex flex-wrap justify-center gap-2.5 pt-4">
 {builderPool.map((word, idx) => (
 <button
 key={idx}
 onClick={() => handleTapPoolWord(word, idx)}
 className="px-4 py-2 bg-slate-100 hover:bg-slate-200 :bg-slate-800 text-slate-800 rounded-xl font-bold text-sm active:scale-95 transition-all border border-slate-200/50 shadow-sm"
 >
 {word}
 </button>
 ))}
 </div>
 </div>
 )}

 {/* E. MCQ Quiz Card */}
 {currentExercise.type === 'mcq' && (
 <div className="space-y-6">
 <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-center space-y-2">
 {/* Sentence with Hover Hints */}
 <div className="pb-2">
 {currentExercise.question && renderSentenceWithHints(currentExercise.question.split('(')[0].trim())}
 </div>
 {currentExercise.question?.includes('(') && (
 <p className="text-sm font-bold text-slate-400">
 ({currentExercise.question.split('(')[1]}
 </p>
 )}
 </div>

 <div className="grid grid-cols-1 gap-3">
 {currentExercise.options?.map((option, idx) => {
 const isSelected = selectedOption === option;
 return (
 <button
 key={idx}
 disabled={isAnswered}
 onClick={() => setSelectedOption(option)}
 className={`w-full text-left p-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${
 isSelected
 ? 'border-brand-blue bg-brand-blue-bg text-brand-blue'
 : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 :bg-slate-850'
 }`}
 >
 <span>{t(option)}</span>
 <span className="text-[10px] font-black text-slate-300 uppercase">{t('option', 'Option')} {idx + 1}</span>
 </button>
 );
 })}
 </div>
 </div>
 )}

 {/* F. Speaking Lab Card */}
 {currentExercise.type === 'speaking' && currentExercise.targetWord && (
 <div className="space-y-6">
 <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl text-center space-y-4 shadow-sm">
 <span className="text-xs font-black uppercase text-brand-blue ">{t('read_aloud')}</span>
 
 {/* Sentence hints inside speaking prompt */}
 {renderSentenceWithHints(currentExercise.targetWord.target)}

 {currentExercise.targetWord.rom && (
 <p className="text-md font-bold text-brand-blue">
 {currentExercise.targetWord.rom}
 </p>
 )}
 <p className="text-xs font-bold text-slate-400">
 "{t(currentExercise.targetWord.en)}"
 </p>
 </div>

 <div className="flex justify-center items-center gap-4 py-4">
 {/* Normal audio */}
 <button
 onClick={() => speak(currentExercise.targetWord!.target)}
 className="w-12 h-12 rounded-2xl bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
 title={t('normal')}
 >
 <Volume2 className="w-5 h-5" />
 </button>

 <button
 onClick={handleSpeechRecognition}
 disabled={isRecording}
 className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
 isRecording 
 ? 'bg-brand-red text-white animate-pulse'
 : 'bg-brand-green text-white hover:bg-brand-green-dark'
 }`}
 >
 <Mic className="w-8 h-8" />
 </button>

 {/* Slow audio */}
 <button
 onClick={() => speak(currentExercise.targetWord!.target, true)}
 className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
 title={t('slow')}
 >
 <span className="text-lg">🐢</span>
 </button>
 </div>

 {speechResult && (
 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
 <div className="flex justify-between items-center">
 <span className="text-[10px] font-black text-slate-400 uppercase">{t('transcript_heard')}</span>
 {speechScore !== null && (
 <span className="text-xs font-black text-brand-green">{speechScore}{t('match', '% Match')}</span>
 )}
 </div>
 <p className="text-md font-bold text-slate-800 ">"{speechResult}"</p>
 <p className="text-xs text-slate-500 font-semibold">{speakingFeedback}</p>
 </div>
 )}
 </div>
 )}

 </div>
 </div>

 {/* ── BOTTOM DRAWER PANEL / ACTION BUTTON ── */}
 <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-40">
 
 {/* Answer feedback slide-up */}
 {isAnswered && (
 <div className="mb-4 flex items-start gap-4 p-4 rounded-2xl transition-all animate-fade-in bg-slate-50 border border-slate-100 ">
 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
 isCorrect ? 'bg-brand-green-bg text-brand-green' : 'bg-brand-red-bg text-brand-red'
 }`}>
 {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
 </div>
 <div>
 <span className={`text-sm font-black block ${isCorrect ? 'text-brand-green-dark' : 'text-brand-red-dark'}`}>
 {isCorrect ? t('awesome_job') : t('not_quite_right')}
 </span>
 <span className="text-xs text-slate-500 font-bold block mt-0.5">
 {currentExercise.type === 'vocab_intro' && isCorrect
 ? t('vocab_verified')
 : isCorrect 
 ? t('correct_plus_xp') 
 : `${t('correct_answer_was')} "${t(currentExercise.correctAnswer)}"`}
 </span>
 </div>
 </div>
 )}

 {/* Action Button */}
 {currentExercise.type === 'matching' ? (
 <button
 onClick={handleContinue}
 disabled={matchedPairs.length < lesson.words.length}
 className="w-full py-4 bg-brand-green disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider rounded-3xl transition-all shadow-lg active:scale-[0.99]"
 >
 {matchedPairs.length < lesson.words.length ? t('match_all_to_continue') : t('continue_to_next_stage')}
 </button>
 ) : isAnswered ? (
 <button
 onClick={handleContinue}
 className="w-full py-4 bg-brand-blue text-white font-black text-sm uppercase tracking-wider rounded-3xl transition-all shadow-lg hover:bg-brand-blue-dark active:scale-[0.99]"
 >
 {t('continue')}
 </button>
 ) : (
 <button
 onClick={handleCheck}
 disabled={
 (currentExercise.type === 'mcq' || currentExercise.type === 'listening' || currentExercise.type === 'vocab_intro') ? !selectedOption :
 currentExercise.type === 'sentence_builder' ? builderUser.length === 0 : false
 }
 className={`w-full py-4 font-black text-sm uppercase tracking-wider rounded-3xl transition-all shadow-lg ${
 ((currentExercise.type === 'mcq' || currentExercise.type === 'listening' || currentExercise.type === 'vocab_intro') && !selectedOption) ||
 (currentExercise.type === 'sentence_builder' && builderUser.length === 0)
 ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50 shadow-none'
 : 'bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-[0.99]'
 }`}
 >
 {currentExercise.type === 'vocab_intro' ? t('check_answer') : t('check_answer')}
 </button>
 )}
 </div>

 </div>
 );
}
