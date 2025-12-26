// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
    typescriptBundlerResolution: false
  },
  typescript: {
    strict: false,
    shim: false
  },
  nitro: {
    experimental: {
      wasm: false
    },
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Tabby Scarves',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Quality cooling parts, seats and accessories for forklifts and industrial equipment' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  image: {
    dir: 'public'
  }
})
