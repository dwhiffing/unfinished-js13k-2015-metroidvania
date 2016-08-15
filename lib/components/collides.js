import entities from '../entities'

export function checkCollision(one) {
  let colliders = []
  entities.get().forEach((two) => {
    if (!one.collides || !two.collides) return false
    if (one.collides.index === two.collides.index) return false
    if (one === two) return false
    if (one.transform.x < two.transform.x + two.collides.size &&
      one.transform.x + one.collides.size > two.transform.x &&
      one.transform.y < two.transform.y + two.collides.size &&
      one.collides.size + one.transform.y > two.transform.y) {
      colliders.push(two)
    }
  })
  return colliders
}

export function update() {
  if (this.collides.index === 2) return
  const colliders = checkCollision(this)
  if (colliders.length > 0) {
    this.collides.colliding = true
    this.collides.colliders = colliders
  }
}
