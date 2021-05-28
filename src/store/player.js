export default {
    namespaced: true,
    state: {
        playlistInfo: null,
        playerInfo: {
            isPlaying: false,
            isMuted: false,
            duration: 0,
            time:0,
            volume: 1.0,
            repeat: 0,
        },
        audio: new Audio(),
    },
    getters: {
        getPlaylistId(state) {
            if (state.playlistInfo) {
                return state.playlistInfo.playlistId;
            }
        },

        getCurrentSong(state) {
            if (state.playlistInfo) {
                return state.playlistInfo.songs[state.playlistInfo.currentSongIndex];
            }
            return null;
        },

        getIsPlaying(state) {
            return state.playerInfo.isPlaying;
        },

        getVolume(state) {
            return state.playerInfo.volume;
        },

        getIsMuted(state) {
            return state.playerInfo.isMuted;
        },

        getDuration(state) {
            return state.playerInfo.duration;
        },

        getTime(state) {
            return state.playerInfo.time;
        },

        getRepeat(state) {
            return state.playerInfo.repeat;
        },
    },
    mutations: {
        SAVE_PLAYER_DATA(state) {
            state.playerInfo.isPlaying = false;
            localStorage.setItem("playerInfo", JSON.stringify(state.playerInfo));

            if (state.playlistInfo) {
                localStorage.setItem("playlistInfo", JSON.stringify(state.playlistInfo));
            }
        },

        LOAD_PLAYER_DATA(state) {
            if (localStorage.getItem("playlistInfo")) {
                state.playlistInfo = JSON.parse(localStorage.getItem("playlistInfo"));
                state.audio.src = state.playlistInfo.songs[state.playlistInfo.currentSongIndex].audio;
                state.audio.load();
            }

            if (localStorage.getItem("playerInfo")) {
                state.playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
                state.audio.volume = state.playerInfo.volume;
                state.audio.currentTime = state.playerInfo.time;
            }
        },

        CLEAR_PLAYER_DATA(state) {
            if (localStorage.getItem("playlistInfo")) {
                state.playlistInfo = null;
                localStorage.removeItem("playlistInfo");
            }

            if (localStorage.getItem("playerInfo")) {
                state.playerInfo = {
                    isPlaying: false,
                    isMuted: false,
                    duration: 0,
                    time:0,
                    volume: 1.0,
                    repeat: 0,
                },
                localStorage.removeItem("playerInfo");
            }
        },

        SET_AUDIO_EVENTS(state, { onpauseHandler, onplayHandler, onendedHandler, onvolumechangeHandler }) {

            state.audio.onplay = () => {
                state.playerInfo.isPlaying = true;
                if (onplayHandler) {
                    onplayHandler();
                }
            };
            state.audio.onpause = () => {
                state.playerInfo.isPlaying = false;
                if (onpauseHandler) {
                    onpauseHandler();
                }
            };
            state.audio.onended = () => {
                if (onendedHandler) {
                    onendedHandler();
                }
            }

            state.audio.onvolumechange = () => {
                if (state.audio.volume == 0 || state.audio.muted) {
                    state.playerInfo.isMuted = true;    
                } else {
                    state.playerInfo.isMuted = false;    
                }
                state.playerInfo.volume = state.audio.volume;

                if (onvolumechangeHandler) {
                    onvolumechangeHandler();
                }
            }

            state.audio.ontimeupdate = () => {
                state.playerInfo.time = state.audio.currentTime;
            },

            state.audio.ondurationchange = () => {
                state.playerInfo.duration = state.audio.duration;

            }
        },

        SET_PLAYLIST(state, { playlistId, songs }) {
            if (songs.length) {
                state.playlistInfo = {
                    playlistId: playlistId,
                    songs: songs,            
                    shuffledsongs: [],
                    currentSongIndex: 0
                }
                
                state.audio.src = state.playlistInfo.songs[0].audio
                state.audio.load();
            }
        },

        SET_CURRENT_SONG(state, payload) {
            if (payload >= 0 && payload <= state.playlistInfo.songs.length-1) {
                state.playlistInfo.currentSongIndex = payload;

                state.audio.src = state.playlistInfo.songs[state.playlistInfo.currentSongIndex].audio
                state.audio.load();
            }
        },

        PLAY(state) {
            if (state.audio.src) {
                state.audio.play();
            }
        },

        PAUSE(state) {
            if (state.audio.src) {
                state.audio.pause();
            }            
        },

        NEXT(state) {
            if (state.playlistInfo.currentSongIndex < state.playlistInfo.songs.length-1) {    
                state.playlistInfo.currentSongIndex++;
            } else if (state.playlistInfo.currentSongIndex == state.playlistInfo.songs.length-1) {
                state.playlistInfo.currentSongIndex = 0;
            }

            state.audio.src = state.playlistInfo.songs[state.playlistInfo.currentSongIndex].audio;
            state.audio.load();
        },

        PREV(state) {
            if (state.playlistInfo.currentSongIndex > 0) {    
                state.playlistInfo.currentSongIndex--;
            } else if (state.playlistInfo.currentSongIndex == 0) {
                state.playlistInfo.currentSongIndex = state.playlistInfo.songs.length-1;
            }

            state.audio.src = state.playlistInfo.songs[state.playlistInfo.currentSongIndex].audio;    
            state.audio.load();        
        },

        MUTE_VOLUME(state) {
            state.audio.muted = true;
        },

        UNMUTE_VOLUME(state) {
            state.audio.muted = false;
        },

        SET_VOLUME(state, payload) {
            state.audio.volume = payload;
        },

        SET_TIME(state, payload) {
            state.audio.currentTime = payload;
        }
    },
    actions: {

    }
}