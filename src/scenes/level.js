import entities from '../../lib/entities'
import * as screens from '../../assets/screens/screens'
import dungeon from '../../assets/screens/map'
import { width, height } from '../config'
import stage from '../../lib/stage'

let player, map, tiles, mapIndex, dungeonIndex, door
dungeonIndex = { x: 0, y: 5 }

export function loadRoom() {
  mapIndex = dungeon[dungeonIndex.y][dungeonIndex.x]

  let mapData = screens[`screen${mapIndex}`]
  loadMap(mapData)
}

export function loadNewRoom(direction) {
  if (direction === 0) {
    dungeonIndex.x += 1
  } else if (direction === 1) {
    dungeonIndex.y += 1
  } else if (direction === 2) {
    dungeonIndex.x -= 1
  } else {
    dungeonIndex.y -= 1
  }
  loadRoom()
  const size = map.tilemap.size * 20
  if (direction === 0) {
    player.transform.x = 20
    player.transform.y = door.transform.y + 8
  } else if (direction === 1) {
    player.transform.y = 20
    player.transform.x = door.transform.x
  } else if (direction === 2) {
    player.transform.x = size - 20
    player.transform.y = door.transform.y + 8
  } else {
    player.transform.x = door.transform.x + 8
    player.transform.y = size - 20
  }
}

export function loadMap(mapData) {
  entities.remove(player)
  entities.remove(map)
  entities.remove(tiles)

  tiles = []
  map = entities.spawn('map')
  map.tilemap.map = mapData

  mapData.forEach((row, y) => {
    row.forEach((index, x) => {
      if (index > 0 && index < 3) {
        let tile = entities.spawn('tile')
        tile.transform.x = map.tilemap.size * x
        tile.transform.y = map.tilemap.size * y
        tiles.push(tile)
      } else if (index !== 0) {
        door = entities.spawn('door')
        if (x === row.length - 1) {
          door.direction = 0
        } else if (y === mapData.length - 1) {
          door.direction = 1
        } else if (x === 0) {
          door.direction = 2
        } else {
          door.direction = 3
        }
        door.transform.x = map.tilemap.size * x
        door.transform.y = map.tilemap.size * y
        tiles.push(door)
      }
    })
  })
  player = entities.spawn('player')

  const tSize = map.tilemap.size
  const pSize = player.sprite.size

  player.unit.minX = pSize / 2
  player.unit.maxX = tSize * mapData[0].length - pSize / 2
  player.unit.maxY = tSize * mapData.length + pSize / 2

  const maxX = mapData[0].length * tSize - width
  const maxY = mapData.length * tSize - height
  stage.setupCamera(player, maxX, maxY)
}


export function start() {
  loadRoom()
}

export function update() {}
