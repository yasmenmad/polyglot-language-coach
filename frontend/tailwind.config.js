/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-green':      '#58cc02',
        'brand-green-dark': '#46a302',
        'brand-green-bg':   '#f0fce8',
        'brand-blue':       '#1cb0f6',
        'brand-blue-dark':  '#0a91d1',
        'brand-blue-bg':    '#e8f7fe',
        'brand-yellow':     '#ffc800',
        'brand-yellow-dark':'#e6b400',
        'brand-yellow-bg':  '#fff9e6',
        'brand-orange':     '#ff9600',
        'brand-orange-dark':'#e68600',
        'brand-orange-bg':  '#fff4e6',
        'brand-red':        '#ff4b4b',
        'brand-red-dark':   '#e64040',
        'brand-red-bg':     '#fff0f0',
        'brand-purple':     '#ce82ff',
        'brand-purple-dark':'#a855f7',
        'brand-purple-bg':  '#f8f0ff',
        'brand-teal':       '#2db7c4',
        'brand-teal-bg':    '#e6f9fb',
      },
      fontFamily: {
        'chinese': ['"Noto Sans SC"', '"Source Han Sans"', 'sans-serif'],
        'cn':      ['"Noto Sans SC"', '"Source Han Sans"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}
