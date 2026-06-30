// ── Course / Language Management ─────────────────────────────────────────────
// Manages the active learning language across the app.
// Supported language codes match the selector options in App.tsx.

const STORAGE_KEY = 'hx_active_language';

export type LanguageCode = 'zh' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'it' | 'en' | 'ar';

export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'zh', label: 'Chinese',  flag: '🇨🇳' },
  { code: 'es', label: 'Spanish',  flag: '🇪🇸' },
  { code: 'fr', label: 'French',   flag: '🇫🇷' },
  { code: 'de', label: 'German',   flag: '🇩🇪' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean',   flag: '🇰🇷' },
  { code: 'it', label: 'Italian',  flag: '🇮🇹' },
  { code: 'en', label: 'English',  flag: '🇺🇸' },
  { code: 'ar', label: 'Arabic',   flag: '🇸🇦' },
];

/** BCP-47 locale tag for each language code (used by SpeechSynthesis & SpeechRecognition). */
export const LANG_LOCALE: Record<LanguageCode, string> = {
  zh: 'zh-CN',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
  ko: 'ko-KR',
  it: 'it-IT',
  en: 'en-US',
  ar: 'ar-SA',
};

/** Human-readable romanisation system label per language. */
export const ROMANISATION_LABEL: Record<LanguageCode, string> = {
  zh: 'Pīnyīn',
  ja: 'Rōmaji',
  ko: 'Romanisation',
  es: 'Pronunciation',
  fr: 'Pronunciation',
  de: 'Pronunciation',
  it: 'Pronunciation',
  en: 'Pronunciation',
  ar: 'Transliteration',
};

/** Returns the currently active learning language (defaults to 'zh'). */
export function getActiveLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
      return stored as LanguageCode;
    }
  } catch {
    // localStorage unavailable
  }
  return 'zh';
}

/** Persists the chosen learning language. */
export function setActiveLanguage(lang: LanguageCode): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable
  }
}

/** Returns the { code, label, flag } info object for a language code. */
export function getLanguageInfo(lang: LanguageCode): { code: LanguageCode; label: string; flag: string } {
  return SUPPORTED_LANGUAGES.find(l => l.code === lang) ?? SUPPORTED_LANGUAGES[0];
}
