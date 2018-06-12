const fs = require("fs")

const views = (fs => {
  const getNames = (
    action = file => file,
    dir = "./src",
    ext = ".html"
  ) => {
    return fs.readdirSync(dir).reduce((files, file) => {
      if (file.endsWith(ext))
        files.push(action(file))

      return files
    }, [])
  }

  return {
    getNames
  }
})(fs)

module.exports = views
