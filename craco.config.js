const webpack = require("webpack");
const path = require("path");

module.exports = {
  webpack: {
    configure: (config) => {
      // fallback polyfills
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        process: require.resolve("process/browser.js"),
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        zlib: require.resolve("browserify-zlib"),
      };

      // alias with .js extension for process/browser.js
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "process/browser": require.resolve("process/browser.js"),
      };

      // plugins for global variables and module replacement
      config.plugins = [
        ...(config.plugins || []),

        // Provide process and Buffer globally
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),

        // Replace `process/browser` imports with `process/browser.js`
        new webpack.NormalModuleReplacementPlugin(
          /process\/browser$/,
          resource => {
            resource.request = resource.request.replace(/process\/browser$/, "process/browser.js");
          }
        ),
      ];

      return config;
    },
  },
};
