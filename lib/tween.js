import math from './math'

const tweens = []
const easing = {
  linear: (k) => k,
  quadIn: (k) => k * k,
  quadOut: (k) => k * (2 - k),
  quadInOut: (k) => k < 0.5 ? this.quadIn(k) : this.quadOut(k),
  sineIn: (k) => k === 1 ? 1 : 1 - Math.cos(k * Math.PI / 2),
  sineOut: (k) => Math.sin(k * Math.PI / 2),
  sineInOut: (k) => 0.5 * (1 - Math.cos(Math.PI * k)),
}

export default {
  create(target, to, duration, delay=0, ease='linear') {
    const from = {}
    const elapsed = 0
    for (const key in to) {
      from[key] = target[key]
    }
    tweens.push({ target, from, to, duration, delay, ease, elapsed })
  },

  update(delta) {
    for (let i = tweens.length - 1; i >= 0; --i) {
      const tween = tweens[i]
      if (tween.delay > 0) {
        tween.delay -= delta
      } else {
        tween.elapsed = Math.min(tween.elapsed + delta, tween.duration)
        const normal = tween.elapsed / tween.duration
        for (const key in tween.to) {
          tween.target[key] = math.lerp(
            tween.from[key],
            tween.to[key],
            easing[tween.ease](normal)
          )
        }
        if (tween.elapsed >= tween.duration) {
          tweens.splice(i, 1)
        }
      }
    }
  },
}
