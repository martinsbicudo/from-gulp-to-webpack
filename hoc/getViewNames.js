const fs = require("fs")

const views = (fs => {
  function getNames(
    ext,
    dir,
    action = file => file,
  ) {
    dir = dir.endsWith("/") ? dir : `${dir}/`

    return fs.readdirSync(dir).reduce((files, file) => {
      const path = `${dir}${file}`
        , stats = fs.lstatSync(path)

      if (file.endsWith(ext))
        files.push(action(file, path))

      if (stats.isDirectory())
        files.push(
          ...this.getNames(ext, path, action)
        )

      return files
    }, [])
  }

  return {
    getNames
  }
})(fs)

module.exports = views
