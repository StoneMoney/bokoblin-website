export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'bokoblin-website',
    htmlAttrs: {
      lang: 'en' // it sets the language English
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~layouts/global.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/youtube.js', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],
  bootstrapVue: {
    icons: true
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // PWA service worker configuration
  pwa: {
    meta: {
      theme_color: '#343a40',
      name: 'Bokoblin Archives',
      ogImage: false
    },
    manifest: {
      name: 'Bokoblin Archives',
      short_name: 'Bokoblin',
      description: 'Bokoblin, archived data of the last 11 years of Kinstone-operated charity marathons',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#343a40',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vue-youtube-embed', 'vue-instantsearch', 'instantsearch.js/es'],
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
