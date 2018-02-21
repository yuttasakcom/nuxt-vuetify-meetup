export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state, payload) {
      state.error = null
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading({ loading }) {
      return loading
    },
    error({ error }) {
      return error
    }
  }
}
