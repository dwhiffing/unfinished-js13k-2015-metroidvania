import entities from '../entities'

function _getCollisionDirection(one, two) {
  const { x: x1, y: y1 } = _getPos(one)
  const { x: x2, y: y2 } = _getPos(two)
  if (Math.floor(y1) > Math.floor(y2)) {
    return 'top'
  } else if (Math.floor(y1) < Math.floor(y2)) {
    return 'bottom'
  } else if (x1 < x2) {
    return 'right'
  } else if (x1 > x2) {
    return 'left'
  }
}

const _getPos = (thing) => ({
  x: thing.transform.x + thing.collides.offsetX,
  y: thing.transform.y + thing.collides.offsetY,
  s: thing.collides.size,
})

function _checkCollision(one, two) {
  const { x: x1, y: y1, s: s1 } = _getPos(one)
  const { x: x2, y: y2, s: s2 } = _getPos(two)
  return Math.abs(x1 - x2) < (s1 + s2) / 2 && Math.abs(y1 - y2) < (s1 + s2) / 2
}

export function getColliders(one) {
  let colliders = {
    left: null,
    right: null,
    bottom: null,
    top: null,
  }
  entities.get().forEach((two) => {
    if (one === two || !one.collides || !two.collides) return
    if (!one.collides.collidesWith || one.collides.collidesWith.indexOf(two.collides.index) === -1) return
    if (_checkCollision(one, two)) {
      const dir = _getCollisionDirection(one, two)
      colliders[dir] = two
    }
  })
  return colliders
}

export function render(ctx) {
  if (this.collides.debug) {
    ctx.fillStyle = 'rgba(255,0,0,0.5)'
    ctx.fillRect(this.collides.offsetX, this.collides.offsetY, this.collides.size, this.collides.size)
  }
}
