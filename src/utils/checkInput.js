const keyLookup = {
  enter: 13,
  space: 32,
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  w: 87,
  a: 57,
  s: 83,
  d: 68,
  z: 90,
  x: 88,
  c: 67,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
}

const checkInput = (keys, commands) => {
  return Object.keys(commands).filter(command => {
    return commands[command].some(key => keys[keyLookup[key]])
  })
}

export default checkInput
