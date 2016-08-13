import tween from '../tween'

export default {
  pulse(entity) {
    const transform = entity.transform
    tween.create(transform, {
      sx: 1.25,
      sy: 1.25,
    }, 125)
    tween.create(transform, {
      sx: 1,
      sy: 1,
    }, 125, 125)
  },

  negate(entity) {
    const transform = entity.transform
    tween.create(transform, {
      x: transform.x - 1,
    }, 50)
    tween.create(transform, {
      x: transform.x + 1,
    }, 100, 50)
    tween.create(transform, {
      x: transform.x,
    }, 50, 150)
  },
}
