import entities from '../../lib/entities'
import mapData from '../../assets/screens/screen1'
import { width, height } from '../config'
import stage from '../../lib/stage'

let player, map

export function start() {
  map = entities.spawn('map')
  map.tilemap.map = mapData
  const tSize = map.tilemap.size

  mapData.forEach((row, y) => {
    row.forEach((index, x) => {
      if (index > 0) {
        let tile = entities.spawn('tile')
        tile.transform.x = tSize * x
        tile.transform.y = tSize * y
      }
    })
  })

  player = entities.spawn('player')
  const pSize = player.sprite.size

  player.unit.minX = pSize / 2
  player.unit.maxX = tSize * mapData[0].length - pSize / 2
  player.unit.maxY = tSize * mapData.length + pSize / 2

  const maxX = mapData[0].length * tSize - width
  const maxY = mapData.length * tSize - height
  stage.setupCamera(player, maxX, maxY)
}

export function update() {

}
