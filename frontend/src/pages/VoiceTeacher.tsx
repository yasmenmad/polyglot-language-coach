import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Mic, Volume2, Bot, User, Sparkles, AudioLines } from 'lucide-react';
import { LanguageCode, LANG_LOCALE, getLanguageInfo } from '../data/courses';
import { useTranslation } from 'react-i18next';

interface VoiceTeacherProps {
  onBack: () => void;
  lang?: string;
  user?: any;
}

interface Message {
  sender: 'emma' | 'user';
  text: string;
  py?: string;
  en?: string;
}

const TEMPLATES: Record<LanguageCode, {
  welcome: Message;
  hello: Message;
  bye: Message;
  weather: Message;
  name: Message;
  fallback: Message;
  keywords: {
    hello: string[];
    bye: string[];
    weather: string[];
    name: string[];
  }
}> = {
  zh: {
    welcome: { sender: 'emma', text: '你好！我是你的 AI 老师 Emma。今天你想聊点什么？', py: 'Nǐ hǎo! Wǒ shì nǐ de AI lǎoshī Emma. Jīntiān nǐ xiǎng liáo diǎn shénme?', en: 'Hello! I am your AI teacher Emma. What would you like to chat about today?' },
    hello: { sender: 'emma', text: '你好！你今天过得怎么样？吃饭了吗？', py: 'Nǐ hǎo! Nǐ jīntiān guò de zěnmeyàng? Chīfàn le ma?', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: '再见！祝你今天过得愉快！下次见！', py: 'Zàijiàn! Zhù nǐ jīntiān guò de yúkuài! Xiàcì jiàn!', en: 'Goodbye! Hope you have a wonderful day! See you next time!' },
    weather: { sender: 'emma', text: '今天的天气确实很舒服，很适合出去散步。', py: 'Jīntiān de tiānqì quèshí hěn shūfu, hěn shìhé chūqù sànbù.', en: 'The weather today is indeed very comfortable, very suitable for going out for a walk.' },
    name: { sender: 'emma', text: '我的名字叫 Emma，我是你的语言学习助手。', py: 'Wǒ de míngzi jiào Emma, wǒ shì nǐ de yǔyán xuéxí zhùshǒu.', en: 'My name is Emma, and I am your language learning assistant.' },
    fallback: { sender: 'emma', text: '太好了！我们可以继续练习。你说得很对。', py: 'Tài hǎo le! Wǒmen kěyǐ jìxù liànxí. Nǐ shuō de hěn duì.', en: "Great! Let's keep on practicing. What you said is very correct." },
    keywords: { hello: ['你好', '您好'], bye: ['再见', '拜拜'], weather: ['天气', '下雨', '晴天'], name: ['名字', '谁'] }
  },
  es: {
    welcome: { sender: 'emma', text: '¡Hola! Soy tu profesora de IA Emma. ¿De qué te gustaría hablar hoy?', en: 'Hello! I am your AI teacher Emma. What would you like to talk about today?' },
    hello: { sender: 'emma', text: '¡Hola! ¿Cómo va tu día? ¿Ya has comido?', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: '¡Adiós! ¡Que tengas un día maravilloso! ¡Hasta la próxima!', en: 'Goodbye! Have a wonderful day! See you next time!' },
    weather: { sender: 'emma', text: 'El clima de hoy es muy agradable, perfecto para dar un paseo.', en: 'The weather today is very pleasant, perfect for taking a walk.' },
    name: { sender: 'emma', text: 'Me llamo Emma y soy tu asistente de aprendizaje de español.', en: 'My name is Emma and I am your Spanish learning assistant.' },
    fallback: { sender: 'emma', text: '¡Excelente! Sigamos practicando en español. Lo que dijiste es muy correcto.', en: 'Excellent! Let\'s keep practicing in Spanish. What you said is very correct.' },
    keywords: { hello: ['hola', 'buenos'], bye: ['adiós', 'adios', 'chao', 'luego'], weather: ['clima', 'tiempo', 'lluvia', 'sol'], name: ['nombre', 'llamas', 'quién'] }
  },
  fr: {
    welcome: { sender: 'emma', text: 'Bonjour ! Je suis Emma, votre professeur IA. De quoi aimeriez-vous parler aujourd\'hui ?', en: 'Hello! I am Emma, your AI teacher. What would you like to talk about today?' },
    hello: { sender: 'emma', text: 'Bonjour ! Comment se passe votre journée ? Avez-vous mangé ?', en: 'Hello! How is your day going? Have you eaten?' },
    bye: { sender: 'emma', text: 'Au revoir ! Passez une excellente journée ! À la prochaine !', en: 'Goodbye! Have an excellent day! See you next time!' },
    weather: { sender: 'emma', text: 'Le temps est vraiment agréable aujourd\'hui, idéal pour faire une promenade.', en: 'Le temps est vraiment agréable aujourd\'hui, idéal pour faire une promenade.' },
    name: { sender: 'emma', text: 'Je m\'appelle Emma et je suis votre assistante d\'apprentissage du français.', en: 'My name is Emma and I am your French learning assistant.' },
    fallback: { sender: 'emma', text: 'Excellent ! Continuons à pratiquer en français. Ce que vous avez dit est tout à fait correct.', en: 'Excellent! Let\'s continue to practice in French. What you said is completely correct.' },
    keywords: { hello: ['bonjour', 'salut'], bye: ['revoir', 'salut', 'bye'], weather: ['temps', 'météo', 'pluie', 'soleil'], name: ['nom', 'appelles', 'qui'] }
  },
  de: {
    welcome: { sender: 'emma', text: 'Hallo! Ich bin deine KI-Lehrerin Emma. Worüber möchtest du heute sprechen?', en: 'Hello! I am your AI teacher Emma. What would you like to talk about today?' },
    hello: { sender: 'emma', text: 'Hallo! Wie läuft dein Tag? Hast du schon gegessen?', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: 'Tschüss! Hab einen wunderschönen Tag! Bis zum nächsten Mal!', en: 'Goodbye! Have a wonderful day! See you next time!' },
    weather: { sender: 'emma', text: 'Das Wetter heute ist wirklich angenehm, ideal für einen Spaziergang.', en: 'The weather today is really pleasant, ideal for a walk.' },
    name: { sender: 'emma', text: 'Ich heiße Emma und ich bin deine Deutsch-Lernassistentin.', en: 'My name is Emma and I am your German learning assistant.' },
    fallback: { sender: 'emma', text: 'Super! Lass uns weiter Deutsch üben. Was du gesagt hast, ist völlig richtig.', en: 'Super! Let\'s keep practicing German. What you said is completely correct.' },
    keywords: { hello: ['hallo', 'tag', 'morgen'], bye: ['tschüss', 'wiedersehen', 'bye'], weather: ['wetter', 'regen', 'sonne'], name: ['name', 'heißt', 'wer'] }
  },
  ja: {
    welcome: { sender: 'emma', text: 'こんにちは！AIの先生のエマです。今日は何について話したいですか？', en: 'Hello! I am your AI teacher Emma. What would you like to talk about today?' },
    hello: { sender: 'emma', text: 'こんにちは！今日はどんな一日ですか？もうご飯は食べましたか？', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: 'さようなら！良い一日をお過ごしください！また会いましょう！', en: 'Goodbye! Have a good day! See you again!' },
    weather: { sender: 'emma', text: '今日の天気は本当に気持ちがいいですね。散歩にぴったりです。', en: 'The weather today is really good. It is perfect for a walk.' },
    name: { sender: 'emma', text: '私の名前はエマです。あなたの日本語学習アシスタントです。', en: 'My name is Emma. I am your Japanese learning assistant.' },
    fallback: { sender: 'emma', text: '素晴らしいです！日本語法でもっと練習しましょう。おっしゃる通りです。', en: 'Wonderful! Let\'s practice more in Japanese. What you say is correct.' },
    keywords: { hello: ['こんにちは', 'もしもし', 'おはよう'], bye: ['さようなら', 'バイバイ', 'またね'], weather: ['天気', 'てんき', '雨', '晴れ'], name: ['名前', 'なまえ', 'だれ'] }
  },
  ko: {
    welcome: { sender: 'emma', text: '안녕하세요! 저는 AI 선생님 엠마입니다. 오늘 어떤 이야기를 하고 싶으세요?', en: 'Hello! I am AI teacher Emma. What talk would you like to have today?' },
    hello: { sender: 'emma', text: '안녕하세요! 오늘 하루 어떠세요? 식사는 하셨나요?', en: 'Hello! How is your day going? Have you eaten?' },
    bye: { sender: 'emma', text: '안녕히 가세요! 오늘 하루 즐겁게 보내세요! 다음에 또 봐요!', en: 'Goodbye! Have a nice day! See you next time!' },
    weather: { sender: 'emma', text: '오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날씨예요.', en: 'Today\'s weather is really nice. It is a perfect day for a walk.' },
    name: { sender: 'emma', text: '제 이름은 엠마이고, 한국어 학습 도우미입니다.', en: 'My name is Emma and I am your Korean learning helper.' },
    fallback: { sender: 'emma', text: '아주 좋아요! 한국어로 더 연습해 봅시다. 하신 말씀이 맞아요.', en: 'Very good! Let\'s practice more in Korean. What you said is correct.' },
    keywords: { hello: ['안녕', '하세요', '반갑'], bye: ['가세요', '계세요', '바이'], weather: ['날씨', '비', '눈', '맑음'], name: ['이름', '누구'] }
  },
  it: {
    welcome: { sender: 'emma', text: 'Ciao! Sono la tua insegnante di IA Emma. Di cosa ti piacerebbe parlare oggi?', en: 'Hello! I am your AI teacher Emma. What would you like to speak about today?' },
    hello: { sender: 'emma', text: 'Ciao! Come va la tua giornata? Hai già mangiato?', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: 'Arrivederci! Buona giornata! Alla prossima!', en: 'Goodbye! Have a great day! See you next time!' },
    weather: { sender: 'emma', text: 'Il tempo oggi è davvero piacevole, ideale per una passeggiata.', en: 'Il tempo oggi è davvero piacevole, ideale per una passeggiata.' },
    name: { sender: 'emma', text: 'Mi chiamo Emma e sono la tua assistente per l\'apprendimento dell\'italiano.', en: 'Mi chiamo Emma e sono la tua assistente per l\'apprendimento dell\'italiano.' },
    fallback: { sender: 'emma', text: 'Ottimo! Continuiamo a esercitarci in italiano. Quello che hai detto è correttissimo.', en: 'Great! Let\'s continue to practice in Italian. What you said is very correct.' },
    keywords: { hello: ['ciao', 'buongiorno'], bye: ['arrivederci', 'ciao', 'prossima'], weather: ['tempo', 'meteo', 'pioggia', 'sole'], name: ['nome', 'chiami', 'chi'] }
  },
  en: {
    welcome: { sender: 'emma', text: 'Hello! I am your AI teacher Emma. What would you like to chat about today?', en: 'Hello! I am your AI teacher Emma. What would you like to chat about today?' },
    hello: { sender: 'emma', text: 'Hello! How is your day going? Have you eaten yet?', en: 'Hello! How is your day going? Have you eaten yet?' },
    bye: { sender: 'emma', text: 'Goodbye! Hope you have a wonderful day! See you next time!', en: 'Goodbye! Hope you have a wonderful day! See you next time!' },
    weather: { sender: 'emma', text: 'The weather today is indeed very comfortable, very suitable for going out for a walk.', en: 'The weather today is indeed very comfortable, very suitable for going out for a walk.' },
    name: { sender: 'emma', text: 'My name is Emma, and I am your English learning assistant.', en: 'My name is Emma, and I am your English learning assistant.' },
    fallback: { sender: 'emma', text: 'Great! Let\'s practice more in English. What you said is very correct.', en: 'Great! Let\'s practice more in English. What you said is very correct.' },
    keywords: { hello: ['hello', 'hi', 'morning'], bye: ['goodbye', 'bye', 'farewell'], weather: ['weather', 'rain', 'sunny', 'temperature'], name: ['name', 'who'] }
  },
  ar: {
    welcome: { sender: 'emma', text: 'أهلاً! أنا معلمتك الذكية إيما. عن ماذا تحب أن نتحدث اليوم؟', en: 'Hello! I am your AI teacher Emma. What would you like to talk about today?' },
    hello: { sender: 'emma', text: 'أهلاً! كيف يسير يومك؟ هل تناولت الطعام؟', en: 'Hello! How is your day going? Have you eaten?' },
    bye: { sender: 'emma', text: 'مع السلامة! أتمنى لك يوماً رائعاً! أراك في المرة القادمة!', en: 'Goodbye! Wish you a wonderful day! See you next time!' },
    weather: { sender: 'emma', text: 'الطقس اليوم جميل ولطيف جداً، وهو مناسب للخروج للمشي.', en: 'The weather today is beautiful and very pleasant, suitable for walking.' },
    name: { sender: 'emma', text: 'اسمي إيما، وأنا مساعدتك لتعلم اللغة العربية.', en: 'My name is Emma, and I am your Arabic learning assistant.' },
    fallback: { sender: 'emma', text: 'رائع جداً! دعنا نتدرب أكثر باللغة العربية. ما قلته صحيح تماماً.', en: 'Very wonderful! Let\'s practice more in Arabic. What you said is correct.' },
    keywords: { hello: ['أهلاً', 'مرحباً', 'صباح'], bye: ['سلامة', 'وداعاً', 'لقاء'], weather: ['طقس', 'جو', 'مطر', 'شمس'], name: ['اسم', 'من'] }
  }
};

