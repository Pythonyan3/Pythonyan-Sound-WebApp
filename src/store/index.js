import { createStore } from 'vuex'
import profile from './profile'
import search from './search'


export default createStore({
  modules: { profile, search },
  state: {
    error_response: {
      status: 0,
      data: []
    }
  },
  getters: {
    getError(state) {
      return state.error_response;
    },

    getErrorStatus(state) {
      return state.error_response.status;
    },

    getErrorData(state) {
      return state.error_response.data;
    }
  },
  mutations: {
    SET_ERROR(state, payload) {
      if (payload.response) {
        state.error_response.status = payload.response.status;

        //parse response messages
        if (payload.response.data) {
          Object.values(payload.response.data).forEach(val => {
            if (Array.isArray(val)) {
              val.forEach(element => state.error_response.data.push(element));
            } else {
              state.error_response.data.push(val);
            }
          });
        }
      } else {
        state.error_response.status = -1;
        console.log(payload);
      }
    },

    CLEAR_ERROR(state) {
      state.error_response.status = 0;
      state.error_response.data = [];
    }
  },
})