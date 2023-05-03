import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    userName: '',
    isLogging: false,
    isLoading: false,
    loadingCount: 0
  },
  getters: {
  },
  mutations: {
    login(state, payload) {
      state.userId = payload.userId;
      state.userName = payload.userName;
    },
    logout(state) {
      state.userId = 0;
      state.userName = '';
    },
    loading(state, isLoading) {
      state.loadingCount += isLoading ? 1 : -1;
      state.isLoading = state.loadingCount > 0;
    },
  },
  actions: {
    async load({commit}) {
      await Vue.prototype.$http.get('users/current')
        .then((resp) => commit('login', {
          userId: resp.data.id,
          userName: resp.data.surname + ' ' + resp.data.name + ' ' + resp.data.patronymic
        }))
        .catch((err) => {
          commit('logout');
          console.log(err);
        });
    }
  },
  modules: {
  }
})
