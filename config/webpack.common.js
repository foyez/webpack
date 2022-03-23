const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

const paths = require("./paths");

module.exports = {
  // start building the bundle
  entry: {
    main: `${paths.src}/index.js`,
    vendor: `${paths.src}/vendor.js`,
  },
  // Customize the webpack build process
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store", "**/*.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // set environment variables
    new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),
  ],
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ["babel-loader"] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
      assets: paths.public,
    },
  },
};
