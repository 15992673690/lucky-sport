const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const {
  NODE_ENV,
  VUE_WS_BASE_URL,
  VUE_WS_BASE_QUERY
} = process.env;

const globalSass = config => {
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach((item) => {
    item.use('sass-resources-loader')
          .loader('sass-resources-loader')
            .options({
              resources: './src/assets/styles/common.scss'  //相对路径
            }).end() 
  })
}

const globalGraphal = config => {
  config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
}

const globalI18n = config => {
  config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js',)
}

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: NODE_ENV == 'development',
  devServer: {
    port: 9000,
    proxy: {
      [VUE_WS_BASE_QUERY]: {
        target: VUE_WS_BASE_URL,
        changeOrigin: true,
      },
    }
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  chainWebpack(config) {
    // 移除打包后 index.html 预加载行为
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    globalSass(config);
    globalGraphal(config);
    globalI18n(config);
  }
});