let STORE = null
let RENDER = null

export const registRender = (render) => RENDER = render

export const registStore = (store) => {
  const { state, mutations, actions, render } = store
  STORE = { state, mutations, actions, render }
  return STORE
}

const commit = (name, payload) => {
  const mutation = STORE.mutations[name]
  mutation(STORE.state, payload)
}

export const dispatch = async (name, payload) => {
  const action = STORE.actions[name]
  await action({ commit }, payload)
  await RENDER(STORE.state)
}
