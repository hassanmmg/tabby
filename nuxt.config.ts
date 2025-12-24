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
    },
    cors: {
      origin: '*',
      credentials: true
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
    '@nuxt/image',
    '@nuxtjs/supabase'
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
  runtimeConfig: {
    // Private keys (server-side only)
    chipBrandId: process.env.CHIP_BRAND_ID || '',
    chipApiKey: process.env.CHIP_API_KEY || '',
    chipSandbox: process.env.CHIP_SANDBOX === 'true',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '',
    // Public keys (available client-side)
    public: {
      apiBase: '/api',
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY
      }
    }
  },
  supabase: {
    redirect: false
  },
  image: {
    dir: 'public'
  }
})
  