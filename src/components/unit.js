const minX = 10
const maxX = 46
const maxY = 36

const move = (unit, dir) => {
  unit.dx = unit.speed * dir
}

const jump = (unit) => {
  if (unit.y >= maxY) {
    unit.dy = -unit.jumpHeight
  }
}

const getNewPosition = (unit) => {
  let nx = unit.x + unit.dx
  let ny = unit.y + unit.dy

  nx = nx < minX ? minX : nx
  nx = nx > maxX ? maxX : nx
  ny = ny > maxY ? maxY : ny

  if (ny < maxY) {
    unit.dy += 0.1
  }

  unit.dx *= 0.9
  if (Math.abs(unit.dx) < 0.001) {
    unit.dx = 0
  }

  return { x: nx, y: ny }
}

export function tick(input) {
  const unit = this.unit

  if (input.includes('left')) {
    move(unit, -1)
  }
  if (input.includes('right')) {
    move(unit, 1)
  }
  if (input.includes('jump')) {
    jump(unit)
  }

  const { x, y } = getNewPosition(unit)

  this.transform.x = unit.x = x
  this.transform.y = unit.y = y
}
