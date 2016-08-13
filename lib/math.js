export default {
  tau: Math.PI * 2,
  lerp(a, b, t) {
    return a + ((b - a) * t)
  },
  chance(chance) {
    return Math.random() <= chance
  },
}
