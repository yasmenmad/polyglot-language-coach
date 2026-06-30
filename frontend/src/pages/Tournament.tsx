import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Timer, X, Zap, Swords, User, Cpu, Sparkles, AlertCircle } from 'lucide-react';

interface TournamentProps {
  user: any;
  lang: string;
  onBack: () => void;
}

export default function Tournament({ user, lang, onBack }: TournamentProps) {
  const { t } = useTranslation();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'queue' | 'starting' | 'playing' | 'revealed' | 'ended'>('lobby');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [winner, setWinner] = useState<string | null>(null);
  const [error, setError] = useState('');

  const timerRef = useRef<any>(null);
  const questionStartRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const connectAndQueue = (mode: 'pvp' | 'bot') => {
    setError('');
    if (ws) {
      ws.close();
    }

    const loc = window.location;
    const wsProto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
    let wsUrl = '';
    if (loc.port === '5173') {
      wsUrl = `${wsProto}//localhost:8000/api/tournaments/ws/${user.username}`;
    } else {
      wsUrl = `${wsProto}//${loc.host}/api/tournaments/ws/${user.username}`;
    }

    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      setGameState('queue');
      if (mode === 'pvp') {
        socket.send(JSON.stringify({
          type: 'JOIN_QUEUE',
          username: user.username,
          lang: lang || 'zh'
        }));
      } else {
        socket.send(JSON.stringify({
          type: 'TRIGGER_BOT_MATCH',
          username: user.username,
          lang: lang || 'zh'
        }));
      }
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'MATCH_FOUND') {
          setP1(data.p1);
          setP2(data.p2);
          setScores({ [data.p1]: 0, [data.p2]: 0 });
          setTotalQuestions(data.total_questions || 5);
          setGameState('starting');
          setError('');
        } else if (data.type === 'QUESTION_PROMPT') {
          setCurrentQuestion(data.question);
          setOptions(data.options || []);
          setQuestionIndex(data.question_index);
          setSelectedOption(null);
          setCorrectAnswer(null);
          setGameState('playing');
          
          setTimeLeft(10);
          questionStartRef.current = Date.now();
          if (timerRef.current) clearInterval(timerRef.current);
          
          timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1) {
                if (timerRef.current) clearInterval(timerRef.current);
                handleAnswerSubmit('');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else if (data.type === 'DUEL_REVEAL') {
          if (timerRef.current) clearInterval(timerRef.current);
          setScores(data.scores);
          setCorrectAnswer(data.correct_answer);
          setGameState('revealed');
        } else if (data.type === 'FINAL_RESULT') {
          setScores(data.scores);
          setWinner(data.winner);
          setGameState('ended');
          
          if (data.winner === user.username) {
            user.xp += 30;
            user.level = Math.max(1, Math.floor(user.xp / 100) + 1);
          } else if (data.winner !== 'Tie') {
            user.xp += 10;
          }
        }
      } catch (e) {
        console.error("Invalid WS message format", e);
      }
    };

    socket.onerror = () => {
      setError('Connection failed. Verify uvicorn server is active on port 8000.');
      setGameState('lobby');
    };

    socket.onclose = () => {
      if (gameState === 'queue' || gameState === 'playing') {
        setError('Connection interrupted by tournament host.');
        setGameState('lobby');
      }
    };
    
    setWs(socket);
  };

  const handleAnswerSubmit = (option: string) => {
    if (selectedOption !== null || (gameState !== 'playing' && gameState !== 'revealed')) return;
    
    setSelectedOption(option);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const timeTaken = (Date.now() - questionStartRef.current) / 1000;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'SUBMIT_DUEL_ANSWER',
        username: user.username,
        correct: option !== '' && (correctAnswer === null || option === correctAnswer),
        time_taken: Math.min(10, timeTaken)
      }));
    }
  };

  const exitLobby = () => {
    if (ws) {
      ws.close();
    }
    onBack();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-500">
        <Trophy size={48} className="mb-4 text-slate-300" />
        <h2 className="text-xl font-bold">{t('log_in_compete')}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh] w-full max-w-[1000px] bg-slate-50 dark:bg-slate-955 font-sans text-slate-800 dark:text-slate-100 selection:bg-sky-500/30 overflow-hidden relative border border-slate-200 dark:border-slate-900 rounded-[2.5rem] p-6 text-left ml-0 animate-in fade-in duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-850 px-6 py-4 flex items-center justify-between rounded-t-3xl shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={exitLobby} className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10 transform -rotate-3">
              <Trophy size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">{t('pvp_arena')}</h1>
              <p className="text-[10px] text-slate-455 uppercase font-black tracking-wider">{t('pvp_desc')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center relative z-10 shrink-0">
        <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-955/10 border border-red-200 dark:border-red-900 text-red-550 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* LOBBY STATE */}
          {gameState === 'lobby' && (
            <div className="text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-sky-500/20 transform rotate-6">
                <Swords size={38} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{t('lobby_title')}</h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-semibold">{t('lobby_desc')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-sm mx-auto">
                <button
                  onClick={() => connectAndQueue('pvp')}
                  className="flex-1 py-4 px-6 bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-sky-500/10 transition-all flex items-center justify-center gap-2"
                >
                  <User size={15} />
                  {t('match_pvp')}
                </button>
                
                <button
                  onClick={() => connectAndQueue('bot')}
                  className="flex-1 py-4 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 font-black text-xs uppercase tracking-wider rounded-2xl border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Cpu size={15} />
                  {t('instant_bot')}
                </button>
              </div>
            </div>
          )}

          {/* QUEUE STATE */}
          {gameState === 'queue' && (
            <div className="text-center space-y-8 animate-in zoom-in duration-300">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-slate-105 dark:border-slate-900" />
                <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin" />
                <Swords size={22} className="text-sky-500 absolute left-7 top-7 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black">{t('connecting_pool')}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-2">{t('waiting_participant')}</p>
              </div>
              <button
                onClick={() => { if (ws) ws.close(); setGameState('lobby'); }}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-205 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                {t('cancel_queue')}
              </button>
            </div>
          )}

          {/* MATCH FOUND STATE */}
          {gameState === 'starting' && (
            <div className="text-center space-y-8 animate-in zoom-in duration-300">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 tracking-tight transform rotate-2">
                {t('match_found')}
              </h2>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl shadow-sm flex items-center justify-around max-w-sm mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-955/20 text-sky-500 flex items-center justify-center font-black text-lg mx-auto">
                    {p1[0]?.toUpperCase() || 'P'}
                  </div>
                  <span className="text-xs font-black mt-2 block">{p1}</span>
                </div>
                
                <span className="text-lg font-black text-slate-400 italic">{t('vs', 'VS')}</span>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-955/20 text-purple-500 flex items-center justify-center font-black text-lg mx-auto">
                    {p2[0]?.toUpperCase() || 'P'}
                  </div>
                  <span className="text-xs font-black mt-2 block">{p2}</span>
                </div>
              </div>
              
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 animate-pulse">{t('initializing_questions')}</p>
            </div>
          )}

          {/* PLAYING / REVEALED STATE */}
          {(gameState === 'playing' || gameState === 'revealed') && currentQuestion && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300 w-full max-w-md mx-auto">
              
              {/* Score Boards */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all ${p1 === user.username ? 'border-sky-500' : 'border-slate-200 dark:border-slate-855'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black truncate max-w-[80px]">{p1}</span>
                    <span className="font-bold text-sky-500 bg-sky-50 dark:bg-sky-955/10 px-2 py-0.5 rounded-lg">{t('pts', { count: scores[p1] || 0 })}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-sky-500 h-full transition-all" style={{ width: `${Math.min(100, ((scores[p1] || 0) / 750) * 100)}%` }} />
                  </div>
                </div>

                <div className={`p-4 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all ${p2 === user.username ? 'border-sky-500' : 'border-slate-200 dark:border-slate-855'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black truncate max-w-[80px]">{p2}</span>
                    <span className="font-bold text-purple-500 bg-purple-50 dark:bg-purple-955/10 px-2 py-0.5 rounded-lg">{t('pts', { count: scores[p2] || 0 })}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all" style={{ width: `${Math.min(100, ((scores[p2] || 0) / 750) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Timer & Index */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xxs font-black uppercase tracking-widest text-slate-400">{t('question_progress', { current: questionIndex + 1, total: totalQuestions })}</span>
                <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-955/10 border border-red-200/50 dark:border-red-900 text-red-500 px-3 py-1.5 rounded-xl text-xs font-black">
                  <Timer size={14} className="animate-pulse" />
                  <span>{t('seconds_left', { count: timeLeft })}</span>
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 p-6 rounded-[2rem] shadow-sm text-center">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-150 leading-snug">
                  {currentQuestion}
                </h3>
              </div>

              {/* Multiple choice buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = correctAnswer === opt;
                  const isWrong = selectedOption === opt && correctAnswer !== opt && correctAnswer !== null;
                  
                  let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-700 dark:text-slate-350 hover:bg-sky-50/20';
                  if (gameState === 'revealed') {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-455';
                    } else if (isWrong) {
                      btnStyle = 'border-red-500 bg-red-50 dark:bg-red-955/20 text-red-500';
                    } else if (isSelected) {
                      btnStyle = 'border-slate-400 opacity-60';
                    } else {
                      btnStyle = 'border-slate-100 dark:border-slate-900 opacity-40';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-sky-500 bg-sky-50/40 text-sky-600';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={gameState === 'revealed' || selectedOption !== null}
                      onClick={() => handleAnswerSubmit(opt)}
                      className={`w-full text-left font-black text-sm py-4 px-5 rounded-2xl border transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ENDED STATE */}
          {gameState === 'ended' && (
            <div className="text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-28 h-28 relative transform rotate-6 animate-bounce mx-auto">
                <div className="absolute inset-0 bg-amber-500/10 blur-[40px] rounded-full" />
                <Trophy className="w-full h-full text-amber-500 relative z-10 filter drop-shadow-lg" />
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight">{t('round_finished')}</h2>
                <p className="text-sm font-bold text-slate-500 mt-1 text-center">
                  {winner === 'Tie' ? (
                    <span>{t('tie_message')}</span>
                  ) : winner === user.username ? (
                    <span className="text-emerald-500 font-black flex items-center justify-center gap-1.5 mx-auto">
                      <Sparkles size={16} /> {t('victory_message')}
                    </span>
                  ) : (
                    <span>{t('defeat_message', { winner })}</span>
                  )}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 p-6 rounded-3xl max-w-sm mx-auto shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>{t('p1_score', { username: p1 })}</span>
                  <span className="text-slate-800 dark:text-white font-black">{t('pts', { count: scores[p1] || 0 })}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 border-t border-slate-100 dark:border-slate-855 pt-2">
                  <span>{t('p2_score', { username: p2 })}</span>
                  <span className="text-slate-800 dark:text-white font-black">{t('pts', { count: scores[p2] || 0 })}</span>
                </div>
              </div>

              <button
                onClick={() => setGameState('lobby')}
                className="px-8 py-3.5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-500/10 transition-all"
              >
                {t('return_lobby')}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
