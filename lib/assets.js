const assets = {}

export default {
  load(assetPaths, callback) {
    let loaded = 0
    assetPaths.forEach(path => {
      const img = new Image()
      img.src = path
      img.onload = () => {
        loaded++
        if (loaded >= assetPaths.length) {
          callback && callback()
        }
      }
      assets[path] = img
    })
  },

  get(assetPath) {
    return assets[assetPath]
  },
}
