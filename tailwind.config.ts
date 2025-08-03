import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Theme color classes that use CSS variables
    'text-theme-primary',
    'text-theme-secondary',
    'text-theme-tertiary',
    'text-theme-forth',
    'text-theme-muted',
    'text-theme-accent',
    'bg-theme-primary',
    'bg-theme-secondary',
    'bg-theme-tertiary',
    'bg-theme-forth',
    'bg-theme-muted',
    'bg-theme-accent',
    'border-theme-primary',
    'border-theme-secondary',
    'border-theme-tertiary',
    'border-theme-forth',
    'border-theme-muted',
    'border-theme-accent',
    'hover:text-theme-primary',
    'hover:text-theme-secondary',
    'hover:text-theme-tertiary',
    'hover:text-theme-forth',
    'hover:bg-theme-primary',
    'hover:bg-theme-secondary',
    'hover:bg-theme-tertiary',
    'hover:bg-theme-forth',
    'hover:border-theme-primary',
    'hover:border-theme-secondary',
    'hover:border-theme-tertiary',
    'hover:border-theme-forth',
    'focus:border-theme-primary',
    // Opacity variants
    'bg-theme-primary/10',
    'bg-theme-primary/20',
    'bg-theme-primary/50',
    'border-theme-primary/20',
    'border-theme-primary/50',
    'shadow-theme-primary/10',
    'hover:shadow-theme-primary/10',
    'focus:shadow-theme-primary/10',  
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
        },
        forth: {
          DEFAULT: 'hsl(var(--forth))',
          foreground: 'hsl(var(--forth-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Dynamic theme colors
        'theme-primary': 'var(--theme-primary)',
        'theme-secondary': 'var(--theme-secondary)',
        'theme-tertiary': 'var(--theme-tertiary)',
        'theme-forth': 'var(--theme-forth)',
        'theme-muted': 'var(--theme-muted)',
        'theme-accent': 'var(--theme-accent)',
        
        // Static color palette for themes
        'teal-primary': '#14b8a6',
        'teal-secondary': '#0d9488',
        'teal-tertiary': '#DDFFE7',
        'teal-forth': '#167D7F',
        'teal-muted': '#115e59',
        'purple-primary': '#8b5cf6',
        'purple-secondary': '#7c3aed',
        'purple-tertiary': '#8155BA',
        'purple-forth': '#BEAFC2',
        'purple-muted': '#6b21a8',
        'blue-primary': '#3b82f6',
        'blue-secondary': '#2563eb',
        'blue-tertiary': '#145DA0',
        'blue-forth': '#2E8BC0',
        'blue-muted': '#1e40af',
        'orange-primary': '#f97316',
        'orange-secondary': '#ea580c',
        'orange-tertiary': '#DF362D',
        'orange-forth': '#FF8300',
        'orange-muted': '#c2410c',
        'green-primary': '#22c55e',
        'green-secondary': '#16a34a',
        'green-tertiary': '#21B6A8',
        'green-forth': '#A3EBB1',
        'green-muted': '#15803d',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient': 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
}
export default config
