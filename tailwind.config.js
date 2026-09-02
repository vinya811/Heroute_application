/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heroute: {
          bg: '#0a0b12',
          card: '#131625',
          cardHover: '#191e36',
          border: '#232942',
          pink: '#ff2a85',
          pinkGlow: 'rgba(255, 42, 133, 0.35)',
          magenta: '#e01a6b',
          cyan: '#00e5ff',
          cyanGlow: 'rgba(0, 229, 255, 0.35)',
          purple: '#8b5cf6',
          green: '#10b981',
          amber: '#f59e0b',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px -3px rgba(255, 42, 133, 0.45)',
        'neon-cyan': '0 0 20px -3px rgba(0, 229, 255, 0.45)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
