import assets from '../assets'

export function render(ctx) {
  const { size, index, image: imageSrc } = this.sprite
  const image = assets.get(imageSrc)
  const width = Math.floor(image.width / size)

  const srcX = index % width * size
  const srcY = Math.floor(index / width) * size
  const destXY = -size / 2
  if (!this.sprite.hidden) {
    ctx.drawImage(
      image,
      srcX, srcY, size, size,
      destXY, destXY, size, size
    )
  }
}
