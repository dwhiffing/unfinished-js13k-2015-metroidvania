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
  shoot: require('./components/shoot'),
  projectile: require('./components/projectile'),
  door: require('./components/door'),
}

export const prefabs = {
  player: {
    unit: {
      dx: 0,
      dy: 0,
      hp: 3,
      speed: 1,
      jumpHeight: 2.5,
      isJumping: true,
      facing: 1,
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
      collidesWith: [2, 4],
      debug: true,
    },
    sprite: {
      image: 'assets/images/sprites.png',
      index: 4,
      size: 8,
    },
    shoot: {
      rate: 10,
      delta: 0,
    },
  },
  bullet: {
    projectile: {
      speed: 2,
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
      index: 5,
      size: 8,
    },
    collides: {
      index: 3,
      size: 2,
      offsetX: -2,
      offsetY: -1,
      collidesWith: [2, 4],
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
  door: {
    transform: {
      x: 0,
      y: 0,
      sx: 1,
      sy: 1,
      r: 0,
    },
    collides: {
      index: 4,
      size: 8,
      offsetX: -4,
      offsetY: -4,
      collidesWith: [1, 3],
      debug: true,
    },
    door: {
      thing: 1,
    },
    sprite: {
      image: 'assets/images/sprites.png',
      index: 6,
      size: 8,
    },
  },
}
