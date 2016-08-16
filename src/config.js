export const width = 160
export const height = 80

export const scenes = {
  level: require('./scenes/level'),
}

export const components = {
  collides: require('../lib/components/collides'),
  transform: require('../lib/components/transform'),
  sprite: require('../lib/components/sprite'),
  tilemap: require('../lib/components/tilemap'),
  unit: require('./components/unit'),
}

export const prefabs = {
  player: {
    unit: {
      dx: 0,
      dy: 0,
      hp: 3,
      speed: 1,
      jumpHeight: 2.5,
    },
    transform: {
      x: 20,
      y: 20,
      sx: 1,
      sy: 1,
      r: 0,
    },
    collides: {
      index: 1,
      size: 8,
      offsetX: -4,
      offsetY: -4,
      debug: true,
    },
    sprite: {
      image: 'assets/images/sprites.png',
      index: 4,
      size: 8,
    },
  },
  map: {
    transform: {
      space: 'camera',
      x: 0,
      y: 0,
      sx: 1,
      sy: 1,
      r: 0,
    },
    tilemap: {
      image: 'assets/images/sprites.png',
      size: 8,
      map: null,
    },
  },
  tile: {
    transform: {
      x: 0,
      y: 0,
      sx: 1,
      sy: 1,
      r: 0,
    },
    collides: {
      index: 2,
      size: 8,
      offsetX: 0,
      offsetY: 0,
      debug: true,
    },
  },
}
