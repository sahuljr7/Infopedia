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
        'times': ['Times New Roman', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
             h1: {
          fontFamily: 'times',
        },
        h2: {
          fontFamily: 'times',
        },
        h3: {
          fontFamily: 'times',
        },
            a: {
              color: '#1D4ED8',
              '&:hover': {
              color: '#1E3A8A',
              },
            },
            '.prose a.edit, .tag a': {
              color: '#333',
              'text-decoration': 'none',
            },
            'ul.footer-nav': {
              '::before': {
                display: 'none',
                'text-decoration': 'none',
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
      }
    },
  }, 
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
