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
  game.stage.setCameraFollowTarget(player)
}

export function update(delta, keys) {
  const input = checkInput(keys)
  entities.triggerAll('tick', [input])
}
