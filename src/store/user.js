export default {
  namespaced: true,
  state: {
    user: {},
    wallet: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setWallet (state, wallet) {
      state.wallet = wallet
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setWallet ({ commit }, wallet) {
      commit('setWallet', wallet)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getWallet (state) {
      return state.wallet
    }
  }
}
