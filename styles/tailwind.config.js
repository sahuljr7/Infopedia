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
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#00a85a',
          600: '#008a4b',
          700: '#047857',
        },
        accent: {
          400: '#24c7dc',
          500: '#12b8d0',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            'h1': {
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.055em',
            },
            'h2': {
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.04em',
            },
            'h3': {
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
            },
            'a': {
              color: '#00a85a',
              '&:hover': {
                color: '#008a4b',
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
