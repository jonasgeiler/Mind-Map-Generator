
export default {
  state: {
    el: null,
    root: {},
  },
  mutations: {
    SET_CONTAINER (state, el) {
      state.el = el
    },
    SET_ROOT (state, root) {
      state.root = root
    },
  },
  actions: {
    async INIT_STATE ({ commit }, { el, root }) {
      if (el) { commit('SET_CONTAINER', el) }
      if (root) { commit('SET_ROOT', root) }
    },
    async UPDATE_ROOT ({ commit }, root) {
      commit('SET_ROOT', root)
    },
  },
}
