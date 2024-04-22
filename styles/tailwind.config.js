const autoprefixer = require('autoprefixer');

module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ["_site/**/*.html"],
    options: {
      safelist: [],
    },
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            'h1': {
              fontFamily: 'var(--font-space-grotesk)',
            },
            'h2': {
              fontFamily: 'var(--font-space-grotesk)',
            },
            'h3': {
              fontFamily: 'var(--font-space-grotesk)',
            },
            'a': {
              color: '#1D4ED8',
              '&:hover': {
                color: '#1E3A8A',
              },
            },
            '.prose a.edit, .tag a': {
              color: '#333',
              textDecoration: 'none',
            },
            'ul.footer-nav': {
              '::before': {
                display: 'none',
                textDecoration: 'none',
              }
            },
            'ul.contains-task-list': {
              '::before': {
                display: 'none',
              }
            },
            'ul.spacelog': {
              '::before': {
                display: 'none',
              }
            },
          },
        },
      },
    },
  }, 
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
