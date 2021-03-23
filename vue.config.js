module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://api.apiopen.top",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
