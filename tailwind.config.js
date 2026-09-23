/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070d1a',
          900: '#0c192e',
          800: '#142542',
          700: '#1d3557',
          600: '#2b4c7e',
          100: '#e2e8f0',
          50: '#f8fafc',
        },
        deen: {
          dark: '#0a192f',
          primary: '#1d4ed8',
          accent: '#166534',
          gold: '#15803d',
          goldLight: '#dcfce7',
          surface: '#f8fafc',
          card: '#ffffff',
          emerald: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 4px -1px rgba(15, 23, 42, 0.03)',
        'soft-md': '0 4px 16px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 12px 32px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -3px rgba(15, 23, 42, 0.06)',
        'green-glow': '0 0 20px rgba(22, 101, 52, 0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0c192e 0%, #142542 60%, #1d3557 100%)',
        'green-gradient': 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
        'card-gradient': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }
    },
  },
  plugins: [],
}
