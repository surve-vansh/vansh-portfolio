/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#111118',
        'surface-2': '#1a1a26',
        border: '#1e1e2e',
        'border-light': '#2a2a3e',
        accent: {
          blue: '#4f8ef7',
          purple: '#a78bfa',
          cyan: '#22d3ee',
          glow: '#6366f1',
        },
        text: {
          primary: '#f0f0fa',
          secondary: '#8888aa',
          muted: '#44445a',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 142, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 142, 247, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(79, 142, 247, 0.2)',
        'glow-md': '0 0 20px rgba(79, 142, 247, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 142, 247, 0.4)',
        'glow-purple': '0 0 30px rgba(167, 139, 250, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
