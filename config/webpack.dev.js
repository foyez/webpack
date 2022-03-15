const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");
const paths = require("./paths");

module.exports = merge(common, {
  mode: "development",
  // how source maps are generated
  devtool: "inline-source-map",
  // setup dev server
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  output: {
    filename: "[name].bundle.js",
    path: paths.build,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader", // 4. inject styles into dom
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          }, // 3. turns css into commonjs
          { loader: "postcss-loader", options: { sourceMap: true } }, // 2. add prefix in css
          { loader: "sass-loader", options: { sourceMap: true } }, // 1. turns sass into css
        ],
      },
    ],
  },
});
