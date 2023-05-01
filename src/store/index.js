import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
  },
  getters: {
  },
  mutations: {
    login(state, payload) {
      state.userId = payload.userId;
    },
    logout(state) {
      state.userId = 0;
    },
  },
  actions: {
  },
  modules: {
  }
})
