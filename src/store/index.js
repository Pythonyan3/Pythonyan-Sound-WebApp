import { createStore } from 'vuex'
import player from './player'
import playlists from './playlists'
import profile from './profile'
import search from './search'


export default createStore({
  modules: { player, playlists, profile, search },
  state: {
    errorResponse: {
      status: 0,
      data: [],
      fromComponentName: ""
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

    getFromComponentName(state) {
      return state.errorResponse.fromComponentName;
    },

    getNotificationMessage(state) {
      return state.notificationMessage;
    }
  },
  mutations: {
    SET_ERROR(state, { error, fromComponentName }) {
      state.errorResponse.fromComponentName = fromComponentName;

      if (error.response) {
        state.errorResponse.status = error.response.status;

        //parse response messages
        if (error.response.data) {
          Object.values(error.response.data).forEach(val => {
            if (Array.isArray(val)) {
              val.forEach(element => state.errorResponse.data.push(element));
            } else {
              state.errorResponse.data.push(val);
            }
          });
        }
      } else {
        state.errorResponse.status = -1;
      }
    },

    CLEAR_ERROR(state) {
      state.errorResponse.status = 0;
      state.errorResponse.data = [];
      state.errorResponse.fromComponentName = "";
    },

    SET_NOTIFICATION_MESSAGE(state, payload) {
      state.notificationMessage = payload;
    },

    CLEAR_NOTIFICATION_MESSAGE(state) {
      state.notificationMessage = "";
    }
  },
})