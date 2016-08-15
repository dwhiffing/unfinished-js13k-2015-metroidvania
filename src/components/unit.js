// import { checkCollision } from '../../lib/components/collides'

const keyLookup = {
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
}

const commands = {
  left: ['leftArrow'],
  right: ['rightArrow'],
  jump: ['upArrow'],
}

const checkInput = (keys) => {
  return Object.keys(commands).filter(command => {
    const keysForCommand = commands[command]
    return keysForCommand.some(key => keys[keyLookup[key]])
  })
}

export function update(delta, keys) {
  const unit = this.unit
  const input = checkInput(keys)

  if (input.includes('left')) {
    unit.dx = -unit.speed
  }
  if (input.includes('right')) {
    unit.dx = unit.speed
  }

  let nx = this.transform.x + unit.dx
  let ny = this.transform.y + unit.dy

  nx = nx < unit.minX ? unit.minX : nx
  nx = nx > unit.maxX ? unit.maxX : nx
  ny = ny > unit.maxY ? unit.maxY : ny

  if (this.collides && this.collides.colliding) {
    this.collides.colliders.forEach(other => {
      if (Math.abs(unit.dx) > 0) {
        if (this.transform.y-4 <= other.transform.y && this.transform.y+4 > other.transform.y) {
          if (this.transform.x < other.transform.x) {
            unit.dx = 0
            nx = other.transform.x - 8
          }
          if (this.transform.x > other.transform.x) {
            unit.dx = 0
            nx = other.transform.x + other.collides.size
          }
        }
      }

      // hit something from below
      if (this.transform.y > other.transform.y) {
        unit.dy = 0
        ny = other.transform.y + other.collides.size + 4
      }

      // standing on something
      if (this.transform.y < other.transform.y) {
        if (input.includes('jump')) {
          unit.dy = -unit.jumpHeight
        } else {
          unit.dy = 0
          ny = other.transform.y - 4
        }
      }
    })
  }

  // const oldX = this.transform.x
  // const oldY = this.transform.y
  this.transform.x = nx
  this.transform.y = ny

  // if (checkCollision(this)) {
  //   // debugger
  //   this.transform.x = oldX
  //   this.transform.y = oldY
  // }

  if (!this.collides.colliding) {
    unit.dy += 0.1
  }

  unit.dx *= 0.9
  if (Math.abs(unit.dx) < 0.001) {
    unit.dx = 0
  }

  this.collides.colliding = false
}
