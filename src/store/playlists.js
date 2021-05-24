export default {
    namespaced: true,
    state: {
        profilePlaylists: [],
    },
    getters: {
        getProfilePlaylists(state) {
            return state.profilePlaylists;
        }
    },
    mutations: {
        SET_PROFILE_PLAYLISTS(state, payload) {
            state.profilePlaylists = payload;
        },

        ADD_PROFILE_PLAYLIST(state, paylaod) {
            state.profilePlaylists.push(paylaod);
            state.profilePlaylists.sort((a, b) => a.title.localeCompare(b.title));
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
                return await api.playlists.getPlaylistInfo(playlistId, accessToken);
            } catch (error) {
                commit("SET_ERROR", { error: error, fromComponentName: componentName }, { root: true });
                return null;
            }
        }
    }
}