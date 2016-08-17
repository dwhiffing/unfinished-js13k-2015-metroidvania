import entities from '../../lib/entities'
import { width } from '../config'

export function update() {
  this.transform.x += this.projectile.speed
  if (this.transform.x < 0 || this.transform.x > width) {
    entities.remove(this)
  }
}
