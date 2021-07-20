'use strict'

var path = require('path')

module.exports = function (file, topLevelPath) {
  var segments = file.split(path.sep)
  var index = segments.lastIndexOf('node_modules')
  if (index === -1 && typeof topLevelPath === 'string') {
    // HACK: this approach may not be a good idea...
    topLevelPath = path.normalize(topLevelPath)
    if (file.startsWith(topLevelPath + path.sep)) {
      index = topLevelPath.split(path.sep).length - 2
    }
  }
  if (index < 0) return
  if (!segments[index + 1]) return
  var scoped = segments[index + 1][0] === '@'
  var name = scoped ? segments[index + 1] + '/' + segments[index + 2] : segments[index + 1]
  var offset = scoped ? 3 : 2
  return {
    name: name,
    basedir: segments.slice(0, index + offset).join(path.sep),
    path: segments.slice(index + offset).join(path.sep)
  }
}
