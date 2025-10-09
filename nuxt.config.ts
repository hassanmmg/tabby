import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    'prepare:types': () => {
      // Ensure TypeScript config files exist for build
      const nuxtDir = join(process.cwd(), '.nuxt')
      if (existsSync(nuxtDir)) {
        const tsconfigFiles = ['tsconfig.app.json', 'tsconfig.shared.json', 'tsconfig.node.json']
        for (const file of tsconfigFiles) {
          const filePath = join(nuxtDir, file)
          if (!existsSync(filePath)) {
            writeFileSync(filePath, JSON.stringify({ extends: './tsconfig.json' }, null, 2))
          }
        }
      }
    }
  },
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
      title: 'Teknopuri Shop - Industrial Parts & Equipment',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Quality cooling parts, seats and accessories for forklifts and industrial equipment' }
      ],
      link: []
    }
  },
  runtimeConfig: {
    // Private keys (server-side only)
    chipBrandId: process.env.CHIP_BRAND_ID || '',
    chipApiKey: process.env.CHIP_API_KEY || '',
    chipSandbox: process.env.CHIP_SANDBOX === 'true',
    // Public keys (available client-side)
    public: {
      apiBase: '/api',
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
  