import { createStore } from 'vuex'
import profile from './profile'


export default createStore({
  modules: { profile },
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