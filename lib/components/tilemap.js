import assets from '../assets'

export function render(ctx, camera) {
  const { map, size, image: imageSrc } = this.tilemap
  const image = assets.get(imageSrc)
  const startCol = Math.floor(camera.x / size)
  const startRow = Math.floor(camera.y / size)
  const offsetX = -camera.x + startCol * size
  const offsetY = -camera.y + startRow * size

  let endCol = startCol + (camera.width / size)
  let endRow = startRow + (camera.height / size)
  if (endCol > map[0].length - 1) {
    endCol = map[0].length - 1
  }
  if (endRow > map.length - 1) {
    endRow = map.length - 1
  }

  for (let c = startCol; c <= endCol; c++) {
    for (let r = startRow; r <= endRow; r++) {
      let index = map[r][c]
      let x = (c - startCol) * size + offsetX
      let y = (r - startRow) * size + offsetY
      ctx.drawImage(
        image,
        index * size, 0,
        size, size,
        Math.round(x), Math.round(y),
        size, size
      )
    }
  }
}
