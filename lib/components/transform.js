export function render(ctx, camera) {
  let { x, y, r, sx, sy, space } = this.transform
  if (space !== 'camera') {
    x -= camera.x
    y -= camera.y
  }
  ctx.translate(Math.round(x), Math.round(y))
  ctx.rotate(r)
  ctx.scale(sx, sy)
}
