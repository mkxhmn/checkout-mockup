module.exports = {
  webpack: function (config) {
    config.module.rules.push(
      {
        test: /\.(ico)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.svg$/,
        use: { loader: '@svgr/webpack' },
      }
    );

    config.plugins = config.plugins || [];

    return config;
  },
};
