import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Burgundy palette (primary)
        'burgundy': {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a9ba',
          400: '#ec7a95',
          500: '#df4d71',
          600: '#cb2d5a',
          700: '#ab2049',
          800: '#8f1d41',
          900: '#5F002B', // Primary burgundy from tudungpeople
          950: '#4a0021',
        },
        // Cream palette (backgrounds)
        'cream': {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F5F1E8',
          300: '#EAE7DA', // Primary cream from tudungpeople
          400: '#DED9C8',
          500: '#C9C2AC',
          600: '#AEA68E',
          700: '#8F8770',
          800: '#736D5B',
          900: '#5C574A',
        },
        // Keep old colors for backward compatibility during migration
        'tvh-red': '#e30613',
        'tvh-dark': '#1a1a1a',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(95, 0, 43, 0.08)',
        'luxury-lg': '0 10px 40px -4px rgba(95, 0, 43, 0.12)',
      },
      borderRadius: {
        'luxury': '2px',
      },
    },
  },
  plugins: [],
};
