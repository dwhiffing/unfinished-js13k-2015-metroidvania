import entities from '../../lib/entities'
import screen1 from '../../assets/screens/screen1'
import { width, height } from '../config'
import stage from '../../lib/stage'

let player, map, tiles

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
        let tile = entities.spawn('door')
        tile.transform.x = map.tilemap.size * x
        tile.transform.y = map.tilemap.size * y
        tiles.push(tile)
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
  loadMap(screen1)
}

export function update() {}
