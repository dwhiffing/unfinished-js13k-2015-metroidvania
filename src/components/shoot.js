import checkInput from '../utils/checkInput'
import entities from '../../lib/entities'

const commands = {
  shoot: ['x'],
}

export function update(delta, keys) {
  const input = checkInput(keys, commands)
  this.shoot.delta++
  if (input.includes('shoot') && this.shoot.delta >= this.shoot.rate) {
    this.shoot.delta = 0
    let bullet = entities.spawn('bullet')
    bullet.projectile.velocity = { x: 0, y: 0 }
    if (this.unit.facing === 0) {
      bullet.projectile.velocity.x = bullet.projectile.speed
    } else if (this.unit.facing === 1) {
      bullet.projectile.velocity.y = bullet.projectile.speed
    } else if (this.unit.facing === 2) {
      bullet.projectile.velocity.x = -bullet.projectile.speed
    } else {
      bullet.projectile.velocity.y = -bullet.projectile.speed
    }
    bullet.transform.x = this.transform.x
    bullet.transform.y = this.transform.y
  }
}
