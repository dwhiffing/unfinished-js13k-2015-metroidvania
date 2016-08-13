import game from '../lib/game'
import assets from '../lib/assets'

assets.load([
  'assets/images/sprites.png',
])

game.init(require('./config'))
game.loadScene('level')
game.start()
