typographyPlugin = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xss': '250px',
        'xs': '288px',
      },
      typography: ({ theme }) => ({
        cyan: {
          css: {
            '--tw-prose-invert-links': theme('colors.cyan[500]'),
          }
        }
      })
    },
  },
  plugins: [typographyPlugin],
}

