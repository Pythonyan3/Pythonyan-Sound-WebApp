import { createStore } from 'vuex'
import profile from './profile'
import search from './search'


export default createStore({
  modules: { profile, search },
  state: {
    errorResponse: {
      status: 0,
      data: []
    },
    notificationMessage: ""
  },
  getters: {
    getError(state) {
      return state.errorResponse;
    },

    getErrorStatus(state) {
      return state.errorResponse.status;
    },

    getErrorData(state) {
      return state.errorResponse.data;
    },

    getNotificationMessage(state) {
      return state.notificationMessage;
    }
  },
  mutations: {
    SET_ERROR(state, payload) {
      if (payload.response) {
        state.errorResponse.status = payload.response.status;

        //parse response messages
        if (payload.response.data) {
          Object.values(payload.response.data).forEach(val => {
            if (Array.isArray(val)) {
              val.forEach(element => state.errorResponse.data.push(element));
            } else {
              state.errorResponse.data.push(val);
            }
          });
        }
      } else {
        state.errorResponse.status = -1;
        console.log(payload);
      }
    },

    CLEAR_ERROR(state) {
      state.errorResponse.status = 0;
      state.errorResponse.data = [];
    },

    SET_NOTIFICATION_MESSAGE(state, payload) {
      state.notificationMessage = payload;
    }
  },
})