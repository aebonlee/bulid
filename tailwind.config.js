/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
      },
      colors: {
        // 건설기계 산업 — 안전·중장비 톤 (딥 네이비 + 시그니처 옐로우)
        brand: {
          50: '#eef4fb',
          100: '#d6e3f3',
          200: '#aec7e7',
          300: '#7ea4d6',
          400: '#4e7fc1',
          500: '#2f63a8',
          600: '#234d86',
          700: '#1c3e6c',
          800: '#16314f',  // 메인 네이비
          900: '#0f2238',
          950: '#0a1726',
        },
        signal: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',  // 시그니처 옐로우(안전·중장비)
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      typography: {},
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
