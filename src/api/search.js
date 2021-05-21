export default function (axios_instance) {
    return {
        search(searchString) {
            return axios_instance.get(`search/${searchString}/`, {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxNjgzMTg4LCJqdGkiOiI5MGRlNzczMzM2Nzc0YTQwYjkzZGU1MWM0YWMzYTlhZCIsInVzZXJfaWQiOjF9.dXLjJj_bBP3odx4X3r4aneuScgh8lKec0rMUBzY2lw4'
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