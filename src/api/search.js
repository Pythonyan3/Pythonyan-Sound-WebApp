export default function (axios_instance) {
    return {
        search(searchString) {
            return axios_instance.get(`search/${searchString}/`, {
                headers: {
                    'Authorization': ''
                }
            })
        },

        searchProfile(searchString) {
            return axios_instance.get(`search/profile/${searchString}/`)
        },

        searchArtist(searchString) {
            return axios_instance.get(`search/artist/${searchString}/`)
        },

        searchPlaylist(searchString) {
            return axios_instance.get(`search/playlist/${searchString}/`)
        },

        searchSong(searchString) {
            return axios_instance.get(`search/song/${searchString}/`)
        }
    }
}