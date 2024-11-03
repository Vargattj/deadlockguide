// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Lanelocked',
      meta: [
        { name: 'description', content: 'Deadlock Shop updated' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  compatibilityDate: '2024-04-03',
  css: ['assets/main.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
  ]
})