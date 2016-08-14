import stage from './stage'
import entities from './entities'
import tween from './tween'

let keys = {}
let scenes = {}
let lastUpdate = 0
let activeScene = null

const mainLoop = time => {
  let delta = time - lastUpdate
  lastUpdate = time
  if (delta <= 100) {
    activeScene.update(delta, keys)
    entities.triggerAll('update', [delta, keys])
    tween.update(delta)
    stage.render()
  }
  requestAnimationFrame(mainLoop)
}

export default {
  init(config) {
    scenes = config.scenes
    this.stage = stage
    this.width = config.width
    this.height = config.height
    stage.init(config.width, config.height)
    entities.init(config.components, config.prefabs)

    window.addEventListener('keydown', e => keys[e.keyCode] = true, false)
    window.addEventListener('keyup', e => keys[e.keyCode] = false, false)
  },

  loadScene(key) {
    activeScene = scenes[key]
    activeScene.start()
  },

  start() {
    mainLoop(0)
  },
}
