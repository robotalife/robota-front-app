module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/global/_reset.scss";`,
      },
    },
  },

  transpileDependencies: ["vuetify"],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
};
