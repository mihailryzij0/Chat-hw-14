const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { NODE_ENV } = process.env;
module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: `[name].[contenthash].js`,
    path: resolve(`${__dirname}/dist`),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.([jt])s$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(woff\woff2\/eot\ttf\/otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./image/[name][ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 5 versions",
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  mode: NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["index"],
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
      },
      {
        reload: false,
      }
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    port: 9000,
    client: {
      logging: "info",
    },
  },
};
