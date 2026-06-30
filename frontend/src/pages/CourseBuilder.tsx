import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Play, Sparkles, BookOpen, Check, AlertCircle, ChevronLeft, Plus, Trash2, ArrowUp, ArrowDown, Award, Users, BookMarked, HelpCircle, Eye, Upload } from 'lucide-react';

interface Question {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string; // "A" | "B" | "C" | "D"
}

interface Lesson {
  title: string;
  content: string;
  questions: Question[];
}

interface CommunityCourse {
  id: number;
  title: string;
  description: string;
  language: string;
  creator_name: string;
  is_featured: boolean;
  created_at: string;
  lessons: {
    id: number;
    title: string;
    content: string;
    questions: {
      id: number;
      question: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_option: string;
    }[];
  }[];
}

interface CourseBuilderProps {
  onBack: () => void;
  lang: string;
  onAwardXP: (xp: number) => void;
}

export default function CourseBuilder({ onBack, lang, onAwardXP }: CourseBuilderProps) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [communityCourses, setCommunityCourses] = useState<CommunityCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generatingQuiz, setGeneratingQuiz] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  
  // Create Course State
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseDesc, setCourseDesc] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([
    { title: 'Lesson 1: Intro', content: '', questions: [] }
  ]);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  // Playing Course State
  const [activePlayCourse, setActivePlayCourse] = useState<CommunityCourse | null>(null);
  const [playLessonIndex, setPlayLessonIndex] = useState<number>(0);
  const [playQuizActive, setPlayQuizActive] = useState<boolean>(false);
  const [currentPlayQuestionIndex, setCurrentPlayQuestionIndex] = useState<number>(0);
  const [selectedPlayAnswer, setSelectedPlayAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    fetchCourses();
  }, [lang]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await api.listUserCourses(lang);
      setCommunityCourses(data as CommunityCourse[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Generate Questions via Groq API
  const handleGenerateQuestions = async (lessonIdx: number) => {
    const lesson = lessons[lessonIdx];
    if (!lesson.content.trim()) {
      setError('Please paste some study note content first.');
      return;
    }
    setError('');
    setGeneratingQuiz(true);
    try {
      const res = await api.generateCourseQuestions(lesson.content, lang);
      const updated = [...lessons];
      updated[lessonIdx].questions = res as Question[];
      setLessons(updated);
      setSuccess(`AI successfully generated ${updated[lessonIdx].questions.length} quiz questions!`);
    } catch (e) {
      console.error(e);
      setError('Failed to auto-generate questions from content.');
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const handleAddLesson = () => {
    const count = lessons.length + 1;
    setLessons([...lessons, { title: `Lesson ${count}: New Topic`, content: '', questions: [] }]);
    setActiveLessonIndex(lessons.length);
  };

  const handleDeleteLesson = (idx: number) => {
    if (lessons.length <= 1) return;
    const updated = lessons.filter((_, i) => i !== idx);
    setLessons(updated);
    setActiveLessonIndex(Math.max(0, idx - 1));
  };

  const handleMoveLesson = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === lessons.length - 1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const updated = [...lessons];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setLessons(updated);
    setActiveLessonIndex(targetIdx);
  };

  const handlePublishCourse = async () => {
    if (!courseTitle.trim()) {
      setError('Please enter a course title.');
      return;
    }
    const emptyLesson = lessons.find(l => !l.content.trim() || l.questions.length === 0);
    if (emptyLesson) {
      setError('Ensure every lesson contains study notes and at least 1 generated quiz question.');
      return;
    }
    setError('');
    setSuccess('');
    setPublishing(true);
    try {
      await api.createUserCourse(courseTitle, courseDesc, lang, lessons);
      setSuccess('Mini-course submitted & published to the community!');
      onAwardXP(50); // Earm XP
      // Reset Builder
      setCourseTitle('');
      setCourseDesc('');
      setLessons([{ title: 'Lesson 1: Intro', content: '', questions: [] }]);
      setActiveLessonIndex(0);
      setActiveTab('browse');
      await fetchCourses();
    } catch (e) {
      console.error(e);
      setError('Failed to publish course.');
    } finally {
      setPublishing(false);
    }
  };

  // Play Course quiz handlers
  const handleStartPlayQuiz = () => {
    setPlayQuizActive(true);
    setCurrentPlayQuestionIndex(0);
    setSelectedPlayAnswer(null);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const handleAnswerPlayQuestion = (letter: string) => {
    if (selectedPlayAnswer !== null) return;
    setSelectedPlayAnswer(letter);
    const questions = activePlayCourse?.lessons[playLessonIndex]?.questions || [];
    const correct = questions[currentPlayQuestionIndex]?.correct_option?.toUpperCase();
    if (letter.toUpperCase() === correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextPlayQuestion = () => {
    const questions = activePlayCourse?.lessons[playLessonIndex]?.questions || [];
    if (currentPlayQuestionIndex + 1 < questions.length) {
      setCurrentPlayQuestionIndex(prev => prev + 1);
      setSelectedPlayAnswer(null);
    } else {
      setQuizFinished(true);
      handleFinishCourseQuiz();
    }
  };

  const handleFinishCourseQuiz = async () => {
    if (!activePlayCourse) return;
    try {
      await api.completeUserCourse(activePlayCourse.id);
      onAwardXP(30);
    } catch (e) {
      console.error(e);
    }
  };

  const activeBuilderLesson = lessons[activeLessonIndex];

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b border-slate-100 dark:border-slate-800 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={activePlayCourse ? () => setActivePlayCourse(null) : onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <BookMarked className="text-brand-blue" size={22} />
              {t('user_created_courses', 'User-Created Courses')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('build_your_own_interactive_mini_courses', 'Build your own interactive mini-courses with AI quiz generations, or play community-picked courses.')}
            </p>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-2 text-xs font-semibold">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center gap-2 text-xs font-semibold">
          <Check size={16} />
          {success}
        </div>
      )}

      {activePlayCourse ? (
        /* ── PLAY ACTIVE COURSE MODULE ────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Syllabus list */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              {t('course_outline', 'Course Outline')}
            </h3>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-2">
              <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">
                {activePlayCourse.title}
              </h4>
              <p className="text-xs text-slate-450 italic">
                {t('by', 'By')} {activePlayCourse.creator_name}
              </p>
            </div>

            <div className="space-y-2">
              {activePlayCourse.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setPlayLessonIndex(idx);
                    setPlayQuizActive(false);
                    setQuizFinished(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    playLessonIndex === idx && !playQuizActive
                      ? 'border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs text-slate-850 dark:text-slate-200">
                    {lesson.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {lesson.questions?.length || 0} {t('questions', 'questions')}
                  </div>
                </button>
              ))}

              <button
                onClick={handleStartPlayQuiz}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  playQuizActive
                    ? 'border-violet-500 bg-violet-500/5 dark:bg-violet-500/10 font-bold text-violet-600 dark:text-violet-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs flex items-center gap-1">
                  <Sparkles size={12} /> {t('play_unit_quiz', 'Play Unit Quiz')}
                </div>
              </button>
            </div>
          </div>

          {/* Playing Display Panel */}
          <div className="lg:col-span-9">
            {!playQuizActive ? (
              /* Display Lesson Reading notes */
              <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-6">
                <div>
                  <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue mb-2">
                    {t('lesson_study_notes', 'Lesson Study Notes')}
                  </span>
                  <h2 className="text-xl font-black text-slate-850 dark:text-slate-100">
                    {activePlayCourse.lessons[playLessonIndex]?.title}
                  </h2>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-slate-850/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-355 leading-relaxed whitespace-pre-wrap select-all">
                  {activePlayCourse.lessons[playLessonIndex]?.content}
                </div>

                <button
                  onClick={handleStartPlayQuiz}
                  className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/25"
                >
                  {t('start_lesson_quiz', 'Start Lesson Quiz')}
                </button>
              </div>
            ) : (
              /* Quiz interactive panel */
              <div className="p-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-6">
                {quizFinished ? (
                  /* Quiz finished scorecard */
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-violet-100 dark:bg-violet-950/45 rounded-full flex items-center justify-center text-violet-500 mx-auto">
                      <Award size={32} />
                    </div>
                    <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                      {t('quiz_completed', 'Quiz Completed!')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t('you_scored', 'You scored')} {correctCount} {t('out_of', 'out of')} {activePlayCourse.lessons[playLessonIndex]?.questions?.length} {t('correct', 'correct!')}
                    </p>
                    <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 inline-block px-3 py-1.5 rounded-full mt-2">
                      {t('30_xp_gained', '+30 XP Gained!')}
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setActivePlayCourse(null)}
                        className="px-6 py-2.5 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold"
                      >
                        {t('back_to_courses', 'Back to Courses')}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active quiz question resolver */
                  <div className="space-y-6">
                    {(() => {
                      const questions = activePlayCourse.lessons[playLessonIndex]?.questions || [];
                      const q = questions[currentPlayQuestionIndex];
                      if (!q) return <p className="text-xs">{t('no_quiz_questions_generated_for_this_les', 'No quiz questions generated for this lesson.')}</p>;

                      return (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                            <span>{t('question', 'Question')} {currentPlayQuestionIndex + 1} {t('of', 'of')} {questions.length}</span>
                            <span>{t('correct', 'Correct:')} {correctCount}</span>
                          </div>

                          <h3 className="text-base font-black text-slate-850 dark:text-slate-100">
                            {q.question}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { label: 'A', text: q.option_a },
                              { label: 'B', text: q.option_b },
                              { label: 'C', text: q.option_c },
                              { label: 'D', text: q.option_d },
                            ].map((opt) => {
                              const isSelected = selectedPlayAnswer === opt.label;
                              const isCorrect = q.correct_option?.toUpperCase() === opt.label;
                              const showCorrect = selectedPlayAnswer !== null && isCorrect;
                              const showIncorrect = isSelected && !isCorrect;

                              return (
                                <button
                                  key={opt.label}
                                  onClick={() => handleAnswerPlayQuestion(opt.label)}
                                  disabled={selectedPlayAnswer !== null}
                                  className={`p-4 text-left text-xs font-semibold rounded-2xl border transition-all ${
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

                          {selectedPlayAnswer !== null && (
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-850/50 rounded-2xl">
                              <span className="text-xs text-slate-500">
                                {selectedPlayAnswer.toUpperCase() === q.correct_option?.toUpperCase()
                                  ? 'Correct answer! Great job.'
                                  : `Wrong answer. The correct choice is ${q.correct_option.toUpperCase()}.`}
                              </span>
                              <button
                                onClick={handleNextPlayQuestion}
                                className="px-5 py-2 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold"
                              >
                                {currentPlayQuestionIndex + 1 < questions.length ? 'Next' : 'Finish'}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── COURSE DIRECTORY & BUILDER ───────────────────────────────── */
        <div>
          {/* Tab selectors */}
          <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 mb-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`pb-4 text-sm font-black transition-all relative ${
                activeTab === 'browse'
                  ? 'text-slate-800 dark:text-slate-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t('browse_courses', 'Browse Courses')}
              {activeTab === 'browse' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-4 text-sm font-black transition-all relative ${
                activeTab === 'create'
                  ? 'text-slate-800 dark:text-slate-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t('create_course_builder', 'Create Course Builder')}
              {activeTab === 'create' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
              )}
            </button>
          </div>

          {activeTab === 'browse' ? (
            /* ── BROWSE COURSES DIRECTORY ─────────────────────────────── */
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12 text-slate-450 text-xs">
                  {t('fetching_community_course_catalogs', 'Fetching community course catalogs...')}
                </div>
              ) : communityCourses.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-850 rounded-3xl">
                  <BookOpen className="mx-auto w-12 h-12 text-slate-300 mb-2" />
                  <p className="text-xs text-slate-500">{t('no_community_created_courses_published_y', 'No community-created courses published yet for')} {lang.toUpperCase()}{t('build_the_first_one', '. Build the first one!')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`p-6 bg-white dark:bg-slate-900 border rounded-3xl flex flex-col justify-between hover:shadow-lg transition-all ${
                        course.is_featured
                          ? 'border-violet-500/40 shadow-sm shadow-violet-500/10'
                          : 'border-slate-150 dark:border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-black uppercase bg-brand-blue/10 text-brand-blue px-2.5 py-0.5 rounded-full">
                            {course.language.toUpperCase()}
                          </span>
                          {course.is_featured && (
                            <span className="text-[9px] font-black uppercase bg-violet-600 text-white px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                              <Award size={10} /> {t('community_pick', 'Community Pick')}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-black text-slate-850 dark:text-slate-100 truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {course.description || 'No description provided.'}
                        </p>

                        <div className="flex justify-between items-center mt-4 text-[10px] text-slate-400 font-semibold">
                          <span>{t('by', 'By')} {course.creator_name}</span>
                          <span>{course.lessons?.length || 0} {t('lessons', 'lessons')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActivePlayCourse(course);
                          setPlayLessonIndex(0);
                          setPlayQuizActive(false);
                        }}
                        className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Play size={12} />
                        {t('study_course', 'Study Course')}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ── DRAG-AND-DROP COURSE BUILDER ───────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Course meta & Syllabus manager */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    {t('course_settings', 'Course Settings')}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                        {t('course_title', 'Course Title')}
                      </label>
                      <input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder={t('e_g_essential_idioms', 'e.g. Essential Idioms')}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                        {t('short_description', 'Short Description')}
                      </label>
                      <textarea
                        rows={2}
                        value={courseDesc}
                        onChange={(e) => setCourseDesc(e.target.value)}
                        placeholder={t('e_g_master_the_top_50_idioms_with_ai_gen', 'e.g. Master the top 50 idioms with AI generated quizzes.')}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                      />
                    </div>
                  </div>
                </div>

                {/* Lesson drag & drop outline manager */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                      {t('syllabus_lessons', 'Syllabus Lessons (')}{lessons.length})
                    </h3>
                    <button
                      onClick={handleAddLesson}
                      className="p-1.5 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                      title={t('add_lesson_card', 'Add Lesson Card')}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`p-3 rounded-2xl border transition-all flex justify-between items-center cursor-pointer ${
                          activeLessonIndex === idx
                            ? 'border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => {
                              const updated = [...lessons];
                              updated[idx].title = e.target.value;
                              setLessons(updated);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-transparent border-none focus:outline-none w-full truncate"
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {lesson.questions.length} {t('questions', 'questions')}
                          </span>
                        </div>

                        {/* Re-order arrows & deletion (drag and drop mimicry) */}
                        <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveLesson(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveLesson(idx, 'down')}
                            disabled={idx === lessons.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(idx)}
                            disabled={lessons.length <= 1}
                            className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePublishCourse}
                  disabled={publishing}
                  className="w-full py-3 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  {publishing ? 'Publishing...' : 'Publish Course'}
                </button>
              </div>

              {/* Right Side: Active Lesson details & AI Quiz Generator */}
              <div className="lg:col-span-8 space-y-6">
                {activeBuilderLesson ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue mb-2 inline-block">
                            {t('active_lesson_editor', 'Active Lesson Editor')}
                          </span>
                          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200">
                            {t('lesson_notes_material', 'Lesson Notes & Material')}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            {t('paste_study_notes_or_upload_files_the_ai', 'Paste study notes or upload files. The AI will read this content to construct 10 quiz questions.')}
                          </p>
                        </div>
                        
                        <div className="relative">
                          <input
                            type="file"
                            id="course-file-upload"
                            accept=".txt,.md,.json,.csv"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result as string;
                                if (text) {
                                  const updated = [...lessons];
                                  updated[activeLessonIndex].content = text;
                                  setLessons(updated);
                                  setSuccess(`Successfully imported notes from ${file.name}!`);
                                }
                              };
                              reader.readAsText(file);
                            }}
                          />
                          <label
                            htmlFor="course-file-upload"
                            className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                          >
                            <Upload size={14} />
                            {t('upload_file', 'Upload File')}
                          </label>
                        </div>
                      </div>

                      <textarea
                        rows={6}
                        required
                        value={activeBuilderLesson.content}
                        onChange={(e) => {
                          const updated = [...lessons];
                          updated[activeLessonIndex].content = e.target.value;
                          setLessons(updated);
                        }}
                        placeholder={t('paste_study_materials_or_list_vocabulary', 'Paste study materials or list vocabulary definitions...')}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                      />

                      <button
                        onClick={() => handleGenerateQuestions(activeLessonIndex)}
                        disabled={generatingQuiz}
                        className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles size={14} />
                        {generatingQuiz ? 'AI Generating Quiz Questions...' : 'Generate AI Quiz Questions'}
                      </button>
                    </div>

                    {/* Generated Questions display list */}
                    {activeBuilderLesson.questions.length > 0 && (
                      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          {t('generated_ai_questions', 'Generated AI Questions (')}{activeBuilderLesson.questions.length})
                        </h3>

                        <div className="space-y-4">
                          {activeBuilderLesson.questions.map((q, qIdx) => (
                            <div
                              key={qIdx}
                              className="p-4 bg-slate-50 dark:bg-slate-850/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs"
                            >
                              <div className="font-bold text-slate-800 dark:text-slate-200">
                                {t('question', 'Question')} {qIdx + 1}: {q.question}
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                                <div>{t('a', 'A.')} {q.option_a}</div>
                                <div>{t('b', 'B.')} {q.option_b}</div>
                                <div>{t('c', 'C.')} {q.option_c}</div>
                                <div>{t('d', 'D.')} {q.option_d}</div>
                              </div>
                              <div className="text-[10px] text-emerald-500 font-black pt-1">
                                {t('correct_answer', 'Correct Answer:')} {q.correct_option?.toUpperCase()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl text-slate-400 text-xs">
                    {t('please_select_or_add_a_lesson_card_from', 'Please select or add a lesson card from the sidebar list.')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
