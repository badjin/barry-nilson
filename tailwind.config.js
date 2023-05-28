/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const tailwindConf = {
  mode: 'jit',
  theme: {
    screens: {
      sm: '640px', // => @media (min-width: 640px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '1024px', // => @media (min-width: 1024px) { ... }
      xl: '1280px', // => @media (min-width: 1280px) { ... }
      '2xl': '1536px', // => @media (min-width: 1536px) { ... }
      '3xl': '2000px', // => @media (min-width: 2000px) { ... }

      tiny: { raw: '(min-height: 400px)' },
      tall: { raw: '(min-height: 800px)' },
    },
    fontFamily: {
      body: '"Inter", sans-serif',
      display: '"Poppins",sans-serif',
    },
    fontSize: {
      xs: '0.77rem', // 13px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.0625rem', // 17px
      xl: '1.25rem', // 20px
      '2xl': '1.3125rem', // 21px
      '3xl': '1.5rem', // 24px
      '4xl': '2rem', // 32px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.1,
      snug: 1.2,
      normal: 1.4,
      relaxed: 1.5,
    },
    letterSpacing: {
      tighter: '-.03em',
      tight: '0.01em',
      normal: '0',
      loose: '0.3em',
    },
    colors: {
      red: 'red',
      steelblue: '#003E53',
      turquoise: '#00B48D',
      black: '#000',
      white: '#ffffff',
      form: '#E18600',
      sand: {
        300: '#F2EBDF',
        400: '#DFCCB0',
        DEFAULT: '#DFCCB0',
      },
      blue: '#54B8F0',
      darkteal: '#007264',
      primary: '#00B48D',
      grey: '#F2F5F6',
      darkgrey: '#dae3e6',
      transparent: 'rgba(255,255,255,0)',
    },
    borderRadius: {
      none: '0',
      md: '10px',
      DEFAULT: '10px',
      full: '9999px',
    },
    extend: {
      outline: {
        green: '1px solid #00BB87',
      },
      borderWidth: {
        3: '3px',
      },
      maxWidth: {
        '1/12': '8.33333%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '2/6': '33.33333%',
        '3/6': '50%',
        '4/6': '66.66667%',
        '5/6': '83.33333%',
        '1/12': '8.33333%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
        '11/10': '110%',
        '6/5': '120%',
        '7/5': '140%',
        100: '100%',
        125: '125%',
        'c-mobile': '2rem',
        'c-desktop': '4rem',
        'xs-mobile': '0.25rem',
        'xs-desktop': '1rem',
        'sm-mobile': '1rem',
        'sm-desktop': '2rem',
        'md-mobile': '4.4rem',
        'md-desktop': '3rem',
        'zero-desktop': '0rem',
        'px-zero': '0rem',
      },
    },
  },
  variants: {},
  plugins: [],
}

for (let i = 0; i <= 100; i++) {
  const ii = '0' + i
  tailwindConf.theme.extend.spacing[ii] = (i / 10) * 0.25 + 'rem'
  tailwindConf.theme.extend.spacing[ii + 'vh'] = i / 10 + 'vh'
  tailwindConf.theme.extend.spacing[ii + 'vw'] = i / 10 + 'vw'
  tailwindConf.theme.extend.spacing[ii + 'p'] = i / 10 + '%'
}
for (let i = 0; i <= 100; i++) {
  tailwindConf.theme.extend.spacing[i] = i * 0.25 + 'rem'
  tailwindConf.theme.extend.spacing[i + 'vh'] = i + 'vh'
  tailwindConf.theme.extend.spacing[i + 'px'] = i + 'px'
  tailwindConf.theme.extend.spacing[i + 'vw'] = i + 'vw'
  tailwindConf.theme.extend.spacing[i + 'p'] = i + '%'
}
for (let i = 0; i <= 1000; i++) {
  if (i % 10 === 0) {
    tailwindConf.theme.extend.spacing[i + 'px'] = i + 'px'
  }
}

module.exports = tailwindConf
