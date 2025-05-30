// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
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
