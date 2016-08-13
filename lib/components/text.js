export function render(ctx) {
  ctx.font = `${this.text.size}px ${this.text.font}`
  ctx.fillStyle = this.text.fill
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(this.text.text, 0, 0)
}