export default function VoiceTeacher({ onBack, lang, user }: VoiceTeacherProps) {
  const { t } = useTranslation();
  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const langLocale = LANG_LOCALE[activeLang] || 'zh-CN';
  const data = TEMPLATES[activeLang] || TEMPLATES.zh;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEmmaSpeaking, setIsEmmaSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with correct welcome message
  useEffect(() => {
    setMessages([data.welcome]);
  }, [activeLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === 'emma') {
      speak(lastMsg.text);
    }
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langLocale;
      utterance.rate = 0.9;
      
      utterance.onstart = () => {
        setIsEmmaSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsEmmaSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsEmmaSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply: Message = data.fallback;
      const lowerText = text.toLowerCase();

      // Check keywords
      if (data.keywords.hello.some(k => lowerText.includes(k.toLowerCase()))) {
        reply = data.hello;
      } else if (data.keywords.bye.some(k => lowerText.includes(k.toLowerCase()))) {
        reply = data.bye;
      } else if (data.keywords.weather.some(k => lowerText.includes(k.toLowerCase()))) {
        reply = data.weather;
      } else if (data.keywords.name.some(k => lowerText.includes(k.toLowerCase()))) {
        reply = data.name;
      }

      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleStartVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please try Chrome or Safari.");
      return;
    }

    setIsRecording(true);
    const recognition = new SpeechRecognition();
    recognition.lang = langLocale;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
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
    <div className="w-full max-w-[850px] px-6 py-8 flex flex-col h-[88svh] text-left ml-0 bg-slate-950 rounded-[2.5rem] border border-slate-900 shadow-2xl relative overflow-hidden">
      
      {/* Dynamic Aura Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-900 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-850 flex items-center justify-center hover:bg-slate-800 hover:text-white active:scale-95 transition-all text-slate-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/10">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white flex items-center gap-1.5">
                {t('ai_emma', 'AI Emma')} <span className="text-[9px] font-black uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30">{t('voice_teacher', 'Voice Teacher')}</span>
              </h1>
              <p className="text-[9px] text-slate-450 font-bold uppercase tracking-widest">
                {t('speak_or_type_to_have_a_live_conversatio', 'Speak or type to have a live conversation in')} {langInfo.label}
              </p>
            </div>
          </div>
        </div>

        {/* Audio Wave Indicators */}
        {(isRecording || isEmmaSpeaking) && (
          <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-850 px-3 py-1.5 rounded-2xl shadow-inner backdrop-blur-sm animate-pulse">
            <AudioLines className="w-4 h-4 text-sky-400" />
            <span className="text-[9px] font-black uppercase tracking-wider text-sky-400">
              {isRecording ? 'Listening' : 'Emma Speaking'}
            </span>
          </div>
        )}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-slate-950/40 border border-slate-900 backdrop-blur-md rounded-3xl p-5 mb-4 space-y-6 shadow-inner relative z-10 max-h-[58svh]">
        {messages.map((msg, idx) => {
          const isEmma = msg.sender === 'emma';
          return (
            <div
              key={idx}
              className={`flex gap-3.5 items-end ${isEmma ? 'justify-start' : 'justify-end'}`}
            >
              {isEmma && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-850 flex items-center justify-center text-white text-xs font-bold shrink-0 relative shadow-md">
                  👩‍🏫
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />
                </div>
              )}

              <div className={`max-w-[75%] rounded-3xl p-4 shadow-lg border relative group text-left transition-all ${
                isEmma
                  ? 'bg-slate-900/95 border-slate-850 text-slate-200 rounded-bl-sm'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 border-sky-455 text-white rounded-br-sm'
              }`}>
                <div 
                  className={`text-sm font-semibold leading-relaxed ${isEmma ? 'cursor-pointer hover:text-sky-400' : ''}`} 
                  onClick={isEmma ? () => speak(msg.text) : undefined}
                >
                  {msg.text}
                </div>
                {isEmma && msg.py && (
                  <div className="text-xs font-extrabold text-sky-400 mt-2">
                    {msg.py}
                  </div>
                )}
                {isEmma && msg.en && (
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {msg.en}
                  </div>
                )}

                {isEmma && (
                  <button
                    onClick={() => speak(msg.text)}
                    className="mt-3 w-8 h-8 rounded-xl bg-slate-850 hover:bg-slate-800 text-sky-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-inner border border-slate-800"
                    title={t('repeat_audio', 'Repeat Audio')}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!isEmma && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 relative shadow-md border border-sky-400/20">
                  {user?.username?.slice(0, 2).toUpperCase() || 'ME'}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Controls Bar */}
      <div className="flex gap-2.5 items-center flex-shrink-0 relative z-10">
        <button
          onClick={handleStartVoice}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-lg active:scale-95 ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse shadow-red-500/20'
              : 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/30 hover:bg-emerald-500/20 hover:text-white'
          }`}
          title={`Speak in ${langInfo.label}`}
        >
          <Mic className="w-6 h-6 animate-pulse" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend(inputVal)}
          placeholder={`Type your reply in ${langInfo.label}...`}
          className="flex-1 bg-slate-900/60 dark:bg-slate-900/60 border border-slate-850 rounded-2xl px-4 py-4 text-sm font-bold focus:outline-none focus:border-sky-500 text-slate-100 placeholder-slate-500"
        />

        <button
          onClick={() => handleSend(inputVal)}
          className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-400 active:scale-95 transition-all shadow-lg shadow-sky-500/10 flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
