import { getColliderDirections } from '../../lib/components/collides'
import { loadNewRoom } from '../scenes/level'

const checkCollisions = (thing) => {
  if (thing.collides) {
    const colliders = getColliderDirections(thing)
    const arr = Object.keys(colliders).filter(k => !!colliders[k] && k !== 'undefined')
    if (arr.length > 0) {
      loadNewRoom(thing.direction)
    }
  }
}

export function update() {
  checkCollisions(this)
}
