import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Users, Send, Flame, Trophy, Volume2, Sparkles, MessageSquare, Plus, ChevronRight, LogOut, Play, Laugh, Award, Check, X, ShieldAlert, Timer, Video, VideoOff, Mic, MicOff, Monitor, Hand } from 'lucide-react';

interface LobbyRoom {
  room_id: string;
  language: string;
  participant_count: number;
  current_question: number;
  total_questions: number;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface StudyRoomProps {
  onBack: () => void;
  lang: string;
  username: string;
}

interface ChatMessage {
  username: string;
  content: string;
  timestamp: string;
}

export default function StudyRooms({ onBack, lang, username }: StudyRoomProps) {
  const { t } = useTranslation();

  const [lobbies, setLobbies] = useState<LobbyRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [loadingLobbies, setLoadingLobbies] = useState<boolean>(true);
  const [newRoomName, setNewRoomName] = useState<string>('');

  // Live WebSocket State
  const [participants, setParticipants] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(5);
  const [timer, setTimer] = useState<number>(15);
  const [questionActive, setQuestionActive] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answersSubmitted, setAnswersSubmitted] = useState<Record<string, string>>({});
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isSessionEnded, setIsSessionEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');

  // Active floating reactions
  const [reactions, setReactions] = useState<{ id: string; username: string; type: string }[]>([]);

  // Video Call State
  const [isCamOn, setIsCamOn] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsCamOn(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      setIsCamOn(false);
      alert("Could not access your camera. Please check your browser/system permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setIsCamOn(false);
  };

  const toggleCam = () => {
    if (isCamOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Clean up camera stream on unmount or room leave
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Ensure local video element binds to stream once mounted
  useEffect(() => {
    if (isCamOn && streamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = streamRef.current;
    }
  }, [isCamOn]);


  const socketRef = useRef<WebSocket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchLobbies();
  }, [lang]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const fetchLobbies = async () => {
    setLoadingLobbies(true);
    try {
      // Fetch active lobbies
      const res = await fetch(`/api/study-rooms/lobbies?lang=${lang}`);
      if (res.ok) {
        const data = await res.json();
        setLobbies(data);
      }
    } catch (e) {
      console.error(e);
      // Mock lobby fallback
      setLobbies([
        {
          room_id: `lobby-${lang}-active`,
          language: lang,
          participant_count: 3,
          current_question: 1,
          total_questions: 5
        }
      ]);
    } finally {
      setLoadingLobbies(false);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const cleanRoomId = newRoomName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    try {
      const res = await fetch('/api/study-rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, room_id: cleanRoomId })
      });
      if (res.ok) {
        joinRoom(cleanRoomId);
      }
    } catch (e) {
      // Fallback
      joinRoom(cleanRoomId);
    }
  };

  const joinRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setIsSessionEnded(false);
    setScores({});
    setParticipants([]);
    setChatHistory([]);
    setSelectedAnswer(null);
    setAnswersSubmitted({});
    setCorrectAnswer(null);

    const loc = window.location;
    const wsProto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
    let wsUrl = '';
    if (loc.port === '5173') {
      wsUrl = `${wsProto}//localhost:8000/api/study-rooms/ws/${roomId}?username=${encodeURIComponent(username)}`;
    } else {
      wsUrl = `${wsProto}//${loc.host}/api/study-rooms/ws/${roomId}?username=${encodeURIComponent(username)}`;
    }

    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'init') {
        const state = msg.state;
        setParticipants(state.participants);
        setScores(state.scores);
        setCurrentQuestion(state.question);
        setQuestionIndex(state.current_question_index);
        setTotalQuestions(state.total_questions);
        setTimer(state.timer);
        setQuestionActive(state.question_active);
        setAnswersSubmitted(state.answers_submitted);
        setIsSessionEnded(state.is_session_ended);
        setChatHistory(state.chat_history || []);
      } else if (msg.type === 'join') {
        setParticipants(msg.participants);
        setScores(msg.scores);
      } else if (msg.type === 'leave') {
        setParticipants(msg.participants);
      } else if (msg.type === 'timer') {
        setTimer(msg.value);
      } else if (msg.type === 'submit_ack') {
        setAnswersSubmitted(msg.answers_submitted);
      } else if (msg.type === 'reveal') {
        setQuestionActive(false);
        setScores(msg.scores);
        setCorrectAnswer(msg.correct_answer);
      } else if (msg.type === 'next_question') {
        const state = msg.state;
        setCurrentQuestion(state.question);
        setQuestionIndex(state.current_question_index);
        setTimer(state.timer);
        setQuestionActive(true);
        setSelectedAnswer(null);
        setAnswersSubmitted({});
        setCorrectAnswer(null);
      } else if (msg.type === 'reaction') {
        triggerReactionOverlay(msg.username, msg.reaction_id);
      } else if (msg.type === 'chat') {
        setChatHistory((prev) => [...prev, msg.message]);
      } else if (msg.type === 'end') {
        setIsSessionEnded(true);
        setWinner(msg.winner);
        setScores(msg.scores);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket Error', err);
    };

    ws.onclose = () => {
      console.log('WS Connection closed');
    };

    socketRef.current = ws;
  };

