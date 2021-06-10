module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: { loader: '@svgr/webpack' },
    });

    config.plugins = config.plugins || [];

    return config;
  },
};
