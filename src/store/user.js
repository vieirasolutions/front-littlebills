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
    async setUser ({ commit }, user) {
      await commit('setUser', user)
    },
    async setWallet ({ commit }, wallet) {
      await commit('setWallet', wallet)
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
