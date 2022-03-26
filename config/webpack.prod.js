const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");
const paths = require("./paths");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    filename: "[name].[contenthash].bundle.js", // for cache busting
    path: paths.build,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 4. Extract css into files
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                exportLocalsConvention: "camelCase", // red-color to redColor
              },
            },
          }, // 3. turns css into commonjs
          "postcss-loader", // 2. add prefix in css
          "sass-loader", // 1. turns sass into css
        ],
      },
    ],
  },
  plugins: [
    // Removes unused codes or assets when rebuilding
    new CleanWebpackPlugin(),
    // Extract css into separate files
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimizer: [
      new HtmlWebpackPlugin({
        template: `${paths.public}/index.html`,
        filename: "index.html",
        inject: "body",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
});
