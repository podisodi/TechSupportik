import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    userName: '',
    userAvatar: '',
    isLogging: false,
    isLoading: false,
    loadingCount: 0,
    problemGroupId: 0,
    isSpecialist: false,
  },
  getters: {
  },
  mutations: {
    login(state, payload) {
      state.userId = payload.userId;
      state.userName = payload.userName;
      state.userAvatar = payload.userAvatar;
      state.isSpecialist = payload.isSpecialist;
    },
    logout(state) {
      state.userId = 0;
      state.userName = '';
      state.userAvatar = '';
      state.isSpecialist = false;
    },
    loading(state, isLoading) {
      state.loadingCount += isLoading ? 1 : -1;
      state.isLoading = state.loadingCount > 0;
    },
    problemGroup(state, groupId) {
      state.problemGroupId = groupId;
    }
  },
  actions: {
    async load({commit}) {
      await Vue.prototype.$http.get('users/current')
        .then((resp) => commit('login', {
          userId: resp.data.id,
          userName: resp.data.surname + ' ' + resp.data.name + ' ' + resp.data.patronymic,
          userAvatar: resp.data.avatar.route,
          isSpecialist: resp.data.isSpecialist,
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
