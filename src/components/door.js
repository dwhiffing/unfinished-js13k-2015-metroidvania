import { getColliders } from '../../lib/components/collides'
import { loadMap } from '../scenes/level'
import screen2 from '../../assets/screens/screen2'

const checkCollisions = (thing) => {
  if (thing.collides) {
    const colliders = getColliders(thing)
    const arr = Object.keys(colliders).filter(k => !!colliders[k] && k !== 'undefined')
    if (arr.length > 0) {
      loadMap(screen2)
    }
  }
}

export function update() {
  checkCollisions(this)
}
