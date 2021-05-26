export default {
    namespaced: true,
    state: {
        profilePlaylists: [],
        playlist: null,
    },
    getters: {
        getProfilePlaylists(state) {
            return state.profilePlaylists;
        },
        getPlaylist(state) {
            return state.playlist;
        }
    },
    mutations: {
        SET_PROFILE_PLAYLISTS(state, payload) {
            state.profilePlaylists = payload;
        },

        ADD_PROFILE_PLAYLIST(state, paylaod) {
            state.profilePlaylists.push(paylaod);
            state.profilePlaylists.sort((a, b) => a.title.localeCompare(b.title));
        },

        SET_PLAYLIST(state, payload) {
            state.playlist = payload;
        },

        LIKE_PLAYLIST(state, paylaod) {
            if (state.playlist && state.playlist.id == paylaod) {
                state.playlist.is_liked = true;
            }
        },

        UNLIKE_PLAYLIST(state, paylaod) {
            if (state.playlist && state.playlist.id == paylaod) {
                state.playlist.is_liked = false;
            }
        }
    },
    actions: {
        async getProfilePlaylistsAction({ commit }, { api, accessToken, componentName }) {
            try {
                const response = (await api.playlists.getProfilePlaylists(accessToken));
                commit("SET_PROFILE_PLAYLISTS", response.data.results);
                return true;
            } catch (error) {
                commit("SET_ERROR", { error: error, fromComponentName: componentName }, { root: true })
                return false;
            }
        },

        async createPlaylistAction({ commit }, { api, accessToken, componentName, ...payload }) {
            try {
                const response = (await api.playlists.createPlaylist(payload, accessToken));
                commit("ADD_PROFILE_PLAYLIST", response.data);
                commit("SET_NOTIFICATION_MESSAGE", "New Playlist Created Successful", { root: true });
                return true;
            } catch (error) {
                commit("SET_ERROR", { error: error, fromComponentName: componentName }, { root: true })
                return false;
            }
        },

        async getPlaylistInfoAction({ commit }, { api, accessToken, componentName, playlistId }) {
            try {
                const response =  await api.playlists.getPlaylistInfo(playlistId, accessToken);
                commit("SET_PLAYLIST", response.data);
                return true;
            } catch (error) {
                commit("SET_ERROR", { error: error, fromComponentName: componentName }, { root: true });
                return null;
            }
        },

        async likePlaylistAction({ commit }, { api, accessToken, componentName, playlistId }) {
            try {
                await api.playlists.likePlaylist(playlistId, accessToken);
      
                commit("LIKE_PLAYLIST", playlistId);
                commit("SET_NOTIFICATION_MESSAGE", "Saved to Your Library", { root: true });
              } catch (error) {
                if (error.response) {
                  commit("SET_ERROR", {
                    error: error,
                    fromComponentName: componentName,
                  }, { root: true });
                }
                commit("SET_NOTIFICATION_MESSAGE", "Couldn't Save to Your Library", { root: true })
              }
        },

        async unlikePlaylistAction({ commit }, { api, accessToken, componentName, playlistId }) {
            try {
                await api.playlists.unlikePlaylist(playlistId, accessToken);
      
                commit("UNLIKE_PLAYLIST", playlistId);
                commit("SET_NOTIFICATION_MESSAGE", "Removed from Your Library", { root: true });
              } catch (error) {
                if (error.response) {
                  commit("SET_ERROR", {
                    error: error,
                    fromComponentName: componentName,
                  }, { root: true });
                }
                commit("SET_NOTIFICATION_MESSAGE", "Couldn't Remove from Your Library", { root: true })
              }
        },

    }
}