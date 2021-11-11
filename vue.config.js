const vtkChainWebpack = require('vtk.js/Utilities/config/chainWebpack');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',

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

  transpileDependencies: ['vuetify'],

  chainWebpack: (config) => {
    vtkChainWebpack(config);
    config.module.rule('js').exclude.add(/\.worker\.js$/);
  },
};
