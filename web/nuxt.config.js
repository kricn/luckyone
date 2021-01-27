export default {
  dev: process.env.NODE_ENV !== 'production',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //配置scss
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    //全局css
    // scss: ''
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, //开启代理
    // credentials: true, //跨域请求需使用凭证
    prefix: '/api/web',
  },
  proxy: [
      ['/api',{ 
          target: 'http://localhost:3000', // (后端请求地址)
          changeOrigin: true,
          pathRewrite: {'^/api': ''}
      }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
