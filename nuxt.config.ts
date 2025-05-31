// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/ishitsubutsu-quiz/',
    buildAssetsDir: '/ishitsubutsu-quiz/_nuxt/',
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Notify',
      'Loading'
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons']
    }
  }
})
