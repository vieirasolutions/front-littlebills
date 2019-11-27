export default {
  namespaced: true,
  state: {
    snackbar: false,
    text: '',
    color: 'error',
    timeout: 0
  },
  mutations: {
    setSnackbar (state, value) {
      state.snackbar = value
    },
    setText (state, text) {
      state.text = text
    },
    setColor (state, color) {
      state.color = color
    },
    setTimeout (state, timeout) {
      state.timeout = timeout
    }
  },
  actions: {
    closeSnackbar ({ commit }) {
      commit('setSnackbar', false)
    },
    openSnackbar ({ commit }, { text, color, timeout }) {
      commit('setSnackbar', true)
      commit('setText', text)
      commit('setColor', color)
      commit('setTimeout', timeout)
    },
    defineSnackbar ({ commit }, value) {
      commit('setSnackbar', value)
    }
  },
  getters: {
    getText (state) {
      return state.text
    },
    getColor (state) {
      return state.color
    },
    getTimeout (state) {
      return state.timeout
    }
  }
}
