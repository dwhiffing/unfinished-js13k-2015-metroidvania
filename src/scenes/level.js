import game from '../../lib/game'
import entities from '../../lib/entities'
import screen1 from '../../assets/screens/screen1'

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

let player, map

export function start() {
  let mapData = screen1

  map = entities.spawn('map')
  map.tilemap.map = mapData

  player = entities.spawn('player')
  player.unit.minX = player.sprite.size / 2
  player.unit.maxX = map.tilemap.size * map.tilemap.map[0].length - player.sprite.size / 2
  player.unit.maxY = map.tilemap.size * (map.tilemap.map.length - 2) + player.sprite.size / 2
  const maxX = (mapData[0].length) * map.tilemap.size - game.width
  const maxY = (mapData.length) * map.tilemap.size - game.height
  game.stage.setupCamera(player, maxX, maxY)
}

export function update(delta, keys) {
  const input = checkInput(keys)
  entities.triggerAll('tick', [input])
}
