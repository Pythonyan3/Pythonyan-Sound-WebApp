export default function (axios_instance) {
    return {
        search(payload, accessToken) {
            return axios_instance.get(`search/${payload}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },

        searchProfile(payload) {
            return axios_instance.get(`search/profile/${payload}/`)
        },

        searchArtist(payload) {
            return axios_instance.get(`search/artist/${payload}/`)
        },

        searchPlaylist(payload) {
            return axios_instance.get(`search/playlist/${payload}/`)
        },

        searchSong(payload) {
            return axios_instance.get(`search/song/${payload}/`)
        }
    }
}