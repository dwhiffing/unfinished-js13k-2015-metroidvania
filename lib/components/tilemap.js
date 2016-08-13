import assets from '../assets'

const getOffset = (camera, size, key) => {
  let offset = -camera[key] % size

  if (camera[key] < 0) {
    offset = offset === 0 ? size : offset
  } else {
    offset = camera[key] < size ? size - camera[key] : offset
  }
  return offset
}

export function render(ctx, camera) {
  const { map, size, image: imageSrc } = this.tilemap
  const image = assets.get(imageSrc)
  const width = Math.floor(image.width / size)

  const originX = Math.floor(camera.x / size)
  const originY = Math.floor(camera.y / size)
  const terminusX = Math.ceil((camera.x + camera.width) / size)
  const terminusY = Math.ceil((camera.y + camera.height) / size)

  let offsetX = getOffset(camera, size, 'x')
  let offsetY = getOffset(camera, size, 'y')

  for (let y = originY; y <= terminusY; ++y) {
    if (y < 0 || y >= map.length) { continue }
    for (let x = originX; x <= terminusX; ++x) {
      if (x < 0 || x >= map[y].length) { continue }
      const index = map[y][x]
      const sx = index % width * size
      const sy = Math.floor(index / width) * size
      const dx = (x - originX) * size + offsetX
      const dy = (y - originY) * size + offsetY
      ctx.drawImage(
        image,
        sx, sy, size, size,
        dx, dy, size, size
      )
    }
  }
}
