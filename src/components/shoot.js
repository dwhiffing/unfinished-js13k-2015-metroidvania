import checkInput from '../utils/checkInput'
import entities from '../../lib/entities'

const right = [1, 3, 9]
const down = [2, 3, 6]
const left = [4, 6, 12]
const up = [8, 9, 12]

const commands = {
  shoot: ['x'],
}

export function update(delta, keys) {
  const input = checkInput(keys, commands)
  this.shoot.delta++
  if (input.includes('shoot') && this.shoot.delta >= this.shoot.rate) {
    this.shoot.delta = 0
    let bullet = entities.spawn('bullet')
    let x = 0, y = 0

    if (right.includes(this.unit.facing)) {
      x = bullet.projectile.speed
    }
    if (down.includes(this.unit.facing)) {
      y = bullet.projectile.speed
    }
    if (left.includes(this.unit.facing)) {
      x = -bullet.projectile.speed
    }
    if (up.includes(this.unit.facing)) {
      y = -bullet.projectile.speed
    }

    if (x !== 0 && y !== 0) {
      y *= 0.7
    }

    bullet.projectile.velocity = { x, y }

    bullet.transform.x = this.transform.x
    bullet.transform.y = this.transform.y
  }
}
