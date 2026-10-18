// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Content preparation writes database dumps into buildDir. Keep verification
  // commands from replacing the files used by a running development server.
  buildDir: process.env.NUXT_VERIFY === '1' ? '.nuxt-verify' : '.nuxt',
  app: { pageTransition: { name: 'page', mode: 'out-in' } },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
