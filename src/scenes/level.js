import game from '../../lib/game'
import entities from '../../lib/entities'

let player, map

export function start() {
  let mapData = []
  for (let y = 0; y < 20; ++y) {
    mapData.push([])
    for (let x = 0; x < 30; ++x) {
      mapData[y][x] = y === 19 ? 0 : 1
    }
  }

  map = entities.spawn('map')
  map.tilemap.map = mapData

  player = entities.spawn('player')
  game.stage.setCameraFollowTarget(player)
}

export function update(dt, keys) {
  let x = 0
  let y = 0
  let speed = 1
  if (keys[37]) {
    x -= speed
  }
  if (keys[39]) {
    x += speed
  }
  if (keys[38] && player.unit.y > 145) {
    y -= 2
  }

  if (x !== 0 || y !== 0) {
    player.unit.dx = x
    player.unit.dy = y
  }

  entities.triggerAll('tick')
}
