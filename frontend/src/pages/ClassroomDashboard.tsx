import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  GraduationCap, Plus, Users, Send, Check, AlertCircle, 
  ChevronLeft, Calendar, FileText, Bell, BarChart2, UserCheck, 
  X, CheckSquare, RefreshCw, Star 
} from 'lucide-react';

interface Student {
  id: number;
  username: string;
  xp: number;
  level: number;
  streak: number;
  lessons_completed: number;
  accuracy: number;
  time_spent: number;
}

interface Assignment {
  id: number;
  lesson_id: number;
  due_date: string | null;
  assigned_at: string;
}

interface Classroom {
  id: number;
  name: string;
  code: string;
  students: Student[];
  assignments: Assignment[];
}

interface ClassroomDashboardProps {
  onBack: () => void;
  lang: string;
  user: any;
  onUpdateUser: (updated: any) => void;
}

export default function ClassroomDashboard({ onBack, lang, user, onUpdateUser }: ClassroomDashboardProps) {
  const { t } = useTranslation();

  const [isTeacher, setIsTeacher] = useState<boolean>(user?.role === 'teacher');
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Form states
  const [newClassName, setNewClassName] = useState<string>('');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  
  // Assign Lesson Form
  const [assignLessonId, setAssignLessonId] = useState<string>('1');
  const [assignDueDate, setAssignDueDate] = useState<string>('');
  
  // Push Notification Form
  const [pushMessage, setPushMessage] = useState<string>('');

  // Student join code state
  const [joinCode, setJoinCode] = useState<string>('');

  // Sub-tabs for classroom analytics
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'gradebook' | 'activity'>('overview');
  const [grades, setGrades] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingSubData, setLoadingSubData] = useState(false);

  useEffect(() => {
    if (isTeacher) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [isTeacher]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const data = await api.getTeacherDashboard();
      setClassrooms(data as Classroom[]);
      if ((data as Classroom[]).length > 0 && selectedClassId === null) {
        setSelectedClassId((data as Classroom[])[0].id);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch gradebook and activity feed dynamically when selected classroom or sub-tab changes
  useEffect(() => {
    if (selectedClassId && isTeacher) {
      setLoadingSubData(true);
      if (activeSubTab === 'gradebook') {
        api.getClassroomGrades(selectedClassId)
          .then(data => setGrades(data))
          .catch(() => {
            // Offline fallback
            setGrades([
              {
                student_id: 1,
                username: 'Student_Alex',
                xp: 150,
                level: 2,
                streak: 3,
                assignments: [
                  { assignment_id: 1, lesson_id: 1, completed: true, due_date: '2026-06-15' },
                  { assignment_id: 2, lesson_id: 2, completed: false, due_date: '2026-06-20' }
                ]
              }
            ]);
          })
          .finally(() => setLoadingSubData(false));
      } else if (activeSubTab === 'activity') {
        api.getClassroomActivity(selectedClassId)
          .then(data => setActivities(data))
          .catch(() => {
            // Offline fallback
            setActivities([
              { username: 'Student_Alex', type: 'lesson_complete', lesson_id: 1, timestamp: '2026-06-13 14:30' }
            ]);
          })
          .finally(() => setLoadingSubData(false));
      } else {
        setLoadingSubData(false);
      }
    }
  }, [selectedClassId, activeSubTab]);

  const handleBecomeTeacher = async () => {
    try {
      const mockClass = await api.createClassroom('My First Class');
      onUpdateUser({ ...user, role: 'teacher' });
      setIsTeacher(true);
      setSuccess('Elevated account to Teacher role!');
    } catch (e) {
      console.error(e);
      setError('Could not elevate role.');
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    setError('');
    setSuccess('');
    try {
      const newClass = await api.createClassroom(newClassName);
      setNewClassName('');
      setSuccess(`Classroom "${newClassName}" created successfully!`);
      await fetchDashboard();
      setSelectedClassId((newClass as any).id);
    } catch (e) {
      console.error(e);
      setError('Failed to create classroom.');
    }
  };

  const handleAssignLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId) return;
    setError('');
    setSuccess('');
    try {
      await api.assignLesson(selectedClassId, parseInt(assignLessonId), assignDueDate || undefined);
      setSuccess(`Lesson ${assignLessonId} successfully assigned!`);
      setAssignDueDate('');
      await fetchDashboard();
      // Force refresh current sub-tab if in gradebook
      if (activeSubTab === 'gradebook') {
        const data = await api.getClassroomGrades(selectedClassId);
        setGrades(data);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to assign lesson.');
    }
  };

  const handleSendPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !pushMessage.trim()) return;
    setError('');
    setSuccess('');
    try {
      const res = await api.sendPushReminder(selectedClassId, pushMessage);
      setSuccess((res as any).detail || 'Notifications sent successfully.');
      setPushMessage('');
    } catch (e) {
      console.error(e);
      setError('Failed to send notifications.');
    }
  };

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    setError('');
    setSuccess('');
    try {
      const res = await api.joinClassroom(joinCode);
      setSuccess((res as any).detail + ` for classroom code: ${joinCode.toUpperCase()}`);
      setJoinCode('');
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Invalid invite code.');
    }
  };

  const activeClass = classrooms.find(c => c.id === selectedClassId) || classrooms[0];

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 max-w-6xl mx-auto text-left">
      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b border-slate-100 dark:border-slate-805 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-350" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <GraduationCap className="text-brand-blue" size={22} />
              {t('classroom_mode', 'Classroom Mode')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('manage_student_study_groups_track_statis', 'Manage student study groups, track statistics, and issue dynamic learning assignments.')}
            </p>
          </div>
        </div>
      </header>

      {/* Notifications banner */}
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

      {!isTeacher ? (
        /* ── STUDENT VIEW & BECOME TEACHER PROMPT ──────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-slate-850 dark:text-slate-100 flex items-center gap-2">
              <Users size={16} className="text-brand-blue" />
              {t('join_a_classroom', 'Join a Classroom')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('enter_the_invite_code_generated_by_your', 'Enter the invite code generated by your teacher to join their group.')}
            </p>
            <form onSubmit={handleJoinClass} className="space-y-3 pt-2">
              <input
                type="text"
                required
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder={t('e_g_ab12cd', 'e.g. AB12CD')}
                maxLength={8}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 uppercase tracking-widest font-bold text-center"
              />
              <button
                type="submit"
                className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/20"
              >
                {t('join_class', 'Join Class')}
              </button>
            </form>
          </div>

          <div className="p-6 bg-slate-50/55 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-850 dark:text-slate-100 flex items-center gap-2">
                <GraduationCap size={16} className="text-violet-500" />
                {t('are_you_an_educator', 'Are you an Educator?')}
              </h3>
              <p className="text-xs text-slate-505 mt-2">
                {t('educator_role_accounts_unlock_student_st', 'Educator role accounts unlock student statistics tracking dashboard, invite code generations, and push notification triggers.')}
              </p>
            </div>
            <button
              onClick={handleBecomeTeacher}
              className="mt-6 w-full py-3 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-bold transition-all"
            >
              {t('elevate_account_to_teacher', 'Elevate Account to Teacher')}
            </button>
          </div>
        </div>
      ) : (
        /* ── TEACHER COCKPIT DASHBOARD ────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-400">
          {/* Left Side: Classroom lists & Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1">
                <Plus size={14} /> {t('add_classroom', 'Add Classroom')}
              </h3>
              <form onSubmit={handleCreateClass} className="space-y-2.5">
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder={t('e_g_ap_chinese_101', 'e.g. AP Chinese 101')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  {t('create_class', 'Create Class')}
                </button>
              </form>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                {t('my_classrooms', 'My Classrooms (')}{classrooms.length})
              </h3>
              {classrooms.length === 0 ? (
                <p className="text-xs text-slate-400 italic">{t('no_classrooms_yet', 'No classrooms yet.')}</p>
              ) : (
                classrooms.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedClassId(c.id); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      selectedClassId === c.id
                        ? 'border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-black text-slate-850 dark:text-slate-200">
                      {c.name}
                    </div>
                    <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-400">
                      <span>{t('code', 'Code:')} {c.code}</span>
                      <span>{c.students?.length || 0} {t('students', 'students')}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Side: Active Classroom Details Dashboard */}
          <div className="lg:col-span-9 space-y-6">
            {activeClass ? (
              <div className="space-y-6">
                {/* Class Stats overview cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue">
                      <Users size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-450">{t('active_students', 'Active Students')}</div>
                      <div className="text-base font-black text-slate-805 dark:text-slate-100">
                        {activeClass.students?.length || 0}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-450">{t('assigned_tasks', 'Assigned Tasks')}</div>
                      <div className="text-base font-black text-slate-805 dark:text-slate-100">
                        {activeClass.assignments?.length || 0}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                      <Star size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-450">{t('invite_code', 'Invite Code')}</div>
                      <div className="text-base font-black text-slate-805 dark:text-slate-100 tracking-wider">
                        {activeClass.code}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-tabs Panel selection */}
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
                  <div className="flex border-b border-slate-100 dark:border-slate-850 px-6 pt-4 gap-6 bg-slate-50/50 dark:bg-slate-950/20">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'gradebook', label: 'Gradebook Explorer' },
                      { id: 'activity', label: 'Live Activity Feed' }
                    ].map(subTab => (
                      <button
                        key={subTab.id}
                        onClick={() => setActiveSubTab(subTab.id as any)}
                        className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                          activeSubTab === subTab.id
                            ? 'border-brand-blue text-brand-blue'
                            : 'border-transparent text-slate-400 hover:text-slate-650'
                        }`}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {loadingSubData ? (
                      <div className="py-12 text-center text-xs font-bold text-slate-400 flex flex-col items-center gap-2">
                        <RefreshCw size={18} className="animate-spin text-brand-blue" />
                        {t('fetching_classroom_records', 'Fetching classroom records...')}
                      </div>
                    ) : (
                      <>
                        {/* Tab: Overview (Original Student table) */}
                        {activeSubTab === 'overview' && (
                          <div className="space-y-4">
                            {(!activeClass.students || activeClass.students.length === 0) ? (
                              <div className="text-center py-10 border-2 border-dashed border-slate-150 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                                {t('invite_students_to_join_share_invite_cod', 'Invite students to join. Share invite code:')} <span className="font-bold">{activeClass.code}</span>
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                  <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 pb-3">
                                      <th className="pb-3">{t('student', 'Student')}</th>
                                      <th className="pb-3 text-center">{t('level', 'Level')}</th>
                                      <th className="pb-3 text-center">{t('xp_gained', 'XP Gained')}</th>
                                      <th className="pb-3 text-center">{t('streak', 'Streak')}</th>
                                      <th className="pb-3 text-center">{t('lessons', 'Lessons')}</th>
                                      <th className="pb-3 text-center">{t('avg_accuracy', 'Avg Accuracy')}</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-50 dark:divide-slate-850 font-bold">
                                    {activeClass.students.map((student) => (
                                      <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                                        <td className="py-3.5 text-slate-850 dark:text-slate-200">
                                          {student.username}
                                        </td>
                                        <td className="py-3.5 text-center text-slate-500">
                                          {student.level}
                                        </td>
                                        <td className="py-3.5 text-center text-slate-650 dark:text-slate-350">
                                          {student.xp} {t('xp', 'XP')}
                                        </td>
                                        <td className="py-3.5 text-center text-orange-500">
                                          {student.streak} 🔥
                                        </td>
                                        <td className="py-3.5 text-center text-slate-500">
                                          {student.lessons_completed}
                                        </td>
                                        <td className="py-3.5 text-center text-emerald-500">
                                          {student.accuracy}%
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tab: Gradebook Explorer */}
                        {activeSubTab === 'gradebook' && (
                          <div className="space-y-4">
                            {grades.length === 0 ? (
                              <div className="text-center py-10 border-2 border-dashed border-slate-150 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                                {t('no_student_assignment_grades_recorded_ad', 'No student assignment grades recorded. Add some tasks below!')}
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left font-bold">
                                  <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 pb-3">
                                      <th className="pb-3">{t('student', 'Student')}</th>
                                      {activeClass.assignments?.map((a, index) => (
                                        <th key={a.id} className="pb-3 text-center">
                                          {t('task', 'Task #')}{index + 1} {t('l', '(L')}{a.lesson_id})
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                                    {grades.map((g) => (
                                      <tr key={g.student_id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                                        <td className="py-3.5 text-slate-805 dark:text-slate-200">
                                          {g.username}
                                        </td>
                                        {g.assignments?.map((asg: any) => (
                                          <td key={asg.assignment_id} className="py-3.5 text-center">
                                            {asg.completed ? (
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px]">
                                                <Check size={10} strokeWidth={4} /> {t('complete', 'Complete')}
                                              </span>
                                            ) : (
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 dark:bg-red-955/20 text-red-500 rounded-lg text-[10px]">
                                                <X size={10} strokeWidth={4} /> {t('incomplete', 'Incomplete')}
                                              </span>
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tab: Live Activity Feed */}
                        {activeSubTab === 'activity' && (
                          <div className="space-y-4">
                            {activities.length === 0 ? (
                              <div className="text-center py-10 border-2 border-dashed border-slate-150 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                                {t('no_activity_recorded_for_this_classroom', 'No activity recorded for this classroom group.')}
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {activities.map((act, index) => (
                                  <div key={index} className="flex justify-between items-center p-3 border border-slate-100 dark:border-slate-850 rounded-2xl text-xs bg-slate-50/55 dark:bg-slate-950/20 font-bold">
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-800 dark:text-white">@{act.username}</span>
                                      <span className="text-slate-400 font-medium">{t('completed_lesson', 'completed Lesson')} {act.lesson_id}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-semibold">{act.timestamp}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Dashboard Cockpit Grid: Assign & Push */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Task Assigner card */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <Calendar size={14} className="text-brand-blue" />
                      {t('assign_new_task', 'Assign New Task')}
                    </h3>

                    <form onSubmit={handleAssignLesson} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                          {t('select_unit_lesson', 'Select Unit Lesson')}
                        </label>
                        <select
                          value={assignLessonId}
                          onChange={(e) => setAssignLessonId(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                        >
                          <option value="1">{t('lesson_1_greetings_basics', 'Lesson 1: Greetings & Basics')}</option>
                          <option value="2">{t('lesson_2_ordering_food_drinks', 'Lesson 2: Ordering Food & Drinks')}</option>
                          <option value="3">{t('lesson_3_ask_directions', 'Lesson 3: Ask Directions')}</option>
                          <option value="4">{t('lesson_4_shopping_prices', 'Lesson 4: Shopping & Prices')}</option>
                          <option value="5">{t('lesson_5_family_life', 'Lesson 5: Family & Life')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                          {t('due_date_optional', 'Due Date (Optional)')}
                        </label>
                        <input
                          type="date"
                          value={assignDueDate}
                          onChange={(e) => setAssignDueDate(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all"
                      >
                        {t('publish_assignment', 'Publish Assignment')}
                      </button>
                    </form>
                  </div>

                  {/* Send Reminder card */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <Bell size={14} className="text-violet-500" />
                      {t('send_push_reminders', 'Send Push Reminders')}
                    </h3>

                    <form onSubmit={handleSendPush} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                          {t('notification_message', 'Notification Message')}
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={pushMessage}
                          onChange={(e) => setPushMessage(e.target.value)}
                          placeholder={t('hey_team_don_t_forget_to_complete_lesson', 'Hey team, don\'t forget to complete lesson 3 before tomorrow night!')}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 resize-none font-bold"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-850 hover:bg-slate-750 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send size={12} />
                        {t('dispatch_push_notifications', 'Dispatch Push Notifications')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
                <GraduationCap className="mx-auto w-12 h-12 text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">{t('please_create_a_classroom_using_the_left', 'Please create a classroom using the left side bar to get started.')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
