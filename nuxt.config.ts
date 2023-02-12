// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      api: {
        kxa: 'https://kryx-app-web-api.azurewebsites.net/api/v1/stats/price/KXA',
        player_online: 'https://kryx-app-auth-api.azurewebsites.net/api/v1/login/online-players',
        leader_solo: 'https://kryx-app-web-api.azurewebsites.net/api/v1/leaderboards/pull/solo-versus-rank'
      }
    }
  },
  
  typescript: {
    strict: true
  },

  css: [
    '@/assets/css/main.css'
  ],

  modules: [
    [
      '@nuxtjs/i18n',
      {
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        seo: true,
        baseUrl: 'https://kryxivia.io',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en'
        },
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en-US',
            file: 'en.yml'
          },
          {
            code: 'fr',
            name: 'French',
            iso: 'fr-FR',
            file: 'fr.yml'
          },
          {
            code: 'es',
            name: 'Spanish',
            iso: 'es-ES',
            file: 'es.yml'
          },
          {
            code: 'ar',
            name: 'Arabic',
            iso: 'ar-DZ',
            file: 'ar.yml'
          },
          {
            code: 'et',
            name: 'Estonian',
            iso: 'et-EE',
            file: 'et.yml'
          },
          {
            code: 'hi',
            name: 'Hindi',
            iso: 'hi-IN',
            file: 'hi.yml'
          },
          {
            code: 'ja',
            name: 'Japanese',
            iso: 'ja-JP',
            file: 'ja.yml'
          },
          {
            code: 'pt',
            name: 'Portuguese',
            iso: 'pt-PT',
            file: 'pt.yml'
          },
          {
            code: 'ru',
            name: 'Russian',
            iso: 'ru-RU',
            file: 'ru.yml'
          },
          {
            code: 'tr',
            name: 'Turkish',
            iso: 'tr-TR',
            file: 'tr.yml'
          },
          {
            code: 'vi',
            name: 'Vietnamese',
            iso: 'vi-VN',
            file: 'vi.yml'
          },
          {
            code: 'zh',
            name: 'Chinese',
            iso: 'zh-CN',
            file: 'zh.yml'
          }
        ]
      }
    ]
  ]

})
