import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, Volume2, Gamepad2, Sparkles, Check, HelpCircle, Shuffle, 
  BookOpen, Music, Layers, Headphones, Mic, Calendar, RefreshCw
} from 'lucide-react';
import { getUnits } from '../data/units';
import { getVocab } from '../data/vocab';
import { getLessonSentences } from '../data/lessonSentences';
import type { LanguageCode } from '../data/courses';

interface GamesProps {
  onBack: () => void;
  onAwardXP: (xp: number) => void;
  lang: string;
}

const SM2 = {
  MIN_EASE: 1.3,
  DEFAULT_EASE: 2.5,
  INTERVALS: {
    again: 1,      // 1 minute
    hard: 600,     // 10 minutes
    good: 86400,   // 1 day
    easy: 259200,  // 3 days
  },
  EASE_DELTA: { again: -0.2, hard: -0.15, good: 0, easy: 0.15 } as Record<string, number>,
};

export default function Games({ onBack, onAwardXP, lang }: GamesProps) {
  const { t } = useTranslation();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  // Active course language & vocabulary
  const langCode = lang as LanguageCode;
  const allWords = getVocab(langCode);
  const UNITS = getUnits(langCode);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode === 'zh' ? 'zh-CN' : 
                       langCode === 'es' ? 'es-ES' :
                       langCode === 'fr' ? 'fr-FR' :
                       langCode === 'de' ? 'de-DE' :
                       langCode === 'ja' ? 'ja-JP' :
                       langCode === 'ko' ? 'ko-KR' :
                       langCode === 'it' ? 'it-IT' : 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ----------------------------------------------------
  // GAME 1: Vocabulary Quiz
  // ----------------------------------------------------
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelectedOpt, setQuizSelectedOpt] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const startQuiz = () => {
    if (allWords.length < 4) return;
    const picked = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 10);
    const questions = picked.map(w => {
      const wrong = allWords
        .filter(x => x.h !== w.h)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(x => t(x.m));
      const opts = [t(w.m), ...wrong].sort(() => 0.5 - Math.random());
      return {
        w,
        opts,
        correctIdx: opts.indexOf(t(w.m))
      };
    });
    setQuizQuestions(questions);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizSelectedOpt(null);
    setQuizAnswered(false);
    setActiveGame('quiz');
  };

  const handleSelectQuizOpt = (optIdx: number) => {
    if (quizAnswered) return;
    setQuizSelectedOpt(optIdx);
    setQuizAnswered(true);
    const isCorrect = optIdx === quizQuestions[quizIdx].correctIdx;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      speak(quizQuestions[quizIdx].w.h);
    }
  };

  const handleNextQuiz = () => {
    setQuizSelectedOpt(null);
    setQuizAnswered(false);
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx(prev => prev + 1);
    } else {
      onAwardXP(quizScore * 10);
      setActiveGame('quiz-end');
    }
  };

  // ----------------------------------------------------
  // GAME 2: Matching Game
  // ----------------------------------------------------
  interface MatchItem {
    id: string;
    text: string;
    type: 'cn' | 'en';
    pairId: string;
  }
  const [matchCards, setMatchCards] = useState<MatchItem[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchTries, setMatchTries] = useState(0);

  const startMatching = () => {
    if (allWords.length < 4) return;
    const picked = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 4);
    const cards: MatchItem[] = [];
    picked.forEach((w, idx) => {
      cards.push({ id: `cn-${idx}`, text: w.h, type: 'cn', pairId: `${idx}` });
      cards.push({ id: `en-${idx}`, text: t(w.m), type: 'en', pairId: `${idx}` });
    });
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedMatch(null);
    setMatchedIds([]);
    setMatchTries(0);
    setActiveGame('matching');
  };

  const handleMatchClick = (card: MatchItem) => {
    if (matchedIds.includes(card.id)) return;
    if (selectedMatch === null) {
      setSelectedMatch(card);
      if (card.type === 'cn') speak(card.text);
    } else {
      if (selectedMatch.id === card.id) {
        setSelectedMatch(null);
        return;
      }
      if (selectedMatch.pairId === card.pairId && selectedMatch.type !== card.type) {
        setMatchedIds(prev => [...prev, selectedMatch.id, card.id]);
        if (card.type === 'cn') speak(card.text);
      }
      setMatchTries(prev => prev + 1);
      setSelectedMatch(null);
    }
  };

  useEffect(() => {
    if (activeGame === 'matching' && matchedIds.length === matchCards.length && matchCards.length > 0) {
      onAwardXP(20);
      setActiveGame('matching-end');
    }
  }, [matchedIds]);

  // ----------------------------------------------------
  // GAME 3: Flashcards
  // ----------------------------------------------------
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<any[]>([]);

  const startFlashcards = () => {
    if (allWords.length === 0) return;
    const picked = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 15);
    setFlashcards(picked);
    setFlashcardIdx(0);
    setIsFlipped(false);
    setActiveGame('flashcards');
  };

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (flashcardIdx < flashcards.length - 1) {
        setFlashcardIdx(prev => prev + 1);
      } else {
        onAwardXP(15);
        setActiveGame('flashcards-end');
      }
    }, 150);
  };

  // ----------------------------------------------------
  // GAME 4: Tone Master (or Accent/Stress Master)
  // ----------------------------------------------------
  const [toneQuestions, setToneQuestions] = useState<any[]>([]);
  const [toneIdx, setToneIdx] = useState(0);
  const [toneScore, setToneScore] = useState(0);
  const [toneSelectedOpt, setToneSelectedOpt] = useState<number | null>(null);
  const [toneAnswered, setToneAnswered] = useState(false);

  const toneOpts = lang === 'zh' ? [
    { n: 1, l: '1st Tone — Flat (ā)' },
    { n: 2, l: '2nd Tone — Rising (á)' },
    { n: 3, l: '3rd Tone — Dip (ǎ)' },
    { n: 4, l: '4th Tone — Falling (à)' },
    { n: 0, l: 'Neutral Tone (a)' }
  ] : [
    { n: 1, l: '1st Syllable Stressed' },
    { n: 2, l: '2nd Syllable Stressed' },
    { n: 3, l: '3rd Syllable Stressed' },
    { n: 0, l: 'Neutral / Equal Accent' }
  ];

  const startTones = () => {
    if (allWords.length === 0) return;
    const picked = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 10);
    setToneQuestions(picked);
    setToneIdx(0);
    setToneScore(0);
    setToneSelectedOpt(null);
    setToneAnswered(false);
    setActiveGame('tones');
  };

  const handleSelectTone = (toneVal: number) => {
    if (toneAnswered) return;
    setToneSelectedOpt(toneVal);
    setToneAnswered(true);
    const correctVal = toneQuestions[toneIdx].t || 0;
    if (toneVal === correctVal) {
      setToneScore(prev => prev + 1);
      speak(toneQuestions[toneIdx].h);
    }
  };

  const handleNextTone = () => {
    setToneSelectedOpt(null);
    setToneAnswered(false);
    if (toneIdx < toneQuestions.length - 1) {
      setToneIdx(prev => prev + 1);
    } else {
      onAwardXP(toneScore * 10);
      setActiveGame('tones-end');
    }
  };

  // ----------------------------------------------------
  // GAME 5: Sentence Builder
  // ----------------------------------------------------
  const [builderQuestions, setBuilderQuestions] = useState<any[]>([]);
  const [builderIdx, setBuilderIdx] = useState(0);
  const [builderScore, setBuilderScore] = useState(0);
  const [builderUser, setBuilderUser] = useState<string[]>([]);
  const [builderPool, setBuilderPool] = useState<string[]>([]);
  const [builderAnswered, setBuilderAnswered] = useState(false);
  const [builderIsCorrect, setBuilderIsCorrect] = useState(false);

  const startBuilder = () => {
    const sentences: any[] = [];
    UNITS.forEach(u => u.lessons.forEach((l: any) => {
      const lessonSents = getLessonSentences(l.id, langCode);
      if (lessonSents && lessonSents.length > 0) {
        lessonSents.forEach((s: any) => {
          const wordList = (s.target.includes(' ') || (langCode !== 'zh' && langCode !== 'ja'))
            ? s.target.split(/\s+/)
            : s.target.split('');
          
          const cleanWords = wordList
            .map((w: string) => w.replace(/[，。？！、,.?!]/g, '').trim())
            .filter((w: string) => w.length > 0)
            .map((w: string) => ({ h: w }));

          if (cleanWords.length > 0) {
            sentences.push({
              cn: s.target,
              py: s.rom || '',
              en: s.en,
              words: cleanWords
            });
          }
        });
      }
    }));
    if (sentences.length === 0) return;
    const picked = [...sentences].sort(() => 0.5 - Math.random()).slice(0, 8);
    setBuilderQuestions(picked);
    setBuilderIdx(0);
    setBuilderScore(0);
    setupBuilderRound(picked[0]);
    setActiveGame('builder');
  };

  const setupBuilderRound = (sentence: any) => {
    const correctWords = sentence.words.map((w: any) => w.h);
    const decoys: string[] = [];
    while (decoys.length < 2 && allWords.length > 5) {
      const dec = allWords[Math.floor(Math.random() * allWords.length)].h;
      if (!correctWords.includes(dec) && !decoys.includes(dec)) {
        decoys.push(dec);
      }
    }
    const pool = [...correctWords, ...decoys].sort(() => 0.5 - Math.random());
    setBuilderPool(pool);
    setBuilderUser([]);
    setBuilderAnswered(false);
  };

  const handleTapPoolWord = (word: string, idx: number) => {
    if (builderAnswered) return;
    setBuilderUser(prev => [...prev, word]);
    setBuilderPool(prev => prev.filter((_, i) => i !== idx));
  };

  const handleTapUserWord = (word: string, idx: number) => {
    if (builderAnswered) return;
    setBuilderPool(prev => [...prev, word]);
    setBuilderUser(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCheckBuilder = () => {
    const sentence = builderQuestions[builderIdx];
    const correctString = sentence.cn.replace(/[，。？！、\s]/g, '');
    const userString = builderUser.join('').replace(/[，。？！、\s]/g, '');
    const isOk = userString === correctString;
    setBuilderIsCorrect(isOk);
    setBuilderAnswered(true);
    if (isOk) {
      setBuilderScore(prev => prev + 1);
      speak(sentence.cn);
    }
  };

  const handleNextBuilder = () => {
    if (builderIdx < builderQuestions.length - 1) {
      const nextIdx = builderIdx + 1;
      setBuilderIdx(nextIdx);
      setupBuilderRound(builderQuestions[nextIdx]);
    } else {
      onAwardXP(builderScore * 15);
      setActiveGame('builder-end');
    }
  };

  // ----------------------------------------------------
  // GAME 6: Listening Challenge
  // ----------------------------------------------------
  const [listeningQuestions, setListeningQuestions] = useState<any[]>([]);
  const [listeningIdx, setListeningIdx] = useState(0);
  const [listeningScore, setListeningScore] = useState(0);
  const [listeningSelectedOpt, setListeningSelectedOpt] = useState<number | null>(null);
  const [listeningAnswered, setListeningAnswered] = useState(false);

  const startListening = () => {
    if (allWords.length < 4) return;
    const picked = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 10);
    const questions = picked.map(w => {
      const wrong = allWords
        .filter(x => x.h !== w.h)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(x => t(x.m));
      const opts = [t(w.m), ...wrong].sort(() => 0.5 - Math.random());
      return {
        w,
        opts,
        correctIdx: opts.indexOf(t(w.m))
      };
    });
    setListeningQuestions(questions);
    setListeningIdx(0);
    setListeningScore(0);
    setListeningSelectedOpt(null);
    setListeningAnswered(false);
    setActiveGame('listening');
    // Speak first item
    setTimeout(() => speak(questions[0].w.h), 300);
  };

  const handleSelectListeningOpt = (optIdx: number) => {
    if (listeningAnswered) return;
    setListeningSelectedOpt(optIdx);
    setListeningAnswered(true);
    const isCorrect = optIdx === listeningQuestions[listeningIdx].correctIdx;
    if (isCorrect) {
      setListeningScore(prev => prev + 1);
    }
  };

  const handleNextListening = () => {
    setListeningSelectedOpt(null);
    setListeningAnswered(false);
    if (listeningIdx < listeningQuestions.length - 1) {
      const nextIdx = listeningIdx + 1;
      setListeningIdx(nextIdx);
      setTimeout(() => speak(listeningQuestions[nextIdx].w.h), 300);
    } else {
      onAwardXP(listeningScore * 10);
      setActiveGame('listening-end');
    }
  };

  // ----------------------------------------------------
  // GAME 7: Speaking Challenge
  // ----------------------------------------------------
  const [speakingQuestions, setSpeakingQuestions] = useState<any[]>([]);
  const [speakingIdx, setSpeakingIdx] = useState(0);
  const [speakingScore, setSpeakingScore] = useState(0);
  const [speakingIsRecording, setSpeakingIsRecording] = useState(false);
  const [speakingSpeechResult, setSpeakingSpeechResult] = useState('');
  const [speakingFeedback, setSpeakingFeedback] = useState('');
  const [speakingScorePercent, setSpeakingScorePercent] = useState<number | null>(null);
  const [speakingAnswered, setSpeakingAnswered] = useState(false);

  const startSpeaking = () => {
    const sentences: any[] = [];
    UNITS.forEach(u => u.lessons.forEach((l: any) => {
      const lessonSents = getLessonSentences(l.id, langCode);
      if (lessonSents && lessonSents.length > 0) {
        lessonSents.forEach((s: any) => {
          sentences.push({
            cn: s.target,
            py: s.rom || '',
            en: s.en
          });
        });
      }
    }));
    if (sentences.length === 0) return;
    const picked = [...sentences].sort(() => 0.5 - Math.random()).slice(0, 5);
    setSpeakingQuestions(picked);
    setSpeakingIdx(0);
    setSpeakingScore(0);
    setSpeakingIsRecording(false);
    setSpeakingSpeechResult('');
    setSpeakingFeedback('');
    setSpeakingScorePercent(null);
    setSpeakingAnswered(false);
    setActiveGame('speaking');
  };

  const handleStartSpeakingRecord = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Safari.');
      return;
    }

    setSpeakingIsRecording(true);
    setSpeakingSpeechResult('');
    setSpeakingScorePercent(null);
    setSpeakingFeedback('');

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'zh' ? 'zh-CN' : 
                       lang === 'es' ? 'es-ES' :
                       lang === 'fr' ? 'fr-FR' :
                       lang === 'de' ? 'de-DE' :
                       lang === 'ja' ? 'ja-JP' :
                       lang === 'ko' ? 'ko-KR' :
                       lang === 'it' ? 'it-IT' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript;
      setSpeakingSpeechResult(resultText);

      const target = speakingQuestions[speakingIdx].cn.replace(/[，。？！、\s]/g, '').toLowerCase();
      const cleanResult = resultText.replace(/[，。Points？！、\s]/g, '').toLowerCase();

      if (cleanResult === target) {
        setSpeakingScorePercent(100);
        setSpeakingFeedback('Excellent! Flawless reading.');
        setSpeakingScore(prev => prev + 1);
      } else {
        let matches = 0;
        for (const c of cleanResult) {
          if (target.includes(c)) matches++;
        }
        const pct = Math.round((matches / target.length) * 100);
        const finalScore = Math.min(100, Math.max(15, pct));
        setSpeakingScorePercent(finalScore);
        if (finalScore >= 60) {
          setSpeakingFeedback('Very good attempt!');
          setSpeakingScore(prev => prev + 1);
        } else {
          setSpeakingFeedback('Try again, focus on clarity.');
        }
      }
      setSpeakingAnswered(true);
    };

    recognition.onerror = () => {
      setSpeakingIsRecording(false);
      setSpeakingFeedback('Speech recognition error. Please try again.');
    };

    recognition.onend = () => {
      setSpeakingIsRecording(false);
    };

    recognition.start();
  };

  const handleNextSpeaking = () => {
    setSpeakingSpeechResult('');
    setSpeakingFeedback('');
    setSpeakingScorePercent(null);
    setSpeakingAnswered(false);
    if (speakingIdx < speakingQuestions.length - 1) {
      setSpeakingIdx(prev => prev + 1);
    } else {
      onAwardXP(speakingScore * 20);
      setActiveGame('speaking-end');
    }
  };

  // ----------------------------------------------------
  // GAME 8: Spaced Repetition (SRS Review)
  // ----------------------------------------------------
  const [srsQueue, setSrsQueue] = useState<any[]>([]);
  const [srsIdx, setSrsIdx] = useState(0);
  const [srsDoneCount, setSrsDoneCount] = useState(0);
  const [srsFlipped, setSrsFlipped] = useState(false);
  const [srsCardType, setSrsCardType] = useState<'hz2en' | 'en2hz' | 'py2hz'>('hz2en');

  const startSRS = () => {
    // Load local storage db
    let srsDB: Record<string, any> = {};
    try {
      const s = localStorage.getItem('hx_srs_v2');
      if (s) srsDB = JSON.parse(s);
    } catch {
      srsDB = {};
    }

    // Seed from progress completed lessons words
    const completedList: number[] = JSON.parse(localStorage.getItem('hx_completed_lessons') || '[]');
    completedList.forEach(lessonId => {
      UNITS.forEach(u => {
        const lesson = u.lessons.find((l: any) => l.id === lessonId);
        if (lesson && lesson.words) {
          lesson.words.forEach((w: string) => {
            if (!srsDB[w]) {
              srsDB[w] = { ease: SM2.DEFAULT_EASE, interval: 86400, due: Date.now() + 86400000, reps: 1, lapses: 0 };
            }
          });
        }
      });
    });

    // Seed basic if empty
    if (Object.keys(srsDB).length === 0 && allWords.length > 0) {
      allWords.slice(0, 15).forEach(w => {
        srsDB[w.h] = { ease: SM2.DEFAULT_EASE, interval: 0, due: Date.now() - 1000, reps: 0, lapses: 0 };
      });
    }

    localStorage.setItem('hx_srs_v2', JSON.stringify(srsDB));

    // Filter due cards
    const now = Date.now();
    const queue = Object.entries(srsDB)
      .filter(([_, c]: any) => c.due <= now)
      .map(([hz, c]: any) => {
        const data = allWords.find(x => x.h === hz) || { h: hz, p: '', m: '', t: 0 };
        return { hz, ...c, word: data };
      })
      .filter(x => x.word.m);

    let isPracticeMode = false;
    let srsQueueList = queue;
    if (srsQueueList.length === 0) {
      isPracticeMode = true;
      srsQueueList = Object.entries(srsDB).map(([hz, c]: any) => {
        const data = allWords.find(x => x.h === hz) || { h: hz, p: '', m: '', t: 0 };
        return { hz, ...c, word: data };
      }).filter(x => x.word.m).slice(0, 12);

      if (srsQueueList.length === 0 && allWords.length > 0) {
        srsQueueList = allWords.slice(0, 12).map(w => ({
          hz: w.h,
          ease: SM2.DEFAULT_EASE,
          interval: 0,
          due: Date.now(),
          reps: 0,
          lapses: 0,
          word: w
        }));
      }
    }

    if (srsQueueList.length === 0) {
      alert('No words available to review yet. Try completing some lessons first!');
      return;
    }

    setSrsQueue(srsQueueList);
    setSrsIdx(0);
    setSrsDoneCount(0);
    setSrsFlipped(false);
    setSrsCardType(pickSrsType(srsQueueList[0]));
    setActiveGame('srs');
    
    if (isPracticeMode) {
      console.log('No cards due; loaded practice deck of ' + srsQueueList.length + ' cards.');
    }
  };

  const pickSrsType = (card: any) => {
    const types: ('hz2en' | 'en2hz' | 'py2hz')[] = ['hz2en', 'en2hz', 'py2hz'];
    return types[(card.reps || 0) % 3];
  };

  const handleFlipSrs = () => {
    setSrsFlipped(true);
    speak(srsQueue[srsIdx].hz);
  };

  const handleRateSrs = (quality: 'again' | 'hard' | 'good' | 'easy') => {
    const card = srsQueue[srsIdx];
    const hz = card.hz;

    // Load srsDB
    let srsDB: Record<string, any> = {};
    try {
      srsDB = JSON.parse(localStorage.getItem('hx_srs_v2') || '{}');
    } catch {}

    const dbCard = srsDB[hz] || { ease: SM2.DEFAULT_EASE, interval: 0, due: Date.now(), reps: 0, lapses: 0 };

    // Update ease factor
    dbCard.ease = Math.max(SM2.MIN_EASE, dbCard.ease + SM2.EASE_DELTA[quality]);

    const now = Date.now();
    if (quality === 'again') {
      dbCard.lapses++;
      dbCard.reps = 0;
      dbCard.interval = SM2.INTERVALS.again;
      dbCard.due = now + dbCard.interval * 60000;
    } else {
      dbCard.reps++;
      if (dbCard.reps === 1) {
        dbCard.interval = SM2.INTERVALS[quality];
      } else if (dbCard.reps === 2) {
        dbCard.interval = quality === 'easy' ? SM2.INTERVALS.easy * 2 :
                          quality === 'hard' ? SM2.INTERVALS.hard * 6 :
                          SM2.INTERVALS.good * 4;
      } else {
        dbCard.interval = Math.round(dbCard.interval * dbCard.ease * (
          quality === 'easy' ? 1.3 :
          quality === 'hard' ? 0.6 : 1.0
        ));
        dbCard.interval = Math.max(86400, Math.min(dbCard.interval, 365 * 86400));
      }
      dbCard.due = now + dbCard.interval * 1000;
    }

    srsDB[hz] = dbCard;
    localStorage.setItem('hx_srs_v2', JSON.stringify(srsDB));

    setSrsDoneCount(prev => prev + 1);
    setSrsFlipped(false);

    if (srsIdx < srsQueue.length - 1) {
      const nextIdx = srsIdx + 1;
      setSrsIdx(nextIdx);
      setSrsCardType(pickSrsType(srsQueue[nextIdx]));
    } else {
      onAwardXP(srsDoneCount * 2);
      setActiveGame('srs-end');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={activeGame ? () => setActiveGame(null) : onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            {activeGame ? activeGame.split('-')[0].toUpperCase() : 'Games Hub'}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {activeGame ? 'Earn XP while playing fun micro games' : 'Choose a mini-game to test your language skills'}
          </p>
        </div>
      </div>

      {!activeGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={startQuiz}
            className="flex items-center gap-4 bg-brand-green text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-green/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('vocabulary_quiz', 'Vocabulary Quiz')}</div>
              <div className="text-xs text-white/80 font-bold">{t('10_random_questions_up_to_100_xp', '10 random questions · up to 100 XP')}</div>
            </div>
          </button>

          <button
            onClick={startMatching}
            className="flex items-center gap-4 bg-brand-orange text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-orange/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('matching_game', 'Matching Game')}</div>
              <div className="text-xs text-white/80 font-bold">{t('pair_characters_to_meanings', 'Pair characters to meanings')}</div>
            </div>
          </button>

          <button
            onClick={startFlashcards}
            className="flex items-center gap-4 bg-brand-blue text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-blue/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('flashcards', 'Flashcards')}</div>
              <div className="text-xs text-white/80 font-bold">{t('speed_review_15_vocab_cards', 'Speed review 15 vocab cards')}</div>
            </div>
          </button>

          <button
            onClick={startTones}
            className="flex items-center gap-4 bg-brand-red text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-brand-red/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{lang === 'zh' ? 'Tone Master' : 'Accent Master'}</div>
              <div className="text-xs text-white/80 font-bold">{t('identify_word_tones_or_stress_accent_mar', 'Identify word tones or stress accent marks')}</div>
            </div>
          </button>

          <button
            onClick={startBuilder}
            className="flex items-center gap-4 bg-indigo-600 text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-indigo-650/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('sentence_builder', 'Sentence Builder')}</div>
              <div className="text-xs text-white/80 font-bold">{t('construct_sentences_using_word_blocks', 'Construct sentences using word blocks')}</div>
            </div>
          </button>

          <button
            onClick={startListening}
            className="flex items-center gap-4 bg-purple-600 text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-purple-650/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('listening_challenge', 'Listening Challenge')}</div>
              <div className="text-xs text-white/80 font-bold">{t('listen_to_words_and_pick_correct_definit', 'Listen to words and pick correct definitions')}</div>
            </div>
          </button>

          <button
            onClick={startSpeaking}
            className="flex items-center gap-4 bg-rose-600 text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-rose-650/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('speaking_challenge', 'Speaking Challenge')}</div>
              <div className="text-xs text-white/80 font-bold">{t('read_sentence_aloud_with_live_voice_anal', 'Read sentence aloud with live voice analysis')}</div>
            </div>
          </button>

          <button
            onClick={startSRS}
            className="flex items-center gap-4 bg-teal-600 text-white rounded-3xl p-5 hover:scale-[1.01] active:scale-[0.99] transition-all text-left shadow-lg shadow-teal-650/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-md">{t('srs_review', 'SRS Review')}</div>
              <div className="text-xs text-white/80 font-bold">{t('smart_spaced_repetition_vocabulary_cards', 'Smart spaced repetition vocabulary cards')}</div>
            </div>
          </button>
        </div>
      )}

      {/* GAME 1: Quiz */}
      {activeGame === 'quiz' && quizQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-bold">
              {t('question', 'Question')} {quizIdx + 1} {t('of', 'of')} {quizQuestions.length}
            </span>
            <span className="text-xs font-black text-brand-green">{t('score', 'Score:')} {quizScore}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-2">
            <div className="text-6xl font-black text-slate-800 dark:text-white font-chinese">
              {quizQuestions[quizIdx].w.h}
            </div>
            <div className="text-md font-bold text-brand-blue">
              {quizQuestions[quizIdx].w.p}
            </div>
            <button
              onClick={() => speak(quizQuestions[quizIdx].w.h)}
              className="w-10 h-10 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {quizQuestions[quizIdx].opts.map((opt: string, optIdx: number) => {
              const isSelected = quizSelectedOpt === optIdx;
              const isCorrect = optIdx === quizQuestions[quizIdx].correctIdx;
              let btnClass = 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300';
              if (quizAnswered) {
                if (isCorrect) btnClass = 'bg-brand-green-bg border-brand-green text-brand-green-dark';
                else if (isSelected) btnClass = 'bg-brand-red-bg border-brand-red text-brand-red-dark';
              } else if (isSelected) {
                btnClass = 'bg-brand-blue-bg border-brand-blue text-brand-blue';
              }
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectQuizOpt(optIdx)}
                  disabled={quizAnswered}
                  className={`w-full p-4 rounded-2xl border font-bold text-sm text-left transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <button
              onClick={handleNextQuiz}
              className="w-full py-4 bg-brand-blue text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all shadow-lg"
            >
              {quizIdx < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </button>
          )}
        </div>
      )}

      {activeGame === 'quiz-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('quiz_completed', 'Quiz Completed!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_scored', 'You scored')} {quizScore} {t('out_of_10_correct', 'out of 10 correct')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{quizScore * 10} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 2: Matching */}
      {activeGame === 'matching' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 text-center shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('matches_found', 'Matches Found:')} {matchedIds.length / 2} / 4
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {matchCards.map((card) => {
              const isMatched = matchedIds.includes(card.id);
              const isSelected = selectedMatch?.id === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleMatchClick(card)}
                  disabled={isMatched}
                  className={`p-6 rounded-3xl border-2 text-center font-bold transition-all min-h-[90px] flex items-center justify-center ${
                    isMatched
                      ? 'bg-brand-green/10 border-brand-green/30 text-brand-green font-chinese opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-brand-blue-bg border-brand-blue text-brand-blue'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-200'
                  } ${card.type === 'cn' ? 'font-chinese text-2xl font-black' : 'text-sm'}`}
                >
                  {card.text}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeGame === 'matching-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-orange-bg text-brand-orange flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('matching_completed', 'Matching Completed!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('perfect_matches_found_in', 'Perfect matches found in')} {matchTries} {t('tries', 'tries')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />{t('20_xp_earned', '+20 XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 3: Flashcards */}
      {activeGame === 'flashcards' && flashcards.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 text-center shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('card', 'Card')} {flashcardIdx + 1} {t('of', 'of')} {flashcards.length}
            </span>
          </div>

          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              if (!isFlipped) speak(flashcards[flashcardIdx].h);
            }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-sm min-h-[260px] cursor-pointer hover:shadow-md transition-all select-none relative"
          >
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('tap_to_flip', 'Tap to Flip')}
            </span>
            {!isFlipped ? (
              <div className="text-7xl font-black text-slate-800 dark:text-white font-chinese">
                {flashcards[flashcardIdx].h}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-6xl font-black text-slate-800 dark:text-white font-chinese">
                  {flashcards[flashcardIdx].h}
                </div>
                <div className="text-md font-bold text-brand-blue">{flashcards[flashcardIdx].p}</div>
                <div className="text-lg font-bold text-slate-600 dark:text-slate-350">{t(flashcards[flashcardIdx].m)}</div>
              </div>
            )}
          </div>

          <button onClick={handleNextFlashcard} className="w-full py-4 bg-brand-blue text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all shadow-lg">
            {flashcardIdx < flashcards.length - 1 ? 'Next Card' : 'Finish Session'}
          </button>
        </div>
      )}

      {activeGame === 'flashcards-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('session_completed', 'Session Completed!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_reviewed_15_vocabulary_cards', 'You reviewed 15 vocabulary cards')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />{t('15_xp_earned', '+15 XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 4: Tones */}
      {activeGame === 'tones' && toneQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('word', 'Word')} {toneIdx + 1} {t('of', 'of')} {toneQuestions.length}
            </span>
            <span className="text-xs font-black text-brand-green">{t('score', 'Score:')} {toneScore}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-2">
            <div className="text-6xl font-black text-slate-800 dark:text-white font-chinese">
              {toneQuestions[toneIdx].h}
            </div>
            <div className="text-md font-bold text-slate-400 dark:text-slate-500">
              {t(toneQuestions[toneIdx].m)}
            </div>
            <button
              onClick={() => speak(toneQuestions[toneIdx].h)}
              className="w-10 h-10 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {toneOpts.map((opt, oIdx) => {
              const isSelected = toneSelectedOpt === opt.n;
              const correctVal = toneQuestions[toneIdx].t || 0;
              const isCorrect = opt.n === correctVal;
              let btnClass = 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300';
              if (toneAnswered) {
                if (isCorrect) btnClass = 'bg-brand-green-bg border-brand-green text-brand-green-dark';
                else if (isSelected) btnClass = 'bg-brand-red-bg border-brand-red text-brand-red-dark';
              } else if (isSelected) {
                btnClass = 'bg-brand-blue-bg border-brand-blue text-brand-blue';
              }
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectTone(opt.n)}
                  disabled={toneAnswered}
                  className={`w-full p-4 rounded-2xl border font-bold text-sm text-left transition-all ${btnClass}`}
                >
                  {opt.l}
                </button>
              );
            })}
          </div>

          {toneAnswered && (
            <button onClick={handleNextTone} className="w-full py-4 bg-brand-blue text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all shadow-lg">
              {toneIdx < toneQuestions.length - 1 ? 'Next Word' : 'Complete Challenge'}
            </button>
          )}
        </div>
      )}

      {activeGame === 'tones-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{lang === 'zh' ? 'Tone Master' : 'Accent Master'} {t('complete', 'Complete!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_identified', 'You identified')} {toneScore} {t('out_of_10_correctly', 'out of 10 correctly')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{toneScore * 10} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 5: Sentence Builder */}
      {activeGame === 'builder' && builderQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('sentence', 'Sentence')} {builderIdx + 1} {t('of', 'of')} {builderQuestions.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider">{t('translate_this', 'Translate this:')}</span>
            <div className="text-lg font-extrabold text-slate-800 dark:text-white">
              "{builderQuestions[builderIdx].en}"
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('your_assembly', 'Your Assembly:')}</span>
            <div className="min-h-[70px] bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex flex-wrap gap-2 items-center">
              {builderUser.length === 0 && (
                <span className="text-xs text-slate-400 font-bold">{t('tap_word_blocks_below_to_construct', 'Tap word blocks below to construct...')}</span>
              )}
              {builderUser.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTapUserWord(w, idx)}
                  disabled={builderAnswered}
                  className="bg-brand-blue text-white font-chinese font-black px-3.5 py-2 rounded-2xl text-md active:scale-95 transition-all shadow-sm"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('word_bank', 'Word Bank:')}</span>
            <div className="flex flex-wrap gap-2.5">
              {builderPool.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTapPoolWord(w, idx)}
                  disabled={builderAnswered}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-chinese font-extrabold px-4 py-2.5 rounded-2xl text-md text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 active:scale-95 transition-all shadow-sm"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {builderAnswered && (
            <div className={`p-4 rounded-3xl border text-sm font-bold ${
              builderIsCorrect ? 'bg-brand-green-bg border-brand-green text-brand-green-dark' : 'bg-brand-red-bg border-brand-red text-brand-red-dark'
            }`}>
              {builderIsCorrect ? 'Correct! Fantastic job.' : `Incorrect. Expected: ${builderQuestions[builderIdx].cn}`}
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {!builderAnswered ? (
              <button
                onClick={handleCheckBuilder}
                disabled={builderUser.length === 0}
                className="w-full py-4 bg-brand-green text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-green-dark active:scale-[0.99] transition-all shadow-md disabled:opacity-50"
              >
                {t('check_answer', 'Check Answer')}
              </button>
            ) : (
              <button
                onClick={handleNextBuilder}
                className="w-full py-4 bg-brand-blue text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all shadow-md"
              >
                {builderIdx < builderQuestions.length - 1 ? 'Next Sentence' : 'Finish Game'}
              </button>
            )}
          </div>
        </div>
      )}

      {activeGame === 'builder-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('sentence_builder_complete', 'Sentence Builder Complete!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_built', 'You built')} {builderScore} {t('out_of_8_sentences_correctly', 'out of 8 sentences correctly')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{builderScore * 15} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 6: Listening */}
      {activeGame === 'listening' && listeningQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('question', 'Question')} {listeningIdx + 1} {t('of', 'of')} {listeningQuestions.length}
            </span>
            <span className="text-xs font-black text-brand-green">{t('score', 'Score:')} {listeningScore}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('listen_closely', 'Listen closely:')}</span>
            <button
              onClick={() => speak(listeningQuestions[listeningIdx].w.h)}
              className="w-24 h-24 rounded-full bg-brand-blue text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/30"
            >
              <Volume2 className="w-10 h-10" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {listeningQuestions[listeningIdx].opts.map((opt: string, optIdx: number) => {
              const isSelected = listeningSelectedOpt === optIdx;
              const isCorrect = optIdx === listeningQuestions[listeningIdx].correctIdx;
              let btnClass = 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300';
              if (listeningAnswered) {
                if (isCorrect) btnClass = 'bg-brand-green-bg border-brand-green text-brand-green-dark';
                else if (isSelected) btnClass = 'bg-brand-red-bg border-brand-red text-brand-red-dark';
              } else if (isSelected) {
                btnClass = 'bg-brand-blue-bg border-brand-blue text-brand-blue';
              }
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectListeningOpt(optIdx)}
                  disabled={listeningAnswered}
                  className={`w-full p-4 rounded-2xl border font-bold text-sm text-left transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {listeningAnswered && (
            <button onClick={handleNextListening} className="w-full py-4 bg-brand-blue text-white rounded-3xl font-black text-sm uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all shadow-lg">
              {listeningIdx < listeningQuestions.length - 1 ? 'Next Question' : 'Complete Challenge'}
            </button>
          )}
        </div>
      )}

      {activeGame === 'listening-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('listening_complete', 'Listening Complete!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_scored', 'You scored')} {listeningScore} {t('out_of_10_correct', 'out of 10 correct')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{listeningScore * 10} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 7: Speaking */}
      {activeGame === 'speaking' && speakingQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('sentence', 'Sentence')} {speakingIdx + 1} {t('of', 'of')} {speakingQuestions.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
            <div className="text-4xl font-black text-slate-850 dark:text-white font-chinese leading-relaxed">
              {speakingQuestions[speakingIdx].cn}
            </div>
            <div className="text-md font-bold text-brand-blue">{speakingQuestions[speakingIdx].py}</div>
            <div className="text-sm text-slate-400 dark:text-slate-500 font-medium">"{speakingQuestions[speakingIdx].en}"</div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => speak(speakingQuestions[speakingIdx].cn)}
                className="w-14 h-14 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <Volume2 className="w-6 h-6" />
              </button>

              <button
                onClick={handleStartSpeakingRecord}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  speakingIsRecording
                    ? 'bg-brand-red text-white animate-pulse shadow-brand-red/20'
                    : 'bg-brand-green text-white hover:scale-105 active:scale-95 shadow-brand-green/20'
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>
          </div>

          {speakingAnswered && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-center space-y-4">
              <h3 className="text-md font-black text-slate-805 dark:text-white">{t('accuracy_score', 'Accuracy Score:')} {speakingScorePercent}%</h3>
              <p className="text-xs text-slate-400 font-bold">{speakingFeedback}</p>
              {speakingSpeechResult && (
                <div className="p-3 bg-slate-50 dark:bg-slate-855 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300">
                  {t('we_detected', 'We Detected:')} <span className="font-extrabold text-brand-blue font-chinese text-sm">{speakingSpeechResult}</span>
                </div>
              )}
              <button onClick={handleNextSpeaking} className="w-full py-3 bg-brand-blue text-white rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-brand-blue-dark active:scale-[0.99] transition-all">
                {speakingIdx < speakingQuestions.length - 1 ? 'Next Sentence' : 'Complete Challenge'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeGame === 'speaking-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('speaking_complete', 'Speaking Complete!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('successfully_completed_speaking_drills', 'Successfully completed speaking drills')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{speakingScore * 20} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}

      {/* GAME 8: SRS */}
      {activeGame === 'srs' && srsQueue.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {t('srs_cards_remaining', 'SRS Cards Remaining:')} {srsQueue.length - srsIdx} {t('due', 'due')}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-sm min-h-[260px] relative">
            <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
              {t('spaced_repetition_review', 'Spaced Repetition Review')}
            </span>

            {!srsFlipped ? (
              <div className="space-y-4">
                {srsCardType === 'hz2en' && (
                  <div className="text-7xl font-black text-slate-800 dark:text-white font-chinese">
                    {srsQueue[srsIdx].hz}
                  </div>
                )}
                {srsCardType === 'en2hz' && (
                  <div className="text-3xl font-extrabold text-slate-705 dark:text-white">
                    {t(srsQueue[srsIdx].word.m)}
                  </div>
                )}
                {srsCardType === 'py2hz' && (
                  <div className="text-4xl font-extrabold text-brand-blue">
                    {srsQueue[srsIdx].word.p}
                  </div>
                )}
                <button
                  onClick={handleFlipSrs}
                  className="mt-6 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold rounded-full active:scale-95 hover:bg-slate-200 transition-all"
                >
                  {t('reveal_answer', 'Reveal Answer')}
                </button>
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-slate-850 dark:text-white font-chinese">
                    {srsQueue[srsIdx].hz}
                  </div>
                  <div className="text-md font-bold text-brand-blue">{srsQueue[srsIdx].word.p}</div>
                  <div className="text-lg font-bold text-slate-650 dark:text-slate-300">"{t(srsQueue[srsIdx].word.m)}"</div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleRateSrs('again')}
                    className="p-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl flex flex-col items-center transition-all"
                  >
                    <span className="text-[10px] font-black text-red-600 block">{t('again', 'AGAIN')}</span>
                    <span className="text-[9px] font-bold text-red-400 mt-0.5">{t('lt_1m', '&lt;1m')}</span>
                  </button>
                  <button
                    onClick={() => handleRateSrs('hard')}
                    className="p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-2xl flex flex-col items-center transition-all"
                  >
                    <span className="text-[10px] font-black text-orange-655 block">{t('hard', 'HARD')}</span>
                    <span className="text-[9px] font-bold text-orange-400 mt-0.5">{t('10m', '10m')}</span>
                  </button>
                  <button
                    onClick={() => handleRateSrs('good')}
                    className="p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl flex flex-col items-center transition-all"
                  >
                    <span className="text-[10px] font-black text-green-600 block">{t('good', 'GOOD')}</span>
                    <span className="text-[9px] font-bold text-green-400 mt-0.5">{t('1d', '1d')}</span>
                  </button>
                  <button
                    onClick={() => handleRateSrs('easy')}
                    className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl flex flex-col items-center transition-all"
                  >
                    <span className="text-[10px] font-black text-blue-600 block">{t('easy', 'EASY')}</span>
                    <span className="text-[9px] font-bold text-blue-400 mt-0.5">{t('3d', '3d+')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeGame === 'srs-end' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-bg text-brand-green flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{t('srs_review_complete', 'SRS Review Complete!')}</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('you_updated_spaced_repetition_card_metri', 'You updated spaced repetition card metrics')}</p>
          <div className="flex items-center gap-1.5 bg-brand-yellow-bg text-brand-yellow-dark px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />+{srsDoneCount * 2} {t('xp_earned', 'XP earned')}
          </div>
          <button onClick={() => setActiveGame(null)} className="w-full max-w-xs py-3.5 bg-brand-blue text-white rounded-2xl font-extrabold text-sm hover:bg-brand-blue-dark active:scale-95 transition-all mt-4">
            {t('back_to_games', 'Back to Games')}
          </button>
        </div>
      )}
    </div>
  );
}
