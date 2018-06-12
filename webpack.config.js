const HtmlWebPackPlugin = require("html-webpack-plugin")
  , views = require('./hoc/getViewNames')

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    ...views.getNames(file =>
      new HtmlWebPackPlugin({
        template: `src/${file}`,
        filename: `./${file}`
      })
    )
  ]
}
