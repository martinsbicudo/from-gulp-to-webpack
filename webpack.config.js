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
    ...views.getNames(".html", "src/", (file, path) => {
      const filename = `./${path.replace('src/', '')}`
      
      return new HtmlWebPackPlugin({
        template: path,
        filename: filename
      })
    })
  ]
}
