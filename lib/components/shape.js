const renderers = {
  rect(ctx, shape) {
    ctx.fillRect(0, 0, shape.width, shape.height)
  },
  arc(ctx, shape) {
    ctx.beginPath()
    ctx.arc(0, 0, shape.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  },
}

export function render(ctx) {
  const shape = this.shape
  ctx.fillStyle = shape.fill || '#fff'
  ctx.strokeStyle = shape.stroke
  ctx.lineWidth = shape.lineWidth || 0
  renderers[shape.type](ctx, shape)
}
