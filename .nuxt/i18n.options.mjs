
// @ts-nocheck


export const localeCodes =  [
  "en",
  "ms",
  "id"
]

export const localeLoaders = {
  "en": [{ key: "../assets/lang/en.json", load: () => import("../assets/lang/en.json" /* webpackChunkName: "locale__Users_adam_Documents_GitHub_shop_teknopuri_assets_lang_en_json" */), cache: true }],
  "ms": [{ key: "../assets/lang/ms.json", load: () => import("../assets/lang/ms.json" /* webpackChunkName: "locale__Users_adam_Documents_GitHub_shop_teknopuri_assets_lang_ms_json" */), cache: true }],
  "id": [{ key: "../assets/lang/id.json", load: () => import("../assets/lang/id.json" /* webpackChunkName: "locale__Users_adam_Documents_GitHub_shop_teknopuri_assets_lang_id_json" */), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../i18n.config.ts?hash=bffaebcb&config=1" /* webpackChunkName: "__i18n_config_ts_bffaebcb" */)
]

export const nuxtI18nOptions = {
  "restructureDir": false,
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false,
    "typedPages": true,
    "typedOptionsAndMessages": false,
    "generatedLocaleFilePathFormat": "absolute",
    "alternateLinkCanonicalQueries": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false,
    "optimizeTranslationDirective": true
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n.config.ts",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "files": [
        "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/en.json"
      ]
    },
    {
      "code": "ms",
      "name": "Bahasa",
      "files": [
        "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/ms.json"
      ]
    },
    {
      "code": "id",
      "name": "Indonesian",
      "files": [
        "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/id.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "assets/lang",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "language",
    "cookieSecure": true,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "files": [
      {
        "path": "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/en.json"
      }
    ]
  },
  {
    "code": "ms",
    "name": "Bahasa",
    "files": [
      {
        "path": "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/ms.json"
      }
    ]
  },
  {
    "code": "id",
    "name": "Indonesian",
    "files": [
      {
        "path": "/Users/adam/Documents/GitHub/shop-teknopuri/assets/lang/id.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
