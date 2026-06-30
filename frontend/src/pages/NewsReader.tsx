import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Newspaper, ChevronLeft, Sliders, Heart, FileText, HelpCircle, RefreshCw, Award, Check, Sparkles, AlertCircle, BookOpen, Volume2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  source: string;
  category: string;
  content: string;
}

interface SavedArticle {
  id: number;
  title: string;
  content: string;
  language: string;
  saved_at: string;
}

interface QuizQuestion {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
}

interface NewsReaderProps {
  onBack: () => void;
  lang: string;
  onAwardXP: (xp: number) => void;
}

export default function NewsReader({ onBack, lang, onAwardXP }: NewsReaderProps) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'feed' | 'library'>('feed');
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [simplifiedContent, setSimplifiedContent] = useState<string>('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  
  // Loading states
  const [loadingHeadlines, setLoadingHeadlines] = useState<boolean>(true);
  const [simplifying, setSimplifying] = useState<boolean>(false);
  const [loadingLibrary, setLoadingLibrary] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Tap-to-define Overlay tooltip state
  const [tooltip, setTooltip] = useState<{
    word: string;
    pinyin: string;
    definition: string;
    example: string;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchHeadlines();
  }, [lang]);

  useEffect(() => {
    if (selectedArticle) {
      handleSimplify(selectedArticle.content);
    }
  }, [selectedArticle, level]);

  useEffect(() => {
    if (activeTab === 'library') {
      fetchLibrary();
    }
  }, [activeTab]);

  const fetchHeadlines = async () => {
    setLoadingHeadlines(true);
    try {
      const data = await api.getNewsHeadlines(lang);
      setArticles(data as Article[]);
      if ((data as Article[]).length > 0) {
        setSelectedArticle((data as Article[])[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHeadlines(false);
    }
  };

  const fetchLibrary = async () => {
    setLoadingLibrary(true);
    try {
      const data = await api.getSavedNewsArticles();
      setSavedArticles(data as SavedArticle[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleSimplify = async (content: string) => {
    setSimplifying(true);
    setQuizActive(false);
    setQuizFinished(false);
    try {
      const res = await api.simplifyNewsArticle(content, level, lang);
      setSimplifiedContent((res as any).content || content);
    } catch (e) {
      console.error(e);
      setSimplifiedContent(content);
    } finally {
      setSimplifying(false);
    }
  };

  const handleSaveArticle = async () => {
    if (!selectedArticle) return;
    setSaving(true);
    try {
      await api.saveNewsArticle(
        selectedArticle.title,
        simplifiedContent,
        lang
      );
      alert('Article successfully saved to your reading library!');
      fetchLibrary();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Tap-to-define implementation
  const handleWordClick = async (word: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Clean word of punctuation
    const cleanWord = word.replace(/[^a-zA-Záéíóúüñßäöüœçàèìòù一-龥]/g, '');
    if (!cleanWord) return;

    // Generate absolute position coordinates
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setTooltip({
      word: cleanWord,
      pinyin: '...',
      definition: 'Translating...',
      example: '',
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop - 100
    });

    try {
      const res: any = await api.translateNewsWord(cleanWord, lang);
      setTooltip({
        word: cleanWord,
        pinyin: res.pinyin || '',
        definition: res.definition || 'Translation unavailable',
        example: res.example || '',
        x: rect.left + scrollLeft + rect.width / 2,
        y: rect.top + scrollTop - 100
      });
    } catch (e) {
      setTooltip({
        word: cleanWord,
        pinyin: '',
        definition: 'Translation unavailable.',
        example: '',
        x: rect.left + scrollLeft + rect.width / 2,
        y: rect.top + scrollTop - 100
      });
    }
  };


  // Close tooltip on clicking outside
  useEffect(() => {
    const handleClose = () => setTooltip(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  // News Quiz implementation
  const handleStartQuiz = async () => {
    if (!selectedArticle) return;
    setLoadingQuiz(true);
    setQuizActive(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    try {
      const res = await api.generateNewsQuiz(simplifiedContent, lang);
      setQuizQuestions(res as QuizQuestion[]);
    } catch (e) {
      console.error(e);
      // Mock fallback questions
      setQuizQuestions([
        {
          question: "What was the main event described in the article?",
          option_a: "An international summit on climate policy",
          option_b: "The successful launch of a space module / gallery exhibit",
          option_c: "A discovery of historic Mayan monuments",
          option_d: "None of the above",
          correct_option: "B"
        }
      ]);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleSelectQuizAnswer = (letter: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(letter);
    const correctLetter = quizQuestions[currentQuestionIndex]?.correct_option?.toUpperCase();
    if (letter.toUpperCase() === correctLetter) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      onAwardXP(15); // Earn XP for completing news quiz
    }
  };

  // Render article content with click triggers
  const renderInteractiveText = (text: string) => {
    // Split by spaces for western languages, or character-by-character for Chinese/Japanese
    const delimiter = (lang === 'zh' || lang === 'ja' || lang === 'ko') ? '' : ' ';
    const words = text.split(delimiter);

    return words.map((word, idx) => (
      <span
        key={idx}
        onClick={(e) => handleWordClick(word, e)}
        className="hover:bg-brand-blue/15 hover:text-brand-blue rounded px-0.5 cursor-pointer transition-colors inline-block"
      >
        {word}{delimiter}
      </span>
    ));
  };

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 max-w-6xl mx-auto relative" ref={containerRef}>
      {/* Tap-to-define Tooltip Overlay */}
      {tooltip && (
        <div
          className="absolute z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-xl max-w-xs space-y-1.5 border border-slate-800 transform -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center gap-2">
            <span className="font-black text-xs text-brand-blue">{tooltip.word}</span>
            {tooltip.pinyin && <span className="text-[10px] text-slate-400 font-mono">{tooltip.pinyin}</span>}
          </div>
          <p className="text-[11px] text-slate-200 leading-snug">{tooltip.definition}</p>
          <div className="text-[9px] text-slate-400 italic pt-1 border-t border-slate-850">
            {tooltip.example}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b border-slate-100 dark:border-slate-800 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Newspaper className="text-brand-blue" size={22} />
              {t('real_news_reader', 'Real News Reader')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('read_authentic_local_news_headlines_inst', 'Read authentic local news headlines, instantly simplified to your target level with tap-to-define aids.')}
            </p>
          </div>
        </div>
      </header>

      {/* Tab Selectors */}
      <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 mb-8">
        <button
          onClick={() => {
            setActiveTab('feed');
            setQuizActive(false);
          }}
          className={`pb-4 text-sm font-black transition-all relative ${
            activeTab === 'feed'
              ? 'text-slate-800 dark:text-slate-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {t('today_s_feed', 'Today\'s Feed')}
          {activeTab === 'feed' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab('library');
            setQuizActive(false);
          }}
          className={`pb-4 text-sm font-black transition-all relative ${
            activeTab === 'library'
              ? 'text-slate-800 dark:text-slate-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {t('reading_library', 'Reading Library')}
          {activeTab === 'library' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
          )}
        </button>
      </div>

      {activeTab === 'feed' ? (
        /* ── TODAY'S RSS FEED TAB ─────────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Headlines Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              {t('latest_articles', 'Latest Articles')}
            </h3>

            {loadingHeadlines ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                {t('parsing_rss_feeds', 'Parsing RSS feeds...')}
              </div>
            ) : articles.length === 0 ? (
              <div className="p-8 text-center border border-slate-150 rounded-2xl text-xs text-slate-400">
                {t('no_active_news_feeds_found_for_this_lang', 'No active news feeds found for this language.')}
              </div>
            ) : (
              <div className="space-y-3">
                {articles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setSelectedArticle(art);
                      setLevel('Intermediate');
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedArticle?.id === art.id
                        ? 'border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 mb-1">
                      <span>{art.source}</span>
                      <span>{art.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250 line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Article reading board */}
          <div className="lg:col-span-8">
            {selectedArticle ? (
              <div className="space-y-6">
                {/* Level toggler & commands toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
                  {/* Simplifier level selector */}
                  <div className="flex items-center gap-2">
                    <Sliders size={16} className="text-brand-blue" />
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300">{t('level', 'Level:')}</span>
                    <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setLevel(lvl)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                            level === lvl
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveArticle}
                      disabled={saving}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-750 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center gap-1.5"
                    >
                      <Heart size={14} className="text-rose-500" />
                      {t('save_article', 'Save Article')}
                    </button>

                    <button
                      onClick={handleStartQuiz}
                      className="px-4 py-2 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <HelpCircle size={14} />
                      {t('weekly_quiz', 'Weekly Quiz')}
                    </button>
                  </div>
                </div>

                {quizActive ? (
                  /* Quiz panel */
                  <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-6">
                    {loadingQuiz ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-2">
                        <RefreshCw className="animate-spin text-brand-blue" size={24} />
                        <span className="text-xs text-slate-550 font-bold">{t('ai_quiz_is_generating', 'AI Quiz is generating...')}</span>
                      </div>
                    ) : quizFinished ? (
                      <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                          <Award size={32} />
                        </div>
                        <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
                          {t('news_quiz_completed', 'News Quiz Completed!')}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {t('you_scored', 'You scored')} {correctCount} {t('out_of', 'out of')} {quizQuestions.length} {t('correct', 'correct.')}
                        </p>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full inline-block mt-2">
                          {t('15_xp_gained', '+15 XP Gained')}
                        </span>

                        <div className="pt-4">
                          <button
                            onClick={() => setQuizActive(false)}
                            className="px-5 py-2 bg-slate-850 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                          >
                            {t('back_to_article', 'Back to Article')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {(() => {
                          const q = quizQuestions[currentQuestionIndex];
                          if (!q) return <p className="text-xs">{t('no_questions_loaded', 'No questions loaded.')}</p>;
                          return (
                            <div className="space-y-6">
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                                <span>{t('question', 'Question')} {currentQuestionIndex + 1} {t('of', 'of')} {quizQuestions.length}</span>
                                <span>{t('score', 'Score:')} {correctCount}</span>
                              </div>
                              <h3 className="text-base font-black text-slate-850 dark:text-slate-100">
                                {q.question}
                              </h3>

                              <div className="grid grid-cols-1 gap-3">
                                {[
                                  { label: 'A', text: q.option_a },
                                  { label: 'B', text: q.option_b },
                                  { label: 'C', text: q.option_c },
                                  { label: 'D', text: q.option_d },
                                ].map((opt) => {
                                  const isSelected = selectedAnswer === opt.label;
                                  const isCorrect = q.correct_option?.toUpperCase() === opt.label;
                                  const showCorrect = selectedAnswer !== null && isCorrect;
                                  const showIncorrect = isSelected && !isCorrect;

                                  return (
                                    <button
                                      key={opt.label}
                                      onClick={() => handleSelectQuizAnswer(opt.label)}
                                      disabled={selectedAnswer !== null}
                                      className={`p-3.5 text-left text-xs font-bold rounded-2xl border transition-all ${
                                        showCorrect
                                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                          : showIncorrect
                                          ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400'
                                          : isSelected
                                          ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                                      }`}
                                    >
                                      <span className="font-black mr-2">{opt.label}.</span>
                                      {opt.text}
                                    </button>
                                  );
                                })}
                              </div>

                              {selectedAnswer !== null && (
                                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-850/50 rounded-2xl">
                                  <span className="text-xs text-slate-500">
                                    {selectedAnswer.toUpperCase() === q.correct_option?.toUpperCase()
                                      ? 'Correct answer!'
                                      : `Incorrect. The correct answer was ${q.correct_option.toUpperCase()}.`}
                                  </span>
                                  <button
                                    onClick={handleNextQuizQuestion}
                                    className="px-5 py-2 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold"
                                  >
                                    {currentQuestionIndex + 1 < quizQuestions.length ? 'Next' : 'Finish'}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Simplified reading panel */
                  <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-6">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        {t('simplified_article', 'Simplified article (')}{level} {t('level', 'Level)')}
                      </span>
                      <h2 className="text-xl font-black text-slate-850 dark:text-slate-100 leading-tight mt-1">
                        {selectedArticle.title}
                      </h2>
                    </div>

                    {simplifying ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <RefreshCw className="animate-spin text-brand-blue" size={24} />
                        <span className="text-xs text-slate-500">{t('ai_rewriting_content_to', 'AI rewriting content to')} {level} {t('level', 'level...')}</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-sm text-slate-750 dark:text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
                          {renderInteractiveText(simplifiedContent)}
                        </div>
                        <div className="text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-850/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                          💡 <span className="font-bold">{t('tip', 'Tip:')}</span> {t('tap_any_word_or_chinese_character_to_see', 'Tap any word or Chinese character to see its instant translation and example.')}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-slate-150 rounded-3xl text-slate-400">
                {t('select_an_article_headline_from_the_side', 'Select an article headline from the sidebar to start reading.')}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── READING LIBRARY TAB ──────────────────────────────────────── */
        <div className="space-y-6">
          {loadingLibrary ? (
            <div className="text-center py-12 text-slate-450 text-xs">
              {t('fetching_your_reading_lists', 'Fetching your reading lists...')}
            </div>
          ) : savedArticles.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl mx-auto">
              <BookOpen className="mx-auto w-12 h-12 text-slate-300 mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">{t('library_is_empty', 'Library is Empty')}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {t('save_simplified_news_articles_while_read', 'Save simplified news articles while reading to build your custom language portfolio here.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mb-2">
                      <span>{t('saved_on', 'Saved on')} {art.saved_at}</span>
                      <span className="uppercase">{art.language}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-150 leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {art.content}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedArticle({
                        id: `saved-${art.id}`,
                        title: art.title,
                        source: 'Saved Article',
                        category: 'Library',
                        content: art.content
                      });
                      setLevel('Intermediate');
                      setSimplifiedContent(art.content);
                      setActiveTab('feed');
                    }}
                    className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-850 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    {t('read_in_reader', 'Read in Reader')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
