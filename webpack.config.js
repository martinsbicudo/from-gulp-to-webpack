const HtmlWebPackPlugin = require("html-webpack-plugin")
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , MiniCssExtractPlugin = require("mini-css-extract-plugin")
  , views = require('./hoc/getViewNames')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV === 'development'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              data: "$env: " + process.env.NODE_ENV + ";",
              includePaths: ["node_modules"],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...views.getNames(".html", "src/", (file, path) => {
      const filename = `./${path.replace('src/', '')}`

      return new HtmlWebPackPlugin({
        template: path,
        filename: filename
      })
    }),
    new MiniCssExtractPlugin({
      entry: './src/scss/main.scss',
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}
