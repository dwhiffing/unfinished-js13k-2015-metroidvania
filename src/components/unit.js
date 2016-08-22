import { getColliderDirections } from '../../lib/components/collides'
import checkInput from '../utils/checkInput'

let lastFacing = 1

const commands = {
  left: ['leftArrow'],
  right: ['rightArrow'],
  jump: ['z'],
  up: ['upArrow'],
  down: ['downArrow'],
}

const checkCollisions = (thing, val, axis) => {
  if (thing.collides) {
    const colliders = getColliderDirections(thing)
    const arr = Object.keys(colliders).filter(k => !!colliders[k])

    thing.collides.colliding = false
    if (arr.length > 0) {
      thing.collides.colliding = true
      thing.collides.colliders = colliders
    } else {
      // is jumping check should go here
      return val
    }
    // checking this before checking collisions allows walking off ledges and hovering
    // should use this as a game mechanic
    thing.unit.isJumping = true
    Object.keys(thing.collides.colliders).forEach(key => {
      const other = thing.collides.colliders[key]
      if (!other) return
      if (axis === 'x') {
        if (key === 'right') {
          thing.unit.dx = 0
          val = other.transform.x - 4 + other.collides.offsetX
        } else if (key === 'left') {
          thing.unit.dx = 0
          val = other.transform.x + 12 + other.collides.offsetX
        }
      } else if (axis === 'y') {
        if (key === 'top') {
          thing.unit.dy = 0
          val = other.transform.y + 12 + other.collides.offsetY
        } else if (key === 'bottom' && thing.unit.dy >= 0) {
          thing.unit.dy = 0
          val = other.transform.y - 4 + other.collides.offsetY
          thing.unit.isJumping = false
        }
      }
    })
  }
  return val
}

export function update(delta, keys) {
  const unit = this.unit
  const input = checkInput(keys, commands)
  unit.facing = 0

  if (input.includes('left')) {
    unit.facing += 4
    unit.dx = -unit.speed
    lastFacing = 4
  } else if (input.includes('right')) {
    unit.facing += 1
    unit.dx = unit.speed
    lastFacing = 1
  }
  if (input.includes('up')) {
    unit.facing += 8
  } else if (input.includes('down')) {
    unit.facing += 2
  }

  if (unit.facing === 0) {
    unit.facing = lastFacing
  }

  let nx = this.transform.x + this.unit.dx

  nx = checkCollisions(this, nx, 'x')
  nx = nx < unit.minX ? unit.minX : nx
  nx = nx > unit.maxX ? unit.maxX : nx
  this.transform.x = nx

  let ny = this.transform.y + this.unit.dy
  ny = checkCollisions(this, ny, 'y')
  if (input.includes('jump') && !this.unit.isJumping) {
    this.unit.isJumping = true
    unit.dy = -unit.jumpHeight
  }
  ny = ny > unit.maxY ? unit.maxY : ny
  this.transform.y = ny

  if (this.unit.isJumping) {
    unit.dy += 0.1
  }

  unit.dx *= 0.9
  if (Math.abs(unit.dx) < 0.001) {
    unit.dx = 0
  }
}
