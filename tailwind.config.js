/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './public/index.html',
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js, jsx}',
    './src/**/*.{html,js,jsx}',
    './utils/**/*.{html,js}'
  ],
  important: false,
  corePlugins: {
    float: false
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        light: 'var(--light-bg-color)',
        dark: 'var(--dark-bg-color)'
      },
      textColor: {
        base: 'var(--secondary-base-color)',
        primary: 'var(--primary-text-color)',
        secondary: 'var(--secondary-text-color)',
        accent: 'var(--accent-text-color)'
      },
      fontFamily: {
        figtree: ['var(--font-mono)']
      },
      boxShadow: {
        mild: '0px 20px 32px rgba(196, 196, 196, 0.12)'
      },
      animation: {
        drop: 'drop 5s linear infinite',
        'drop-1sd': 'drop 5s linear infinite 1s',
        'drop-2sd': 'drop 5s linear infinite 2s'
      },
      keyframes: {
        drop: {
          '0%, 100%': { transform: 'translateY(-3px)' },
          '50%': { transform: 'translateY(5px)' }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, addBase, theme }) {
      addUtilities({
        gap: (value) => ({
          gap: value
        })
      }),
        addComponents({
          '.btn': {
            padding: theme('paddings.md')
          }
        }),
        addBase({
          h1: { fontSize: theme('fontSize.2xl') },
          h2: { fontSize: theme('fontSize.xl') },
          h3: { fontSize: theme('fontSize.lg') }
        });
    })
  ]
};
