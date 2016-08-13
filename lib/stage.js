import entities from './entities'

let stage, ctx

const camera = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  target: null,
  update() {
    if (this.target) {
      this.x = Math.round(this.target.transform.x - this.width / 2)
      this.y = Math.round(this.target.transform.y - this.height / 2)
    }
  },
}

export default {
  init(width, height) {
    stage = document.createElement('canvas')
    camera.width = stage.width = width
    camera.height = stage.height = height
    document.body.appendChild(stage)
    ctx = stage.getContext('2d')
    ctx.imageSmoothingEnabled = false
    this.resize()
    window.addEventListener('resize', this.resize, false)
  },

  clear(fill) {
    ctx.fillStyle = fill
    ctx.fillRect(0, 0, stage.width, stage.height)
  },

  resize() {
    const scale = Math.min(innerWidth / stage.width, innerHeight / stage.height)
    stage.style.position = 'absolute'
    stage.style.transformOrigin = '0 0'
    stage.style.transform = `scale(${scale}, ${scale})`
    stage.style.left = Math.round(innerWidth / 2 - (stage.width * scale) / 2) + 'px'
    stage.style.top = Math.round(innerHeight / 2 - (stage.height * scale) / 2) + 'px'
  },

  render() {
    this.clear('#111')
    camera.update()

    const list = entities.get()
    for (let i = 0; i < list.length; ++i) {
      const entity = list[i]
      ctx.save()
      entities.trigger(entity, 'render', [ctx, camera])
      ctx.restore()
    }
  },

  setCameraFollowTarget(target) {
    camera.target = target
  },
}
