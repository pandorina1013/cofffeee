/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Pure monochrome — black & white refined */
        base:     '#FAFAFA',
        elev1:    '#FFFFFF',
        elev2:    '#F4F4F4',
        elev3:    '#EAEAEA',
        line:     'rgba(0,0,0,0.07)',
        line2:    'rgba(0,0,0,0.14)',
        ink:      '#0A0A0A',
        ink2:     '#525252',
        ink3:     '#8E8E8E',
        ink4:     '#BFBFBF',
        /* "amber" name kept for backward-compat — now near-black accent */
        amber:    '#0A0A0A',
        ember:    '#000000',
        crema:    '#F4F4F4',
        moss:     '#525252',
      },
      fontFamily: {
        sans: ['Geist', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        jp:   ['"Noto Sans JP"', 'Geist', 'sans-serif'],
      },
      letterSpacing: {
        micro: '0.14em',
        macro: '0.24em',
        mega:  '0.4em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,0,0,0.55), 0 0 24px -4px rgba(0,0,0,0.12)',
        soft: '0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 16px -8px rgba(0,0,0,0.08)',
        ring: '0 0 0 4px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
