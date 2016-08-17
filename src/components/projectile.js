import entities from '../../lib/entities'
import { width } from '../config'
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
  this.transform.x += this.projectile.speed
  if (this.transform.x < 0 || this.transform.x > width+8) {
    entities.remove(this)
  }
}
