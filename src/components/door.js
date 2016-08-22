import entities from '../../lib/entities'
import { getColliders } from '../../lib/components/collides'
import { loadNewRoom } from '../scenes/level'

const checkCollisions = (thing) => {
  if (thing.collides) {
    const colliders = getColliders(thing)
    if (colliders.length > 0) {
      const collider = colliders[0]
      if (collider.projectile) {
        thing.sprite.hidden = true
        entities.remove(collider)
      } else if (thing.sprite.hidden) {
        loadNewRoom(thing.direction)
      }
    }
  }
}

export function update() {
  checkCollisions(this)
}
