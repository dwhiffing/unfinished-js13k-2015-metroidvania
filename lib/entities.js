let components = {}
let prefabs = {}
let entities = []

export default {
  init(componentData, prefabData) {
    components = componentData
    prefabs = prefabData
  },

  get() {
    return entities
  },

  trigger(entity, method, args) {
    for (const key in entity) {
      const component = components[key]
      if (!component || !component[method]) { continue }
      component[method].apply(entity, args)
    }
  },

  triggerAll(method, args) {
    entities.forEach(entity => this.trigger(entity, method, args))
  },

  add(entity) {
    entities.push(entity)
    return entity
  },

  remove(entity) {
    let index = entities.indexOf(entity)
    if (index != -1) {
      entities.splice(index, 1)
    }
  },

  spawn(key) {
    return this.add(JSON.parse(JSON.stringify(prefabs[key])))
  },
}
