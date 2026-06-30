// ── HanyuStar API Service ──────────────────────────────────────────────────
// All fetch calls go through this singleton so the base URL is set in one place.

const BASE_URL = (import.meta as any).env.VITE_API_URL || '';

// Retrieve stored JWT token
export const getToken = (): string | null => localStorage.getItem('hx_token');

// Remove stored JWT token (logout)
export const removeToken = (): void => localStorage.removeItem('hx_token');

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = true
): Promise<T> {
  const headers: Record<string, string> = {};
  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? (isFormData ? (body as any) : JSON.stringify(body)) : undefined,
  });

  let data: any;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.detail || res.statusText || 'Request failed');
  }

  // 200 on "word unsaved" is a special case from the backend
  if (res.status === 200 && method === 'POST' && path.includes('saved-words')) {
    if (data?.detail === 'Word unsaved successfully') return data as T;
  }

  return data as T;
}

export const api = {
  // ── Auth ────────────────────────────────────────────────────────────────
  register: (username: string, password: string, email?: string, role?: string) =>
    request('POST', '/api/auth/register', { username, password, email, role }, false),

  login: async (username: string, password: string) => {
    const data: any = await request('POST', '/api/auth/login', { username, password }, false);
    localStorage.setItem('hx_token', data.access_token);
    return data;
  },

  logout: () => removeToken(),

  getMe: () => request('GET', '/api/auth/me'),

  updateProfile: (updates: {
    username?: string;
    email?: string;
    avatar?: string;
    native_lang?: string;
    learning_goal?: string;
    energy_mood?: string;
    role?: string;
    teacher_bio?: string;
    teacher_credentials?: string;
    teacher_contact?: string;
    teacher_certificate?: string | null;
  }) => request('PUT', '/api/auth/update', updates),

  // ── Admin System ────────────────────────────────────────────────────────
  getAdminUsers: () => request<any[]>('GET', '/api/admin/users'),
  updateUserRole: (userId: number, role: string) =>
    request('PUT', `/api/admin/users/${userId}/role`, { role }),
  updateUserTeacherStatus: (userId: number, status: string) =>
    request('PUT', `/api/admin/users/${userId}/teacher-status`, { status }),
  deleteUser: (userId: number) => request('DELETE', `/api/admin/users/${userId}`),
  getAdminStats: () => request<any>('GET', '/api/admin/stats'),
  getDatabaseTables: () => request<any[]>('GET', '/api/admin/db/tables'),
  getRecentWritings: () => request<any[]>('GET', '/api/admin/writings'),

  // ── Learning ────────────────────────────────────────────────────────────
  completeLesson: (lesson_id: number, xp_gained = 10) =>
    request('POST', '/api/learning/lesson/complete', { lesson_id, xp_gained }),

  getSavedWords: () => {
    if (!getToken()) {
      try {
        const local = localStorage.getItem('hx_saved_words');
        return Promise.resolve(local ? JSON.parse(local) : []);
      } catch (e) {
        return Promise.resolve([]);
      }
    }
    return request<any[]>('GET', '/api/learning/saved-words');
  },

  toggleSaveWord: async (hanzi: string, pinyin: string, meaning: string) => {
    if (!getToken()) {
      try {
        const local = localStorage.getItem('hx_saved_words');
        let words = local ? JSON.parse(local) : [];
        const existingIdx = words.findIndex((w: any) => w.hanzi === hanzi);
        if (existingIdx > -1) {
          words.splice(existingIdx, 1);
          localStorage.setItem('hx_saved_words', JSON.stringify(words));
          return { detail: 'Word unsaved successfully' };
        } else {
          const newWord = { id: 'local-' + Date.now(), hanzi, pinyin, meaning, saved_at: new Date().toISOString() };
          words.push(newWord);
          localStorage.setItem('hx_saved_words', JSON.stringify(words));
          return newWord;
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return request<any>('POST', '/api/learning/saved-words', { hanzi, pinyin, meaning });
  },

  // ── SRS ─────────────────────────────────────────────────────────────────
  getDueSRS: () => request('GET', '/api/learning/srs/due'),

  reviewSRS: (hanzi: string, pinyin: string, meaning: string, quality: 1 | 2 | 3) =>
    request('POST', '/api/learning/srs/review', { hanzi, pinyin, meaning, quality }),

  // ── AI Chat ─────────────────────────────────────────────────────────────
  sendMessage: (prompt: string, language?: string) => {
    const system_prompt = localStorage.getItem('hx_emma_system_prompt') || undefined;
    const model = localStorage.getItem('hx_emma_model') || undefined;
    const localTemp = localStorage.getItem('hx_emma_temperature');
    const temperature = localTemp ? parseFloat(localTemp) : undefined;
    return request('POST', `/api/ai/chat?lang=${language || 'zh'}`, {
      prompt,
      system_prompt,
      model,
      temperature,
    });
  },

  // ── Writing Coach ────────────────────────────────────────────────────────
  submitWriting: (original_text: string, language?: string) =>
    request('POST', '/api/ai/writing-coach', { original_text, language }),

  getWritingPortfolio: () => request('GET', '/api/ai/writing-portfolio'),

  evaluateSpeech: (transcript: string, expected: string, pinyin: string) =>
    request('POST', '/api/ai/speech-analysis', { transcript, expected, pinyin }),

  // ── Analytics ───────────────────────────────────────────────────────────
  getAnalytics: () => request('GET', '/api/analytics'),

  // ── Watch & Speak ────────────────────────────────────────────────────────
  evaluateWatchSpeak: (expected_text: string, transcript: string, language: string, native_lang: string = 'en') =>
    request('POST', '/api/ai/watch-speak/score', { expected_text, transcript, language, native_lang }),

  // ── Classroom Mode ───────────────────────────────────────────────────────
  createClassroom: (name: string) => request('POST', '/api/classroom/create', { name }),
  joinClassroom: (code: string) => request('POST', '/api/classroom/join', { code }),
  getTeacherDashboard: () => request('GET', '/api/classroom/teacher/dashboard'),
  assignLesson: (classroom_id: number, lesson_id: number, due_date_str?: string) =>
    request('POST', '/api/classroom/assign', { classroom_id, lesson_id, due_date_str }),
  sendPushReminder: (classroom_id: number, message: string) =>
    request('POST', '/api/classroom/send-push', { classroom_id, message }),

  // ── User Courses ──────────────────────────────────────────────────────────
  generateCourseQuestions: (content: string, language: string) =>
    request('POST', '/api/courses/generate-questions', { content, language }),
  createUserCourse: (title: string, description: string, language: string, lessons: any[]) =>
    request('POST', '/api/courses/create', { title, description, language, lessons }),
  listUserCourses: (lang: string) => request('GET', `/api/courses/list?lang=${lang}`),
  completeUserCourse: (course_id: number) => request('POST', '/api/courses/complete-xp', { course_id }),

  // ── News Reader ────────────────────────────────────────────────────────────
  getNewsHeadlines: (lang: string) => request('GET', `/api/news/headlines?lang=${lang}`),
  simplifyNewsArticle: (text: string, level: string, language: string) =>
    request('POST', '/api/news/simplify', { text, level, language }),
  saveNewsArticle: (title: string, content: string, language: string) =>
    request('POST', '/api/news/save', { title, content, language }),
  getSavedNewsArticles: () => request('GET', '/api/news/saved'),
  generateNewsQuiz: (text: string, language: string) =>
    request('POST', '/api/news/quiz', { text, language }),
  translateNewsWord: (word: string, language: string) =>
    request('POST', '/api/news/translate', { word, language }),
  translateText: (text: string, target_lang: string) =>
    request<{ translation: string }>('POST', '/api/ai/translate', { text, target_lang }),

  // ── Smart Notifications ────────────────────────────────────────────────────
  getPeakHours: () => request('GET', '/api/notifications/peak-hours'),
  updateNotificationSettings: (preferred_time: string | null, enabled: boolean | null) =>
    request('PUT', '/api/notifications/settings', { preferred_time, enabled }),
  triggerPushNotification: () => request('POST', '/api/notifications/trigger-push'),

  // ── New Speech & OCR & Classroom Extensions ───────────────────────────────
  textToSpeech: (text: string, lang = 'zh') =>
    request<{ audio_url: string }>('POST', '/api/tts', { text, lang }),
  submitSTT: (audioBlob: Blob) => {
    const fd = new FormData();
    fd.append('file', audioBlob, 'recording.webm');
    return request<{ text: string }>('POST', '/api/ai/stt', fd);
  },
  submitOCR: (imageFile: File, lang = 'zh') => {
    const fd = new FormData();
    fd.append('file', imageFile, imageFile.name);
    return request<any[]>('POST', `/api/learning/ocr?lang=${lang}`, fd);
  },
  getClassroomGrades: (classroomId: number) =>
    request<any[]>('GET', `/api/classroom/${classroomId}/grades`),
  getClassroomActivity: (classroomId: number) =>
    request<any[]>('GET', `/api/classroom/${classroomId}/activity`),
};
