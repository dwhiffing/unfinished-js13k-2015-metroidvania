import entities from '../../lib/entities'
import { getColliders } from '../../lib/components/collides'

const checkCollisions = (thing) => {
  if (thing.collides) {
    const colliders = getColliders(thing)
    const arr = Object.keys(colliders).filter(k => !!colliders[k])

    if (arr.length > 0) {
      entities.remove(thing)
    }
  }
}

export function update() {
  checkCollisions(this)
  this.transform.x += this.projectile.velocity.x
  this.transform.y += this.projectile.velocity.y
}
