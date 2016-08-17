import checkInput from '../utils/checkInput'
import entities from '../../lib/entities'

const commands = {
  shoot: ['space'],
}

export function update(delta, keys) {
  const input = checkInput(keys, commands)
  this.shoot.delta++
  if (input.includes('shoot') && this.shoot.delta >= this.shoot.rate) {
    this.shoot.delta = 0
    let bullet = entities.spawn('bullet')
    bullet.projectile.speed *= this.unit.facing
    bullet.transform.x = this.transform.x
    bullet.transform.y = this.transform.y
  }
}
