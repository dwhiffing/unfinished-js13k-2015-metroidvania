export const width = 160
export const height = 90

export const scenes = {
  level: require('./scenes/level'),
}

export const components = {
  transform: require('../lib/components/transform'),
  sprite: require('../lib/components/sprite'),
  tilemap: require('../lib/components/tilemap'),
  unit: require('./components/unit'),
}

export const prefabs = {
  player: {
    unit: {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      hp: 3,
      speed: 1,
      jumpHeight: 2,
    },
    transform: {
      x: 0,
      y: 0,
      sx: 1,
      sy: 1,
      r: 0,
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
}
