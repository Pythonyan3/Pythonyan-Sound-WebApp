export default {
    namespaced: true,
    state: {
        searchString: "",
        searchResults: {
            artists: [],
            songs: [],
            playlists: [],
            profiles: [],
        }
    },
    getters: {
        getSearchString(state) {
            return state.searchString;
        },

        getSearchResults(state) {
            return state.searchResults
        },

        getSearchArtistsResults(state) {
            return state.searchResults.artists
        },

        getSearchProfilesResults(state) {
            return state.searchResults.profiles
        },

        getSearchPlaylistsResults(state) {
            return state.searchResults.playlists
        },

        getSearchSongsResults(state) {
            return state.searchResults.songs
        }
    },
    mutations: {
        SET_SEARCH_STRING(state, payload) {
            state.searchString = payload;
            if (!state.searchString) {
                state.searchResults = {
                    artists: [],
                    profiles: [],
                    playlists: [],
                    songs: [],
                }
            }

        },

        CLEAR_SEARCH_STRING(state) {
            state.searchString = "";
            state.searchResults = {
                artists: [],
                profiles: [],
                playlists: [],
                songs: [],
            }
        },

        SET_SEARCH_RESULTS(state, payload) {
            state.searchResults = payload;
        },

        ADD_SEARCH_ARTISTS_RESULTS(state, payload) {
            state.searchResults.artists = state.searchResults.artists.concat(payload);
        },

        ADD_SEARCH_PROFILES_RESULTS(state, payload) {
            state.searchResults.profiles = state.searchResults.profiles.concat(payload);
        },

        ADD_SEARCH_PLAYLISTS_RESULTS(state, payload) {
            state.searchResults.playlists = state.searchResults.playlists.concat(payload);
        },

        ADD_SEARCH_SONGS_RESULTS(state, payload) {
            state.searchResults.songs = state.searchResults.songs.concat(payload);
        }
    },
    actions: {
        async search_action({ commit }, { api, searchString }) {
            try {
                const response = await api.search.search(searchString);
                commit("SET_SEARCH_STRING", searchString);
                commit("SET_SEARCH_RESULTS", response.data);
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true });
                return false;
            }
        },
    }
}