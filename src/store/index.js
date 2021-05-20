import { createStore } from 'vuex'
import profile from './profile'
import search from './search'


export default createStore({
  modules: { profile, search },
  state: {
    errors: []
  },
  getters: {
    getErrors(state) {
      return state.errors;
    }
  },
  mutations: {
    ADD_ERROR(state, payload) {
      state.errors.push(payload);
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    }
  },
  actions: {
    clear_errors({ commit }){
      commit("CLEAR_ERRORS");
    }
  }
})