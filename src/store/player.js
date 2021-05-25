export default {
    namespaced: true,
    state: {
        playerInfo: {
            playlistId: 0,
            playlist: [],
            shuffledPlaylist: [],
            currentSongIndex: -1,
            repeat: 0,
            shuffled: false,
            isPlaying: false,
        },
        audio: new Audio(),
    },
    getters: {
        getPlaylistId(state) {
            return state.playerInfo.playlistId;
        },

        getCurrentSong(state) {
            return state.playerInfo.playlist[state.playerInfo.currentSongIndex];
        },

        getIsPlaying(state) {
            return state.playerInfo.isPlaying;
        },

        getRepeat(state) {
            return state.playerInfo.repeat;
        }
    },
    mutations: {
        SAVE_PLAYER_INFO(state) {
            localStorage.setItem("playerInfo", JSON.stringify(state.playerInfo));
        },

        LOAD_PLAYER_INFO(state) {
            if (localStorage.getItem("playerInfo")) {
                state.playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
                state.audio.src = state.playerInfo.playlist[state.playerInfo.currentSongIndex].audio;
            }
        },

        SET_AUDIO_EVENTS(state, { onpause, onplay, onended }) {
            state.audio.onplay = onplay;
            state.audio.onpause = onpause;
            state.audio.onended = onended;
        },

        SET_PLAYLIST(state, { playlistId, playlist }) {
            if (playlist.length) {
                state.audio.pause();

                state.playerInfo.isPlaying = false;
                state.playerInfo.currentSongIndex = 0;
                state.playerInfo.playlistId = playlistId;
                state.playerInfo.playlist = playlist;

                state.audio.src = state.playerInfo.playlist[0].audio
            }
        },

        CHANGE_CURRENT_SONG(state, payload) {
            if (payload >= 0 && payload <= state.playerInfo.playlist.length-1) {
                state.audio.pause();

                state.playerInfo.currentSongIndex = payload;

                state.audio.src = state.playerInfo.playlist[state.playerInfo.currentSongIndex].audio
            }
        },

        PLAY(state) {
            if (state.audio.src) {
                state.audio.play();
                state.playerInfo.isPlaying = true;
            }
        },

        PAUSE(state) {
            if (state.audio.currentSrc) {
                state.audio.pause();
                state.playerInfo.isPlaying = false;
            }
        },

        NEXT(state) {
            state.audio.pause();
            state.playerInfo.isPlaying = false;
            
            if (state.playerInfo.currentSongIndex < state.playerInfo.playlist.length-1) {    
                state.playerInfo.currentSongIndex++;
            } else if (state.playerInfo.currentSongIndex == state.playerInfo.playlist.length-1) {
                state.playerInfo.currentSongIndex = 0;
            }

            state.audio.src = state.playerInfo.playlist[state.playerInfo.currentSongIndex].audio;
        },

        PREV(state) {
            state.audio.pause();
            state.playerInfo.isPlaying = false;
            
            if (state.playerInfo.currentSongIndex > 0) {    
                state.playerInfo.currentSongIndex--;
            } else if (state.playerInfo.currentSongIndex == 0) {
                state.playerInfo.currentSongIndex = state.playerInfo.playlist.length-1;
            }

            state.audio.src = state.playerInfo.playlist[state.playerInfo.currentSongIndex].audio;
        }
    },
    actions: {

    }
}