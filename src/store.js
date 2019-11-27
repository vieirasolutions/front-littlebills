import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from '@/store/snackbar'
import user from '@/store/user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    snackbar: snackbar,
    user: user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
