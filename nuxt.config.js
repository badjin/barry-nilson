import { get } from 'lodash-es'
import getGlobals from './models/getGlobals'
import createIcons from './models/createIcons'
import getEntries from './models/getEntries'
import generateRedirects from './models/redirects'

export default async function () {
  const globals = await getGlobals()

  if (process.env.ENVIRONMENT === 'production') {
    // generate _redirects file
    generateRedirects(globals)
    // process.env.GTM = get(globals, 'analytics.gtmId') || ''
  }

  process.env.GTM = get(globals, 'analytics.gtmId') || ''

  const dns = get(globals, 'dnsPrefetch.dns')
  const dnsPrefetch = dns.map((e) => {
    return { rel: 'dns-prefetch', href: `//${e.url}` }
  })

  await createIcons(globals)

  const entries = await getEntries()

  const routes = [...entries]

  const siteMapExclude = [
    '/home',
    ...routes
      .map((e) => {
        if (e.seoSettings && e.seoSettings[0] && e.seoSettings[0].noIndex) {
          return e.uri
        }
        return false
      })
      .filter((i) => i),
  ]

  return {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    vue: {
      config: {
        devtools: true,
      },
    },

    env: {
      API_ENDPOINT: process.env.API_ENDPOINT,
      ALGOLIA_PREFIX: process.env.ALGOLIA_PREFIX,
      ENVIRONMENT: process.env.ENVIRONMENT,
    },

    // TODO: include in module
    sitemap: {
      hostname: globals.settings.settings[0].siteUrl,
      filter({ routes }) {
        return routes.filter((route) => {
          return !siteMapExclude.includes(route.url)
        })
      },
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'Barry Nilsson',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@400;500;600;700&display=swap',
        },
        ...dnsPrefetch,
      ],
      script: [
        {
          hid: 'gtm-script',
          src: `https://www.googletagmanager.com/gtm.js?id=${process.env.GTM}`,
          async: true,
          defer: true,
        },
      ],
      // script: [
      //   {
      //     type: 'module',
      //     src: 'https://cdn.feedbucket.app/assets/feedbucket.js',
      //     'data-feedbucket': 'LBx1mHCkYXlq8v3RMNS4',
      //     defer: true,
      //   },
      // ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      { src: '~/plugins/thirst-components.js' },
      { src: '~/plugins/instantSearch.js' },
      { src: '~/plugins/apolloClient.js' },
      { src: '~/plugins/vclickoutside.js', ssr: false },
      { src: '~/plugins/map.js', ssr: false },
      { src: '~/plugins/gtm', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    tailwindcss: {
      jit: true,
    },

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://go.nuxtjs.dev/tailwindcss
      '@nuxtjs/tailwindcss',
      '@nuxtjs/svg',
      '@nuxt/image',
    ],

    image: {
      domains: ['https://cms.bnlaw.com.au/assets/images'],
    },
    robots: () => {
      if (process.env.PREVENT_INDEXING) {
        return {
          UserAgent: '*',
          Disallow: '/',
        }
      } else {
        return {
          UserAgent: '*',
          Disallow: '',
          Sitemap: 'https://bnlaw.com.au/sitemap.xml',
        }
      }
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      '@thirstcreative/nuxt-module',
      '@nuxtjs/toast',
      'cookie-universal-nuxt',
      '@nuxtjs/recaptcha',
      // '@nuxtjs/gtm',
    ],
    recaptcha: {
      hideBadge: false,
      siteKey: process.env.SITE_RECAPTCHA_KEY,
      size: 'normal',
      version: 2,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    router: {
      middleware: 'globals',
    },

    generate: {
      concurrency: 300,
      interval: 350,
      routes() {
        return routes.map((e) => {
          return e.payload ? e : e.uri
        })
      },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      transpile: ['vue-instantsearch', 'instantsearch.js/es'],
      babel: {
        plugins: [
          // https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-830577523
          [
            '@babel/plugin-proposal-private-property-in-object',
            { loose: true },
          ],
          ['@babel/plugin-proposal-optional-chaining'],
        ],
      },
    },
  }
}
