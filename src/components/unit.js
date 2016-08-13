export function tick() {
  const unit = this.unit
  let nx = unit.x + unit.dx
  let ny = unit.y + unit.dy

  if (ny >= 148) {
    ny = unit.y
  } else {
    unit.dy += 0.1
  }

  if (nx < 12) {
    nx = 12
  }
  if (nx > 235) {
    nx = 235
  }

  unit.x = nx
  unit.y = ny
  unit.dx *= 0.85

  this.transform.x = nx
  this.transform.y = ny
}
