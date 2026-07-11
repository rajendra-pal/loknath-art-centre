import type { Config } from 'tailwindcss';

const config: Config = {
  // darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        cream: {
          50: '#FFFCF7',
          100: '#FFF9F2',
          200: '#FFF3E4',
          300: '#FFE9CC',
        },
        ink: {
          50: '#F5F3EE',
          100: '#E8E3D6',
          200: '#C9BFA8',
          300: '#9C8E70',
          400: '#5C503C',
          500: '#2D261B',
          600: '#1F1A12',
          700: '#14110B',
        },
        palette: {
          orange: '#FF6B35',
          coral: '#FF8E72',
          rose: '#FF5C8A',
          pink: '#FFB5C2',
          purple: '#8B5CF6',
          violet: '#A78BFA',
          blue: '#3B82F6',
          sky: '#60A5FA',
          yellow: '#FBBF24',
          amber: '#F59E0B',
          emerald: '#10B981',
          teal: '#14B8A6',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'canvas-texture': "url('/textures/canvas.png')",
        'paper-texture': "url('/textures/paper.png')",
        'watercolor-gradient':
          'radial-gradient(at 20% 30%, rgba(255, 107, 53, 0.15) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.15) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(255, 92, 138, 0.1) 0px, transparent 50%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(-5deg)' },
        },
        'paint-splash': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.6' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0' },
        },
        'brush-stroke': {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'counter-pop': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'paint-splash': 'paint-splash 1.2s ease-out forwards',
        'brush-stroke': 'brush-stroke 2s ease-out forwards',
        shimmer: 'shimmer 3s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'counter-pop': 'counter-pop 0.6s ease-out forwards',
        wiggle: 'wiggle 0.4s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
