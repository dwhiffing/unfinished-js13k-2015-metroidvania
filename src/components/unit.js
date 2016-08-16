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
  let canJump = false

  nx = nx < unit.minX ? unit.minX : nx
  nx = nx > unit.maxX ? unit.maxX : nx
  ny = ny > unit.maxY ? unit.maxY : ny

  if (this.collides && this.collides.colliding) {
    Object.keys(this.collides.colliders).forEach(key => {
      const other = this.collides.colliders[key]
      if (!other) return
      if (key === 'right') {
        unit.dx = 0
        nx = other.transform.x - 4
      } else if (key === 'left') {
        unit.dx = 0
        nx = other.transform.x + 12
      } else if (key === 'top') {
        unit.dy = 0
        ny = other.transform.y + 12
      } else if (key === 'bottom' && unit.dy >= 0) {
        canJump = true
        this.isJumping = false
        unit.dy = 0
        ny = other.transform.y - 4
      }
    })
  }

  if (input.includes('jump') && canJump && !this.isJumping) {
    this.isJumping = true
    unit.dy = -unit.jumpHeight
  }

  this.transform.x = nx
  this.transform.y = ny

  if (!this.collides.colliding) {
    unit.dy += 0.1
  }

  unit.dx *= 0.9
  if (Math.abs(unit.dx) < 0.001) {
    unit.dx = 0
  }

  this.collides.colliding = false
}
