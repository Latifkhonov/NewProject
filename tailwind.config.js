/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom theme colors using CSS variables
        'theme-primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'theme-primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
        'theme-secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'theme-background': 'rgb(var(--color-background) / <alpha-value>)',
        'theme-surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'theme-text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'theme-text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'theme-border': 'rgb(var(--color-border) / <alpha-value>)',
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
        'theme-xl': 'var(--shadow-xl)',
      },
      animation: {
        'theme-transition': 'theme-transition 0.3s ease-in-out',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