  const handleLeaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setActiveRoomId(null);
    fetchLobbies();
  };

  const handleSelectOption = (option: string) => {
    if (!questionActive || selectedAnswer) return;
    setSelectedAnswer(option);
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'submit_answer',
        answer: option
      }));
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !socketRef.current) return;
    socketRef.current.send(JSON.stringify({
      type: 'chat',
      content: chatInput
    }));
    setChatInput('');
  };

  const handleSendReaction = (reactionId: string) => {
    if (!socketRef.current) return;
    socketRef.current.send(JSON.stringify({
      type: 'reaction',
      reaction_id: reactionId
    }));
  };

  const triggerReactionOverlay = (user: string, reactionId: string) => {
    const newReaction = {
      id: Math.random().toString(),
      username: user,
      type: reactionId
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: 'next' }));
    }
  };

  const reactionLabels: Record<string, { label: string; bg: string; icon: string }> = {
    fire: { label: 'Lit!', bg: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: '🔥' },
    laugh: { label: 'Haha', bg: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: '😂' },
    clap: { label: 'Bravo', bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: '👏' },
    shock: { label: 'Wow', bg: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: '😮' },
  };

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Floating Reaction Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {reactions.map((r, idx) => (
          <div
            key={r.id}
            className="absolute bottom-24 bg-white/95 dark:bg-slate-900/95 shadow-lg border border-slate-100 dark:border-slate-800 rounded-full px-4 py-2 flex items-center gap-2 animate-bounce transition-all duration-1000"
            style={{
              left: `${15 + (idx * 15) % 60}%`,
              transform: `translateY(-${Math.min(200, 20 + idx * 40)}px)`,
              animation: 'bounce 2s infinite',
              opacity: 0.95
            }}
          >
            <span className="text-sm font-black text-brand-blue">
              {r.username}
            </span>
            <span className="text-base">
              {reactionLabels[r.type]?.icon || '✨'}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              {reactionLabels[r.type]?.label || 'Reaction'}
            </span>
          </div>
        ))}
      </div>

      {!activeRoomId ? (
        /* ── LOBBY VIEW ─────────────────────────────────────────────────── */
        <div className="space-y-8">
          <header className="flex items-center justify-between py-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <ChevronRight size={20} className="transform rotate-180 text-slate-600 dark:text-slate-300" />
              </button>
              <div>
                <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                  <Users className="text-brand-blue" size={20} />
                  {t('live_study_rooms', 'Live Study Rooms')}
                </h1>
                <p className="text-xs text-slate-500">
                  {t('join_synchronized_learning_lobby_rooms_a', 'Join synchronized learning lobby rooms and test your language speed against others in real time.')}
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Room Cockpit */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Plus className="text-brand-blue" size={16} />
                  {t('host_a_study_room', 'Host a Study Room')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('create_a_custom_room_name_other_players', 'Create a custom room name. Other players learning the same language can join your session.')}
                </p>

                <form onSubmit={handleCreateRoom} className="space-y-3 pt-2">
                  <input
                    type="text"
                    required
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder={t('e_g_beginner_review_club', 'e.g. beginner-review-club')}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center gap-1.5"
                  >
                    {t('create_start', 'Create & Start')}
                  </button>
                </form>
              </div>
            </div>

            {/* Room Lobbies Grid */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                {t('active_lobbies', 'Active Lobbies (')}{lobbies.length})
              </h3>

              {loadingLobbies ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  {t('loading_active_room_lists', 'Loading active room lists...')}
                </div>
              ) : lobbies.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <Users className="mx-auto w-12 h-12 text-slate-300 mb-2" />
                  <p className="text-xs text-slate-500">{t('no_active_custom_lobbies_start_one_now', 'No active custom lobbies. Start one now!')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lobbies.map((room) => (
                    <div
                      key={room.room_id}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black uppercase bg-brand-blue/10 text-brand-blue px-2.5 py-0.5 rounded-full">
                            {room.language.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Users size={10} />
                            {room.participant_count}{t('10_online', '/10 online')}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                          {room.room_id.replace(/-/g, ' ')}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {t('question', 'Question')} {room.current_question}/{room.total_questions}
                        </p>
                      </div>

                      <button
                        onClick={() => joinRoom(room.room_id)}
                        className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        {t('join_room', 'Join Room')}
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── ACTIVE STUDY ROOM VIEW ────────────────────────────────────── */
        <div className="space-y-6">
          <header className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLeaveRoom}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-red-500"
                title={t('leave_room', 'Leave Room')}
              >
                <LogOut size={18} />
              </button>
              <div>
                <h2 className="text-base font-black text-slate-800 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                  {t('room', 'Room:')} {activeRoomId.replace(/-/g, ' ')}
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                  <span>{t('language', 'Language:')} {lang.toUpperCase()}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {participants.length} {t('active_users', 'Active Users')}
                  </span>
                </div>
              </div>
            </div>

            {/* Sync Timer Badge */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
              <Timer size={14} className={timer <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-500'} />
              <span className={`text-xs font-bold ${timer <= 5 ? 'text-red-500 font-black' : 'text-slate-750 dark:text-slate-250'}`}>
                {timer}{t('s', 's')}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side: Game Synced Board & Options */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Google Meet/Teams Style Video Grid */}
              {!isSessionEnded && (
                <div className="p-5 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {t('live_video_study_group_google_meet_mode', 'Live Video Study Group (Google Meet Mode)')}
                      </h3>
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {t('active_session_hd', 'Active Session · HD')}
                    </div>
                  </div>

                  {/* 4-Person Video Grid */}
                  <div className="grid grid-cols-2 gap-4 aspect-video sm:aspect-[2.2/1] md:aspect-[1.8/1]">
                    
                    {/* Participant 1: YOU */}
                    <div className="relative bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-lg">
                      {isCamOn ? (
                        <video
                          ref={localVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover scale-x-[-1]"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-sm font-black shadow-inner uppercase">
                          {username.slice(0, 2)}
                        </div>
                      )}
                      
                      {/* Hand raise overlay */}
                      {isHandRaised && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-slate-950 p-1 rounded-full shadow-md animate-bounce">
                          <Hand size={12} fill="currentColor" />
                        </div>
                      )}

                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold backdrop-blur-sm flex items-center gap-1">
                        <span>{username} {t('you', '(You)')}</span>
                        {!isMicOn && <MicOff size={8} className="text-red-400" />}
                      </div>
                    </div>

                    {/* Participant 2: Li Wei (Simulated Partner 1) */}
                    <div className="relative bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-lg">
                      {/* Simulated video stream: beautiful pulsing avatar */}
                      <div className="w-12 h-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-black shadow-inner relative">
                        {t('lw', 'LW')}
                        {/* Active speaking indicator */}
                        <span className="absolute -inset-1.5 rounded-full border border-emerald-500/60 animate-ping opacity-75" />
                      </div>

                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold backdrop-blur-sm flex items-center gap-1">
                        <span>{t('li_wei', 'Li Wei')}</span>
                        <div className="flex gap-0.5 items-end h-2 w-3">
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.8s_infinite] h-1" />
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.6s_infinite] h-2" />
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.9s_infinite] h-1.5" />
                        </div>
                      </div>
                    </div>

                    {/* Participant 3: Elena (Simulated Partner 2) */}
                    <div className="relative bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-lg">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-black shadow-inner">
                        {t('el', 'EL')}
                      </div>

                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold backdrop-blur-sm flex items-center gap-1">
                        <span>{t('elena', 'Elena')}</span>
                        <MicOff size={8} className="text-red-400" />
                      </div>
                    </div>

                    {/* Participant 4: Jean-Luc (Simulated Partner 3) */}
                    <div className="relative bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-lg">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black shadow-inner relative">
                        {t('jl', 'JL')}
                        <span className="absolute -inset-1.5 rounded-full border border-emerald-500/60 animate-ping opacity-40" />
                      </div>

                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold backdrop-blur-sm flex items-center gap-1">
                        <span>{t('jean_luc', 'Jean-Luc')}</span>
                        <div className="flex gap-0.5 items-end h-2 w-3">
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.7s_infinite] h-2" />
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.5s_infinite] h-1" />
                          <span className="w-0.5 bg-emerald-500 animate-[pulse_0.8s_infinite] h-1.5" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Google Meet Conferencing Control Bar */}
                  <div className="flex justify-center gap-2 border-t border-slate-900 pt-3">
                    <button
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`p-2.5 rounded-full transition-all ${
                        isMicOn ? 'bg-slate-850 hover:bg-slate-800 text-white' : 'bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30'
                      }`}
                      title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                    >
                      {isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
                    </button>
                    <button
                      onClick={toggleCam}
                      className={`p-2.5 rounded-full transition-all ${
                        isCamOn ? 'bg-slate-850 hover:bg-slate-800 text-white' : 'bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30'
                      }`}
                      title={isCamOn ? "Turn Camera Off" : "Turn Camera On"}
                    >
                      {isCamOn ? <Video size={14} /> : <VideoOff size={14} />}
                    </button>
                    <button
                      onClick={() => setIsSharingScreen(!isSharingScreen)}
                      className={`p-2.5 rounded-full transition-all ${
                        isSharingScreen ? 'bg-brand-blue text-white' : 'bg-slate-850 hover:bg-slate-800 text-white'
                      }`}
                      title={isSharingScreen ? "Stop Sharing Screen" : "Share Screen"}
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      onClick={() => setIsHandRaised(!isHandRaised)}
                      className={`p-2.5 rounded-full transition-all ${
                        isHandRaised ? 'bg-yellow-500 text-slate-950' : 'bg-slate-850 hover:bg-slate-800 text-white'
                      }`}
                      title={t('raise_hand', 'Raise Hand')}
                    >
                      <Hand size={14} fill={isHandRaised ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              )}

              {isSessionEnded ? (
                /* Leaderboard Summary end panel */
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-950/40 rounded-full flex items-center justify-center text-amber-500">
                    <Trophy size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {t('session_finished', 'Session Finished!')}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {t('here_are_the_final_standings_for_this_ro', 'Here are the final standings for this room.')}
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-3 pt-2">
                    {Object.entries(scores)
                      .sort((a, b) => b[1] - a[1])
                      .map(([user, points], index) => (
                        <div
                          key={user}
                          className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-slate-400 w-5">#{index + 1}</span>
                            <span className={`text-xs font-bold ${user === username ? 'text-brand-blue font-black' : 'text-slate-700 dark:text-slate-300'}`}>
                              {user}
                            </span>
                          </div>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                            {points} {t('xp', 'XP')}
                          </span>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={handleLeaveRoom}
                    className="px-6 py-3 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    {t('back_to_lobbies', 'Back to Lobbies')}
                  </button>
                </div>
              ) : currentQuestion ? (
                /* Question solve display */
                <div className="space-y-6">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>{t('question', 'Question')} {questionIndex + 1} {t('of', 'of')} {totalQuestions}</span>
                      <span>{questionActive ? 'Solving' : 'Results'}</span>
                    </div>

                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">
                      {currentQuestion.question}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = correctAnswer === option;
                        const showCorrectColor = !questionActive && isCorrect;
                        const showIncorrectColor = !questionActive && isSelected && !isCorrect;

                        return (
                          <button
                            key={option}
                            onClick={() => handleSelectOption(option)}
                            disabled={!questionActive || selectedAnswer !== null}
                            className={`p-4 text-left text-xs font-bold rounded-2xl border transition-all ${
                              showCorrectColor
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                : showIncorrectColor
                                ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400'
                                : isSelected
                                ? 'border-brand-blue bg-brand-blue/5 text-brand-blue font-black'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{option}</span>
                              {showCorrectColor && <Check size={14} className="text-emerald-500" />}
                              {showIncorrectColor && <X size={14} className="text-red-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission status bar */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      {t('answers_submitted', 'Answers submitted:')}
                    </span>
                    <div className="flex gap-2">
                      {participants.map((user) => {
                        const submitted = answersSubmitted[user] !== undefined;
                        return (
                          <div
                            key={user}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                              submitted
                                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400'
                                : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                            }`}
                          >
                            {user} {submitted ? '✓' : '...'}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advance to next question */}
                  {!questionActive && (
                    <div className="flex justify-between items-center p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-2xl">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {t('answer_revealed_correct', 'Answer revealed! Correct:')} <span className="font-bold text-emerald-600">{correctAnswer}</span>
                      </span>
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        {t('next_question', 'Next Question')}
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 text-xs">
                  {t('awaiting_first_questions', 'Awaiting first questions...')}
                </div>
              )}

              {/* Dynamic Reaction Bar (No emojis, Lucide Custom Labels) */}
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-3 text-center">
                  {t('live_reactions', 'Live Reactions')}
                </div>
                <div className="flex justify-center gap-4">
                  {Object.entries(reactionLabels).map(([id, info]) => (
                    <button
                      key={id}
                      onClick={() => handleSendReaction(id)}
                      className={`px-4 py-2 border rounded-full text-xs font-bold transition-all transform active:scale-90 flex items-center gap-1.5 ${info.bg}`}
                    >
                      <span>{info.icon}</span>
                      <span>{info.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Scores & Live Chat */}
            <div className="lg:col-span-4 space-y-6">
              {/* Leaderboard panel */}
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-amber-500" />
                  {t('scoreboard', 'Scoreboard')}
                </h3>

                <div className="space-y-2.5 max-h-48 overflow-y-auto">
                  {participants.map((user) => (
                    <div
                      key={user}
                      className="flex justify-between items-center p-2 rounded-xl bg-slate-50/50 dark:bg-slate-850/30"
                    >
                      <span className={`text-xs font-bold ${user === username ? 'text-brand-blue font-black' : 'text-slate-700 dark:text-slate-350'}`}>
                        {user}
                      </span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                        {scores[user] || 0} {t('xp', 'XP')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synced Discussion chat drawer */}
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl h-[360px] flex flex-col justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-brand-blue" />
                  {t('room_discussion', 'Room Discussion')}
                </h3>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1 text-xs">
                  {chatHistory.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[10px] text-slate-400 italic">
                      {t('no_messages_yet_say_hello', 'No messages yet. Say hello!')}
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-2xl max-w-[85%] ${
                          msg.username === username
                            ? 'bg-brand-blue/10 border border-brand-blue/10 ml-auto text-right'
                            : 'bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80 mr-auto text-left'
                        }`}
                      >
                        <div className="flex items-center gap-1 justify-between text-[8px] font-black uppercase text-slate-400 mb-0.5">
                          <span>{msg.username}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="font-semibold text-slate-750 dark:text-slate-200">
                          {msg.content}
                        </p>
                      </div>
                    ))
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t('type_message', 'Type message...')}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-slate-850 text-white rounded-xl hover:bg-slate-700 transition-all flex-shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
