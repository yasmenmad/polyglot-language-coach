import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Mic, Heart, AlertCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getConvos } from '../data/convos';
import { LANG_LOCALE, getLanguageInfo } from '../data/courses';
import type { LanguageCode } from '../data/courses';
import { api } from '../services/api';
import Flag from '../components/Flag';

interface DailyTalkProps {
  onBack: () => void;
  lang: string;
}

export default function DailyTalk({ onBack, lang }: DailyTalkProps) {
  const { t } = useTranslation();
  const activeLang = lang as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const CONVOS = getConvos(activeLang);
  const [selectedConvo, setSelectedConvo] = useState<any | null>(null);
  const [savedSentences, setSavedSentences] = useState<string[]>([]);
  
  // Speech recognition states
  const [isRecording, setIsRecording] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [practiceResult, setPracticeResult] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    api.getSavedWords()
      .then((words) => {
        if (Array.isArray(words)) {
          setSavedSentences(words.map((w: any) => w.hanzi));
        }
      })
      .catch(() => {});
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_LOCALE[activeLang];
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleSave = async (turn: any) => {
    try {
      await api.toggleSaveWord(turn.target, turn.rom || '', turn.en || '');
      if (savedSentences.includes(turn.target)) {
        setSavedSentences(prev => prev.filter(item => item !== turn.target));
      } else {
        setSavedSentences(prev => [...prev, turn.target]);
      }
    } catch (err) {
      // Fallback for guest mode
      if (savedSentences.includes(turn.target)) {
        setSavedSentences(prev => prev.filter(item => item !== turn.target));
      } else {
        setSavedSentences(prev => [...prev, turn.target]);
      }
    }
  };

  const handleStartPractice = (turnIdx: number, expectedText: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Safari.');
      return;
    }

    window.speechSynthesis.cancel();
    const recognition = new SpeechRecognition();
    recognition.lang = LANG_LOCALE[activeLang];
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    setActiveTurnIdx(turnIdx);
    setPracticeResult(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.replace(/[，。？！、\s]/g, '');
      const cleanExpected = expectedText.replace(/[，。？！、\s]/g, '');
      const isMatch = transcript === cleanExpected || cleanExpected.includes(transcript) || transcript.includes(cleanExpected);
      setPracticeResult({
        text: event.results[0][0].transcript,
        success: isMatch,
      });
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={selectedConvo ? () => { setSelectedConvo(null); setPracticeResult(null); setActiveTurnIdx(null); } : onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            {selectedConvo ? (t(selectedConvo.title, selectedConvo.title) as string) : (
              <span className="flex items-center gap-2">
                <Flag code={activeLang} size={18} />
                <span>{t('convo_title', '{{lang}} Conversations', { lang: langInfo.label })}</span>
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {selectedConvo
              ? t('convo_desc_selected', 'Practice real-life {{lang}} dialogue turns', { lang: langInfo.label })
              : t('convo_desc_lobby', 'Practice real-life {{lang}} dialogues — tap any card to begin', { lang: langInfo.label })}
          </p>
        </div>
      </div>

      {selectedConvo ? (
        // Scenario details dialogue turns view
        <div className="space-y-6">
          <div className="flex-col space-y-4">
            {(selectedConvo.turns || []).map((tVal: any, idx: number) => {
              const isA = tVal.s === 'A';
              const isSaved = savedSentences.includes(tVal.target);
              const isActivePractice = activeTurnIdx === idx;

              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${isA ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Speaker Avatar */}
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-xl flex-shrink-0">
                    {isA ? '👤' : '🙂'}
                  </div>

                  {/* Message Bubble Card */}
                  <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 max-w-[80%] shadow-sm space-y-1.5`}>
                    <div
                      onClick={() => speak(tVal.target)}
                      className="text-lg font-bold text-slate-800 dark:text-white font-chinese cursor-pointer hover:text-brand-blue transition-all"
                    >
                      {tVal.target}
                    </div>
                    {tVal.rom && (
                      <div className="text-xs font-extrabold text-brand-blue">
                        {tVal.rom}
                      </div>
                    )}
                    {tVal.en && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {tVal.en}
                      </div>
                    )}

                    {/* Microphone Practice Result details */}
                    {isActivePractice && practiceResult && (
                      <div className={`mt-3 p-3 rounded-2xl border text-xs font-extrabold flex items-center gap-2 ${
                        practiceResult.success
                          ? 'bg-brand-green-bg border-brand-green/30 text-brand-green-dark'
                          : 'bg-brand-red-bg border-brand-red/30 text-brand-red-dark'
                      }`}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <div>
                          <div>{t('you_said')}: "{practiceResult.text}"</div>
                          <div>{practiceResult.success ? t('perfect_match') : t('try_again')}</div>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <button
                        onClick={() => speak(tVal.target)}
                        className="w-8 h-8 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue/20 active:scale-90 transition-all"
                        title={t('listen') || 'Listen'}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleStartPractice(idx, tVal.target)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all ${
                          isRecording && isActivePractice
                            ? 'bg-brand-red text-white animate-pulse'
                            : 'bg-brand-green-bg text-brand-green hover:bg-brand-green/20'
                        }`}
                        title={t('practice_pronunciation') || 'Practice pronunciation'}
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleSave(tVal)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all ${
                          isSaved
                            ? 'bg-red-50 dark:bg-red-950/30 text-red-500'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-700 hover:text-slate-400'
                        }`}
                        title={t('save_sentence') || 'Save sentence'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Scenario Selection Cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONVOS.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedConvo(c)}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-bg text-brand-blue flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-extrabold text-slate-800 dark:text-white">
                  {t(c.title, c.title) as string}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block mt-1">
                  {c.turns ? t('convo_turns_count', '{{count}} conversational turns', { count: c.turns.length }) : t('start_dialogue')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
